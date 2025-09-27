import { useNavigate } from "react-router-dom"
import Layout from "../../layout/layout"
import LargeTitle from "../../components/atoms/large-title/large-title"
import MediumTitle from "../../components/atoms/medium-title/medium-title"
import MainButton from "../../components/atoms/main-button/main-button"
import SecondaryButton from "../../components/atoms/secondary-button/secondary-button"
import hero from "../../assets/other/404-hero.gif"


export default function NotFoundRoute() {
  const navigate = useNavigate()

  return (
    <Layout withHeader={false}>
      <section
        style={{
          backgroundColor: "var(--background)",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div style={{ width: "80%", maxWidth: 780, textAlign: "center" }}>
          <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: 2, lineHeight: 1 }}>
            404
          </div>

          <img
            src={hero}
            alt="Página no encontrada"
            style={{
              width: "780px",
              maxWidth: "80%",
              height: "auto",
              display: "block",
              margin: "16px auto 8px",
              borderRadius: 8,
              background: "var(--background)"
            }}
          />

          <LargeTitle text="No pudimos encontrar la página que buscabas" />
          <MediumTitle text="Intentalo nuevamente." />

          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "stretch",
              maxWidth: 520,
              marginInline: "auto",
            }}
          >
            <MainButton
              enabled={true}
              text="Ir al inicio"
              type="button"
              onClick={() => navigate("/")}
            />
            <SecondaryButton
              enabled={true}
              text="Volver atrás"
              type="button"
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}