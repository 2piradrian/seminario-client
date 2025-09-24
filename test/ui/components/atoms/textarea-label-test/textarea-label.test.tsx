import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TextAreaLabel from "../../../../../src/ui/components/atoms/textarea-label/textarea-label"

describe("TextAreaLabel", () => {
    const baseProps = {
        id: "descripcion",
        label: "Descripcion",
        placeholder: "Escribe una descripcion",
        required: true
    }

    test("Renderiza Label y TextArea", () => {
        render(
        <TextAreaLabel 
        {...baseProps}
        value=""
        />)

        const textarea = screen.getByLabelText("Descripcion")
        expect(textarea).toBeInTheDocument()
        expect(textarea).toHaveAttribute("id", "descripcion")
    })

    test("Muestra placeHolder", () => {
        render(
        <TextAreaLabel 
        {...baseProps}
        value="" 
        />)
        
        const textArea = screen.getByPlaceholderText("Escribe una descripcion")
        expect(textArea).toBeInTheDocument()
    })

    test("Aplica el atributo required", () => {
        const { rerender } = render(
        <TextAreaLabel
        {...baseProps}
        value=""
        required={true}
        />)

        const textArea = screen.getByLabelText("Descripcion")
        expect(textArea).toBeRequired()

        rerender(
        <TextAreaLabel
        {...baseProps}
        value=""
        required={false}
        />)

        expect(textArea).not.toBeRequired()
    })

    test("Actualiza el valor al escribir en el TextArea", async () => {
        render(
        <TextAreaLabel 
        {...baseProps}
        value="Valor Inicial"
        />)

        const user = userEvent.setup()
        const textArea = screen.getByLabelText("Descripcion") as HTMLTextAreaElement
        
        await user.clear(textArea)
        await user.type(textArea, "Nuevo Valor")

        expect(textArea.value).toBe("Nuevo Valor")
    })

    test("Muestra valor inicial si se proporciona", () => {
        render(
        <TextAreaLabel 
        {...baseProps}
        value="Valor Inicial"
        />)

        const textArea = screen.getByLabelText("Descripcion") as HTMLTextAreaElement
        expect(textArea.value).toBe("Valor Inicial")
    })

    test("Cuando el valor es undefined, se usa cadena vacia", () => {
        render(
        <TextAreaLabel 
        {...baseProps}
        value={undefined}
        />)

        const textArea = screen.getByLabelText("Descripcion") as HTMLTextAreaElement
        expect(textArea.value).toBe("")
    })

})