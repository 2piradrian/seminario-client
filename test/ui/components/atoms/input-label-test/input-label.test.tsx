import { fireEvent, render, screen } from  "@testing-library/react"
import userEvent from "@testing-library/user-event"
import InputLabel from "../../../../../src/ui/components/atoms/input-label/input-label"

describe("<InputLabel />", () => {
    test("hace blur cuando se usa rueda", () => {
        render(
            <InputLabel
                id="username"
                type="text"
                placeholder="Nombre de usuario"
                required={true}
                label="Usuario"
            />    
        )

        const input = screen.getByPlaceholderText(/nombre de usuario/i) as HTMLElement

        input.focus()
        expect(input).toHaveFocus()

        fireEvent.wheel(input, { deltaY: 100})

        expect(input).not.toHaveFocus()
    })

    test("Renderiza label y lo asocia con id", () => {
        render(
            <InputLabel
                id="username"
                type="text"
                placeholder="Nombre de usuario"
                required={true}
                label="Usuario"
            />    
        )

        const input = screen.getByLabelText(/usuario/i) as HTMLInputElement

        expect(input).toBeInTheDocument()
        expect(input.id).toBe("username")

    })

    test("Renderiza con los atributos correctos", () => {
        render(
            <InputLabel
                id="pass"
                type="password"
                placeholder="Contraseña"
                required={true}
            />
        )

        const input = screen.getByPlaceholderText(/contraseña/i) as HTMLInputElement

        expect(input).toHaveAttribute("type", "password")
        expect(input).toBeRequired()
        expect(input).toHaveAttribute("id", "pass")
        expect(input).toHaveAttribute("name", "pass")
    })

    test("Permite escribir en el input", async () => {
        render(
            <InputLabel
                id="email"
                type="text"
                placeholder="Email"
                required={true}
            />
        )

        const user = userEvent.setup()
        const input = screen.getByPlaceholderText(/email/i) as HTMLInputElement

        await user.type(input, "pepe@gmail.com")
        expect(input).toHaveValue("pepe@gmail.com")
    })

    test("Inicia con el valor pasado por props", () => {
        render(
            <InputLabel
                id="age"
                type="number"
                placeholder="Edad"
                required={false}
                value="54"
            />
        )

        const input = screen.getByPlaceholderText(/edad/i) as HTMLInputElement

        expect(input).toHaveValue(54)
    })

    test("Permite label opcional", () => {
        render(
            <InputLabel
                id="nick"
                type="text"
                placeholder="Apodo"
                required={false}
            />
        )
        const input = screen.getByPlaceholderText(/apodo/i) as HTMLInputElement

        expect(input).toBeInTheDocument()
    })
})