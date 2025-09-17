import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SecondaryButton from "../../../../../src/ui/components/atoms/secondary-button/secondary-button"

describe("<SecondaryButton />", () => {
    test.each([
        ["Boton secundario", "submit"],
        ["Secondary button", "button"],])("Renderiza y funciona un boton con texto '%s' y type '%s' ", async (text, type) => {
            const handleClick = jest.fn()
            render(
            <SecondaryButton
                enabled= {true} text={text} type={type as "submit" | "button"} onClick={handleClick}
            />
            )

            const button = screen.getByRole("button", { name: text }) as HTMLButtonElement

            expect(button).toBeEnabled()
            expect(button).toBeInTheDocument()
            expect(button.tagName).toBe("BUTTON")
            expect(button).toHaveAttribute("type", type)

            const user = userEvent.setup()
            await user.click(button)

            expect(handleClick).toHaveBeenCalledTimes(1)
        })
        test.each([
        ["Boton secundario", "submit"],
        ["Secondary button", "button"],])("Renderiza y no funciona un boton en caso de Disabled con texto '%s' y type '%s' ", async (text, type) => {
            const handleClick = jest.fn()
            render(
            <SecondaryButton
                enabled= {false} text={text} type={type as "submit" | "button"} onClick={handleClick}
            />
            )

            const button = screen.getByRole("button", { name: text }) as HTMLButtonElement

            expect(button).toBeDisabled()
            expect(button).toBeInTheDocument()
            expect(button.tagName).toBe("BUTTON")
            expect(button).toHaveAttribute("type", type)

            const user = userEvent.setup()
            await user.click(button)

            expect(handleClick).not.toHaveBeenCalled()
        
        })
    }
)