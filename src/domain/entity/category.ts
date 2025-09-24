export class Category {

    public constructor(
        public name: string
    ){}

    public static fromObject(object: {name: string}): Category {
        return new Category(
            object.name
        )
    };
}