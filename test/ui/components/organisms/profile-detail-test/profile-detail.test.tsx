import { render, screen } from "@testing-library/react"
import ProfileDetail from "../../../../../src/ui/components/organisms/profile-detail/profile-detail"

jest.mock(
  "../../../../../src/ui/components/molecules/styles-list/styles-list",
  () => ({
    __esModule: true,
    default: (props: any) => (
      <div data-testid="styles-list" data-props={JSON.stringify(props)} />
    ),
  })
)

jest.mock(
  "../../../../../src/ui/components/molecules/instruments-list/instruments-list",
  () => ({
    __esModule: true,
    default: (props: any) => (
      <div data-testid="instruments-list" data-props={JSON.stringify(props)} />
    ),
  })
)

describe("ProfileDetail", () => {
    test("Renderiza el titulo y el parrafo de detalle", () => {
        render(<ProfileDetail />)

        expect(screen.getByRole("heading", { name: /detail/i, level:3 })).toBeInTheDocument()
        expect
    })

    test("Monta el StylesList con las props", () => {
        render(<ProfileDetail />)

        const node = screen.getByTestId("styles-list")
        const props = JSON.parse(node.getAttribute("data-props") || "{}")

        expect(Array.isArray(props.styles)).toBe(true)
        expect(props.styles).toHaveLength(7)

        expect(props.styles).toEqual(
            expect.arrayContaining(["Jazz", "Rock", "Pop-Rock", "Cuarteto"])
        )
    })

    test("Monta el InstrumentList con las props", () => {
        render(<ProfileDetail />)

        const node = screen.getByTestId("instruments-list")
        const props = JSON.parse(node.getAttribute("data-props") || "{}")

        expect(Array.isArray(props.instruments)).toBe(true)
        expect(props.instruments).toHaveLength(7)

        expect(props.instruments).toEqual(
            expect.arrayContaining(["Guitarra", "Bajo", "Batería", "trompeta", "saxofon", "xilofon"])
        )
    })
})