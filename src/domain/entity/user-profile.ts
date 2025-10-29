import type { Instrument } from "./instrument";
import type { Style } from "./style";

export class UserProfile {

    constructor(
        public id: string,
        public email: string,
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
        public ownProfile: boolean,
        public isFollowing: boolean
    ){}

    public static fromObject(object: {[key: string]: any}): UserProfile {
        return new UserProfile(
            object.id, 
            object.email,
            object.name,
            object.surname, 
            object.memberSince, 
            object.portraitImage,
            object.profileImage,
            object.shortDescription,
            object.longDescription,
            object.styles, 
            object.instruments,
            object.followersQuantity,
            object.followingQuantity,
            object.ownProfile, 
            object.isFollowing
        )
    };
    
}