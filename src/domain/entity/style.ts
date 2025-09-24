import { Optionable } from "./optionable";

export class Style extends Optionable{

    constructor(
        public id: string, 
        public name: string
    ){super(id, name)}

    public static fromObject(object: { id: string; name: string; }): Style {
        return new Style(
            object.id, 
            object.name
        )
    };
}