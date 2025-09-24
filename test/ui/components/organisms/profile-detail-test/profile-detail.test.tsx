import { render, screen } from "@testing-library/react"
import ProfileDetail from "../../../../../src/ui/components/organisms/profile-detail/profile-detail"
import type { UserProfile, Style, Instrument } from "../../../../../src/domain"

jest.mock(
  "../../../../../src/ui/components/molecules/chip-list/chip-list",
  () => ({
    __esModule: true,
    default: (props: any) => (
      <div data-testid="chip-list" data-props={JSON.stringify(props)} />
    ),
  })
)

const BaseProfile: UserProfile = {
  name: "",
  surname: "",
  profileImage: "",
  portraitImage: "",
  shortDescription: "",
  longDescription: "",
  instruments: [] as Instrument[],
  styles: [] as Style[],
} as UserProfile

const mkSelectable = (id: string, name: string) => ({ id, name })

describe("ProfileDetail", () => {
    test("Renderiza el titulo y el parrafo de detalle", () => {
        
      const profile: UserProfile = {
        ...BaseProfile,
        longDescription: "Descripcion de ejemplo asdasdsadsd"
      }
      
      render(<ProfileDetail 
          profile={profile}
        />)

        expect(screen.getByRole("heading", { name: /detalles/i, level:2 })).toBeInTheDocument()
        expect(screen.getByText("Descripcion de ejemplo asdasdsadsd")).toBeInTheDocument()

        expect(screen.getByText(/no hay instrumentos registrados/i)).toBeInTheDocument()
        expect(screen.getByText(/no hay estilos registrados/i)).toBeInTheDocument()
    })

    test("Monta el List(Chip) para instrumentos y estilos con las props", () => {
      
      const instrumentos = [
        mkSelectable("i1", "Guitarra"),
        mkSelectable("i2", "Bajo"),
        mkSelectable("i3", "Bateria"),
      ]
      const estilos = [
        mkSelectable("s1", "Jazz"),
        mkSelectable("s2", "Rock"),
        mkSelectable("s3", "Pop")
      ]

      const profile: UserProfile = {
        ...BaseProfile,
        instruments: instrumentos,
        styles: estilos,
      }

      render(<ProfileDetail profile={profile} />)

      const node = screen.getAllByTestId("chip-list")
      expect(node).toHaveLength(2)

      const instNode = node[0]
      const stylesNode = node[1]

      const instProps = JSON.parse(instNode.getAttribute("data-props") || "{}")
      const stylesProps = JSON.parse(stylesNode.getAttribute("data-props") || "{}")
      
      expect(instProps.list).toHaveLength(profile.instruments.length)
      expect(stylesProps.list).toHaveLength(profile.styles.length)

      expect(Array.isArray(instProps.list)).toBe(true)
      expect(Array.isArray(stylesProps.list)).toBe(true)

      expect(stylesProps.list).toEqual(
        expect.arrayContaining(["Jazz", "Rock", "Pop"])
      )
      expect(instProps.list).toEqual(
        expect.arrayContaining(["Bajo", "Guitarra", "Bateria"])
      )
    })
  })