import { PDFDocument } from "pdf-lib";
import { readFile } from "./storage";

export interface SignaturePlacement {
  page: number;       // 1-indexed
  xPct: number;       // 0-1 left edge of signature, % of page width
  yPct: number;       // 0-1 top edge of signature, % of page height (from top)
  widthPct: number;   // 0-1 signature width, % of page width
  heightPct: number;  // 0-1 signature height, % of page height
}

export async function stampSignature(
  filePath: string,
  signatureDataUrl: string,
  placements: SignaturePlacement[]
): Promise<Uint8Array> {
  const pdfBytes = await readFile(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Decode base64 PNG from the data URL
  const base64Data = signatureDataUrl.replace(/^data:image\/png;base64,/, "");
  const signatureBytes = Buffer.from(base64Data, "base64");
  const signatureImage = await pdfDoc.embedPng(signatureBytes);

  for (const placement of placements) {
    const pageIndex = placement.page - 1;
    const pages = pdfDoc.getPages();

    if (pageIndex < 0 || pageIndex >= pages.length) continue;

    const page = pages[pageIndex];
    const { width: pageWidth, height: pageHeight } = page.getSize();

    // Convert % coords → absolute PDF coords
    // PDF y-axis is bottom-up; web y-axis is top-down — flip here
    const x = pageWidth * placement.xPct;
    const sigWidth = pageWidth * placement.widthPct;
    const sigHeight = pageHeight * placement.heightPct;
    // top-left in web coords = bottom-left in PDF coords
    const y = pageHeight * (1 - placement.yPct) - sigHeight;

    page.drawImage(signatureImage, { x, y, width: sigWidth, height: sigHeight });
  }

  return pdfDoc.save();
}

export async function getPageCount(filePath: string): Promise<number> {
  const pdfBytes = await readFile(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  return pdfDoc.getPageCount();
}