import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import HeaderMenu from "../../../../../src/ui/components/molecules/header-menu/header-menu"

function renderWithRouter() {
    return render(
        <MemoryRouter initialEntries={['/']}>
            <HeaderMenu />
            <Routes>
                <Route path="/" element={<div />} />
                <Route path="/search" element={<h1>Search Page</h1>} />
                <Route path="/chat" element={<h1>Chat Page</h1>} />
                <Route path="/notifications" element={<h1>Notifications Page</h1>} />
                <Route path="/profile" element={<h1>Profile Page</h1>} />
                <Route path="*" element={<div />} />
            </Routes>
        </MemoryRouter>
        )
}

describe("HeaderMenu", () => {
    test("Renderiza los 4 links correctamente", () => {
        renderWithRouter()

        expect(screen.getByRole("link", { name: /search icon/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /chat icon/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /notifications icon/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /profile icon/i })).toBeInTheDocument()
    })

    test("Cada link lleva a la ruta correcta", () => {
        renderWithRouter()

        expect(screen.getByRole("link", { name: /search icon/i }).getAttribute("href")).toBe("/search")
        expect(screen.getByRole("link", { name: /chat icon/i }).getAttribute("href")).toBe("/chat")
        expect(screen.getByRole("link", { name: /notifications icon/i }).getAttribute("href")).toBe("/notifications")
        expect(screen.getByRole("link", { name: /profile icon/i }).getAttribute("href")).toBe("/profile")
    })

    test("Redirige al hacer click", async () => {
        renderWithRouter()
        const user = userEvent.setup()

        await user.click(screen.getByRole("link", { name: /search icon/i }))
        expect(await screen.findByRole("heading", { name: /search page/i })).toBeInTheDocument()

        await user.click(screen.getByRole("link", { name: /chat icon/i }))
        expect(await screen.findByRole("heading", { name: /chat page/i })).toBeInTheDocument()

        await user.click(screen.getByRole("link", { name: /notifications icon/i}))
        expect(await screen.findByRole("heading", { name: /notifications page/i })).toBeInTheDocument()

        await user.click(screen.getByRole("link", { name: /profile icon/i }))
        expect(await screen.findByRole("heading", { name: /profile page/i })).toBeInTheDocument()
    })

    test("Redirige con teclado", async () => {
        renderWithRouter()
        const user = userEvent.setup()

        await user.tab()
        const first = screen.getByRole("link", { name: /search icon/i })
        expect(first).toHaveFocus()
        await user.keyboard("{Enter}")
        expect(await screen.findByRole("heading", { name: /search page/i })).toBeInTheDocument()
    })

    
})