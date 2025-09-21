import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

import RegisterForm from "../../../../../src/ui/components/molecules/register-form/register-form"

describe("<RegisterForm />", () => {
    test("Renderiza nombre, apellido, email, contraseña y links", () => {
        render(
            <MemoryRouter>
                <RegisterForm onSubmit={() => {}} />
            </MemoryRouter>
        )
        expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/apellido/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /iniciar sesion/i })).toHaveAttribute("href", "/login")

    })

    test("Todos los campos obligatorios", async () => {
        render(
            <MemoryRouter>
                <RegisterForm onSubmit={() => {}} />
            </MemoryRouter>
        )

        const name = screen.getByPlaceholderText(/nombre/i) as HTMLInputElement
        const lastname = screen.getByPlaceholderText(/apellido/i) as HTMLInputElement
        const email = screen.getByPlaceholderText(/email/i) as HTMLInputElement
        const password = screen.getByPlaceholderText(/contraseña/i) as HTMLInputElement

        expect(name).toBeRequired()
        expect(name).toHaveAttribute("type", "text")
        expect(lastname).toBeRequired()
        expect(lastname).toHaveAttribute("type", "text")
        expect(email).toBeRequired()
        expect(email).toHaveAttribute("type", "text")
        expect(password).toBeRequired()
        expect(password).toHaveAttribute("type", "password")

        const button = screen.getByRole("button", { name: /registrarse/i })
        expect(button).toHaveAttribute("type", "submit")
    })

    test("Permite escribir en los inputs", async () => {
        render(
            <MemoryRouter>
                <RegisterForm onSubmit={() => {}} />
            </MemoryRouter>
        )

        const user = userEvent.setup()
        const nameInput = screen.getByPlaceholderText(/nombre/i) as HTMLInputElement
        const lastnameInput = screen.getByPlaceholderText(/apellido/i) as HTMLInputElement
        const emailInput = screen.getByPlaceholderText(/email/i) as HTMLInputElement
        const passwordInput = screen.getByPlaceholderText(/contraseña/i) as HTMLInputElement

        await user.type(nameInput, "Pepe")
        await user.type(lastnameInput, "Perez")
        await user.type(emailInput, "Pepe@gmail.com")
        await user.type(passwordInput, "1234")

        expect(nameInput).toHaveValue("Pepe")
        expect(lastnameInput).toHaveValue("Perez")
        expect(emailInput).toHaveValue("Pepe@gmail.com")
        expect(passwordInput).toHaveValue("1234")
    })

})