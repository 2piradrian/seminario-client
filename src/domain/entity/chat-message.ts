import { User } from "./user";

export class ChatMessage {

    constructor(
        public id: string,
        public sender: User,
        public receiver: User,
        public content: string,
        public createdAt: Date,
    ){}

    public static fromObject(object: {[key: string]: any}): ChatMessage {
        if (!object) return null;

        return new ChatMessage(
            object.id,
            User.fromObject(object.sender),
            User.fromObject(object.receiver),
            object.content,
            new Date(object.createdAt)
        )
    };
    
}
