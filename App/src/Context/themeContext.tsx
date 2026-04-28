import React, { useContext, useState, createContext, useMemo } from 'react';
import { ReactNode } from 'react';

// 1. Define the color palettes
const DarkTheme = {
  bgPrimary: '#0A0A0A',
  surface: '#141414',
  textPrimary: '#EDEDED',
  textSecondary: '#A1A1AA',
  accent: '#FFFFFF',
  border: '#262626',
};

const LightTheme = {
  bgPrimary: '#FAFAFA',
  surface: '#FFFFFF',
  textPrimary: '#111111',
  textSecondary: '#71717A',
  accent: '#000000',
  border: '#E5E5E5',
};



interface ThemeTypes {
  isLight: boolean;
  theme: typeof DarkTheme; // Both themes share the same structure
  ThemeHandler: () => void;
}

const themeContext = createContext<ThemeTypes | undefined>(undefined);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLight, setIsLight] = useState(false);

  const ThemeHandler = () => {
    setIsLight(prev => !prev);
  };

  // Memoize the theme object so components don't re-render unnecessarily
  const theme = useMemo(() => (isLight ? LightTheme : DarkTheme), [isLight]);

  return (
    <themeContext.Provider value={{ isLight, theme, ThemeHandler }}>
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(themeContext);
  if (!context)
    throw new Error('useTheme must be used within ThemeContextProvider');
  return context;
};
