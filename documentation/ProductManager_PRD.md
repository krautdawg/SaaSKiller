# Product Requirements Document: SaaS Killer MVP

**File Path:** 'documentation/ProductManager_PRD.md'
**Date:** December 10, 2025
**Author:** Alex Chen (Senior Product Manager)
**Status:** Draft / Ready for Review
---

## 1. Problem Analysis & Validation

### Problem Analysis
**What specific problem does this solve?**
Small and Medium Businesses (SMBs, 1-25 employees) are currently suffering from "SaaS Fatigue." They subscribe to enterprise-grade tools (Monday.com, HubSpot, Salesforce) but typically utilize less than 20% of the available features. This results in:
1.  **Financial Waste:** Paying high monthly seat costs for unused functionality.
2.  **Complexity Bloat:** Teams are overwhelmed by complex UIs they don't need.
3.  **Data Lock-in:** Renting their own data with no ownership.

**Who experiences this problem most acutely?**
Non-tech-savvy small business owners (e.g., mechanic shops, boutique agencies, local service providers) who feel forced to use "industry standard" tools because they don't know alternatives exist.

### Solution Validation
**Why is this the right solution?**
"Vibe Coding as a Service" (VCaaS) offers a "Sovereign Software" alternative. By building a custom, owned tool (One-time build + Low maintenance) that replicates *only* the needed features, we offer a superior value proposition: drastically lower Total Cost of Ownership (TCO) and a tailored user experience.

**What alternatives exist?**
* **Status Quo:** Continuing to pay for bloated SaaS (High OpEx).
* **No-Code Tools (Airtable/Notion):** Requires time and skill the user lacks.
* **Traditional Custom Dev:** Too expensive ($50k+) for SMBs.

### Impact Assessment
**How will we measure success?**
* **Primary Metric:** Lead Velocity (Number of "Spec Sheets" generated and emails captured).
* **Secondary Metric:** "Quote Acceptance Rate" (Percentage of users who book a call after seeing the estimated price).
* **User Outcome:** Users receive a clear visualization of their financial waste and a viable path to ownership.

---

## 2. Executive Summary

-   **Elevator Pitch:** A "cheeky" acquisition tool that audits a company's SaaS subscriptions, proves they are wasting money on unused features, and offers to build a custom, sovereign alternative for a one-time fee.
-   **Problem Statement:** SMBs are bleeding money on "Rental Software" full of bloat they never touch.
-   **Target Audience:** SMB owners (1-25 employees) currently paying $200-$2,000/month for SaaS, who value cost-savings and simplicity over enterprise scalability.
-   **Unique Selling Proposition:** "Stop Renting. Start Owning." We use AI to identify exactly what you use, cut the rest, and build a custom tool that you own forever.
-   **Success Metrics:**
    -   Visitor-to-Lead Conversion Rate (>5%).
    -   Average "SaaS Bleed" identified per user (Target: >$5k/year).

---

## 3. Feature Specifications

### Feature 1: The "Hit List" Search (Input)
-   **User Story:** As a business owner, I want to easily identify the software I want to replace so that I can see if there is a better alternative.
-   **Acceptance Criteria:**
    -   Given a text input, when the user types a SaaS name (even with typos like "Munday"), then the system identifies the correct tool using fuzzy matching against the `tools_master_list` DB.
    -   If the tool exists in DB, retrieve data instantly (Cache Hit).
    -   If the tool is new/niche, trigger the "SaaS Auditor Agent" (Feature 2).
-   **UX Considerations:** Simple, high-contrast search bar on the landing page. "Wrecking Ball" animation during search.
-   **Priority:** P0 (Critical Path).

### Feature 2: The SaaS Auditor Agent (Perplexity Integration)
-   **User Story:** As a user, I want to see a list of features for my specific software so I can indicate what I actually use.
-   **Acceptance Criteria:**
    -   **Context:** System detects a tool not in the local DB.
    -   **Action:** System triggers an LLM (Perplexity) with a system prompt to extract:
        1.  Correct Name.
        2.  Standard Monthly Cost (Anchor Price).
        3.  List of Features (categorized as "Core" vs. "Bloat").
    -   **Outcome:** Returns valid JSON to the frontend and simultaneously writes a new row to `tools_master_list` for future caching.
    -   **Edge Case:** If LLM fails or returns low confidence, show a "Manual Entry" fallback mode.
