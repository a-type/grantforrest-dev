import * as React from 'react';

export const DarkModeContext = React.createContext<{
  dark: boolean;
  set: (dark: boolean) => void;
  isSystem: boolean;
}>({
  dark: false,
  set: () => {},
  isSystem: false,
});

const storageKey = 'simulated_darkMode';

const systemPreference =
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialIsSystem = typeof window === 'undefined' ? false : !localStorage.getItem(storageKey);

export const DarkModeProvider: React.FC<{ force?: boolean }> = ({ force, ...props }) => {
  const [isDark, setIsDark] = React.useState(systemPreference);
  const [isSystem, setIsSystem] = React.useState(initialIsSystem);

  React.useEffect(() => {
    const darkPreference = localStorage.getItem(storageKey);
    if (darkPreference === null) {
      setIsSystem(true);
      return;
    }
    setIsSystem(true);
    setIsDark(darkPreference === 'true');
  }, [setIsDark, setIsSystem]);

  const set = React.useCallback(
    (value: boolean | undefined) => {
      if (value === undefined) {
        setIsDark(systemPreference);
        localStorage.removeItem(storageKey);
        setIsSystem(true);
      } else {
        setIsDark(value);
        localStorage.setItem(storageKey, `${value}`);
        setIsSystem(false);
      }
    },
    [setIsDark, setIsSystem],
  );

  const dark = force === undefined ? isDark : force;

  return <DarkModeContext.Provider value={{ dark, set, isSystem }} {...props} />;
};

export const useDarkMode = () => React.useContext(DarkModeContext);
