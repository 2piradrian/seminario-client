import type { Instrument } from "./instrument";
import type { Style } from "./style";

export interface User {
    id: string; 
    name: string;
    surname: string;
    password: string;
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