import type { Status } from "./status";
import type { UserProfile } from "./user-profile";

export class User {

    constructor(
        public id: string,
        public email: string,
        public status: Status,
        public profile: UserProfile,
        public role: string
    ){}

    public static fromObject(object: {[key: string]: any}): User {
        return new User(
            object.id, 
            object.email,
            object.status,
            object.profile,
            object.role
        )
    };
    
}