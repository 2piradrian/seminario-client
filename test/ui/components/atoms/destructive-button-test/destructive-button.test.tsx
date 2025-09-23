import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import DestructiveButton from "../../../../../src/ui/components/atoms/destructive-button/destructive-button"

describe("<DestructiveButton/>" , () => {
    test("Renderiza boton y funciona al hacer click", async () => {
        const handleClick = jest.fn()
        render(
            <DestructiveButton 
            text="Eliminar" 
            onClick={handleClick} 
            />
        )

        const user = userEvent.setup()
        const button = screen.getByRole("button", { name: /eliminar/i })

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()

        await user.click(button)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test("Se envia con enter o espacio", async () => {
        const handleClick = jest.fn()
        render(
            <DestructiveButton 
            text="Eliminar" 
            onClick={handleClick} 
            />
        )

        const user = userEvent.setup()
        const button = screen.getByRole("button", { name: /eliminar/i })

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()

        button.focus()
        expect(button).toHaveFocus()

        await user.keyboard("{Enter}")
        await user.keyboard(" ")

        expect(handleClick).toHaveBeenCalledTimes(2)
    })
})