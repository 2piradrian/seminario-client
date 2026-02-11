import type { ModerationReason } from "./moderation-reason";
import { User } from "./user";

export class BannedUser {

    constructor(
        public id: string,
        public bannedBy: string,
        public email: string,
        public reason: ModerationReason,
        public createdAt: Date,
        public updatedAt: Date
    ){}

    public static fromObject(object: {[key: string]: any}): BannedUser {
        if (!object) return null;

        return new BannedUser(
            object.id,
           object.bannedBy,
            object.email,
            object.reason,
            new Date(object.createdAt),
            new Date(object.updatedAt)
        )
    };
    
}
