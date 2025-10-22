import { Optionable } from "./optionable";

export class ContentType extends Optionable {
    constructor(
        public id: string,
        public name: string
    ){
        super(id, name);
    }

    public static fromObject(object: {[key: string]: any}): ContentType {
        return new ContentType( 
            object.id,
            object.name
        )
    };

}