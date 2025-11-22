import { Optionable } from "./optionable";

export class PostType extends Optionable {

    constructor(
        public id: string, 
        public name: string
    ){
        super(id, name);
    }

    public static fromObject(object: {[key: string]: any}): PostType {
        return new PostType(
            object.id, 
            object.name
        )
    };
    
}