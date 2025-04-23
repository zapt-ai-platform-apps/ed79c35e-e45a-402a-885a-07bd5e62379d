import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import * as Sentry from '@sentry/browser';
import { supabase } from './supabaseClient';

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'frontend',
      projectId: import.meta.env.VITE_PUBLIC_APP_ID,
    },
  },
});

// Add PWA support
window.progressierAppRuntimeSettings = {
  uid: import.meta.env.VITE_PUBLIC_APP_ID,
  icon512: "https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=512&height=512",
  name: 'PaymentLens',
  shortName: 'PaymentLens',
};

let progressierScript = document.createElement('script');
progressierScript.setAttribute('src', 'https://progressier.app/z8yY3IKmfpDIw3mSncPh/script.js');
progressierScript.setAttribute('defer', 'true');
document.querySelector('head').appendChild(progressierScript);

// Umami Analytics
if (import.meta.env.VITE_PUBLIC_APP_ENV !== 'development') {
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://cloud.umami.is/script.js';
  script.setAttribute('data-website-id', import.meta.env.VITE_PUBLIC_UMAMI_WEBSITE_ID);
  document.head.appendChild(script);
}

// Initialize app and check for login status
const recordLogin = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      try {
        // Import and execute recordLogin function
        const { recordLogin } = await import('./supabaseClient');
        await recordLogin(user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
      } catch (error) {
        console.error('Failed to record login:', error);
      }
    }
  } catch (error) {
    console.error('Error checking user:', error);
  }
};

recordLogin();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);