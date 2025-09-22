import type { UserDataSourceI } from "../../domain/datasource/users";
import type { UserRepositoryI } from "../../domain/repository/users";

export class UserRepository implements UserRepositoryI {
    private dataSource: UserDataSourceI
}