import { Optionable } from "./optionable";

export class Style extends Optionable {

    constructor(
        public id: string, 
        public name: string
    ){
        super(id, name);
    }

    public static fromObject(object: {[key: string]: any}): Style {
        return new Style(
            object.id, 
            object.name
        )
    };
    
}