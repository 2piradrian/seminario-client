import type { CreateEventReq } from "../dto/event/request/CreateEventReq";
import type { EditEventReq } from "../dto/event/request/EditEventReq";
import type { GetEventByIdReq } from "../dto/event/request/GetEventByIdReq";
import type { CreateEventRes } from "../dto/event/response/CreateEventRes";
import type { EditEventRes } from "../dto/event/response/EditEventRes";
import type { GetEventByIdRes } from "../dto/event/response/GetEventByIdRes";

export abstract class EventDataSourceI {
    abstract create(dto: CreateEventReq): Promise<CreateEventRes>;
    abstract edit(dto: EditEventReq): Promise<EditEventRes>; 
    abstract getById(dto: GetEventByIdReq): Promise<GetEventByIdRes>;
}