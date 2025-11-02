import { HTTPClient } from "../../core";
import { ErrorHandler, type CreateReviewReq, type CreateReviewRes, type DeleteReviewReq, type ReviewDataSourceI, type UpdateReviewReq, type UpdateReviewRes } from "../../domain";
import type { GetReviewsByAuthorReq } from "../../domain/dto/review/request/GetReviewsByAuthorReq";
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

    public async getReviewsByAuthor(dto: GetReviewsByAuthorReq): Promise<GetReviewsByAuthorRes> {
        try {
            const response = await this.httpClient.get("/reviews/get-by-author", {... dto}, dto.session.getAccessToken());

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