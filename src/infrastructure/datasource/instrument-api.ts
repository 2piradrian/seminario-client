import { HTTPClient } from "../../core";
import {
    ErrorHandler,
    type CreateInstrumentReq,
    type CreateInstrumentRes,
    type DeleteInstrumentReq,
    type EditInstrumentReq,
    type EditInstrumentRes,
    type GetInstrumentByIdReq,
    type GetInstrumentByIdRes,
    type InstrumentDatasourceI
} from "../../domain";

export class InstrumentApiDataSource implements InstrumentDatasourceI {

    private httpClient: HTTPClient;

    constructor() {
        this.httpClient = new HTTPClient();
    }

    public async create(dto: CreateInstrumentReq): Promise<CreateInstrumentRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post(
                "/api/catalog/instruments",
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

    public async getById(dto: GetInstrumentByIdReq): Promise<GetInstrumentByIdRes> {
        try {
            const response = await this.httpClient.get(
                `/api/catalog/instruments/get-by-id/${dto.id}`,
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

    public async edit(dto: EditInstrumentReq): Promise<EditInstrumentRes> {
        try {
            const { session, id, ...payload } = dto;
            const response = await this.httpClient.put(
                `/api/catalog/instruments/${id}`,
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

    public async delete(dto: DeleteInstrumentReq): Promise<void> {
        try {
            const response = await this.httpClient.delete(
                `/api/catalog/instruments/${dto.id}`,
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
