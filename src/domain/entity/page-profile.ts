import { PageType } from "./page-type";
import { Profile } from "./profile";
import { Status } from "./status";
import { User } from "./user";
import { UserProfile } from "./user-profile";

export class PageProfile {

    constructor(
        public id: string,
        public name: string,
        public portraitImage: string,
        public profileImage: string,
        public owner: User,
        public shortDescription: string,
        public longDescription: string,
        public status: Status,
        public pageType: PageType,
        public members: User[],
        public followersQuantity: number,
        public isFollowing: boolean,
    ){}

    public static fromObject(object: {[key: string]: any}): PageProfile {
        if (!object) return null;

        return new PageProfile(
            object.id, 
            object.name,
            object.portraitImage,
            object.profileImage,
            User.fromObject(object.owner),
            object.shortDescription,
            object.longDescription,
            Status.fromObject(object.status), 
            PageType.fromObject(object.pageType),
            (object.members ?? []).map((m: any) => User.fromObject(m)),
            object.followersQuantity,
            object.isFollowing
        )
    };

    public toProfile(): Profile {
        return Profile.fromEntity(undefined, this);
    }
    
}
