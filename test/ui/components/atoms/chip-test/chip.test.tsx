import { render, screen } from "@testing-library/react"
import LabelContainer from "../../../../../src/ui/components/atoms/chip/chip"

describe("<LabelContainer />", () => {
    test("Renderiza el label correctamente", () => {
        const text = "Waza"
        render(
            <LabelContainer label={text} />
        )

        expect(screen.getByText(text)).toBeInTheDocument()

        const para = screen.getByText(text)
        expect(para.tagName).toBe("P")
    })
})