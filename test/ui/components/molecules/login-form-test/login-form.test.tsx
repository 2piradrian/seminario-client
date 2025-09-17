import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

import LoginForm from "../../../../../src/ui/components/molecules/login-form/login-form"

describe("<LoginForm />", () => {
    test("Renderiza email, contraseña y links", () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={() => {}} />
            </MemoryRouter>
        )

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /iniciar sesión/i})).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /recuperar contraseña/i})).toHaveAttribute("href", "/reset-password")
        expect(screen.getByRole("link", { name: /crear una cuenta/i})).toHaveAttribute("href", "/register")
    })

    test("Todos los campos obligatorios", async () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={() => {}} />
            </MemoryRouter>
        )

        const email = screen.getByPlaceholderText(/email/i) as HTMLInputElement
        const password = screen.getByPlaceholderText(/contraseña/i) as HTMLInputElement

        expect(email).toBeRequired()
        expect(email).toHaveAttribute("type", "text")
        expect(password).toBeRequired()
        expect(password).toHaveAttribute("type", "password")

        const button = screen.getByRole("button", { name: /iniciar sesión/i})
        expect(button).toHaveAttribute("type", "submit")
    })

    test("Permite escribir en los inputs", async () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={() => {}} />
            </MemoryRouter>
        )

        const user = userEvent.setup()
        const emailInput = screen.getByPlaceholderText(/email/i) as HTMLInputElement
        const passwordInput = screen.getByPlaceholderText(/contraseña/i) as HTMLInputElement

        await user.type(emailInput, "pepe@gmail.com")
        await user.type(passwordInput, "1234")

        expect(emailInput).toHaveValue("pepe@gmail.com")
        expect(passwordInput).toHaveValue("1234")
    })

    test("Se llama a onSubmit al hacer submit", async () => {
        const handleSubmit = jest.fn()
        render(
            <MemoryRouter>
                <LoginForm onSubmit={handleSubmit} />
            </MemoryRouter>
        )

        const errSpy = jest.spyOn(console, "error").mockImplementation(() => {})

        const user = userEvent.setup()
        await user.type(screen.getByPlaceholderText(/email/i), "pepe@gmail.com")
        await user.type(screen.getByPlaceholderText(/contraseña/i), "1234")
        await user.click(screen.getByRole("button", { name: /iniciar sesión/i}))

        expect(handleSubmit).toHaveBeenCalledTimes(1)

        errSpy.mockRestore()
    })

    test("Permite enviar formulario con Enter", async () => {
        const handleSubmit = jest.fn()
        render(
            <MemoryRouter>
                <LoginForm onSubmit={handleSubmit} />
            </MemoryRouter>
        )

        const errSpy = jest.spyOn(console, "error").mockImplementation(() => {})

        const user = userEvent.setup()
        await user.type(screen.getByPlaceholderText(/email/i), "pepe@gmail.com")
        await user.type(screen.getByPlaceholderText(/contraseña/i), "1234{enter}")

        expect(handleSubmit).toHaveBeenCalledTimes(1)

        errSpy.mockRestore()
    })
    
    test.todo("No llama a onSubmit si los campos estan vacios (Falta que el login controle los input, con useState por ejemplo )");
})