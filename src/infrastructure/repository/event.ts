import { EventDataSourceI, EventRepositoryI, type CreateEventReq, type CreateEventRes, type EditEventReq, type EditEventRes, type GetEventByIdReq, type GetEventByIdRes, type GetEventAndAssistsPageReq, type GetEventAndAssistsPageRes, type ToggleAssistReq, type ToggleAssistRes, type DeleteEventReq} from "../../domain";
import { EventApiDataSource } from "../datasource/event-api";

export class EventRepository implements EventRepositoryI {

    private dataSource: EventDataSourceI;

    constructor(datasource: EventDataSourceI = new EventApiDataSource()) {
        this.dataSource = datasource;
    }

    public async delete(dto: DeleteEventReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        }
        catch (error) {
            throw error; 
        }
    }

    public async getById(dto: GetEventByIdReq): Promise<GetEventByIdRes> {
        try {
            return await this.dataSource.getById(dto);
        } 
        catch (error) {
            throw error;
        }
    }

    public async create(dto: CreateEventReq): Promise<CreateEventRes> {
        try {
            return await this.dataSource.create(dto);
        } 
        catch (error) {
            throw error; 
        }
    }
    
    public async edit(dto: EditEventReq): Promise<EditEventRes> {
        try {
               return await this.dataSource.edit(dto);
        } 
        catch (error) {
            throw error;
        }
    }

    public async getEventAndAssistsPage(dto: GetEventAndAssistsPageReq): Promise<GetEventAndAssistsPageRes> {
        try {
            return await this.dataSource.getEventAndAssistsPage(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async toggleAssist(dto: ToggleAssistReq): Promise<ToggleAssistRes> {
        try {
            return await this.dataSource.toggleAssist(dto);
        }
        catch (error) {
            throw error;
        }
    }
}