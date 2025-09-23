import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import Header from "../../../../../src/ui/components/organisms/header/header"

jest.mock("../../../../../src/ui/components/molecules/header-menu/header-menu", () => () => <nav data-testid="header-menu"/>)

function renderWithRouter(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/chat" element={<h1>Chat Page</h1>} />
      </Routes>
    </MemoryRouter>
)}

describe("Header", () => {
    test("Renderiza el isologo y el menu", () => {
        renderWithRouter()

        expect(screen.getByRole("banner")).toBeInTheDocument()

        const homeLink = screen.getByRole("link", { name: /isologo/i })
        expect(homeLink).toBeInTheDocument()
        expect(homeLink).toHaveAttribute("href", "/")

        expect(screen.getByTestId("header-menu")).toBeInTheDocument()
    })

    test("El isologo redirige a home", async () => {
        renderWithRouter("/chat")
        const user = userEvent.setup()

        await user.click(screen.getByRole("link", { name: /isologo/i }))
        expect(await screen.findByRole("heading", { name: /home page/i })).toBeInTheDocument()
    })
})