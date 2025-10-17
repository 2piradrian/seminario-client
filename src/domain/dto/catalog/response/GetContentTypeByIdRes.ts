import type { ContentType } from "../../../entity/content-type";

export interface GetContentTypeByIdRes {
    id: string
    name: string;
    contentType: ContentType;
}