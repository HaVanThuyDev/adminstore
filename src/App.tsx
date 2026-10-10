import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { SettingsProvider } from './store/settingsContext';
import { AuthProvider } from './store/authContext';
import { CartProvider } from './store/cartContext';
import { Toaster } from 'sonner';

export const App: React.FC = () => {
  return (
    <SettingsProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            richColors
            theme="light"
            closeButton
            toastOptions={{
              style: {
                background: '#FFFFFF',
                borderColor: 'rgba(148, 163, 184, 0.25)',
                color: '#1E293B',
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </SettingsProvider>
  );
};

export default App;
