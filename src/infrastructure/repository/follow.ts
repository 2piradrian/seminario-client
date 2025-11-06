import { type GetFollowerPageReq,type GetFollowerPageRes,type GetFollowingPageReq,type GetFollowingPageRes,type ToggleFollowReq,FollowDatasourceI, FollowRepositoryI, 
} from "../../domain";
import { FollowApiDataSource } from "../datasource/follow-api";

export class FollowRepository implements FollowRepositoryI {
    
    private dataSource: FollowDatasourceI;

    constructor(datasource: FollowDatasourceI = new FollowApiDataSource()) {
        this.dataSource = datasource;
    }
    
    public async getFollowerPage(dto: GetFollowerPageReq): Promise<GetFollowerPageRes> {
        try {
            return await this.dataSource.getFollowerPage(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async getFollowingPage(dto: GetFollowingPageReq): Promise<GetFollowingPageRes> {
        try {
            return await this.dataSource.getFollowingPage(dto);
        } 
        catch (error) {
            throw error;
        }
    }

    public async toggleFollow(dto: ToggleFollowReq): Promise<void> {
        try {
            return await this.dataSource.toggleFollow(dto);
        }
        catch (error) {
            throw error; 
        }
    }
}
