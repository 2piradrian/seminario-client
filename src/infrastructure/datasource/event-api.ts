import { HTTPClient } from "../../core";
import { ErrorHandler, type GetOwnEventPageReq, type GetOwnEventPageRes, type CreateEventReq, type CreateEventRes,
     type EditEventReq, type EditEventRes, type EventDataSourceI, type GetEventByIdReq, type GetEventByIdRes, type GetEventAndAssistsPageReq, type GetEventAndAssistsPageRes } from "../../domain";

export class EventApiDataSource implements EventDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getOwnEventPage(dto: GetOwnEventPageReq): Promise<GetOwnEventPageRes> {
        try {
            const response = await this.httpClient.post("/events/get-own-events", { ... dto}, dto.session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getById(dto: GetEventByIdReq): Promise<GetEventByIdRes> {
        try {
            const response = await this.httpClient.get("/events/get-by-id", dto.eventId, dto.session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }   

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async create(dto: CreateEventReq): Promise<CreateEventRes> {
            try {
                const response = await this.httpClient.post("/events/create", { ... dto}, dto.session.getAccessToken());
    
                if (response.error){
                    throw ErrorHandler.handleError(response.error);
                }
    
                return response; 
            } catch (error) {
                throw ErrorHandler.handleError(error as Error);
            }
        }
    
    public async edit(dto: EditEventReq): Promise<EditEventRes> {
        try {
            const response = await this.httpClient.put("/events/edit", { ... dto}, dto.session.getAccessToken());

            if (response.error){
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
            const response = await this.httpClient.post("/events/get-events-and-assists-by-id", {...dto}, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

}