import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProfileHeader from "../../../../../src/ui/components/organisms/profile-header/profile-header"

describe("ProfileHeader", () => {
    test("Renderiza cuando ownProfile y dispara onClick", async () => {
        const onClick = jest.fn()
        render(
            <ProfileHeader
                ownProfile={true}
                isFollowing={false}
                onClick={onClick}
            />
        )
        const user = userEvent.setup()

        const button = screen.getByRole("button", { name: /modificar perfil/i })
        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
        expect(button).toHaveAttribute("type", "button")

        expect(screen.queryByRole("button", { name: /seguir/i })).not.toBeInTheDocument()
        expect(screen.queryByRole("button", { name: /dejar de seguir/i })).not.toBeInTheDocument()

        await user.click(button)
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    test("No propio y no siguiendo, muestra seguir y manda onClick", async () => {
        const onClick = jest.fn()
        render(
            <ProfileHeader
                ownProfile={false}
                isFollowing={false}
                onClick={onClick}
            />
        )
        const user = userEvent.setup()
        const button = screen.getByRole("button", { name: /seguir/i })
        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
        expect(button).toHaveAttribute("type", "button")

        expect(screen.queryByRole("button", { name: /modificar perfil/i })).not.toBeInTheDocument()
        expect(screen.queryByRole("button", { name: /dejar de seguir/i })).not.toBeInTheDocument()

        await user.click(button)
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    test("No propio y siguiendo, muestra dejar de seguir y manda onClick", async () => {
        const onClick = jest.fn()
        render(
            <ProfileHeader
                ownProfile={false}
                isFollowing={true}
                onClick={onClick}
            />
        )
        const user = userEvent.setup()
        const button = screen.getByRole("button", { name: /dejar de seguir/i })
        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
        expect(button).toHaveAttribute("type", "button")

        expect(screen.queryByRole("button", { name: /modificar perfil/i })).not.toBeInTheDocument()
        expect(screen.queryByRole("button", { name: /^seguir$/i })).not.toBeInTheDocument()

        await user.click(button)
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})