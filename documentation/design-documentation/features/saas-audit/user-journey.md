---
title: SaaS Audit Feature Design
description: Design specifications for the core SaaS auditing flow (Search, Analysis, Bleed Calculation).
feature: saas-audit
last-updated: 2025-12-10
status: approved
---

# SaaS Audit Feature

## Overview
The SaaS Audit is the core value loop of SaaSKiller. It allows users to search for their current tool, identify unused features ("bloat"), and calculate their financial waste ("bleed").

## User Journey

### 1. The "Hit List" Search (Entry)
- **Goal**: User identifies the tool they want to replace.
- **Interaction**:
  - Large, high-contrast search bar in the Hero section.
  - "Wrecking Ball" animation triggers on focus.
  - Predictive type-ahead (fuzzy matching).
- **Success**: User selects a tool from the dropdown.

### 2. The Analysis (Auditor Agent)
- **Goal**: System breaks down the tool into features.
- **State**: "Scanning..." loading state (crucial for perceived value).
- **Output**: A checklist of features categorized by Core vs. Bloat.

### 3. The "Kill" (Checklist)
- **Goal**: User unchecks features they *don't* use.
- **Feedback**:
  - Visual "Waste Counter" increases as items are unchecked.
  - Satisfying "strike-through" or "crumple" animation on unchecked items.

### 4. The Bleed (Result)
- **Goal**: Shock the user with the cost of inaction.
- **Display**:
  - **"SaaS Bleed"**: Large, Red text. Formula: `(Monthly Cost * Users * 36 Months)`.
  - **"SaaSKiller Build"**: Comparatively small, fixed price range (e.g., $3,000).

## Visual Specs
- **Search Input**: Height 64px, Font 24px, Border 3px solid #0A0A0A.
- **Bleed Text**: H1 size (64px), Color `#D32F2F`, Font Weight 800.
- **Waste Counter**: Circular progress indicator using Secondary color `#1EA897`.

## Accessibility
- Ensure the "Scanning" state is announced to screen readers.
- All checklist items must be clearly labeled `<label>` elements.
- Red text for "Bleed" must be supported by an icon or text label indicating "Loss" for color-blind users.
