import type { GetAllCategoryRes } from "./../dto/catalog/response/GetAllCategoryRes";
import type { GetAllPageTypeRes } from "../dto/catalog/response/GetAllPageTypeRes";
import type { GetAllInstrumentRes } from "../dto/catalog/response/GetAllInstrumentRes";
import type { GetAllStyleRes } from "../dto/catalog/response/GetAllStyleRes";

export abstract class CatalogRepositoryI {
    abstract getAllStyle(): Promise<GetAllStyleRes>;
    abstract getAllInstrument(): Promise<GetAllInstrumentRes>;
    abstract getAllPageType(): Promise<GetAllPageTypeRes>; 
    abstract getAllCategory(): Promise<GetAllCategoryRes>;
}