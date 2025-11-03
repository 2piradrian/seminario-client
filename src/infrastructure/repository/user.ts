import type { EditUserReq, EditUserRes,GetUserByIdReq, GetUserByIdRes,
   UserDataSourceI, UserRepositoryI,} from "../../domain";
import { UserProfileApiDataSource } from "../datasource/user-api";

export class UserRepository implements UserRepositoryI {

    private dataSource: UserDataSourceI;

    constructor(dataSource: UserDataSourceI = new UserProfileApiDataSource()) {
        this.dataSource = dataSource;
    }

    public async getUserById(dto: GetUserByIdReq): Promise<GetUserByIdRes> {
        try {
            return await this.dataSource.getUserById(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async edit(dto: EditUserReq): Promise<EditUserRes> {
        try { 
            return await this.dataSource.edit(dto);
        }
        catch (error) {
            throw error;
        }
    }

    
}