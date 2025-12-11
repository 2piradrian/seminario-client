import { HTTPClient } from "../../core";
import {
    ErrorHandler, type CreateEventReq, type CreateEventRes,
    type EditEventReq, type EditEventRes, type EventDataSourceI, type GetEventByIdReq,     type GetEventByIdRes,

    type GetEventAndAssistsPageReq, type GetEventAndAssistsPageRes, type ToggleAssistReq, type ToggleAssistRes,
    type DeleteEventReq, type GetEventsByDateRangeReq, type GetEventsByDateRangeRes
} from "../../domain";

export class EventApiDataSource implements EventDataSourceI {

    private httpClient: HTTPClient;

    constructor() {
        this.httpClient = new HTTPClient();
    }

    public async create(dto: CreateEventReq): Promise<CreateEventRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post("/api/events", payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getById(dto: GetEventByIdReq): Promise<GetEventByIdRes> {
        try {
            const response = await this.httpClient.get(`/api/events/get-by-id/${dto.eventId}`, undefined, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
    
    public async getEventAndAssistsPage(dto: GetEventAndAssistsPageReq): Promise<GetEventAndAssistsPageRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/events/get-events-and-assists-by-id", params, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async toggleAssist(dto: ToggleAssistReq): Promise<ToggleAssistRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.put("/api/events/toggle-assist", payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async edit(dto: EditEventReq): Promise<EditEventRes> {
        try {
            const { session, eventId, ...payload } = dto;
            const response = await this.httpClient.put(`/api/events/${eventId}`, payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
    
    public async delete(dto: DeleteEventReq): Promise<void> {
        try {
            const response = await this.httpClient.delete(`/api/events/${dto.eventId}`, undefined, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getEventsByDateRange(dto: GetEventsByDateRangeReq): Promise<GetEventsByDateRangeRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/events/get-events-by-date-range", params, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }


}
