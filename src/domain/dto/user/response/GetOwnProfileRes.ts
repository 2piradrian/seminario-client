import type { Instrument } from "../../../entity/instrument";
import type { Style } from "../../../entity/style";

export interface GetOwnProfileRes {
    id: string;
    name: string;
    surname: string;
    email: string;
    memberSince: Date;
    lastLogin: Date;
    portraitImage: string;
    profileImage: string;
    longDescription: string;
    shortDescription: string;
    styles: Style[];
    instruments: Instrument[];
    followersCount: number;
    followingCount: number; 
    ownProfile: boolean;
    isFollowing: boolean;
}