import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ViewModel(){
    const navigate = useNavigate()

    useEffect(() => { document.title = "500 - Error interno"}, [])
    
    const onRetry = () => window.location.reload()
    const onGoBack = () => navigate("/")

  const viewProps = {
    code: "",
    title: "500 -- Error interno",
    subtitle: "Ocurrió un problema en el servidor. Intentalo nuevamente.",
    primaryText: "Reintentar",
    onPrimary: onRetry,
    secondaryText: "Ir al inicio",
    onSecondary: onGoBack,
  };

  return { viewProps };

}