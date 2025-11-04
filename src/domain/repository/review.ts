import type { CreateReviewReq } from "../dto/review/request/CreateReviewReq";
import type { DeleteReviewReq } from "../dto/review/request/DeleteReviewReq";
import type { GetPageReviewsByReviewedIdReq } from "../dto/review/request/GetPageReviewsByReviewedIdReq";
import type { GetReviewsByAuthorReq } from "../dto/review/request/GetReviewsByAuthorReq";
import type { UpdateReviewReq } from "../dto/review/request/UpdateReviewReq";
import type { CreateReviewRes } from "../dto/review/response/CreateReviewRes";
import type { GetPageReviewsByReviewedIdRes } from "../dto/review/response/GetPageReviewsByReviewedIdRes";
import type { GetReviewsByAuthorRes } from "../dto/review/response/GetReviewsByAuthorRes";
import type { UpdateReviewRes } from "../dto/review/response/UpdateReviewRes";

export abstract class ReviewRepositoryI {
    abstract create(dto: CreateReviewReq): Promise<CreateReviewRes>;
    abstract delete(dto: DeleteReviewReq): Promise<void>;
    abstract update(dto: UpdateReviewReq): Promise<UpdateReviewRes>;
    abstract getReviewsByAuthor(dto: GetReviewsByAuthorReq): Promise<GetReviewsByAuthorRes>;
    abstract getPageReviewsByReviewedId(dto: GetPageReviewsByReviewedIdReq): Promise<GetPageReviewsByReviewedIdRes>;
    
}