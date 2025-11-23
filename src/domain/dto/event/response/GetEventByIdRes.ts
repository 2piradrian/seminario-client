import type { PageProfile } from "../../../entity/page-profile";
import type { UserProfile } from "../../../entity/user-profile";

export interface GetEventByIdRes {
    author: UserProfile;
    eventId: string;
    pageProfile: PageProfile;
    imageId: string;
    title: string;
    content: string;
    views: number;
    dateInit: Date;
    dateEnd: Date;
    createdAt: Date;
    isAssisting: boolean;
    assists: number;
}