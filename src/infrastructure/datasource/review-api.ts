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
            const response = await this.httpClient.post("/reviews/create", {...dto}, dto.session.getAccessToken());
        
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
            const response = await this.httpClient.delete("/reviews/delete", {...dto}, dto.session.getAccessToken());
            
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async update(dto: UpdateReviewReq): Promise<UpdateReviewRes> {
        try {
            const response = await this.httpClient.put("/reviews/update", {...dto}, dto.session.getAccessToken());
            
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getReviewByAuthor(dto: GetReviewsByAuthorReq): Promise<GetReviewsByAuthorRes> {
        try {
            const response = await this.httpClient.post("/reviews/get-by-author", {... dto}, dto.session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error)
            }

            return response
        }
        catch (error){
            throw ErrorHandler.handleError(error as Error)
        }
    }

    public async getPageReviewsByReviewedId(dto: GetPageReviewsByReviewedIdReq): Promise<GetPageReviewsByReviewedIdRes> {
        try {
            const response = await this.httpClient.post("/reviews/get-by-reviewed", {...dto}, dto.session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error)
            }
            return response
        }
        catch (error){
            throw ErrorHandler.handleError(error as Error)
        }
    }

    public async getReviewById(dto: GetReviewByIdReq): Promise<GetReviewByIdRes> {
        try{
            const response = await this.httpClient.get("/get-by-id/{reviewId}", {...dto}, dto.session.getAccessToken());

            if(response.error) {
                throw ErrorHandler.handleError(response.error)
            }
            return response
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error)
        }
        
    }
}