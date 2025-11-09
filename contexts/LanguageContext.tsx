'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (bn: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('bn');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage === 'en' || savedLanguage === 'bn') {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'bn' ? 'en' : 'bn';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (bn: string, en: string) => {
    return language === 'bn' ? bn : en;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

