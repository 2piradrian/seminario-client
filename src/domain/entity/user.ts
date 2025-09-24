import type { Instrument } from "./instrument";
import type { Style } from "./style";


export class User {

    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public email: string,
        public memberSince: Date,
        public lastLogin: Date,
        public portraitImage: string,
        public profileImage: string,
        public shortDescription: string,
        public longDescription: string,
        public styles: Style[],
        public instruments: Instrument[] 
    ){}

    public static fromObject(object: {id: string, name: string, surname: string, email: string, memberSince: Date, 
        lastLogin: Date, portraitImage: string, profileImage: string, shortDescription: string, longDescription: string, 
        styles: Style[], instruments: Instrument[] 
    }): User {
        return new User(
            object.id, 
            object.name,
            object.surname, 
            object.email,
            object.memberSince, 
            object.lastLogin,
            object.portraitImage,
            object.profileImage,
            object.shortDescription,
            object.longDescription,
            object.styles, 
            object.instruments
        )
    };
}

export class UserProfile {

    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public email: string,
        public memberSince: Date,
        public lastLogin: Date,
        public portraitImage: string,
        public profileImage: string,
        public shortDescription: string,
        public longDescription: string,
        public styles: Style[],
        public instruments: Instrument[] 
    ){}

    public static fromObject(object: {id: string, name: string, surname: string, email: string, memberSince: Date, 
        lastLogin: Date, portraitImage: string, profileImage: string, shortDescription: string, longDescription: string, 
        styles: Style[], instruments: Instrument[] 
    }): UserProfile {
        return new UserProfile(
            object.id, 
            object.name,
            object.surname, 
            object.email,
            object.memberSince, 
            object.lastLogin,
            object.portraitImage,
            object.profileImage,
            object.shortDescription,
            object.longDescription,
            object.styles, 
            object.instruments
        )
    };
}