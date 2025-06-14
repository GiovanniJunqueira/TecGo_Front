// src/contexts/ThemeContext.tsx

import React, { createContext, useState, useContext, useMemo, useEffect, type ReactNode } from 'react';
import { lightColors, darkColors } from '../designSystem';

interface ThemeContextData {
  theme: 'light' | 'dark';
  colors: typeof lightColors;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = useMemo(() => (theme === 'light' ? lightColors : darkColors), [theme]);

  // EFEITO ADICIONADO: Esta é a grande melhoria!
  // Isso garante que o fundo de TODA a página mude com o tema.
  useEffect(() => {
    document.body.style.backgroundColor = colors.background;
  }, [colors]); // Este efeito roda sempre que o objeto 'colors' muda

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextData => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};