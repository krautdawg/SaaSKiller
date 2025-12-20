# feat: German/English Language Toggle (Simplified)

## Overview

Add a simple EN/DE language toggle in the footer. One click switches all UI text and determines email language.

## The Simple Solution

### Architecture

```
localStorage('lang') → 'en' | 'de'
       ↓
  src/lang.js (translations object + t() function)
       ↓
  Components use t('key') for all text
       ↓
  Form submission includes { language: getLang() }
       ↓
  Backend selects email strings based on language
```

**No frameworks. No detection algorithms. Just strings.**

## Implementation

### Step 1: Create Language Module

**File: `src/lang.js`**

```javascript
// Simple i18n - no dependencies needed
const STORAGE_KEY = 'lang';

// Get initial language: stored preference → browser → default
function getInitialLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'de') return stored;
  return navigator.language?.startsWith('de') ? 'de' : 'en';
}

let currentLang = getInitialLang();

export const getLang = () => currentLang;

export const setLang = (lang) => {
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  window.dispatchEvent(new Event('languagechange'));
};

// All translations in one place
const strings = {
  en: {
    // Header
    'header.tagline': 'Stop Renting. Start Owning.',

    // Search
    'search.title': 'Stop Paying SaaS Rent.',
    'search.subtitle': 'Type the SaaS tool you\'re bleeding money on.',
    'search.placeholder': 'e.g., Slack, Notion, Salesforce...',
    'search.button': 'Calculate My Bleed',
    'search.loading.1': 'Connecting to Wrecking Ball...',
    'search.loading.2': 'Scanning Pricing Models...',
    'search.loading.3': 'Identifying Bloat...',
    'search.loading.4': 'Finalizing Audit...',

    // Audit
    'audit.found': (tool) => `We found ${tool}.`,
    'audit.instruction': 'Uncheck the features you NEVER use.',
    'audit.teamSize': 'Team Size',
    'audit.users': 'users',
    'audit.continue': 'Continue to Results',

    // Results
    'results.title': 'Great Choice.',
    'results.savings': (amount) => `You could save $${amount} over the next 3 years.`,
    'results.bleed.title': 'THE 3-YEAR BLEED',
    'results.bleed.note': 'Money gone forever.',
    'results.build.title': 'BUILD IT YOURSELF',
    'results.build.cost': 'Estimated Cost',
    'results.build.savings': 'Total Savings',
    'results.build.roi': 'ROI',
    'results.features.kept': 'FEATURES YOU KEEP',
    'results.features.removed': 'BLOAT YOU CUT',
    'results.features.custom': 'CUSTOM FEATURES ADDED',

    // Form
    'form.title': 'Get Your Audit Report',
    'form.name.label': 'Full Name',
    'form.name.placeholder': 'John Doe',
    'form.email.label': 'Email Address',
    'form.email.placeholder': 'you@company.com',
    'form.submit': 'Get My Sovereign Software Quote',
    'form.submitting': 'Sending...',
    'form.success.title': 'Success!',
    'form.success.message': 'Check your inbox for your personalized audit report.',
    'form.error': 'Something went wrong. Please try again.',

    // CTA
    'cta.kill': 'Kill that SaaS!',
    'cta.startOver': 'Start Over',

    // Footer
    'footer.copyright': '© 2025 SaaSKiller. All rights reserved.',
    'footer.tagline': 'Built with ♥ and Vibe Coding.',

    // Navigation
    'nav.home': 'Home',
    'nav.browse': 'Browse Tools',
    'nav.pricing': 'Pricing'
  },

  de: {
    // Header
    'header.tagline': 'Schluss mit Mieten. Anfangen zu Besitzen.',

    // Search
    'search.title': 'Schluss mit SaaS-Miete.',
    'search.subtitle': 'Gib das SaaS-Tool ein, für das du Geld verschwendest.',
    'search.placeholder': 'z.B. Slack, Notion, Salesforce...',
    'search.button': 'Meine Kosten berechnen',
    'search.loading.1': 'Verbinde mit Wrecking Ball...',
    'search.loading.2': 'Scanne Preismodelle...',
    'search.loading.3': 'Identifiziere Ballast...',
    'search.loading.4': 'Finalisiere Audit...',

    // Audit
    'audit.found': (tool) => `Wir haben ${tool} gefunden.`,
    'audit.instruction': 'Deaktiviere die Funktionen, die du NIE nutzt.',
    'audit.teamSize': 'Teamgröße',
    'audit.users': 'Benutzer',
    'audit.continue': 'Weiter zu den Ergebnissen',

    // Results
    'results.title': 'Gute Wahl.',
    'results.savings': (amount) => `Du könntest ${amount} € über die nächsten 3 Jahre sparen.`,
    'results.bleed.title': 'DER 3-JAHRES-VERLUST',
    'results.bleed.note': 'Geld für immer verloren.',
    'results.build.title': 'SELBST ENTWICKELN',
    'results.build.cost': 'Geschätzte Kosten',
    'results.build.savings': 'Gesamtersparnis',
    'results.build.roi': 'Amortisation',
    'results.features.kept': 'FUNKTIONEN, DIE DU BEHÄLTST',
    'results.features.removed': 'BALLAST, DEN DU STREICHST',
    'results.features.custom': 'EIGENE FUNKTIONEN HINZUGEFÜGT',

    // Form
    'form.title': 'Hol dir deinen Audit-Bericht',
    'form.name.label': 'Vollständiger Name',
    'form.name.placeholder': 'Max Mustermann',
    'form.email.label': 'E-Mail-Adresse',
    'form.email.placeholder': 'du@firma.de',
    'form.submit': 'Mein Software-Angebot erhalten',
    'form.submitting': 'Wird gesendet...',
    'form.success.title': 'Erfolg!',
    'form.success.message': 'Prüfe deinen Posteingang für deinen personalisierten Audit-Bericht.',
    'form.error': 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',

    // CTA
    'cta.kill': 'Dieses SaaS killen!',
    'cta.startOver': 'Neu starten',

    // Footer
    'footer.copyright': '© 2025 SaaSKiller. Alle Rechte vorbehalten.',
    'footer.tagline': 'Entwickelt mit ♥ und Vibe Coding.',

    // Navigation
    'nav.home': 'Startseite',
    'nav.browse': 'Tools durchsuchen',
    'nav.pricing': 'Preise'
  }
};

// Translation function
export const t = (key, ...args) => {
  const value = strings[currentLang][key];
  if (typeof value === 'function') return value(...args);
  return value || key;
};

// Hook for React components that need to re-render on language change
import { useState, useEffect } from 'react';

export const useLang = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1);
    window.addEventListener('languagechange', handler);
    return () => window.removeEventListener('languagechange', handler);
  }, []);

  return { lang: currentLang, setLang, t };
};
```

