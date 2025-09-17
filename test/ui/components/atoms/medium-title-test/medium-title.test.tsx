import { render, screen } from "@testing-library/react"
import MediumTitle from "../../../../../src/ui/components/atoms/medium-title/medium-title"

describe("<MediumTitle />", () => {
    test("Renderiza texto recibido dentro de un h2", () => {
        render(
            <MediumTitle text="Subtitulo Prueba" />
        )
        const heading = screen.getByRole("heading", { level: 2, name: /subtitulo prueba/i })

        expect(heading).toBeInTheDocument()
        expect(heading.tagName).toBe("H2")
    })
})