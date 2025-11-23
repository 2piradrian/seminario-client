import type { CreateReviewReq, CreateReviewRes, DeleteReviewReq, ReviewDataSourceI, ReviewRepositoryI, UpdateReviewReq, UpdateReviewRes } from "../../domain";
import type { GetPageReviewsByReviewedIdReq } from "../../domain/dto/review/request/GetPageReviewsByReviewedIdReq";
import type { GetReviewByIdReq } from "../../domain/dto/review/request/GetReviewByIdReq";
import type { GetReviewsByAuthorReq } from "../../domain/dto/review/request/GetReviewsByAuthorReq";
import type { GetPageReviewsByReviewedIdRes } from "../../domain/dto/review/response/GetPageReviewsByReviewedIdRes";
import type { GetReviewByIdRes } from "../../domain/dto/review/response/GetREviewByIdRes";
import type { GetReviewsByAuthorRes } from "../../domain/dto/review/response/GetReviewsByAuthorRes";
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

    public async getReviewsByAuthor(dto: GetReviewsByAuthorReq): Promise<GetReviewsByAuthorRes> {
        try {
            return await this.dataSource.getReviewsByAuthor(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async getReviewsByReviewedId(dto: GetPageReviewsByReviewedIdReq): Promise<GetPageReviewsByReviewedIdRes> {
        try {
            return await this.dataSource.getReviewsByReviewedId(dto);
        }
        catch(error) {
            throw error;
        }
    }

    public async getById(dto: GetReviewByIdReq): Promise<GetReviewByIdRes> {
        try{
            return await this.dataSource.getById(dto);
        }
        catch(error) {
            throw error;
        }
        
    }
}