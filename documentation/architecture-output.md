# Technical Architecture Blueprint: SaaSKiller MVP (Sovereign Edition)

**Date:** December 11, 2025
**Version:** 2.0 (PocketBase Migration)
**Status:** Approved for Build
**Author:** System Architect

---

## 1. Executive Summary

### Overview
SaaSKiller is a lead-generation tool disguised as a "Sovereign Software" calculator. The system audits a user's existing SaaS usage, identifies "bloat" (unused features), and generates a quote for a custom-built alternative.

To adhere to the "Sovereign Software" philosophy, we have moved from a managed cloud provider to **Self-Hosted Infrastructure**. We utilize a single **Hetzner VPS** running **Coolify** and **PocketBase**. This gives us complete ownership of data, zero vendor lock-in, and significant cost savings.

### Key Architectural Decisions
1.  **Framework:** **Vite + React**. Chosen for extreme lightweight performance and simplicity.
2.  **Backend & Database:** **PocketBase**. A single-file backend (Go + SQLite) running on our own server. It handles the Database, API, and Admin Dashboard.
3.  **Compute/Logic:** **PocketBase Hooks (JavaScript/Goja)**. Replaces cloud functions. We run server-side JavaScript to talk to the Perplexity API securely.
4.  **Infrastructure:** **Hetzner Cloud (CX22)** orchestrated via **Coolify**.

---

## 2. Technology Stack Architecture

### Frontend Architecture
-   **Runtime**: React 18 (SPA).
-   **Build Tool**: Vite.
-   **Language**: JavaScript (ES6+).
-   **State Management**: **Zustand**. Minimalist global state for managing the "Audit Session".
-   **Routing**: Simple Conditional Rendering (Wizard Flow).
-   **Styling**: Tailwind CSS.
-   **SDK**: `pocketbase` (Official JavaScript SDK).

### Backend & Infrastructure
-   **Server**: Hetzner CX22 (Ubuntu 24.04).
-   **Platform**: Coolify (Manages SSL, Reverse Proxy, Deployments).
-   **Backend Engine**: PocketBase v0.23+.
    -   **Database**: Embedded SQLite (WAL mode enabled).
    -   **Auth**: Built-in Email/Pass (for Admins).
    -   **API**: Auto-generated REST API.
-   **AI Integration**: Perplexity API (called via `pb_hooks`).

---

## 3. System Component Design

### Core Components
1.  **`ToolSearch`**:
    -   **Responsibility**: Handles user input and searches the database.
    -   **Logic**:
        -   Calls `pb.collection('tools').getList(...)` to find existing tools.
        -   If no tool is found, user clicks "Scan Web", triggering the custom `POST /api/analyze` endpoint.
2.  **`AuditChecklist`**:
    -   **Responsibility**: Displays features categorized by "Core" vs. "Bloat".
    -   **Interaction**: Toggling items updates the local state `bloatPercentage`.
3.  **`BleedCalculator`**:
    -   **Responsibility**: Pure function. Inputs: `monthlyCost`, `userCount`. Output: `totalBleed`.
4.  **`QuoteGenerator`**:
    -   **Responsibility**: Calculates the "Sovereign Build" price.
    -   **Formula**: `Max(3000, Base + (CoreFeatures * 100) + (CustomFeatures * 500))`.

### Integration Architecture
-   **Client <-> PocketBase**:
    -   **Read**: Public access to `tools` collection.
    -   **Write**: Public access to `leads` collection (Create only).
-   **Server-Side Logic (Hooks)**:
    -   A custom route `POST /api/analyze` defined in `pb_hooks/main.pb.js` handles the Perplexity API call to ensure the API Key is never exposed to the client.

---

## 4. Data Architecture Specifications

### Entity Design

#### 1. `tools` (Master Cache)
*Stores known SaaS tools and their analyzed features.*

| Column | Type | Access | Description |
| :--- | :--- | :--- | :--- |
| `id` | `text` | System | 15-char unique ID (Auto-generated) |
| `name` | `text` | Public Read | Normalized name (e.g., "Salesforce") |
| `slug` | `text` | Public Read | URL-friendly slug (e.g., "salesforce") |
| `monthly_cost` | `number` | Public Read | Estimated base seat cost |
| `features` | `json` | Public Read | Array: `[{ "name": "CRM", "type": "core" }, ...]` |
| `description` | `text` | Public Read | Short AI summary of the tool |
| `created` | `date` | System | Timestamp |

#### 2. `leads` (User Submissions)
*Stores the audit results and user contact info.*

| Column | Type | Access | Description |
| :--- | :--- | :--- | :--- |
| `id` | `text` | System | 15-char unique ID |
| `email` | `email` | Admin Read | User contact |
| `tool_name` | `text` | Admin Read | The tool they audited |
| `team_size` | `number` | Admin Read | Number of users |
| `kept_features` | `json` | Admin Read | List of features they KEPT |
| `bleed_amount` | `number` | Admin Read | Calculated waste ($) |
| `quote_amount` | `number` | Admin Read | Calculated build cost ($) |

---

## 5. API Contract Specifications

### Standard CRUD (via SDK)

**1. Search for a Tool**
```javascript
const result = await pb.collection('tools').getList(1, 1, {
    filter: `slug = "${slug}"`
});
