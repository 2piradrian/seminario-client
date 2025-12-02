import { User } from "./user";

export class Chat {
    constructor(
        public id: string,
        public lastMessage: string,
        public isMine: boolean,
        public user: User
    ){}

    public static fromObject(object: {[key: string]: any}): Chat {
        if (!object) return null;

        return new Chat(
            object.id,
            object.lastMessage,
            object.isMine,
            User.fromObject(object.user),
        )
    }
}