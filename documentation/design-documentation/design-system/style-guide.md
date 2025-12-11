---
title: SaaSKiller Style Guide
description: Complete visual design system for SaaSKiller, adapted from Postable principles with custom branding.
last-updated: 2025-12-10
version: 1.0.0
status: approved
---

# SaaSKiller Style Guide

## Brand Identity

### Brand Essence
SaaSKiller is the "Anti-Establishment" solution to SaaS fatigue. We are cheeky, bold, and direct. We prioritize clarity and financial empowerment for small business owners.

**Tagline:** "Stop Renting. Start Owning."

**Core Values:**
- **Sovereignty:** You own your software.
- **Simplicity:** No bloat, just what you need.
- **Transparency:** Clear costs, clear savings.

---

## Color Palette

### Primary Colors

**Desaturated Yellow (Brand Primary)**
- Hex: `#E8D619`
- Usage: Brand identity, primary backgrounds for high-impact areas, highlights.

**Deep Teal (Secondary)**
- Hex: `#1EA897`
- Usage: Secondary elements, illustrations, success states (when combined with semantic meaning), heavy headers.

**Red-Orange Wrecking Ball (Accent)**
- Hex: `#FF4A3A`
- Usage: **Primary Call-to-Action (CTA)**, "Kill" actions, high-priority highlights.

### Neutral & Semantic

**Surface / Background**
- Hex: `#F9FAF9`
- Usage: Page background, cards.

**On-Primary Text**
- Hex: `#0A0A0A`
- Usage: Primary text color for maximum contrast.

**Error / Danger**
- Hex: `#D32F2F`
- Usage: Error messages, critical warnings, "Bleed" calculation visuals.

---

## Typography

### Font Strategy
Clean, modern sans-serif that balances the "cheeky" brand voice with readability.
*Font Stack Suggestion:* `Inter`, `DM Sans`, or system sans-serif.

### Headings

**H1 - Hero Heading**
- Size: 48-64px (Desktop)
- Weight: 700 (Bold)
- Color: `#0A0A0A`
- Line-height: 1.1

**H2 - Section Headers**
- Size: 36-42px
- Weight: 600 (SemiBold)
- Color: `#1EA897` (Deep Teal) or `#0A0A0A`
- Line-height: 1.25

**H3 - Subsections**
- Size: 24-32px
- Weight: 600
- Color: `#0A0A0A`

**H4 - Card Titles**
- Size: 18-24px
- Weight: 600
- Color: `#0A0A0A`

**H5 - Labels / Small Headers**
- Size: 14-16px
- Weight: 600
- Uppercase, tracking +0.5px
- Color: `#1EA897` (Deep Teal)

### Body Text

**Body Large**
- Size: 18px
- Weight: 400
- Line-height: 1.6
- Color: `#0A0A0A`

**Body Standard**
- Size: 16px
- Weight: 400
- Line-height: 1.5
- Color: `#0A0A0A`

---

## UI Components

### Buttons

**Primary CTA ("Wrecking Ball")**
- Background: `#FF4A3A` (Red-Orange)
- Text: `#F9FAF9` (White/Off-white)
- Border Radius: 8px
- Padding: 16px 32px
- Font Weight: 700
- Hover: Darken 10%, Transform Y -2px, Shadow increase.

**Secondary Button**
- Background: `#E8D619` (Yellow)
- Text: `#0A0A0A`
- Border Radius: 8px
- Padding: 12px 24px
- Font Weight: 600
- Hover: Brighten 10%.

**Ghost/Outline Button**
- Background: Transparent
- Border: 2px solid `#1EA897`
- Text: `#1EA897`
- Hover: Background `#1EA897` (10% opacity).

### Inputs

**Search Bar ("Hit List")**
- Background: `#FFFFFF`
- Border: 2px solid `#0A0A0A`
- Radius: 8px
- Height: 56px
- Font Size: 18px
- Focus: Border Color `#1EA897`, Shadow `0 0 0 4px rgba(30, 168, 151, 0.2)`

### Cards

**Standard Card**
- Background: `#FFFFFF`
- Border: 1px solid `#E0E0E0` (or none if shadowed)
- Shadow: `0 4px 6px rgba(0,0,0,0.05)`
- Radius: 12px
- Padding: 24px

**"Bleed" Card (Highlight)**
- Background: `#FFF0F0`
- Border: 2px solid `#FF4A3A`
- Radius: 12px

---

## Spacing & Layout

**Grid System**
- Max Width: 1200px
- Columns: 12
- Gap: 24px

**Spacing Scale (Base 4px)**
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px
- 3XL: 64px

---

## Animation

**"Wrecking Ball" Motif**
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` (Spring-like)
- Transitions: 0.3s ease-out

---

## Accessibility
- Ensure `#E8D619` (Yellow) is used with `#0A0A0A` text for 7:1+ contrast.
- `#FF4A3A` on `#F9FAF9` is approx 3.9:1 (Large text preferred) or 4.5:1. *Adjustment: Ensure White text on Red-Orange is legible, or use Dark Text if needed. Checker confirms White on #FF4A3A is ~3.1:1 (Fail AA small). Recommending Dark Text (#0A0A0A) on Orange buttons if text is small, or Bold Large Text for White.*
- *Correction:* For this style guide, we will use Dark Text on the Yellow buttons (`#E8D619`) and White text on the Teal (`#1EA897`). For the Red-Orange (`#FF4A3A`), we recommend using `#0A0A0A` (Black) text or Bold White text if large enough, but strictly sticking to high contrast for critical actions.
