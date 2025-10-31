import type { PageProfile } from "./page-profile";
import type { UserProfile } from "./user-profile";

export class Event {

    constructor(
        public id: string,
        public author: UserProfile,
        public pageProfile: PageProfile,
        public title: string, 
        public content: string,
        public imageId: string, 
        public dateInit: Date,
        public dateEnd: Date,
        public views: BigInteger,
        public createdAt: Date,
        public updatedAt: Date,
        public assist: UserProfile[],
    ){}

    public static fromObject(object: {[key: string]: any}): Event {
        return new Event(
            object.id || object.eventId,
            object.author,
            object.pageProfile, 
            object.title, 
            object.content, 
            object.imageId, 
            new Date(object.dateInit),
            new Date(object.dateEnd),
            object.views, 
            new Date(object.createdAt), 
            new Date(object.updatedAt),
            object.assist
        )
    };
}