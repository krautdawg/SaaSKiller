import { useLang } from '../lang';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  const toggle = () => setLang(lang === 'en' ? 'de' : 'en');

  return (
    <button
      onClick={toggle}
      className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 rounded px-2 py-1"
      aria-label={lang === 'en' ? 'Switch to German' : 'Auf Englisch wechseln'}
    >
      <span className={lang === 'en' ? 'font-bold text-brand-secondary' : ''}>EN</span>
      {' | '}
      <span className={lang === 'de' ? 'font-bold text-brand-secondary' : ''}>DE</span>
    </button>
  );
}
