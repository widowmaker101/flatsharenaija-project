import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import posthog from './lib/posthog';

posthog.capture('app_loaded');

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
