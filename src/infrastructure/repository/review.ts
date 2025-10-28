import type { CreateReviewReq, CreateReviewRes, DeleteReviewReq, ReviewDataSourceI, ReviewRepositoryI, UpdateReviewReq, UpdateReviewRes } from "../../domain";
import { ReviewApiDataSource } from "../datasource/review-api";

export class ReviewRepository implements ReviewRepositoryI {

    private dataSource: ReviewDataSourceI;

    constructor(datasource: ReviewDataSourceI = new ReviewApiDataSource()) {
        this.dataSource = datasource;
    }

    public async create(dto: CreateReviewReq): Promise<CreateReviewRes> {
        try {
            return await this.dataSource.create(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async delete(dto: DeleteReviewReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async update(dto: UpdateReviewReq): Promise<UpdateReviewRes> {
        try {
            return await this.dataSource.update(dto);
        }
        catch (error) {
            throw error;
        }
    }
}