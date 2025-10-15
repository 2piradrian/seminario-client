import type { Instrument } from "../../../entity/instrument";
import type { Session } from "../../../entity/session.ts";
import type { Style } from "../../../entity/style";

export interface EditUserReq {
    session: Session;
    name: string;
    surname: string;
    portraitImage?: string;
    profileImage?: string;
    shortDescription: string;
    longDescription: string;
    styles: Style[];
    instruments: Instrument[];
    followersCount: number;
    followingCount: number;
    ownProfile: boolean;
    isFollowing: boolean;
}
