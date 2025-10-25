import { EventDataSourceI, EventRepositoryI, type CreateEventReq, type CreateEventRes, type EditEventReq, type EditEventRes, type GetEventByIdReq, type GetEventByIdRes } from "../../domain";
import { EventApiDataSource } from "../datasource/event-api";

export class EventRepository implements EventRepositoryI {

    private dataSource: EventDataSourceI;

    constructor(datasource: EventRepositoryI = new EventApiDataSource()) {
        this.dataSource = datasource;
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
}