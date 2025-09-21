import { render, screen } from "@testing-library/react"
//import userEvent from "@testing-library/user-event"
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

})