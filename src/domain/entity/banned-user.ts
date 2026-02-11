import { User } from "./user";

export class BannedUser {

    constructor(
        public id: string,
        public bannedBy: User,
        public email: string,
        public reason: string,
        public createdAt: Date,
        public updatedAt: Date
    ){}

    public static fromObject(object: {[key: string]: any}): BannedUser {
        if (!object) return null;

        return new BannedUser(
            object.id,
            User.fromObject(object.bannedBy),
            object.email,
            object.reason,
            new Date(object.createdAt),
            new Date(object.updatedAt)
        )
    };
    
}
