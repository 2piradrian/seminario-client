import RoutesManager from './ui/routes/routes-manager'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <>
    <RoutesManager />
    <Toaster
      position="bottom-left"
      toastOptions={{duration: 7000}}
    />
  </>
)
