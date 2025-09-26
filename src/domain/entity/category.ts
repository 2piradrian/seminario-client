export class Category {

    public constructor(
        public name: string
    ){}

    public static fromObject(object: {[key: string]: any}): Category {
        return new Category(
            object.name
        )
    };
    
}