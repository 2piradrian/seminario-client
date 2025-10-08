export class Status {

    constructor(
        public id: string,
        public name: string
    ){}

    public static fromObject(object: {[key: string]: any}): Status {
        return new Status(
            object.id,
            object.name
        )
};
 
}