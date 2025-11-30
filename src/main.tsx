import RoutesManager from './ui/routes/routes-manager'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RepositoriesProvider, ServiceProvider } from './core'

createRoot(document.getElementById('root')!).render(
  <ServiceProvider>
    <RepositoriesProvider>
      <RoutesManager />
      <Toaster
        position="bottom-left"
        toastOptions={{duration: 7000}}
      />
    </RepositoriesProvider>
  </ServiceProvider>
)
