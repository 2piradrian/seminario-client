import { Optionable } from "./optionable";

export class Instrument extends Optionable {

    constructor(
        public id: string, 
        public name: string
    ){
        super(id, name);
    }

    public static fromObject(object: {[key: string]: any}): Instrument {
        return new Instrument(
            object.id, 
            object.name
        )
    };
    
}