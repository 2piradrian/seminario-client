import { Optionable } from "./optionable";

export class PageType extends Optionable {

    constructor(
        public id: string, 
        public name: string
    ){
        super(id, name);
    }

    public static fromObject(object: {[key: string]: any}): PageType {
        return new PageType(
            object.id, 
            object.name
        )
    };
    
}