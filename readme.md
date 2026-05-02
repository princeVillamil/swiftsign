# SwiftSign Technical Documentation

SwiftSign is a specialized e-signature platform built to provide a lightweight, high-performance alternative to enterprise signing solutions. The project leverages the Bun ecosystem to achieve sub-millisecond execution times on the backend and a modern, reactive interface on the frontend.

## Live Demo

You can access the deployed application here:

- **Live App**: https://swiftsign-frontend.vercel.app/

## Architecture and System Design

The application follows a decoupled client-server architecture, organized as a unified workspace for simplified development and deployment.

### Frontend (React Ecosystem)
The frontend is a Single Page Application (SPA) built with React 19 and Vite 8. It utilizes a bento-style design language characterized by distinct, rounded containers and subtle depth through Tailwind CSS 4.
- **State Management**: Uses TanStack Query (React Query) v5 to synchronize server state, providing automatic re-fetching, caching, and loading states.
- **PDF Core**: Implements `react-pdf` for browser-side document rendering. We transitioned to using the ES module worker (`.mjs`) via the unpkg CDN to resolve MIME-type conflicts found in traditional CDN distributions.
- **Signature Capture**: Uses a specialized canvas implementation to capture high-resolution vector-like paths, which are exported as transparent PNG data URLs for backend processing.

### Backend (Bun & ElysiaJS)
The backend is powered by the Bun runtime, which provides integrated testing, SQLite support, and significantly faster startup times than Node.js.
- **Framework**: ElysiaJS was chosen for its high-performance characteristics and its built-in schema validation using TypeBox, ensuring that every request body is strictly typed before hitting the route logic.
- **Database**: SQLite serves as the relational engine. For security, we implemented a selective column strategy where sensitive tokens and internal file paths are excluded from general query results to prevent accidental information disclosure.
- **Services Layer**: Logic is abstracted into dedicated services:
    - **PDF Service**: Manages the mathematical translation of web coordinates (top-down percentages) into PDF coordinates (bottom-up points).
    - **Storage Service**: Handles atomic file writes and ensures all uploads are strictly forced to the `.pdf` extension to prevent script injection.
    - **Email Service**: A robust wrapper around Nodemailer that includes sandbox-mode detection and graceful error handling to prevent 3rd-party API failures from crashing the core signing logic.

---

## File Structure

```text
/
├── .github/workflows/      # CI/CD configurations (GitHub Actions)
├── backend/
│   ├── src/
│   │   ├── db/            # Database initialization and schema definitions
│   │   ├── routes/        # API Endpoints (Documents, Sign flow)
│   │   ├── services/      # Business logic (PDF, Email, Storage)
│   │   └── index.ts       # Server entry point and global error handling
│   ├── tests/             # Unit and Integration test suites
│   └── Dockerfile         # Production container definition
├── frontend/
│   ├── src/
│   │   ├── api/           # Axios client and endpoint definitions
│   │   ├── components/    # Reusable UI (Layouts, UI primitives)
│   │   ├── hooks/         # Custom React hooks (Data fetching)
│   │   ├── pages/         # Page-level components
│   │   └── types/         # Shared TypeScript interfaces
│   └── vitest.config.ts   # Frontend test configuration
└── package.json           # Root workspace management
```

---

## The Development Process: Evolution and Changes

This project evolved through several critical phases of refinement:

### Phase 1: Core Functionality
Initially, the project focused on the basic mechanics of uploading a PDF and placing a signature. We solved the "Coordinate Flip" challenge here, ensuring that a signature placed in the browser appears at the exact same location in the final PDF document despite the different axis systems.

### Phase 2: Security Hardening and Audit
A comprehensive security audit was performed, leading to several architectural changes:
- **API Lockdown**: Refactored all `SELECT *` queries to explicit column selection. This ensures the `signing_token`—which acts as a temporary password—is never visible in the dashboard or history lists.
- **Request Throttling**: Implemented body size limits (10MB) to prevent Denial of Service (DoS) attacks via oversized PDF uploads.
- **Path Masking**: Updated the storage service to log detailed errors to internal server logs while returning generic messages to the client, preventing the leaking of server folder structures.

### Phase 3: The "Verify to Send" Bridge
To solve the problem of email identity without forcing users to go through a full account registration, we implemented a specialized state machine. Documents now enter a `draft` state upon upload. A verification link is sent to the requester's email; only upon clicking this link is the document "activated" and the signing request sent to the final recipient.

### Phase 4: Full-Lifecycle Integration Testing
We moved beyond simple endpoint checks to a full lifecycle integration test. This test mocks external dependencies (like SMTP) but executes the actual database and PDF logic, simulating an upload, a token-based retrieval, a signature submission, and a final download in one continuous flow.

---

## Key Challenges and Solutions

### PDF Worker Compatibility
Recent updates to `pdf.js` changed how workers are loaded in browser environments. We encountered "Internal Server Error" and MIME-type blocks when using standard CDNs. The solution was to implement a dynamic version-matching string that pulls the specific `.mjs` module from unpkg, ensuring compatibility across different browsers.

### Resend Sandbox Restrictions
During testing, we navigated the strict limitations of the Resend email sandbox. To prevent development bottlenecks, we built a "Bypass" system. If an email fails to send because of domain verification issues, the backend catches the error and prints the "Bypass Link" directly to the terminal, allowing the developer to continue the workflow without waiting for DNS propagation.

---

## Future Roadmap

If expanded into a production-scale product, the following features are planned:

- **Cloud Infrastructure Transition**: Migrating local file storage to S3-compatible buckets (like Cloudflare R2) and transitioning the local SQLite database to Turso for global distribution.
- **Reusable Templates**: Implementation of a "Template" system where frequently used documents can have pre-defined signature fields, allowing for "one-click" sending.
- **Advanced Audit Logs**: Creation of a "Certificate of Completion" appended to every document, containing IP addresses, browser fingerprints, and cryptographic hashes of the signed content.
- **Two-Factor Signing (2FA)**: Requiring signers to enter a code sent via SMS or a pre-shared access code before they can access the document preview.

---

## Setup and Installation

### Backend
1. Navigate to `/backend`.
2. Run `bun install`.
3. Create a `.env` file with `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS`.
4. Run `bun run dev`.

### Frontend
1. Navigate to `/frontend`.
2. Run `bun install`.
3. Run `bun run dev`.

### Testing
From the root directory, run `bun run test` to execute both the backend lifecycle integration tests and the frontend component unit tests.
