import type { Session } from "../../../entity/session.ts";

export interface LeavePageReq {
  session: Session;
  pageId: string;
}
