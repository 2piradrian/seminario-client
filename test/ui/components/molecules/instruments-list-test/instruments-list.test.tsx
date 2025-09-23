import { render, screen } from "@testing-library/react"
import InstrumentList from "../../../../../src/ui/components/molecules/instruments-list/instruments-list"

describe("InstrumentsList", () => {
    test("Renderiza todos los intrumentos", () => {
        const instruments = ["Guitarra", "Bajo", "Batería"]
        const { container } = render(<InstrumentList instruments={instruments} />)

        instruments.forEach((instruments) => {
            expect(screen.getByText(instruments)).toBeInTheDocument()
        })

        expect(container.querySelectorAll(".chip")).toHaveLength(instruments.length)
    })

    test("Muestra vacio cuando no hay carga", () => {
        const { container } = render(<InstrumentList instruments={[]} />)
        expect(container.querySelectorAll(".chip")).toHaveLength(0)

        expect(screen.queryByText("Guitarra")).not.toBeInTheDocument()
    })
})