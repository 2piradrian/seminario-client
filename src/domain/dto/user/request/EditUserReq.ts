export interface EditUserReq {
    token: string;
    name: string;
    surname: string;
    portraitImage?: string;
    profileImage?: string;
    shortDescription: string;
    longDescription: string;
    styles: string[];
    instruments: string[];
}
