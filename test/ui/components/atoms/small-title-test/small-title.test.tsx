import { render, screen } from "@testing-library/react"
import SmallTitle from "../../../../../src/ui/components/atoms/small-title/small-title"

describe("<SmallTitle />", () => {
    test("Renderiza texto recibido dentro de un h3", () => {
        render(
            <SmallTitle text="Sub-subtitulo Prueba" />
        )
        const heading = screen.getByRole("heading", { level: 3, name: /sub-subtitulo prueba/i })

        expect(heading).toBeInTheDocument()
        expect(heading.tagName).toBe("H3")
    })
})