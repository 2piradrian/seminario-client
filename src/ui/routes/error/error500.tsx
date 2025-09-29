import { useNavigate } from "react-router-dom"
import Layout from "../../layout/layout"
import Error500 from "../../components/molecules/errors/error500"

export default function Error500Route() {
  const navigate = useNavigate()

  return (
    <Layout withHeader={false}>
      <Error500
        onRetry={() => window.location.reload()}
        onGoHome={() => navigate("/")}
      />
    </Layout>
  )
}