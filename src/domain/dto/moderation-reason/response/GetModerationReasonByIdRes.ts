import type { Instrument } from "../../../entity/instrument";
import type { ModerationReason } from "../../../entity/moderation-reason";

export interface GetModerationReasonByIdRes {
    moderationReason: ModerationReason;
}