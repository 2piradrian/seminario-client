import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ChipWithCross from "../../../../../src/ui/components/atoms/chip-with-cross/chip-with-cross"

describe("<ChipWithCross />", () => {
    test("Muestra el texto correctamente", () => {
        render(
            <ChipWithCross text="Prueba" 
            />
        )
        
        const textElement = screen.getByText("Prueba")
        expect(textElement).toBeInTheDocument()
        expect(textElement.tagName).toBe("SPAN")
    })

    test("Ejecuta onClick al hacer click en la 'X'", async () => {
        const handleClick = jest.fn()
        render(
            <ChipWithCross text="Prueba" onClick={handleClick} 
            />
        )

        const cross = screen.getByText("X")
        expect(cross).toBeInTheDocument()

        const user = userEvent.setup()
        await user.click(cross)

        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})