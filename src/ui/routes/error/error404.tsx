import { useNavigate } from "react-router-dom"
import Layout from "../../layout/layout"
import hero from "../../assets/other/404-hero.gif"
import Error404 from "../../components/molecules/errors/error404"

export default function Error404Route() {
  const navigate = useNavigate()

  return(
    <Layout withHeader={false}>
      <Error404
        heroSrc={hero}
        onGoHome={() => navigate("/")}
        onGoBack={() => navigate(-1)}
      />
    </Layout>
  )
}
