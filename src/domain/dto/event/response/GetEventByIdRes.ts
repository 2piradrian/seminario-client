import type { User } from '../../../entity/user';
import type { PageProfile } from "../../../entity/page-profile";
import type { Status } from "../../../entity/status";

export interface GetEventByIdRes {
    author: User;
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
    assistsQuantity: number;
    status: Status;
}
