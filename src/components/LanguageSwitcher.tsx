import { useTranslation } from 'react-i18next';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`flex items-center px-2 py-1 rounded text-sm ${
            i18n.language === lang.code 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          <span className="mr-1">{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  );
} 