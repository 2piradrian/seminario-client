import { render, screen } from "@testing-library/react"
import LargeTitle from "../../../../../src/ui/components/atoms/large-title/large-title"

describe("<LargeTitle />", () => {
    test("Renderiza texto recibido dentro de un h1", () => {
        render(
            <LargeTitle text="Titulo Prueba" />
        )
        const heading = screen.getByRole("heading", { level: 1, name: /titulo prueba/i })

        expect(heading).toBeInTheDocument()
        expect(heading.tagName).toBe("H1")
    })
})