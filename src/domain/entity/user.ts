import type { Instrument } from "./instrument";
import type { Style } from "./style";

export interface User {
    id: string; 
    name: string;
    surname: string;
    email: string;
    memberSince: Date;
    lastLogin: Date;
    portraitImage: string;
    profileImage: string;
    shortDescription: string;
    longDescription: string;
    styles: Style[];
    instruments: Instrument[]; 
}

export interface UserProfile {
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
}