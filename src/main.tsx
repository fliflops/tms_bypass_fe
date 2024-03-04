import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@/components/theme-provider";
import {Theme} from '@radix-ui/themes';
import router from '@/lib/router.tsx';
import { RouterProvider } from 'react-router-dom';


import {PersistGate} from 'redux-persist/integration/react';
import {persistor,store} from '@/lib/redux/store'
import {Provider} from  'react-redux';

import '../app/globals.css';
import '@radix-ui/themes/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Theme>
          <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router}/>
          </ThemeProvider>
        </Theme>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
