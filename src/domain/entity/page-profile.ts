import type { PageType } from "./page-type";
import type { Status } from "./status";
import type { UserProfile } from "./user-profile";

export class PageProfile {

    constructor(
        public id: string,
        public name: string,
        public portraitImage: string,
        public profileImage: string,
        public ownerId: string,
        public shortDescription: string,
        public longDescription: string,
        public status: Status,
        public pageType: PageType,
        public members: UserProfile[]
    ){}

    public static fromObject(object: {[key: string]: any}): PageProfile {
        return new PageProfile(
            object.id, 
            object.name,
            object.portraitImage,
            object.profileImage,
            object.ownerId,
            object.shortDescription,
            object.longDescription,
            object.status, 
            object.pageType,
            object.members 
        )
    };
    
}