import { Instrument } from "./instrument";
import { Profile } from "./profile";
import { Style } from "./style";

export class UserProfile {

    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public memberSince: Date,
        public portraitImage: string,
        public profileImage: string,
        public shortDescription: string,
        public longDescription: string,
        public styles: Style[],
        public instruments: Instrument[],
        public followersQuantity: number,
        public followingQuantity: number,
        public isOwnProfile: boolean,
        public isFollowing: boolean
    ){}

    public static fromObject(object: {[key: string]: any}): UserProfile {
        if (!object) return null;
        
        return new UserProfile(
            object.id, 
            object.name,
            object.surname, 
            object.memberSince, 
            object.portraitImage,
            object.profileImage,
            object.shortDescription,
            object.longDescription,
            (object.styles ?? []).map(Style.fromObject),
            (object.instruments ?? []).map(Instrument.fromObject),
            object.followersQuantity,
            object.followingQuantity,
            object.isOwnProfile, 
            object.isFollowing
        )
    };

    public toProfile(): Profile {
        return Profile.fromEntity(this, undefined);
    }
    
}