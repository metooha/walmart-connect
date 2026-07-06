import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

const LANGUAGES = [
  {
    code: 'en',
    label: 'English',
    shortLabel: 'EN',
    flag: 'https://api.builder.io/api/v1/image/assets/TEMP/661ed68d829245d8b5eedb4f8f7cdd5746205469?width=40',
  },
  {
    code: 'es',
    label: 'Español',
    shortLabel: 'ES',
    flag: 'https://flagcdn.com/w40/es.png',
  },
  {
    code: 'fr',
    label: 'Français',
    shortLabel: 'FR',
    flag: 'https://flagcdn.com/w40/fr.png',
  },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) ?? LANGUAGES[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-0.5 px-1 py-1 rounded-full border border-[var(--ld-semantic-color-border-disabled,#C2C4C8)] bg-white hover:bg-gray-50 transition-colors"
        aria-label="Change language / market"
      >
        <img
          src={currentLang.flag}
          alt={currentLang.label}
          className="w-5 h-5 rounded-full object-cover"
        />
        {/* Caret down */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
          <path
            d="M7.62372 10.3293C7.71866 10.4378 7.85583 10.5 8.00001 10.5C8.14419 10.5 8.28135 10.4378 8.3763 10.3293L11.8763 6.32925C12.0055 6.18161 12.0364 5.97205 11.9553 5.79339C11.8743 5.61474 11.6962 5.5 11.5 5.5H4.50001C4.30382 5.5 4.12576 5.61474 4.04469 5.79339C3.96362 5.97205 3.99453 6.18161 4.12372 6.32925L7.62372 10.3293Z"
            fill="#2E2F32"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-[var(--ld-semantic-color-border-disabled,#C2C4C8)] rounded-lg shadow-lg z-50 min-w-[160px] py-1 overflow-hidden">
          {LANGUAGES.map(lang => {
            const isSelected = i18n.language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-gray-50 ${
                  isSelected
                    ? 'font-semibold text-[var(--ld-semantic-color-text-brand,#0053E2)]'
                    : 'text-[var(--ld-semantic-color-text-primary,#2E2F32)]'
                }`}
              >
                <img
                  src={lang.flag}
                  alt={lang.label}
                  className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                />
                <span className="flex-1 text-left">{lang.label}</span>
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1.5 6L4.5 9L10.5 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