-   **Priority:** P0.

### Feature 3: The "Waste Audit" Checklist
-   **User Story:** As a user, I want to uncheck the features I don't use so that I can see how much "bloat" I am paying for.
-   **Acceptance Criteria:**
    -   Display features as a checklist.
    -   As users uncheck items (specifically "Bloat" category items), update a visual "Waste Counter" (e.g., "You are paying for 80% features you don't use").
    -   Includes a dynamic input field at the bottom: *"+ Add a feature we missed"*.
-   **UX Considerations:** Satisfaction mechanics (sound or visual effect) when "killing" a bloat feature.
-   **Priority:** P0.

### Feature 4: The "Vibe" Builder (Add-ons)
-   **User Story:** As a user, I want to request custom AI features (like email schedulers) that my current SaaS doesn't offer, so my new tool is better, not just cheaper.
-   **Acceptance Criteria:**
    -   Provide a selection of "Vibe Modules" (e.g., AI Agents, Custom Workflows).
    -   Allow free-text input for "Wildcard" requests.
    -   Tag these additions as "Custom" in the final data payload.
-   **Priority:** P1.

### Feature 5: The "Bleed" Calculator & Comparison
-   **User Story:** As a user, I want to see the long-term cost difference between staying and switching, so I can justify the decision.
-   **Acceptance Criteria:**
    -   Input: Number of Users (Slider/Input).
    -   **Calculation:** `(SaaS Monthly Cost * Users * 36 Months)`.
    -   **Display:** Show the cumulative cost (The "Bleed") in Red.
-   **Priority:** P0.

### Feature 6: The Dynamic Quote Generator
-   **User Story:** As a user, I want a realistic price estimate for my custom build so I can decide if I have the budget to proceed.
-   **Pricing Logic (The Black Box):**
    -   **Base Floor:** $2,800 (Setup, Auth, DB, Hosting Config).
    -   **Feature Adder:** +$100 per "Core" feature selected.
    -   **Custom Adder:** +$500 per "Wildcard/AI" feature added.
    -   **Rule:** Final Estimate MUST be `>= $3,000`.
-   **Acceptance Criteria:**
    -   Display the price as an **Estimate Range** (e.g., "$3,100 – $3,600").
    -   Display alongside the "SaaS Bleed" figure for ROI context.
    -   Disclaimer text: *"Final price subject to scoping call. Includes 1st month maintenance."*
-   **Priority:** P0.

---

## 4. Requirements Documentation

### 4.1 Functional Requirements
1.  **Database Logic (Cache-First):**
    -   Check `tools_master_list` via vector/fuzzy search first.
    -   If null, call External LLM API.
    -   On successful External return, Write-Back to `tools_master_list`.
2.  **Pricing Algorithm:**
    -   Implement the `Max(3000, Base + Features)` logic in the backend.
3.  **Lead Capture:**
    -   Store final payload (User Contact + Spec Sheet + Quoted Range) in CRM.

### 4.2 Non-Functional Requirements
1.  **Performance:**
    -   Cache Hit Search Results: < 200ms.
    -   LLM Fallback Search Results: < 10 seconds (Must use "Scanning..." loading state).
2.  **Scalability:**
    -   Database must handle dynamic schema updates as new tools are added.
3.  **Security:**
    -   Input sanitization on the "Search" field.

### 4.3 User Experience Requirements
-   **Tone:** "Cheeky," "Anti-Establishment," "Retro-Modern" (Postble.com asthetics).
-   **Visuals:** Use the "Wrecking Ball" motif for the Calculate/Submit actions.
-   **Pricing Reveal:** The price should feel like a "solution" to the problem of the SaaS Bleed cost (visual hierarchy matters).

---

## 5. Critical Questions Checklist

-   [x] **Are there existing solutions we're improving upon?** Yes, generic "SaaS Calculators" exist, but none combine "Waste Audit" with a "Custom Build" offer.
-   [x] **What's the minimum viable version?** A wizard that identifies features, calculates bleed, and provides a >$3k estimate.
-   [x] **What are the potential risks?** Users might view $3k as high if not anchored correctly. *Mitigation:* Ensure the "SaaS Bleed" (e.g., $15k) is displayed FIRST and LARGER.
-   [x] **Have we considered platform-specific requirements?** Mobile-responsive output.

---
---
