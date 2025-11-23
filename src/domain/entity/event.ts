import { PageProfile } from "./page-profile";
import { Profile } from "./profile";
import { User } from "./user";

export class Event {

    constructor(
        public id: string,
        public author: User,
        public pageProfile: PageProfile,
        public title: string, 
        public content: string,
        public imageId: string, 
        public dateInit: Date,
        public dateEnd: Date,
        public views: BigInteger,
        public createdAt: Date,
        public updatedAt: Date,
        public assistsQuantity: number,
        public isAssisting: boolean
    ){}

    public static fromObject(object: {[key: string]: any}): Event {
        if (!object) return null;


        return new Event(
            object.id || object.eventId,
            User.fromObject(object.author),
            PageProfile.fromObject(object.pageProfile), 
            object.title, 
            object.content, 
            object.imageId, 
            Event.parseDateOnly(object.dateInit),
            Event.parseDateOnly(object.dateEnd),
            object.views, 
            new Date(object.createdAt), 
            new Date(object.updatedAt),
            object.assistsQuantity,
            object.isAssisting
        )
    };

    private static parseDateOnly = (value: string) => {
            const [y, m, d] = value.split("T")[0].split("-").map(Number);
            return new Date(y, m - 1, d);
        };

    public getProfile(): Profile {
        return Profile.fromEntity(this.author.profile, this.pageProfile);
    }

}