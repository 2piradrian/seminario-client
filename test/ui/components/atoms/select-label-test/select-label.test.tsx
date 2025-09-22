import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SelectLabel from "../../../../../src/ui/components/atoms/select-label/select-label"

describe ("SelectLabel", () => {
    const values = ["Seleccionar", "Guitarra", "Bateria", "Teclado", "Bajo"]

    test("Renderiza correctamente label con opciones", () => {
        render(
            <SelectLabel
                id="instrumento"
                label="Instrumento"
                value={""}
                values={values}
            />
        )

        expect(screen.getByLabelText("Instrumento")).toBeInTheDocument()

        values.forEach((value) => {
            expect(screen.getByRole("option", {name: value})).toBeInTheDocument()    
        })
    })

    test("Muestra el valor pasado por props", () => {
        render(
            <SelectLabel
                id="instrumento"
                label="Instrumento"
                value="Bateria"
                values={values}
            />
        )

        const select = screen.getByRole("combobox") as HTMLSelectElement
        expect(select.value).toBe("Bateria")
    })

    test("Cambia el valor seleccionado al hacer click en una opcion", async () => {
        render(
            <SelectLabel
                id="instrumento"
                label="Instrumento"
                value={""}
                values={values}
            />
        )
        
        const user = userEvent.setup()
        const select = screen.getByRole("combobox") as HTMLSelectElement
        await user.selectOptions(select, "Teclado")

        expect(select.value).toBe("Teclado")
    })
})