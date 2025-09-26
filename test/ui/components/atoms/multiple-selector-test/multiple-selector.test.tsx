import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MultipleSelector from "../../../../../src/ui/components/atoms/multiple-selector/multiple-selector"
import React from "react"

jest.mock(
  "../../../../../src/ui/components/atoms/chip-with-cross/chip-with-cross",
  () => ({
    __esModule: true,
    default: ({ text, onClick }: { text: string; onClick?: () => void }) => (
      <div data-testid="chip-with-cross-mock">
        <span>{text}</span>
        <button
          type="button"
          aria-label={`remove-${text}`}
          onClick={onClick}
        >
          X
        </button>
      </div>
    ),
  })
)

describe("MultipleSelector", () => {
    const baseProps = {
        id: "frutas",
        label: "Frutas",
        buttonText: "Agregar",
        options: ["Manzana", "Banana", "Naranja"],
    }

    test("Renderiza el boton y select con opciones", () => {
        render(<MultipleSelector
            {...baseProps}
            selected={[]}
            onAdd={() => {}}
            onRemove={() => { }}
        />)
        
        expect(screen.getByRole("button", { name: /agregar/i })).toBeInTheDocument()

        const select = screen.getByRole("combobox", { name: baseProps.label }) as HTMLSelectElement
        expect(select).toBeInTheDocument()

        expect(screen.getByRole("option", { name: /seleccionar/i })).toBeInTheDocument()
        baseProps.options.forEach((opt) => {
            expect(screen.getByRole("option", { name: opt })).toBeInTheDocument()
        })
    })

    test("Agrega un valor distinto", async () => {
        const handleAdd = jest.fn()
        render(
            <MultipleSelector
                {...baseProps}
                selected={[]}
                onAdd={handleAdd}
                onRemove={() => { }}
            />
        )

        const user = userEvent.setup()
        const select = screen.getByRole("combobox", { name: baseProps.label }) as HTMLSelectElement

        await user.selectOptions(select, "Manzana")
        await user.selectOptions(select, "Banana")
        await user.click(screen.getByRole("button", { name: /agregar/i }))

        expect(handleAdd).toHaveBeenCalledWith("Banana")
        expect(handleAdd).toHaveBeenCalledTimes(1)
    })

    test("No agrega valor cuando esta en Seleccionar", async () => {
        const handleAdd = jest.fn()
        render(
            <MultipleSelector
                {...baseProps}
                selected={[]}
                onAdd={handleAdd}
                onRemove={() => { }}
            />
        )

        const user = userEvent.setup()
        const select = screen.getByRole("combobox", { name: baseProps.label }) as HTMLSelectElement

        await user.selectOptions(select, "Seleccionar")
        await user.click(screen.getByRole("button", { name: /agregar/i }))
        expect(handleAdd).not.toHaveBeenCalled()
    })

    test("Evita agregar duplicados", async () => {
        const handleAdd = jest.fn()
        render(
            <MultipleSelector
                {...baseProps}
                selected={["Manzana"]}
                onAdd={handleAdd}
                onRemove={() => { }}
            />
        )

        const user = userEvent.setup()
        const select = screen.getByRole("combobox", { name: baseProps.label }) as HTMLSelectElement

        await user.selectOptions(select, "Manzana")
        await user.click(screen.getByRole("button", { name: /agregar/i }))
        expect(handleAdd).not.toHaveBeenCalled()
    })

    test("Renderiza los valores seleccionados y permite removerlos", async () => {
        const handleRemove = jest.fn()
        render(
            <MultipleSelector
                {...baseProps}
                selected={["Manzana", "Banana"]}
                onAdd={() => { }}
                onRemove={handleRemove}
            />
        )

        const user = userEvent.setup()

        expect(screen.getByRole("button", { name: "remove-Manzana" })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "remove-Banana" })).toBeInTheDocument()

        await user.click(screen.getByRole("button", { name: "remove-Banana" }))
        
        expect(handleRemove).toHaveBeenCalledWith("Banana")
        expect(handleRemove).toHaveBeenCalledTimes(1)
    })

    test("Muestra solo Seleccionar si no hay opciones", async () => {
        const handleAdd = jest.fn()
        const handleRemove = jest.fn()
        render(
            <MultipleSelector
                {...baseProps}
                options={[]}
                selected={[]}
                onAdd={handleAdd}
                onRemove={handleRemove}
            />
        )

        const user = userEvent.setup()
        const select = screen.getByRole("combobox", { name: baseProps.label }) as HTMLSelectElement
        const allOptions = screen.getAllByRole("option")

        expect(allOptions).toHaveLength(1)
        expect(screen.getByRole("option", { name: /seleccionar/i })).toBeInTheDocument()
        expect(select.value).toBe("Seleccionar")

        await user.click(screen.getByRole("button", { name: /agregar/i }))

        expect(handleAdd).not.toHaveBeenCalled()

        expect(screen.queryByRole("button", { name: /remove-/i })).not.toBeInTheDocument()
    })

    function MultipleSelectorHarness(props?: Partial<React.ComponentProps<typeof MultipleSelector>>) {
        const [sel, setSel] = React.useState<string[]>(["Manzana", "Banana"])
        return (<MultipleSelector
            {...baseProps}
            selected={sel}
            onAdd={(v) => setSel((s) => (s.includes(v) ? s : [...s, v]))}
            onRemove={(v) => setSel((s) => s.filter((x) => x !== v))}
            {...props}
        />
        )
    }

    test("Quita el chip al remover(integracion)", async () => {
        render(
        <MultipleSelectorHarness 
        />)

        const user = userEvent.setup()


        expect(screen.getByRole("button", { name: "remove-Manzana" })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "remove-Banana" })).toBeInTheDocument()

        await user.click(screen.getByRole("button", { name: "remove-Banana" }))

        expect(screen.queryByRole("button", { name: "remove-Banana" })).not.toBeInTheDocument()
        expect(screen.getByRole("button", { name: "remove-Manzana" })).toBeInTheDocument()
    })

    test("Agrega el chip al agregar(integracion)", async () => {
       render(
        <MultipleSelectorHarness 
        />)

        const user = userEvent.setup()
        const select = screen.getByRole("combobox", { name: baseProps.label }) as HTMLSelectElement

        expect(screen.queryByRole("button", { name: "remove-Naranja" })).not.toBeInTheDocument()

        await user.selectOptions(select, "Naranja")
        await user.click(screen.getByRole("button", { name: /agregar/i }))

        expect(await screen.findByRole("button", { name: "remove-Naranja" })).toBeInTheDocument()
    }) 
})