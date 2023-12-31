import './styles/GlobalStyles.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import ErrorBoundary from './pages/errors/ErrorBourory.tsx'
import { HelmetProvider } from 'react-helmet-async'
import React, { StrictMode } from 'react'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { store } from './store/root/store.ts'
import { AppProvider } from './contexts/app.contexts.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <AppProvider>
            <App />
          </AppProvider>
        </ErrorBoundary>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)