### Step 2: Create Language Toggle Component

**File: `src/components/LanguageToggle.jsx`**

```jsx
import { useLang } from '../lang';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  const toggle = () => setLang(lang === 'en' ? 'de' : 'en');

  return (
    <button
      onClick={toggle}
      className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
    >
      <span className={lang === 'en' ? 'font-bold text-brand-secondary' : ''}>EN</span>
      {' | '}
      <span className={lang === 'de' ? 'font-bold text-brand-secondary' : ''}>DE</span>
    </button>
  );
}
```

### Step 3: Update Footer in App.jsx

**File: `src/App.jsx` (footer section)**

```jsx
import LanguageToggle from './components/LanguageToggle';
import { useLang } from './lang';

// Inside component:
const { t } = useLang();

// Footer:
<footer className="py-12 text-center text-gray-700 text-sm border-t mt-20 font-sans">
  <p>{t('footer.copyright')}</p>
  <p className="mt-2">{t('footer.tagline')}</p>
  <LanguageToggle />
</footer>
```

### Step 4: Update Components

Replace all hardcoded text with `t()` calls:

```jsx
// Before
<h1>Stop Paying SaaS Rent.</h1>

// After
import { useLang } from '../lang';
const { t } = useLang();
<h1>{t('search.title')}</h1>

// For interpolated strings:
// Before
<p>We found {selectedTool.name}.</p>

// After
<p>{t('audit.found', selectedTool.name)}</p>
```

