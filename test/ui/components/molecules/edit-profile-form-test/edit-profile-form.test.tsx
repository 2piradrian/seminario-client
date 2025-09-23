import React from "react"
import { render, screen, } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import EditProfileForm from "../../../../../src/ui/components/molecules/edit-profile-form/edit-profile-form"

function EditProfileFormHarness({
  onSubmit,
  initialStyles = ["Rock"],
  initialInstruments = ["Guitarra"],
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  initialStyles?: string[]
  initialInstruments?: string[]
}) {
  const [styles, setStyles] = React.useState<string[]>(initialStyles)
  const [instruments, setInstruments] = React.useState<string[]>(initialInstruments)

  const onAddStyles = (v: string) => setStyles((s) => (s.includes(v) ? s : [...s, v]))
  const onRemoveStyles = (v: string) => setStyles((s) => s.filter((x) => x !== v))

  const onAddInstruments = (v: string) => setInstruments((s) => (s.includes(v) ? s : [...s, v]))
  const onRemoveInstruments = (v: string) => setInstruments((s) => s.filter((x) => x !== v))

  return (
    <EditProfileForm
      onSubmit={onSubmit}
      styles={styles}
      onAddStyles={onAddStyles}
      onRemoveStyles={onRemoveStyles}
      instruments={instruments}
      onAddInstruments={onAddInstruments}
      onRemoveInstruments={onRemoveInstruments}
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