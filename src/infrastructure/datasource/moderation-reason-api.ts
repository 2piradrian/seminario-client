import { HTTPClient } from "../../core";
import {
    ErrorHandler,
    type CreateModerationReasonReq,
    type CreateModerationReasonRes,
    type DeleteModerationReasonReq,
    type EditModerationReasonReq,
    type EditModerationReasonRes,
    type GetModerationReasonByIdReq,
    type GetModerationReasonByIdRes,
    type ModerationReasonDatasourceI
} from "../../domain";

export class ModerationReasonApiDataSource
    implements ModerationReasonDatasourceI {

    private httpClient: HTTPClient;

    constructor() {
        this.httpClient = new HTTPClient();
    }

    public async create(
        dto: CreateModerationReasonReq
    ): Promise<CreateModerationReasonRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post(
                "/api/catalog/moderation-reasons",
                payload,
                session.getAccessToken()
            );

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getById(
        dto: GetModerationReasonByIdReq
    ): Promise<GetModerationReasonByIdRes> {
        try {
            const response = await this.httpClient.get(
                `/api/catalog/moderation-reasons/get-by-id/${dto.id}`,
                undefined,
                dto.session.getAccessToken()
            );

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async edit(
        dto: EditModerationReasonReq
    ): Promise<EditModerationReasonRes> {
        try {
            const { session, id, ...payload } = dto;
            const response = await this.httpClient.put(
                `/api/catalog/moderation-reasons/${id}`,
                payload,
                session.getAccessToken()
            );

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async delete(dto: DeleteModerationReasonReq): Promise<void> {
        try {
            const response = await this.httpClient.delete(
                `/api/catalog/moderation-reasons/${dto.id}`,
                undefined,
                dto.session.getAccessToken()
            );

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
}
