import { render, screen } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import * as useDocumentsHook from "@/hooks/useDocuments";

// Mock the hook
vi.mock("@/hooks/useDocuments", () => ({
  useDocuments: vi.fn(),
}));

const renderWithRouter = (ui: React.ReactNode) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe("Dashboard page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    vi.mocked(useDocumentsHook.useDocuments).mockReturnValue({
      isLoading: true,
      data: undefined,
      error: null,
    } as any);

    renderWithRouter(<Dashboard />);
    expect(screen.getByText(/Loading documents/i)).toBeInTheDocument();
  });

  it("shows empty state when no documents", () => {
    vi.mocked(useDocumentsHook.useDocuments).mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
    } as any);

    renderWithRouter(<Dashboard />);
    expect(screen.getByText(/No documents yet/i)).toBeInTheDocument();
  });

  it("renders a list of documents", () => {
    const mockDocs = [
      {
        id: "1",
        title: "Test PDF 1",
        signerEmail: "signer1@test.com",
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Test PDF 2",
        signerEmail: "signer2@test.com",
        status: "signed",
        createdAt: new Date().toISOString(),
      },
    ];

    vi.mocked(useDocumentsHook.useDocuments).mockReturnValue({
      isLoading: false,
      data: mockDocs,
      error: null,
    } as any);

    renderWithRouter(<Dashboard />);
    
    expect(screen.getByText("Test PDF 1")).toBeInTheDocument();
    expect(screen.getByText("Test PDF 2")).toBeInTheDocument();
    expect(screen.getByText("signer1@test.com")).toBeInTheDocument();
    expect(screen.getAllByText(/Awaiting signature/i)).toHaveLength(1);
    expect(screen.getAllByText(/Signed/i)).toHaveLength(1);
  });

  it("shows error state", () => {
    vi.mocked(useDocumentsHook.useDocuments).mockReturnValue({
      isLoading: false,
      data: undefined,
      error: new Error("Failed to fetch"),
    } as any);

    renderWithRouter(<Dashboard />);
    expect(screen.getByText(/Failed to load documents/i)).toBeInTheDocument();
  });
});