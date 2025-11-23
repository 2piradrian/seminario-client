import { Optionable } from "./optionable";

export class Instrument extends Optionable {

    constructor(
        public id: string, 
        public name: string
    ){
        super(id, name);
    }

    public static fromObject(object: {[key: string]: any}): Instrument {
        if (!object) return null;

        return new Instrument(
            object.id, 
            object.name
        )
    };
    
}