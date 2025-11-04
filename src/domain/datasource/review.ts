import type { CreateReviewReq } from "../dto/review/request/CreateReviewReq";
import type { DeleteReviewReq } from "../dto/review/request/DeleteReviewReq";
import type { GetPageReviewsByReviewedIdReq } from "../dto/review/request/GetPageReviewsByReviewedIdReq";
import type { GetReviewByIdReq } from "../dto/review/request/GetReviewByIdReq";
import type { GetReviewsByAuthorReq } from "../dto/review/request/GetReviewsByAuthorReq";
import type { UpdateReviewReq } from "../dto/review/request/UpdateReviewReq";
import type { CreateReviewRes } from "../dto/review/response/CreateReviewRes";
import type { GetPageReviewsByReviewedIdRes } from "../dto/review/response/GetPageReviewsByReviewedIdRes";
import type { GetReviewByIdRes } from "../dto/review/response/GetREviewByIdRes";
import type { GetReviewsByAuthorRes } from "../dto/review/response/GetReviewsByAuthorRes";
import type { UpdateReviewRes } from "../dto/review/response/UpdateReviewRes";

export abstract class ReviewDataSourceI {
    abstract create(dto: CreateReviewReq): Promise<CreateReviewRes>;
    abstract delete(dto: DeleteReviewReq): Promise<void>;
    abstract update(dto: UpdateReviewReq): Promise<UpdateReviewRes>;
    abstract getReviewByAuthor(dto: GetReviewsByAuthorReq): Promise<GetReviewsByAuthorRes>;
    abstract getPageReviewsByReviewedId(dto: GetPageReviewsByReviewedIdReq): Promise<GetPageReviewsByReviewedIdRes>;
    abstract getReviewById(dto: GetReviewByIdReq): Promise<GetReviewByIdRes>;
}