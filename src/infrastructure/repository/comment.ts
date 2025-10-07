import { type CreateCommentReq, type CreateCommentRes, type DeleteCommentReq, type GetCommentPageReq, type GetCommentPageRes, type ToggleCommentVoteRes, type ToggleCommentVotesReq, CommentDatasourceI, CommentRepositoryI } from "../../domain";

import { CommentApiDataSource } from "../datasource/comment-api";

export class CommentRepository implements CommentRepositoryI {

    private dataSource: CommentDatasourceI;

    constructor(datasource: CommentDatasourceI = new CommentApiDataSource()) {
        this.dataSource = datasource;
    }

    public async getCommentPage(dto: GetCommentPageReq): Promise<GetCommentPageRes> {
        try {
            return await this.dataSource.getCommentPage(dto);
        } 
        catch (error) {
            throw error;
        }
    }

    public async create(dto: CreateCommentReq): Promise<CreateCommentRes> {
        try {
            return await this.dataSource.create(dto);
        }
        catch (error) {
            throw error; 
        }
    }

    public async delete(dto: DeleteCommentReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        }
        catch (error) {
            throw error; 
        }
    }

    public async toggleVotes(dto: ToggleCommentVotesReq): Promise<ToggleCommentVoteRes> {
        try {
            return await this.dataSource.toggleVotes(dto);
        }
        catch (error) {
            throw error;
        }
    }
}
