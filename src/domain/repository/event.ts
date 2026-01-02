import type { DeleteEventReq } from "../dto/event/request/DeleteEventReq";
import type { CreateEventReq } from "../dto/event/request/CreateEventReq";
import type { EditEventReq } from "../dto/event/request/EditEventReq";
import type { GetEventAndAssistsPageReq } from "../dto/event/request/GetEventAndAssistsPageReq";
import type { GetEventByIdReq } from "../dto/event/request/GetEventByIdReq";
import type { ToggleAssistReq } from "../dto/event/request/ToggleAssistReq";
import type { CreateEventRes } from "../dto/event/response/CreateEventRes";
import type { EditEventRes } from "../dto/event/response/EditEventRes";
import type { GetEventAndAssistsPageRes } from "../dto/event/response/GetEventAndAssistsPageRes";
import type { GetEventByIdRes } from "../dto/event/response/GetEventByIdRes";
import type { ToggleAssistRes } from "../dto/event/response/ToggleAssistRes";
import type { GetEventsByDateRangeReq } from "../dto/event/request/GetEventsByDateRangeReq";
import type { GetEventsByDateRangeRes } from "../dto/event/response/GetEventsByDateRangeRes";
import type { CancelEventReq } from "../dto/event/request/CancelEventReq";
import type { CancelEventRes } from "../dto/event/response/CancelEventRes";
import type { GetAssistantsByEventIdReq } from '../dto/event/request/GetAssistantsByEventIdReq';
import type { GetAssistantsByEventIdRes } from '../dto/event/response/GetAssistantsByEventIdRes';


export abstract class EventRepositoryI {
    abstract create(dto: CreateEventReq): Promise<CreateEventRes>;
    abstract edit(dto: EditEventReq): Promise<EditEventRes>; 
    abstract getById(dto: GetEventByIdReq): Promise<GetEventByIdRes>;
    abstract getEventAndAssistsPage(dto: GetEventAndAssistsPageReq): Promise<GetEventAndAssistsPageRes>; 
    abstract toggleAssist(dto: ToggleAssistReq): Promise<ToggleAssistRes>;
    abstract delete(dto: DeleteEventReq): Promise<void>;
    abstract getEventsByDateRange(dto: GetEventsByDateRangeReq): Promise<GetEventsByDateRangeRes>;
    abstract cancel(dto: CancelEventReq): Promise<CancelEventRes>;
    abstract getAssistantsByEventId(dto: GetAssistantsByEventIdReq): Promise<GetAssistantsByEventIdRes>
}
