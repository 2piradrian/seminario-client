export interface GetOwnProfileRes {
    id: string;
    name: string;
    surname: string;
    email: string;
    memberSince: Date;
    lastLogin: Date;
    portraitImage: string;
    profileImage: string;
}