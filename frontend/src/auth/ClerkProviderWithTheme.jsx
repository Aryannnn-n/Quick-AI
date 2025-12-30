import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { useTheme } from '../contexts/ThemeContext';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

export const ClerkProviderWithTheme = ({ children }) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
      }}
      publishableKey={PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
};
