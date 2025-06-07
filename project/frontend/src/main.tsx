// IDE-Agent HINT: Frontend Entry Point - React uygulamasının başlangıç noktası
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/globals.css';
import './styles/themes.css';

// Error boundary for development
import { ErrorBoundary } from 'react-error-boundary';

// Performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="error-boundary">
      <div className="error-container">
        <h1>Something went wrong</h1>
        <details className="error-details">
          <summary>Error details</summary>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </details>
        <button onClick={resetErrorBoundary} className="error-retry-button">
          Try again
        </button>
      </div>
    </div>
  );
}

// Performance monitoring
function sendToAnalytics(metric: any) {
  // In production, send to your analytics service
  if (import.meta.env.DEV) {
    console.log('Web Vital:', metric);
  }
}

// Measure performance
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// Initialize React app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render app with error boundary
root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
        // In production, send to error reporting service
      }}
      onReset={() => {
        // Clear any error state
        window.location.reload();
      }}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Hot module replacement for development
if (import.meta.hot) {
  import.meta.hot.accept();
}

// Service worker registration (for PWA features)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Electron integration
if (window.electronAPI) {
  // Notify Electron that React app is ready
  window.electronAPI.appReady();
  
  // Handle app updates
  window.electronAPI.onAppUpdate((info: any) => {
    console.log('App update available:', info);
  });
  
  // Handle theme changes from system
  window.electronAPI.onThemeChange((theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
  });
}

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Development helpers
if (import.meta.env.DEV) {
  // Add development tools to window
  (window as any).__DEV_TOOLS__ = {
    React,
    ReactDOM,
    // Add other dev tools here
  };
}

// App initialization complete
console.log('IDE-Agent Frontend initialized');