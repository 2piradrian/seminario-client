import { useNavigate } from "react-router-dom"
import Layout from "../../layout/layout"
import LargeTitle from "../../components/atoms/large-title/large-title"
import MediumTitle from "../../components/atoms/medium-title/medium-title"
import MainButton from "../../components/atoms/main-button/main-button"
import SecondaryButton from "../../components/atoms/secondary-button/secondary-button"

export default function Error500Route() {
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
          textAlign: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 780 }}>
          <LargeTitle text="500 — Error interno" />
          <MediumTitle text="Ocurrió un problema en el servidor." />
          <p style={{ marginTop: 8 }}>Intentalo nuevamente.</p>

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
              text="Reintentar"
              type="button"
              onClick={() => window.location.reload()}
            />
            <SecondaryButton
              enabled={true}
              text="Ir al inicio"
              type="button"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}