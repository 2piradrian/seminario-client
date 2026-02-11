import type { CreateModerationReasonReq } from "../dto/moderation-reason/request/CreateModerationReasonReq";
import type { DeleteModerationReasonReq } from "../dto/moderation-reason/request/DeleteModerationReasonReq";
import type { EditModerationReasonReq } from "../dto/moderation-reason/request/EditModerationReasonReq";
import type { GetModerationReasonByIdReq } from "../dto/moderation-reason/request/GetModerationReasonByIdReq";
import type { CreateModerationReasonRes } from "../dto/moderation-reason/response/CreateModerationReasonRes";
import type { EditModerationReasonRes } from "../dto/moderation-reason/response/EditModerationReasonRes";
import type { GetModerationReasonByIdRes } from "../dto/moderation-reason/response/GetModerationReasonByIdRes";


export abstract class ModerationReasonDatasourceI {
    abstract getById(dto: GetModerationReasonByIdReq): Promise<GetModerationReasonByIdRes>;
    abstract create(dto: CreateModerationReasonReq): Promise<CreateModerationReasonRes>;
    abstract edit(dto: EditModerationReasonReq): Promise<EditModerationReasonRes>;
    abstract delete(dto: DeleteModerationReasonReq): Promise<void>;
}
