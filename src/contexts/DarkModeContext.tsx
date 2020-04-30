import * as React from 'react';

export const DarkModeContext = React.createContext<{
  dark: boolean;
  set: (dark: boolean) => void;
}>({
  dark: false,
  set: () => {},
});

const basePreference =
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export const DarkModeProvider: React.FC = props => {
  const [isDark, setIsDark] = React.useState(basePreference);

  React.useEffect(() => {
    const darkPreference = localStorage.getItem('simulated_darkMode');
    if (darkPreference === null) return;
    setIsDark(darkPreference === 'true');
  }, [setIsDark]);

  const set = React.useCallback(
    (value: boolean) => {
      setIsDark(value);
      localStorage.setItem('simulated_darkMode', `${value}`);
    },
    [setIsDark],
  );

  return <DarkModeContext.Provider value={{ dark: isDark, set }} {...props} />;
};

export const useDarkMode = () => React.useContext(DarkModeContext);
