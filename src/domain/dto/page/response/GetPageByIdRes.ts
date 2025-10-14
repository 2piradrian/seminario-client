import type { PageType } from "../../../entity/page-type";

export interface GetPageByIdRes {
    id: string;
    name: string;
    portraitImage: string;
    profileImage: string;
    shortDescription: string;
    longDescription: string;
    ownerId: string;
    members: string[];
    pageType: PageType;
    followersCount: number;
}
