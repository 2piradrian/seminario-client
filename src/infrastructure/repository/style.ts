import type {
    CreateStyleReq,
    CreateStyleRes,
    DeleteStyleReq,
    EditStyleReq,
    EditStyleRes,
    GetStyleByIdReq,
    GetStyleByIdRes,
    StyleDatasourceI,
    StyleRepositoryI
} from "../../domain";
import { StyleApiDataSource } from "../datasource/style-api";


export class StyleRepository implements StyleRepositoryI {

    private dataSource: StyleDatasourceI;

    constructor(datasource: StyleDatasourceI = new StyleApiDataSource()) {
        this.dataSource = datasource;
    }

    public async getById(dto: GetStyleByIdReq): Promise<GetStyleByIdRes> {
        try {
            return await this.dataSource.getById(dto);
        } catch (error) {
            throw error;
        }
    }

    public async create(dto: CreateStyleReq): Promise<CreateStyleRes> {
        try {
            return await this.dataSource.create(dto);
        } catch (error) {
            throw error;
        }
    }

    public async edit(dto: EditStyleReq): Promise<EditStyleRes> {
        try {
            return await this.dataSource.edit(dto);
        } catch (error) {
            throw error;
        }
    }

    public async delete(dto: DeleteStyleReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        } catch (error) {
            throw error;
        }
    }
}
