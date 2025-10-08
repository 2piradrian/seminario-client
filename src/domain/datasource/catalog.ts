import type { GetAllCategoryRes } from "../dto/catalog/response/GetAllCategoryRes";
import type { GetAllInstrumentRes } from "../dto/catalog/response/GetAllInstrumentRes";
import type { GetAllPageTypeRes } from "../dto/catalog/response/GetAllPageTypeRes";
import type { GetAllStyleRes } from "../dto/catalog/response/GetAllStyleRes";

export abstract class CatalogDataSourceI {
    abstract getAllStyle(): Promise<GetAllStyleRes>;
    abstract getAllInstrument(): Promise<GetAllInstrumentRes>;
    abstract getAllPageType(): Promise<GetAllPageTypeRes>;
    abstract getAllCategory(): Promise<GetAllCategoryRes>;
}