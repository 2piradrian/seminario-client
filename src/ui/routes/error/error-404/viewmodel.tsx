import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import hero from "../../../assets/other/404-hero.gif"

export default function ViewModel(){
    const navigate = useNavigate()

    useEffect(() => { document.title = "404 - Página no encontrada"}, [])
    
    const onGoHome = () => navigate("/")
    const onGoBack = () => navigate(-1)

  const viewProps = {
    code: "404",
    title: "No pudimos encontrar la página que buscabas",
    subtitle: "Intentalo nuevamente.",
    heroSrc: hero,
    heroAlt: "Página no encontrada",
    primaryText: "Ir al inicio",
    onPrimary: onGoHome,
    secondaryText: "Volver atrás",
    onSecondary: onGoBack,
  };

  return { viewProps };

}