import { render, screen } from "@testing-library/react"
import ChipList from "../../../../../src/ui/components/molecules/chip-list/chip-list"



describe("ChipList", () => {
    test("Renderiza los estilos", () => {
        const lista = ["Rock", "Pop", "Jazz"]
        
        const { container } = render(<ChipList list={lista} />)

        lista.forEach((name) => {
            expect(screen.getAllByText(name)).toHaveLength(1)
        })

        const root = container.firstElementChild as HTMLElement
        expect(root.children.length).toBe(lista.length)
    })
    
    test("Muestra vacio cuando no tiene nada", () => {
        const { container } = render(<ChipList list={[]} />)
        const root = container.firstElementChild as HTMLElement
        expect(root.children.length).toBe(0)
        expect(screen.queryByText("Rock")).not.toBeInTheDocument()
    })
})