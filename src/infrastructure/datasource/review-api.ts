import { HTTPClient } from "../../core";
import { ErrorHandler, type CreateReviewReq, type CreateReviewRes, type DeleteReviewReq, type Error, type ReviewDataSourceI, type UpdateReviewReq, type UpdateReviewRes } from "../../domain";
import type { GetPageReviewsByReviewedIdReq } from "../../domain/dto/review/request/GetPageReviewsByReviewedIdReq";
import type { GetReviewByIdReq } from "../../domain/dto/review/request/GetReviewByIdReq";
import type { GetReviewsByAuthorReq } from "../../domain/dto/review/request/GetReviewsByAuthorReq";
import type { GetPageReviewsByReviewedIdRes } from "../../domain/dto/review/response/GetPageReviewsByReviewedIdRes";
import type { GetReviewByIdRes } from "../../domain/dto/review/response/GetREviewByIdRes";
import type { GetReviewsByAuthorRes } from "../../domain/dto/review/response/GetReviewsByAuthorRes";

export class ReviewApiDataSource implements ReviewDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async create(dto: CreateReviewReq): Promise<CreateReviewRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post("/api/reviews", payload, session.getAccessToken());
        
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getById(dto: GetReviewByIdReq): Promise<GetReviewByIdRes> {
        try{
            const response = await this.httpClient.get(`/api/reviews/get-by-id/${dto.reviewId}`, undefined, dto.session.getAccessToken());

            if(response.error) {
                throw ErrorHandler.handleError(response.error)
            }
            return response
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error)
        }
        
    }

    public async update(dto: UpdateReviewReq): Promise<UpdateReviewRes> {
        try {
            const { session, reviewId, ...payload } = dto;
            const response = await this.httpClient.put(`/api/reviews/${reviewId}`, payload, session.getAccessToken());
            
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async delete(dto: DeleteReviewReq): Promise<void> {
        try {
            const { session, id, ...payload } = dto;
            const response = await this.httpClient.delete(`/api/reviews/${id}`, payload, session.getAccessToken());
            
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
            // Backend returns 200 OK with no body
            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getReviewsByAuthor(dto: GetReviewsByAuthorReq): Promise<GetReviewsByAuthorRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/reviews/get-by-author", params, session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error)
            }

            return response
        }
        catch (error){
            throw ErrorHandler.handleError(error as Error)
        }
    }

    public async getReviewsByReviewedId(dto: GetPageReviewsByReviewedIdReq): Promise<GetPageReviewsByReviewedIdRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/reviews/get-by-reviewed", params, session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error)
            }
            return response
        }
        catch (error){
            throw ErrorHandler.handleError(error as Error)
        }
    }
}
