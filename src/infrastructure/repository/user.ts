import { type EditUserReq, type EditUserRes, type GetUserByIdReq, type GetUserByIdRes,
   UserDataSourceI, UserRepositoryI, type GetAllStaffReq, type GetAllStaffRes, type DeleteUserReq,
   type GetUserMutualsFollowersReq, type GetUserMutualsFollowersRes} from "../../domain";
import { UserProfileApiDataSource } from "../datasource/user-api";

export class UserRepository implements UserRepositoryI {

    private dataSource: UserDataSourceI;

    constructor(dataSource: UserDataSourceI = new UserProfileApiDataSource()) {
        this.dataSource = dataSource;
    }

    public async getById(dto: GetUserByIdReq): Promise<GetUserByIdRes> {
        try {
            return await this.dataSource.getById(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async getAllStaff(dto: GetAllStaffReq): Promise<GetAllStaffRes> {
        try {
            return await this.dataSource.getAllStaff(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async update(dto: EditUserReq): Promise<EditUserRes> {
        try { 
            return await this.dataSource.update(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async delete(dto: DeleteUserReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        }
        catch (error) {
            throw error;
        }
    }
    
    public async getMutualsFollowers(dto: GetUserMutualsFollowersReq): Promise<GetUserMutualsFollowersRes> {
        try {
            return await this.dataSource.getMutualsFollowers(dto);
        }
        catch (error) {
            throw error;
        }
    }
}