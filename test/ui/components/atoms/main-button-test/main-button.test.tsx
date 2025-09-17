import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MainButton from "../../../../../src/ui/components/atoms/main-button/main-button"

describe("<MainButton />", () => {
    test.each([
        ["Enviar", "submit"],
        ["Cancelar", "button"],])("Renderiza un boton con texto '%s' y type '%s' ", async (text, type) => {
            const handleClick = jest.fn()
            render(
            <MainButton
                text={text} type={type as "submit" | "button"} onClick={handleClick}
            />
            )

            const button = screen.getByRole("button", { name: text }) as HTMLButtonElement

            expect(button).toBeInTheDocument()
            expect(button.tagName).toBe("BUTTON")
            expect(button).toHaveAttribute("type", type)

            const user = userEvent.setup()
            await user.click(button)

            expect(handleClick).toHaveBeenCalledTimes(1)
        })
})