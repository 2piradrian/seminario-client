import type { GetContentTypeByIdReq } from "../dto/catalog/request/GetContentTypeByIdReq";
import type { GetAllCategoryRes } from "../dto/catalog/response/GetAllCategoryRes";
import type { GetAllContentTypeRes } from "../dto/catalog/response/GetAllContentTypeRes";
import type { GetAllInstrumentRes } from "../dto/catalog/response/GetAllInstrumentRes";
import type { GetAllModerationReasonRes } from "../dto/catalog/response/GetAllModerationReasonRes";
import type { GetAllPageTypeRes } from "../dto/catalog/response/GetAllPageTypeRes";
import type { GetAllPostTypeRes } from "../dto/catalog/response/GetAllPostTypeRes";
import type { GetAllStyleRes } from "../dto/catalog/response/GetAllStyleRes";
import type { GetContentTypeByIdRes } from "../dto/catalog/response/GetContentTypeByIdRes";

export abstract class CatalogDataSourceI {
    abstract getAllStyle(): Promise<GetAllStyleRes>;
    abstract getAllInstrument(): Promise<GetAllInstrumentRes>;
    abstract getAllPageType(): Promise<GetAllPageTypeRes>;
    abstract getAllCategory(): Promise<GetAllCategoryRes>;
    abstract getAllContentType(): Promise<GetAllContentTypeRes>;
    abstract getAllPostType(): Promise<GetAllPostTypeRes>;
    abstract getAllModerationReason(): Promise<GetAllModerationReasonRes>;
    abstract getContentTypeById(dto: GetContentTypeByIdReq): Promise<GetContentTypeByIdRes>;
}
