# SaaSKiller MVP

## Project Overview

SaaSKiller is a lead-generation tool designed to help small business owners calculate the financial "bleed" from unused SaaS features and offer a "Sovereign Software" alternative (custom-built, one-time fee software).

The application is a **React Single Page Application (SPA)** built with **Vite** and **Tailwind CSS**. 

**Current Status (Dec 2025):** 
The application is feature-complete for the core audit loop. It features real-time AI-powered tool analysis, a localized multi-language interface (EN/DE), and automated PDF report generation via background workers.

### Architecture Highlights

*   **Frontend:** React 18 + Vite + Tailwind CSS.
*   **Styling:** Custom design system (`tailwind.config.js`) with semantic colors and animations.
*   **State Management:** Zustand (`src/store/auditStore.js`, `src/store/saasToolsStore.js`).
*   **i18n:** Custom zero-dependency translation system (`src/lang.js`) with automatic domain detection (.de).
*   **Backend:** Express.js API (`api/server.js`) connected to a PostgreSQL database.
    *   **Database:** PostgreSQL with automated schema initialization and audit report storage.
    *   **AI Integration:** Perplexity API (sonar-pro) for flexible SaaS feature extraction (Min 10/Max 50 core features).
    *   **Queue System:** Bull (Redis) for processing background email and PDF generation jobs.
    *   **Security:** Rate limiting, Helmet, CORS, and Zod validation.

## Directory Structure

*   **`api/`**: Backend API.
    *   **`server.js`**: Main Express entry point & DB initialization.
    *   **`perplexity.js`**: AI analysis service with feature prioritization logic.
    *   **`services/`**: Email, PDF, and i18n backend services.
    *   **`workers/`**: Background job processors (Email/PDF).
    *   **`templates/`**: Localized Handlebars email templates.
*   **`src/`**: Main frontend source code.
    *   **`lang.js`**: Frontend translation dictionaries and robust language detection hook.
    *   **`components/`**: Atomic React components.
        *   **`AuditChecklist.jsx`**: Feature auditing with bulk toggle `[+]`/`[-]` and "Show More".
        *   **`LanguageToggle.jsx`**: Global language switcher (EN/DE).
        *   **`ToolSearch.jsx`**: AI-powered search entry point.
        *   **`PricingPage.jsx`**: Fully localized marketing page with ROI calculator.
    *   **`store/`**: Zustand stores for audit state and tool data.
*   **`documentation/`**: Project documentation (PRD, Architecture, Implementation Briefs).

## Building and Running

### Prerequisites
*   Node.js (v18+)
*   PostgreSQL & Redis (for background jobs)
*   `PERPLEXITY_API_KEY` (API access)

### Environment Setup

1.  **Frontend (.env):**
    ```env
    VITE_API_URL=http://localhost:3000
    ```

2.  **Backend (api/.env):**
    ```env
    DATABASE_URL=postgresql://user:password@localhost:5432/saaskiller
    REDIS_URL=redis://localhost:6379
    PERPLEXITY_API_KEY=pplx-...
    PORT=3000
    ```

## Recent Updates (Localization & AI Polish)

*   **Language Toggle (EN/DE):**
    *   Full translation coverage across all frontend pages and backend communications.
    *   Robust detection: URL params (`?lang=de`) > Hostname (`.de` domain) > LocalStorage > Browser.
    *   Localized PDF reports and automated emails.
*   **AI Analysis Logic:**
    *   Optimized feature extraction: Requests 10-50 core and 5-20 bloaty features based on tool complexity.
    *   Smart defaults: Audit starts with top 5 core features checked and all bloaty features unchecked.
*   **Audit UI Improvements:**
    *   Implemented `[+]` / `[-]` bulk toggles for core and bloaty sections.
    *   Added "Show More" functionality to keep the UI clean (Default: 10 core, 6 bloaty).
    *   Fixed timeline comparisons (Weeks for SaaSKiller vs Months for Agencies).

## Development Conventions

*   **Localization:** Use `t('key.name')` for all text. Sync `src/lang.js` with `api/services/i18nService.js`.
*   **State:** Use Zustand for global state; local `useState` only for UI-only toggles.
*   **Backend:** ES Modules. Use the `i18nService` for any user-facing strings in emails or PDFs.
