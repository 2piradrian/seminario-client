import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SecondaryButton from "../../../../../src/ui/components/atoms/secondary-button/secondary-button"

describe("<SecondaryButton />", () => {
    test("Renderiza un boton con texto y ejecuta onClick", async () => {
        const handleClick = jest.fn()
        render(
            <SecondaryButton text="Boton Secundario" onClick={handleClick} />
        )

        const button = screen.getByRole("button", { name: /boton secundario/i }) as HTMLButtonElement

        expect(button.tagName).toBe("BUTTON")

        const user = userEvent.setup()
        await user.click(button)

        expect(handleClick).toHaveBeenCalledTimes(1)
    })
}) 