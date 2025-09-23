import { render, screen } from "@testing-library/react"
import StylesList from "../../../../../src/ui/components/molecules/chip-list/chip-list"

describe("StylesList", () => {
    test("Renderiza los estilos", () => {
        const styles = ["Rock", "Pop", "Jazz"]
        const { container } = render(<StylesList styles={styles} />)

        styles.forEach((name) => {
            expect(screen.getByText(name)).toBeInTheDocument()
        })

        expect(container.querySelectorAll(".chip")).toHaveLength(styles.length)
    })
    
    test("Muestra vacio cuando no tiene nada", () => {
        const { container } = render(<StylesList styles={[]} />)
        expect(container.querySelectorAll(".chip")).toHaveLength(0)
        expect(screen.queryByText("Rock")).not.toBeInTheDocument()
    })
})