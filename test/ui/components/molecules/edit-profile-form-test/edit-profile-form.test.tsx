import React from "react"
import { render, screen, } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import EditProfileForm from "../../../../../src/ui/components/molecules/edit-profile-form/edit-profile-form"
import type { Style, Instrument, UserProfile } from "../../../../../src/domain"

jest.mock(
  "../../../../../src/ui/components/atoms/chip-with-cross/chip-with-cross",
  () => ({
    __esModule: true,
    default: ({ text, onClick }: { text: string; onClick?: () => void }) => (
      <div data-testid="chip-with-cross-mock">
        <span>{text}</span>
        <button
          type="button"
          aria-label={`remove-${text}`}
          onClick={onClick}
        >
          X
        </button>
      </div>
    ),
  })
)

const StylesCatalog: Style[] = [
  { id: "style-rock", name: "Rock" },
  { id: "style-pop", name: "Pop" },
]
const InstrumentsCatalog: Instrument[] = [
  { id: "inst-guitarra", name: "Guitarra" },
  { id: "inst-piano", name: "Piano" },
]

const BaseProfile: UserProfile = {
  name: "",
  surname: "",
  profileImage: "",
  portraitImage: "",
  shortDescription: "",
  longDescription: "",
} as UserProfile

function EditProfileFormHarness({
  onSubmit,
  onCancel = () => {},
  catalogStyles = StylesCatalog,
  catalogIntruments = InstrumentsCatalog,
  initialStyles = ["Rock"],
  initialInstruments = ["Guitarra"],
  profile = BaseProfile
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onCancel?: () => void
  catalogStyles?: Style[]
  catalogIntruments?: Instrument[]
  initialStyles?: string[]
  initialInstruments?: string[]
  profile?: UserProfile
}) {
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>(initialStyles)
  const [selectedInstruments, setSelectedInstruments] = React.useState<string[]>(initialInstruments)

  const onAddStyles = (v: string) =>
    setSelectedStyles((s) => (s.includes(v) ? s : [...s, v]))
  const onRemoveStyles = (v: string) =>
    setSelectedStyles((s) => s.filter((x) => x !== v))

  const onAddInstruments = (v: string) =>
    setSelectedInstruments((s) => (s.includes(v) ? s : [...s, v]))
  const onRemoveInstruments = (v: string) =>
    setSelectedInstruments((s) => s.filter((x) => x !== v))

  return (
    <EditProfileForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      styles={catalogStyles}
      selectedStyles={selectedStyles}
      onAddStyles={onAddStyles}
      onRemoveStyles={onRemoveStyles}
      instruments={catalogIntruments}
      selectedInstruments={selectedInstruments}
      onAddInstruments={onAddInstruments}
      onRemoveInstruments={onRemoveInstruments}
      profile={profile}
    />
  )
}

describe("EditProfileForm", () => {
    test("Flujo completo del Form", async () => {
        const onSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => e.preventDefault())
    
        render(
            <EditProfileFormHarness 
            onSubmit={onSubmit} 
        />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText(/nombre/i), "Juan")
        await user.type(screen.getByLabelText(/apellido/i), "Perez")
        await user.type(screen.getByLabelText(/descripci[oó]n corta/i), "Musico Aficionado")
        await user.type(screen.getByLabelText(/descripci[oó]n larga/i), "Me gusta tocar la guitarra y el rock")
        await user.type(screen.getByLabelText(/im[aá]gen de perfil/i), "https://example.com/perfil.jpg")
        await user.type(screen.getByLabelText(/im[aá]gen de portada/i), "https://example.com/portada.jpg")

        const styleSelect = screen.getByRole("combobox", { name: /estilos/i }) as HTMLSelectElement
        //AGREGAR ESTILO POP
        await user.selectOptions(styleSelect, "Pop")
        await user.click(screen.getByRole("button", { name: /agregar estilo/i }))
        
        expect(await screen.findByRole("button", { name: "remove-Pop" })).toBeInTheDocument()
        //ELIMINAR ESTILO ROCK
        await user.click(screen.getByRole("button", { name: "remove-Rock" }))

        expect(screen.queryByRole("button", { name: "remove-Rock" })).not.toBeInTheDocument()
        //AGREGAR INSTRUMENTO PIANO
        const instSelect  = screen.getByRole("combobox", { name: /instrumentos/i }) as HTMLSelectElement
        await user.selectOptions(instSelect, "Piano")
        await user.click(screen.getByRole("button", { name: /agregar instrumento/i }))

        expect(await screen.findByRole("button", { name: "remove-Piano" })).toBeInTheDocument()
        //ELIMINAR INSTRUMENTO GUITARRA
        await user.click(screen.getByRole("button", { name: "remove-Guitarra" }))
        expect(screen.queryByRole("button", { name: "remove-Guitarra" })).not.toBeInTheDocument()

        await user.click(screen.getByRole("button", { name: /guardar cambios/i }))

        expect(onSubmit).toHaveBeenCalledTimes(1)
    }, 10000)

    test("campos required y tipos de botones correctos", () => {
        const onSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => e.preventDefault())
        render(
            <EditProfileFormHarness 
            onSubmit={onSubmit} 
        />)

        expect(screen.getByLabelText(/nombre/i)).toBeRequired()
        expect(screen.getByLabelText(/apellido/i)).toBeRequired()
        expect(screen.getByLabelText(/im[aá]gen de perfil/i)).toBeRequired()
        expect(screen.getByLabelText(/im[aá]gen de portada/i)).toBeRequired()
        expect(screen.getByLabelText(/descripci[oó]n corta/i)).toBeRequired()
        expect(screen.getByLabelText(/descripci[oó]n larga/i)).toBeRequired()

        expect(screen.getByRole("button", { name: /guardar cambios/i })).toHaveAttribute("type", "submit")
        expect(screen.getByRole("button", { name: /cancelar/i })).toHaveAttribute("type", "button")
        expect(screen.getByRole("button", { name: /agregar estilo/i })).toHaveAttribute("type", "button")
        expect(screen.getByRole("button", { name: /agregar instrumento/i })).toHaveAttribute("type", "button")

        expect(screen.getByRole("button", { name: "remove-Rock" })).toHaveAttribute("type", "button")

    })
})