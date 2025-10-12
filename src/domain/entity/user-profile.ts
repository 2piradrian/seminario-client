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
        public followersCount: number,
        public followingCount: number
    ){}

    public static fromObject(object: {[key: string]: any}): UserProfile {
        return new UserProfile(
            object.id, 
            object.name,
            object.surname, 
            object.email,
            object.memberSince, 
            object.portraitImage,
            object.profileImage,
            object.shortDescription,
            object.longDescription,
            object.styles, 
            object.instruments,
            object.followersCount,
            object.followingCount
        )
    };
    
}