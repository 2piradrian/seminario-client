import type { Session } from "../../../entity/session.ts";

export interface JoinPageReq {
  session: Session;
  pageId: string;
}
