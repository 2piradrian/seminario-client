import type { CreateInstrumentReq } from "../dto/instrument/request/CreateInstrumentReq";
import type { DeleteInstrumentReq } from "../dto/instrument/request/DeletePostTypeReq";
import type { EditInstrumentReq } from "../dto/instrument/request/EditInstrumentReq";
import type { GetInstrumentByIdReq } from "../dto/instrument/request/GetInstrumentByIdReq";
import type { CreateInstrumentRes } from "../dto/instrument/response/CreateInstrumentRes";
import type { EditInstrumentRes } from "../dto/instrument/response/EditPostTypeRes";
import type { GetInstrumentByIdRes } from "../dto/instrument/response/GetPostTypeByIdRes";


export abstract class InstrumentDatasourceI {
    abstract getById(dto: GetInstrumentByIdReq): Promise<GetInstrumentByIdRes>;
    abstract create(dto: CreateInstrumentReq): Promise<CreateInstrumentRes>;
    abstract edit(dto: EditInstrumentReq): Promise<EditInstrumentRes>;
    abstract delete(dto: DeleteInstrumentReq): Promise<void>;
}
