# SaaSKiller MVP

## Project Overview

SaaSKiller is a lead-generation tool designed to help small business owners calculate the financial "bleed" from unused SaaS features and offer a "Sovereign Software" alternative (custom-built, one-time fee software).

The application is a **React Single Page Application (SPA)** built with **Vite** and **Tailwind CSS**. It uses **PocketBase** as a backend-as-a-service (BaaS) for data persistence and **Zustand** for client-side state management.

### Architecture Highlights

*   **Frontend:** React 18 + Vite.
*   **Styling:** Tailwind CSS with a custom brand configuration (`tailwind.config.js`).
*   **State Management:** Zustand (`src/store/auditStore.js`) manages the "Audit Session" (wizard steps, selected features, cost calculations).
*   **Backend:** PocketBase (Self-Hosted/Local).
    *   **Collections:** `tools` (cached SaaS data), `leads` (user submissions).
    *   **Logic:** The architecture specifies server-side hooks (`pb_hooks`) to securely call the Perplexity API for analyzing new tools (currently mocked in dev if backend is unreachable).

## Directory Structure

*   **`src/`**: Main source code.
    *   **`components/`**: Atomic UI components (`ToolSearch`, `AuditChecklist`, `BleedCalculator`, `QuoteGenerator`).
    *   **`store/`**: Zustand global store and business logic.
    *   **`services/`**: API abstraction layer (`api.js`).
    *   **`lib/`**: Configuration and client instances (`pocketbase.js`).
    *   **`SaaSKillerApp.jsx`**: The original single-file prototype (kept for reference/visual intent).
*   **`documentation/`**: Project documentation.
    *   **`architecture-output.md`**: The technical blueprint and source of truth for the system.
    *   **`design-documentation/`**: Detailed UX/UI specs and style guides.
    *   **`ProductManager_PRD.md`**: Product requirements.

## Building and Running

### Prerequisites
*   Node.js (v18+)
*   PocketBase (running locally at `http://127.0.0.1:8090` or configured via `VITE_POCKETBASE_URL`)

### Development Commands

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    This will start the Vite server (usually at `http://localhost:5173`).

3.  **Build for Production:**
    ```bash
    npm run build
    ```

### PocketBase Setup (Local)
To fully utilize the app, you need a running PocketBase instance with the following schema:
*   **Collection `tools`**: `name` (text), `slug` (text), `monthly_cost` (number), `features` (json).
*   **Collection `leads`**: `email` (email), `tool_name` (text), `team_size` (number), `bleed_amount` (number), `quote_amount` (number).

*Note: The `src/services/api.js` file contains a fallback mock mechanism if the backend is unreachable.*

## Development Conventions

*   **Styling:** Use Tailwind utility classes. Avoid inline styles (`style={{}}`).
*   **State:** Use `useAuditStore` for shared state. Avoid deep prop drilling.
*   **Components:** Keep components atomic and focused on a single responsibility (Search, Audit, Calc, Quote).
*   **Colors:** Use the semantic names defined in `tailwind.config.js` (e.g., `bg-brand-primary`, `text-brand-error`) rather than hex codes directly.
