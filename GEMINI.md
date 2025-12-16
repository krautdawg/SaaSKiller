# SaaSKiller MVP

## Project Overview

SaaSKiller is a lead-generation tool designed to help small business owners calculate the financial "bleed" from unused SaaS features and offer a "Sovereign Software" alternative (custom-built, one-time fee software).

The application is a **React Single Page Application (SPA)** built with **Vite** and **Tailwind CSS**. 

**Current Status (Dec 2025):** 
The application has undergone significant UI/UX polish to meet "FANG-level" standards (animations, skeletons, accessibility). The backend has been migrated from PocketBase to a custom **Express.js + PostgreSQL** API to support advanced features like AI-powered tool analysis via Perplexity.

### Architecture Highlights

*   **Frontend:** React 18 + Vite + Tailwind CSS.
*   **Styling:** Custom design system (`tailwind.config.js`) with semantic colors and animations.
*   **State Management:** Zustand (`src/store/auditStore.js`, `src/store/saasToolsStore.js`).
*   **Backend:** Express.js API (`api/server.js`) connected to a PostgreSQL database.
    *   **Database:** PostgreSQL (hosted locally or via Supabase/Neon in prod).
    *   **AI Integration:** Perplexity API for real-time SaaS tool analysis and feature extraction.
    *   **Security:** Rate limiting, Helmet, CORS configured.

## Directory Structure

*   **`api/`**: Backend API.
    *   **`server.js`**: Main Express entry point.
    *   **`db.js`**: PostgreSQL connection pool configuration.
    *   **`perplexity.js`**: AI analysis service.
*   **`src/`**: Main frontend source code.
    *   **`assets/`**: Static assets (images, logo).
    *   **`components/`**: React components.
        *   **`ToolSearch.jsx`**: Main entry point with AI analysis trigger.
        *   **`ToolBrowser.jsx`**: Grid view of tools with skeleton loading.
        *   **`PricingPage.jsx`**: Marketing page with ROI calculator and animated cards.
        *   **`ToolDetailView.jsx`**: Detailed tool view with cost calculator.
    *   **`store/`**: Zustand stores (`auditStore`, `saasToolsStore`).
    *   **`services/`**: Frontend API clients (`api.js`).
    *   **`lib/`**: Utilities.
*   **`documentation/`**: Project documentation (Architecture, PRD, Polish Plans).

## Building and Running

### Prerequisites
*   Node.js (v18+)
*   PostgreSQL Database (running locally or cloud)
*   `PERPLEXITY_API_KEY` (for AI analysis features)

### Environment Setup

1.  **Frontend (.env):**
    ```env
    VITE_API_URL=http://localhost:3000
    ```

2.  **Backend (api/.env):**
    ```env
    DATABASE_URL=postgresql://user:password@localhost:5432/saaskiller
    PERPLEXITY_API_KEY=pplx-...
    PORT=3000
    ```

### Development Commands

1.  **Install Dependencies (Root & API):**
    ```bash
    npm install
    cd api && npm install
    ```

2.  **Start Backend API:**
    ```bash
    cd api
    npm run dev
    ```
    *Runs on http://localhost:3000*

3.  **Start Frontend:**
    ```bash
    # In a new terminal
    npm run dev
    ```
    *Runs on http://localhost:5173*

## Recent Updates (Polish Phase)

*   **Visual Polish:**
    *   Updated Logo and Favicon.
    *   Added smooth skeleton loading states for tool browsing.
    *   Implemented lazy loading and fade-in effects for images.
    *   Added micro-interactions (hover glows, sliding arrows, pulse effects).
*   **Accessibility:**
    *   Added "Skip to content" link.
    *   Improved color contrast in footer and text elements.
*   **Refactoring:**
    *   Backend logic split into `db.js` and `perplexity.js` (Work in Progress integration).

## Development Conventions

*   **Styling:** Use Tailwind utility classes. Avoid inline styles.
*   **State:** Use Zustand for global state.
*   **Components:** Functional, atomic components.
*   **Backend:** ES Modules (`import/export`).