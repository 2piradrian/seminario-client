import type {
    CreateInstrumentReq,
    CreateInstrumentRes,
    DeleteInstrumentReq,
    EditInstrumentReq,
    EditInstrumentRes,
    GetInstrumentByIdReq,
    GetInstrumentByIdRes,
    InstrumentDatasourceI,
    InstrumentRepositoryI
} from "../../domain";
import { InstrumentApiDataSource } from "../datasource/instrument-api";


export class InstrumentRepository implements InstrumentRepositoryI {

    private dataSource: InstrumentDatasourceI;

    constructor(datasource: InstrumentDatasourceI = new InstrumentApiDataSource()) {
        this.dataSource = datasource;
    }

    public async getById(dto: GetInstrumentByIdReq): Promise<GetInstrumentByIdRes> {
        try {
            return await this.dataSource.getById(dto);
        } catch (error) {
            throw error;
        }
    }

    public async create(dto: CreateInstrumentReq): Promise<CreateInstrumentRes> {
        try {
            return await this.dataSource.create(dto);
        } catch (error) {
            throw error;
        }
    }

    public async edit(dto: EditInstrumentReq): Promise<EditInstrumentRes> {
        try {
            return await this.dataSource.edit(dto);
        } catch (error) {
            throw error;
        }
    }

    public async delete(dto: DeleteInstrumentReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        } catch (error) {
            throw error;
        }
    }
}
