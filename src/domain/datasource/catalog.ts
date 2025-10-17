import type { GetContentTypeByIdReq } from "../dto/catalog/request/GetContentTypeByIdReq";
import type { GetAllCategoryRes } from "../dto/catalog/response/GetAllCategoryRes";
import type { GetAllContentTypeRes } from "../dto/catalog/response/GetAllContentTypeRes";
import type { GetAllInstrumentRes } from "../dto/catalog/response/GetAllInstrumentRes";
import type { GetAllPageTypeRes } from "../dto/catalog/response/GetAllPageTypeRes";
import type { GetAllStyleRes } from "../dto/catalog/response/GetAllStyleRes";
import type { GetContentTypeByIdRes } from "../dto/catalog/response/GetContentTypeByIdRes";

export abstract class CatalogDataSourceI {
    abstract getAllStyle(): Promise<GetAllStyleRes>;
    abstract getAllInstrument(): Promise<GetAllInstrumentRes>;
    abstract getAllPageType(): Promise<GetAllPageTypeRes>;
    abstract getAllCategory(): Promise<GetAllCategoryRes>;
    abstract getAllContentType(): Promise<GetAllContentTypeRes>;
    abstract getContentTypeById(dto: GetContentTypeByIdReq): Promise<GetContentTypeByIdRes>;
}