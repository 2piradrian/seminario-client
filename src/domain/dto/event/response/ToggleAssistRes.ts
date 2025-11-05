import { PageProfile } from './../../../entity/page-profile';
import type { UserProfile } from "../../../entity/user-profile";

export interface ToggleAssistRes {
    author: UserProfile;
    eventId: string;
    pageProfile: PageProfile;
    imageId: string;
    title: string;
    content: string;
    views: number;
    assistQuantity: number;
    createdAt: Date;
}