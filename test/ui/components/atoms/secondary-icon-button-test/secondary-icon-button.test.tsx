import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SecondaryIconButton from "../../../../../src/ui/components/atoms/secondary-icon-button/secondary-icon-button"

describe("<SecondaryIconButton />", () => {
    const iconPath = "/path-icon.png"

    test.each([
        ["submit" as const],
        ["button" as const],
    ])("Renderiza correctamente con type %s", (type) => {
        render(
            <SecondaryIconButton
                text="Clickea"
                type={type}
                enabled={true}
                onClick={() => {}}
                icon={iconPath}
            />
        )

        const button = screen.getByRole("button", { name: /clickea/i }) as HTMLButtonElement
        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute("type", type)
        expect(button).toBeEnabled()  
    })

    test.each([
        ["submit" as const],
        ["button" as const],
    ])("Dispara onClick cuando enabled (type='%s')",async (type) => {
        const handleClick = jest.fn()
        render(
            <SecondaryIconButton
                text="Clickea"
                type={type}
                enabled={true}
                onClick={handleClick}
                icon={iconPath}
            />
        )

        const user = userEvent.setup()
        const button = screen.getByRole("button", { name: /clickea/i }) as HTMLButtonElement
        await user.click(button)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test.each([
        ["submit" as const],
        ["button" as const],
    ])("No dispara onClick cuando Disabled (type='%s')",async (type) => {
        const handleClick = jest.fn()
        render(
            <SecondaryIconButton
                text="Clickea"
                type={type}
                enabled={false}
                onClick={handleClick}
                icon={iconPath}
            />
        )

        const user = userEvent.setup()
        const button = screen.getByRole("button", { name: /clickea/i }) as HTMLButtonElement
        await user.click(button)
        expect(handleClick).not.toHaveBeenCalled()
        })
})