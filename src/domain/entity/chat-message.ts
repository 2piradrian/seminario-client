import { User } from "./user";

export class ChatMessage {

    constructor(
        public id: string,
        public senderId: string,
        public sender: User,
        public receiverId: string,
        public receiver: User,
        public content: string,
        public createdAt: Date,
    ){}

    public static fromObject(object: {[key: string]: any}): ChatMessage {
        if (!object) return null;

        return new ChatMessage(
            object.id,
            object.senderId,
            User.fromObject(object.sender),
            object.receiverId,
            User.fromObject(object.receiver),
            object.content,
            new Date(object.createdAt)
        )
    };
    
}
