
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n/config';

// Get saved language preference
const savedLanguage = localStorage.getItem('preferredLanguage');
if (savedLanguage) {
  import('./i18n/config').then((i18n) => {
    i18n.default.changeLanguage(savedLanguage);
  });
}

createRoot(document.getElementById("root")!).render(<App />);