### Step 5: Update API Call

**File: `src/services/api.js`**

```javascript
import { getLang } from '../lang';

export async function submitAuditReport(auditData) {
  const response = await fetch(`${API_URL}/api/audit-reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...auditData,
      language: getLang()  // Add this
    })
  });
  return response.json();
}
```

### Step 6: Update Backend

**File: `api/routes/auditReports.js`**

Add to Zod schema:
```javascript
language: z.enum(['en', 'de']).default('en')
```

**File: `api/workers/emailWorker.js`**

```javascript
// Email strings by language
const emailStrings = {
  en: {
    subject: (toolName, savings) => `Save $${savings} - Your ${toolName} Audit`,
    greeting: (name) => `Hey ${name},`,
    intro: (toolName) => `We've crunched the numbers on ${toolName}. Here's what your SaaS addiction is costing you:`,
    bleedTitle: 'The 3-Year Bleed',
    bleedNote: 'Money gone forever.',
    buildTitle: 'Build It Yourself',
    featuresKept: 'Features You Keep',
    featuresRemoved: 'Bloat You Cut',
    cta: 'Stop Renting. Start Owning.',
    footer: 'Generated by SaaSKiller'
  },
  de: {
    subject: (toolName, savings) => `Spare ${savings} € - Dein ${toolName} Audit`,
    greeting: (name) => `Hallo ${name},`,
    intro: (toolName) => `Wir haben die Zahlen für ${toolName} analysiert. So viel kostet dich deine SaaS-Abhängigkeit:`,
    bleedTitle: 'Der 3-Jahres-Verlust',
    bleedNote: 'Geld für immer verloren.',
    buildTitle: 'Selbst entwickeln',
    featuresKept: 'Funktionen, die du behältst',
    featuresRemoved: 'Ballast, den du streichst',
    cta: 'Schluss mit Mieten. Anfangen zu Besitzen.',
    footer: 'Erstellt von SaaSKiller'
  }
};

// In processEmailJob:
const strings = emailStrings[auditData.language || 'en'];
```

**File: `api/templates/email/user-audit-report.hbs`**

Update template to use passed strings:
```handlebars
<h1>{{strings.greeting name}}</h1>
<p>{{strings.intro toolName}}</p>
<div class="bleed-label">{{strings.bleedTitle}}</div>
<!-- etc -->
```

**File: `api/services/pdfService.js`**

Same pattern - pass strings object based on language.

## Files to Create/Modify

| Action | File | Lines |
|--------|------|-------|
| CREATE | `src/lang.js` | ~120 |
| CREATE | `src/components/LanguageToggle.jsx` | ~20 |
| MODIFY | `src/App.jsx` | +10 |
| MODIFY | `src/components/*.jsx` (15 files) | Find-replace |
| MODIFY | `api/routes/auditReports.js` | +1 |
| MODIFY | `api/workers/emailWorker.js` | +30 |
| MODIFY | `api/templates/email/user-audit-report.hbs` | Variable swap |
| MODIFY | `api/services/pdfService.js` | +30 |

## Acceptance Criteria

- [ ] Toggle visible in footer below tagline
- [ ] Click toggles between EN/DE instantly
- [ ] Language persists on refresh
- [ ] All UI text switches
- [ ] Email arrives in selected language
- [ ] PDF matches email language

## What We're NOT Doing

- ❌ No npm dependencies for i18n
- ❌ No separate JSON files
- ❌ No duplicate email templates
- ❌ No language detection library
- ❌ No namespace support
- ❌ No TypeScript types (170 keys, you'll notice)
- ❌ No "phases" - just do it

## Time Estimate

- Setup lang.js: 30 min
- Create toggle: 15 min
- Update components: 2 hours (find-replace)
- Update backend: 30 min
- Test: 30 min

**Total: ~4 hours**

---

*Simplified after review by DHH, Kieran, and Simplicity reviewers*
*"The best code is no code. The second best is boring code that does exactly what it needs to."*
