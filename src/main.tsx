import RoutesManager from './ui/routes/routes-manager'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RepositoriesProvider } from './core'

createRoot(document.getElementById('root')!).render(
  <RepositoriesProvider>
    <RoutesManager />
    <Toaster
      position="bottom-left"
      toastOptions={{duration: 7000}}
    />
  </RepositoriesProvider>
)
