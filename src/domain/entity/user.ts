
export class User {

    constructor(
        public id: string,
        public email: string,
    ){}

    public static fromObject(object: {[key: string]: any}): User {
        return new User(
            object.id, 
            object.name,
        )
    };
    
}