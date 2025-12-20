// Simple i18n - no dependencies needed
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lang';

// Get initial language: stored preference → browser → default
function getInitialLang() {
  if (typeof window === 'undefined') return 'en';
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
    // Header/Hero
    'hero.title.line1': 'Stop Renting.',
    'hero.title.line2': 'Start Owning.',
    'hero.subtitle': "You're paying for 80% bloat. We build you a",
    'hero.subtitle.highlight': 'custom tool',
    'hero.subtitle.end': 'with only the 20% you use. One-time fee. Yours forever.',

    // Search
    'search.placeholder': 'What SaaS are we killing today? (e.g., Salesforce)',
    'search.button': 'Kill It',
    'search.auditing': (tool) => `Auditing ${tool}...`,
    'search.loading.1': 'Connecting to Wrecking Ball...',
    'search.loading.2': 'Scanning Pricing Models...',
    'search.loading.3': 'Identifying Bloat...',
    'search.loading.4': 'Finalizing Audit...',

    // Error states
    'error.title': 'Oops!',
    'error.retry': 'Retry Connection',
    'error.enterManually': 'Enter Manually',
    'error.tryDifferent': 'Try a Different Tool',

    // Manual Entry
    'manual.title': 'Manual Entry',
    'manual.toolName': 'Tool Name',
    'manual.monthlyCost': 'Monthly Cost (USD)',
    'manual.features': 'Features (one per line)',
    'manual.featuresHint': 'Enter each feature on a new line',
    'manual.continue': 'Continue to Audit',
    'manual.cancel': 'Cancel',
    'manual.validation.nameRequired': 'Tool name is required',
    'manual.validation.nameLength': (max) => `Name must be ${max} characters or less`,
    'manual.validation.costRequired': 'Monthly cost is required',
    'manual.validation.costPositive': 'Cost must be a positive number',
    'manual.validation.costMax': (max) => `Cost must be less than $${max.toLocaleString()}`,
    'manual.validation.featuresRequired': 'At least one feature is required',
    'manual.validation.featuresMax': 'Maximum 50 features allowed',

    // Audit
    'audit.found': (tool) => `We found ${tool}.`,
    'audit.instruction': 'Uncheck the features you NEVER use.',
    'audit.teamSize': 'Team Size',
    'audit.users': 'users',
    'audit.coreFeatures': 'Core Features',
    'audit.bloatFeatures': 'Bloat Features',
    'audit.addCustom': 'Add Custom Feature',
    'audit.customPlaceholder': 'e.g., Custom CRM integration',
    'audit.analyzing': 'Analyzing...',
    'audit.add': 'Add',

    // Bleed Calculator
    'bleed.title': 'THE 3-YEAR BLEED',
    'bleed.teamSize': 'Team Size (Users)',
    'bleed.subscriptionPlan': 'Subscription Plan',
    'bleed.pricePerUser': 'Enter price per user / month',
    'bleed.priceMissingHint': "We couldn't find pricing for this tier. Add it to keep the bleed accurate.",
    'bleed.totalRent': (name) => `Total Rent Paid to ${name}`,
    'bleed.note': 'Money gone forever.',
    'bleed.tooMuch': 'Way too much to count.',
    'bleed.freeTier': 'FREE tier - Limited features available',
    'bleed.build.title': 'BUILD IT YOURSELF',
    'bleed.build.cost': 'Estimated Cost',
    'bleed.build.savings': 'Total Savings',
    'bleed.build.roi': 'ROI',
    'bleed.build.months': 'months',

    // Quote Generator
    'quote.title': 'SaaSKiller Solution',
    'quote.oneTime': 'One-Time Fee',
    'quote.includes': (active, custom) => `Includes custom build, ${active} features${custom > 0 ? `, plus ${custom} custom AI add-ons` : ''}, and data ownership.`,
    'quote.disclaimer': '* Estimate based on realistic development time. Final price subject to scoping call. Includes 1st month maintenance.',
    'quote.cta': 'Kill the Rent. Own the Code.',
    'quote.features.kept': 'FEATURES YOU KEEP',
    'quote.features.removed': 'BLOAT YOU CUT',
    'quote.features.custom': 'CUSTOM FEATURES',
    'quote.continue': 'Continue to Results',

    // Audit Checklist
    'audit.coreTitle': 'Core Features',
    'audit.bloatyTitle': 'Bloaty Features',
    'audit.bloatKilled': (pct) => `${pct}% of features that are bloat killed`,
    'audit.showMore': (count, type) => `Show ${count} more ${type} features`,
    'audit.showLess': 'Show less',
    'audit.customTitle': 'Add Custom "Vibe" Features',
    'audit.customInputPlaceholder': '+ Add custom AI workflow...',
    'audit.selectAll': '[+ All]',
    'audit.deselectAll': '[- All]',
    'audit.features': 'features',
    'audit.bloatBadge': 'Bloat',
    'audit.estimateLabel': '(est.)',

    // Results
    'results.title': 'Great Choice.',
    'results.savings': (amount) => `You could save $${amount} over the next 3 years.`,
    'results.form.title': 'Where should we send your official quote?',
    'results.form.name': 'Full Name',
    'results.form.namePlaceholder': 'John Doe',
    'results.form.email': 'Email Address',
    'results.form.emailPlaceholder': 'you@company.com',
    'results.form.submit': 'Get My Sovereign Software Quote',
    'results.form.submitting': 'Sending...',
    'results.form.note': 'No spam. Just a PDF with specs and a contract.',
    'results.success.title': 'Report Sent!',
    'results.success.message': 'Check your email for your detailed audit report PDF.',
    'results.backToAudit': 'Back to Audit',

    // Navigation
    'nav.auditTool': 'Audit Tool',
    'nav.browse': 'Browse Tools',
    'nav.pricing': 'Pricing',
    'nav.getStarted': 'Get Started',

    // CTA
    'cta.kill': 'Kill that SaaS!',

    // Footer
    'footer.copyright': '© 2025 SaaSKiller. All rights reserved.',
    'footer.tagline': 'Built with ♥ and Vibe Coding.',

    // Tool Browser
    'browser.title': 'Browse SaaS Tools',
    'browser.subtitle': 'Explore our database of analyzed SaaS tools and their alternatives.',
    'browser.search': 'Search tools...',
    'browser.all': 'All',
    'browser.noResults': 'No tools found matching your criteria.',
    'browser.perMonth': '/month',
    'browser.features': 'features',
    'browser.viewDetails': 'View Details',

    // Tool Detail
    'detail.backToBrowse': 'Back to Browse',
    'detail.perMonth': '/month',
    'detail.features': 'Features',
    'detail.core': 'Core',
    'detail.bloat': 'Bloat',
    'detail.auditThis': 'Audit This Tool',

    // Pricing Page
    'pricing.title': 'Simple Pricing',
    'pricing.subtitle': 'One-time fee. No subscriptions. Yours forever.',
    'pricing.starter.name': 'Starter',
    'pricing.starter.desc': 'Perfect for small teams replacing a single SaaS tool.',
    'pricing.starter.price': '$4,999',
    'pricing.starter.features': ['Up to 5 core features', 'Basic integrations', '30-day support', 'Source code ownership'],
    'pricing.pro.name': 'Professional',
    'pricing.pro.desc': 'For growing teams needing more customization.',
    'pricing.pro.price': '$9,999',
    'pricing.pro.features': ['Up to 15 core features', 'Advanced integrations', '90-day support', 'Source code ownership', 'Custom branding', 'Priority development'],
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.desc': 'Full-scale SaaS replacement with premium support.',
    'pricing.enterprise.price': 'Custom',
    'pricing.enterprise.features': ['Unlimited features', 'Enterprise integrations', '1-year support', 'Source code ownership', 'Custom branding', 'Dedicated team', 'SLA guarantee'],
    'pricing.cta': 'Get Started',
    'pricing.popular': 'Most Popular'
  },

  de: {
    // Header/Hero
    'hero.title.line1': 'Schluss mit Mieten.',
    'hero.title.line2': 'Anfangen zu Besitzen.',
    'hero.subtitle': 'Du zahlst für 80% Ballast. Wir bauen dir ein',
    'hero.subtitle.highlight': 'individuelles Tool',
    'hero.subtitle.end': 'mit nur den 20%, die du nutzt. Einmalzahlung. Für immer deins.',

    // Search
    'search.placeholder': 'Welches SaaS killen wir heute? (z.B. Salesforce)',
    'search.button': 'Killen',
    'search.auditing': (tool) => `Analysiere ${tool}...`,
    'search.loading.1': 'Verbinde mit Wrecking Ball...',
    'search.loading.2': 'Scanne Preismodelle...',
    'search.loading.3': 'Identifiziere Ballast...',
    'search.loading.4': 'Finalisiere Audit...',

    // Error states
    'error.title': 'Ups!',
    'error.retry': 'Erneut versuchen',
    'error.enterManually': 'Manuell eingeben',
    'error.tryDifferent': 'Anderes Tool versuchen',

    // Manual Entry
    'manual.title': 'Manuelle Eingabe',
    'manual.toolName': 'Tool-Name',
    'manual.monthlyCost': 'Monatliche Kosten (EUR)',
    'manual.features': 'Funktionen (eine pro Zeile)',
    'manual.featuresHint': 'Gib jede Funktion in einer neuen Zeile ein',
    'manual.continue': 'Weiter zum Audit',
    'manual.cancel': 'Abbrechen',
    'manual.validation.nameRequired': 'Tool-Name ist erforderlich',
    'manual.validation.nameLength': (max) => `Name darf maximal ${max} Zeichen haben`,
    'manual.validation.costRequired': 'Monatliche Kosten sind erforderlich',
    'manual.validation.costPositive': 'Kosten müssen positiv sein',
    'manual.validation.costMax': (max) => `Kosten müssen unter ${max.toLocaleString()} € liegen`,
    'manual.validation.featuresRequired': 'Mindestens eine Funktion erforderlich',
    'manual.validation.featuresMax': 'Maximal 50 Funktionen erlaubt',

    // Audit
    'audit.found': (tool) => `Wir haben ${tool} gefunden.`,
    'audit.instruction': 'Deaktiviere die Funktionen, die du NIE nutzt.',
    'audit.teamSize': 'Teamgröße',
    'audit.users': 'Benutzer',
    'audit.coreFeatures': 'Kernfunktionen',
    'audit.bloatFeatures': 'Ballast-Funktionen',
    'audit.addCustom': 'Eigene Funktion hinzufügen',
    'audit.customPlaceholder': 'z.B. Individuelle CRM-Integration',
    'audit.analyzing': 'Analysiere...',
    'audit.add': 'Hinzufügen',

    // Bleed Calculator
    'bleed.title': 'DER 3-JAHRES-VERLUST',
    'bleed.teamSize': 'Teamgröße (Benutzer)',
    'bleed.subscriptionPlan': 'Abo-Tarif',
    'bleed.pricePerUser': 'Preis pro Benutzer / Monat eingeben',
    'bleed.priceMissingHint': 'Wir konnten keinen Preis für diesen Tarif finden. Gib ihn ein, um den Verlust korrekt zu berechnen.',
    'bleed.totalRent': (name) => `Gesamte Miete an ${name}`,
    'bleed.note': 'Geld für immer verloren.',
    'bleed.tooMuch': 'Viel zu viel zum Zählen.',
    'bleed.freeTier': 'KOSTENLOS - Eingeschränkte Funktionen',
    'bleed.build.title': 'SELBST ENTWICKELN',
    'bleed.build.cost': 'Geschätzte Kosten',
    'bleed.build.savings': 'Gesamtersparnis',
    'bleed.build.roi': 'Amortisation',
    'bleed.build.months': 'Monate',

    // Quote Generator
    'quote.title': 'SaaSKiller-Lösung',
    'quote.oneTime': 'Einmalzahlung',
    'quote.includes': (active, custom) => `Inklusive individuellem Build, ${active} Funktionen${custom > 0 ? `, plus ${custom} individuelle KI-Add-ons` : ''} und Datenhoheit.`,
    'quote.disclaimer': '* Schätzung basierend auf realistischer Entwicklungszeit. Endpreis nach Scoping-Gespräch. Inkl. 1. Monat Wartung.',
    'quote.cta': 'Schluss mit Miete. Besitze den Code.',
    'quote.features.kept': 'FUNKTIONEN, DIE DU BEHÄLTST',
    'quote.features.removed': 'BALLAST, DEN DU STREICHST',
    'quote.features.custom': 'EIGENE FUNKTIONEN',
    'quote.continue': 'Weiter zu den Ergebnissen',

    // Audit Checklist
    'audit.coreTitle': 'Kernfunktionen',
    'audit.bloatyTitle': 'Ballast-Funktionen',
    'audit.bloatKilled': (pct) => `${pct}% der Ballast-Funktionen entfernt`,
    'audit.showMore': (count, type) => `${count} weitere ${type}-Funktionen anzeigen`,
    'audit.showLess': 'Weniger anzeigen',
    'audit.customTitle': 'Eigene "Vibe"-Funktionen hinzufügen',
    'audit.customInputPlaceholder': '+ Eigenen KI-Workflow hinzufügen...',
    'audit.selectAll': '[+ Alle]',
    'audit.deselectAll': '[- Alle]',
    'audit.features': 'Funktionen',
    'audit.bloatBadge': 'Ballast',
    'audit.estimateLabel': '(gesch.)',

    // Results
    'results.title': 'Gute Wahl.',
    'results.savings': (amount) => `Du könntest ${amount} € über die nächsten 3 Jahre sparen.`,
    'results.form.title': 'Wohin sollen wir dein offizielles Angebot senden?',
    'results.form.name': 'Vollständiger Name',
    'results.form.namePlaceholder': 'Max Mustermann',
    'results.form.email': 'E-Mail-Adresse',
    'results.form.emailPlaceholder': 'du@firma.de',
    'results.form.submit': 'Mein Software-Angebot erhalten',
    'results.form.submitting': 'Wird gesendet...',
    'results.form.note': 'Kein Spam. Nur ein PDF mit Spezifikationen und Vertrag.',
    'results.success.title': 'Bericht gesendet!',
    'results.success.message': 'Prüfe dein Postfach für deinen detaillierten Audit-Bericht.',
    'results.backToAudit': 'Zurück zum Audit',

    // Navigation
    'nav.auditTool': 'Audit-Tool',
    'nav.browse': 'Tools durchsuchen',
    'nav.pricing': 'Preise',
    'nav.getStarted': 'Loslegen',

    // CTA
    'cta.kill': 'Dieses SaaS killen!',

    // Footer
    'footer.copyright': '© 2025 SaaSKiller. Alle Rechte vorbehalten.',
    'footer.tagline': 'Entwickelt mit ♥ und Vibe Coding.',

    // Tool Browser
    'browser.title': 'SaaS-Tools durchsuchen',
    'browser.subtitle': 'Erkunde unsere Datenbank analysierter SaaS-Tools und ihrer Alternativen.',
    'browser.search': 'Tools suchen...',
    'browser.all': 'Alle',
    'browser.noResults': 'Keine Tools gefunden, die deinen Kriterien entsprechen.',
    'browser.perMonth': '/Monat',
    'browser.features': 'Funktionen',
    'browser.viewDetails': 'Details anzeigen',

    // Tool Detail
    'detail.backToBrowse': 'Zurück zur Übersicht',
    'detail.perMonth': '/Monat',
    'detail.features': 'Funktionen',
    'detail.core': 'Kern',
    'detail.bloat': 'Ballast',
    'detail.auditThis': 'Dieses Tool auditieren',

    // Pricing Page
    'pricing.title': 'Einfache Preise',
    'pricing.subtitle': 'Einmalzahlung. Keine Abos. Für immer deins.',
    'pricing.starter.name': 'Starter',
    'pricing.starter.desc': 'Perfekt für kleine Teams, die ein einzelnes SaaS-Tool ersetzen.',
    'pricing.starter.price': '4.499 €',
    'pricing.starter.features': ['Bis zu 5 Kernfunktionen', 'Basis-Integrationen', '30 Tage Support', 'Quellcode-Eigentum'],
    'pricing.pro.name': 'Professional',
    'pricing.pro.desc': 'Für wachsende Teams mit mehr Anpassungsbedarf.',
    'pricing.pro.price': '8.999 €',
    'pricing.pro.features': ['Bis zu 15 Kernfunktionen', 'Erweiterte Integrationen', '90 Tage Support', 'Quellcode-Eigentum', 'Individuelles Branding', 'Prioritäts-Entwicklung'],
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.desc': 'Vollständiger SaaS-Ersatz mit Premium-Support.',
    'pricing.enterprise.price': 'Individuell',
    'pricing.enterprise.features': ['Unbegrenzte Funktionen', 'Enterprise-Integrationen', '1 Jahr Support', 'Quellcode-Eigentum', 'Individuelles Branding', 'Dediziertes Team', 'SLA-Garantie'],
    'pricing.cta': 'Loslegen',
    'pricing.popular': 'Beliebteste'
  }
};

// Translation function
export const t = (key, ...args) => {
  const value = strings[currentLang]?.[key];
  if (typeof value === 'function') return value(...args);
  return value || strings['en']?.[key] || key;
};

// Hook for React components that need to re-render on language change
export const useLang = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1);
    window.addEventListener('languagechange', handler);
    return () => window.removeEventListener('languagechange', handler);
  }, []);

  return { lang: currentLang, setLang, t };
};

// Export for backend use
export const getStrings = (lang = 'en') => strings[lang] || strings['en'];
