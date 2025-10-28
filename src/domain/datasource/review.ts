import type { CreateReviewReq } from "../dto/review/request/CreateReviewReq";
import type { DeleteReviewReq } from "../dto/review/request/DeleteReviewReq";
import type { UpdateReviewReq } from "../dto/review/request/UpdateReviewReq";
import type { CreateReviewRes } from "../dto/review/response/CreateReviewRes";
import type { UpdateReviewRes } from "../dto/review/response/UpdateReviewRes";

export abstract class ReviewDataSourceI {
    abstract create(dto: CreateReviewReq): Promise<CreateReviewRes>;
    abstract delete(dto: DeleteReviewReq): Promise<void>;
    abstract update(dto: UpdateReviewReq): Promise<UpdateReviewRes>;
}