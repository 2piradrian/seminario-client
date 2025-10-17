export class ContentType {
    constructor(
        public id: string,
        public name: string
    ){}

    public static fromObject(
        object: {[key: string]: any}): ContentType {
            return new ContentType( 
                object.id,
                object.name
            )
        };
    }