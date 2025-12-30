import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ClerkProviderWithTheme } from './auth/ClerkProviderWithTheme';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';



createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ClerkProviderWithTheme>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProviderWithTheme>
  </ThemeProvider>
);
