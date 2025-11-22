import { Optionable } from "./optionable";

export class Category extends Optionable {

    public constructor(
        public id: string,
        public name: string
    ){
        super(id, name);
    }

    public static fromObject(object: {[key: string]: any}): Category {
        if (!object) return null;

        return new Category(
            object.id,
            object.name
        )
    };
    
}