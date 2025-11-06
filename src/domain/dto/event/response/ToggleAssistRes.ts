import { PageProfile } from './../../../entity/page-profile';
import type { User } from '../../../entity/user';

export interface ToggleAssistRes {
    author: User;
    eventId: string;
    pageProfile: PageProfile;
    imageId: string;
    title: string;
    content: string;
    views: number;
    createdAt: Date;
    isAssisting: boolean;
}