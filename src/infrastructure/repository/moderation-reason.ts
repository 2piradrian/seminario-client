import type {
    CreateModerationReasonReq,
    CreateModerationReasonRes,
    DeleteModerationReasonReq,
    EditModerationReasonReq,
    EditModerationReasonRes,
    GetModerationReasonByIdReq,
    GetModerationReasonByIdRes,
    ModerationReasonDatasourceI,
    ModerationReasonRepositoryI
} from "../../domain";
import { ModerationReasonApiDataSource } from "../datasource/moderation-reason-api";

export class ModerationReasonRepository
    implements ModerationReasonRepositoryI {

    private dataSource: ModerationReasonDatasourceI;

    constructor(
        datasource: ModerationReasonDatasourceI = new ModerationReasonApiDataSource()
    ) {
        this.dataSource = datasource;
    }

    public async getById(
        dto: GetModerationReasonByIdReq
    ): Promise<GetModerationReasonByIdRes> {
        try {
            return await this.dataSource.getById(dto);
        } catch (error) {
            throw error;
        }
    }

    public async create(
        dto: CreateModerationReasonReq
    ): Promise<CreateModerationReasonRes> {
        try {
            return await this.dataSource.create(dto);
        } catch (error) {
            throw error;
        }
    }

    public async edit(
        dto: EditModerationReasonReq
    ): Promise<EditModerationReasonRes> {
        try {
            return await this.dataSource.edit(dto);
        } catch (error) {
            throw error;
        }
    }

    public async delete(dto: DeleteModerationReasonReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        } catch (error) {
            throw error;
        }
    }
}
