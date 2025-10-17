import type { EditUserReq } from "../dto/user/request/EditUserReq";
import type { GetFollowerPageReq } from "../dto/user/request/GetFollowerPageReq";
import type { GetFollowingPageReq } from "../dto/user/request/GetFollowingPageReq";
import type { GetOwnProfileReq } from "../dto/user/request/GetOwnProfile";
import type { GetUserByIdReq } from "../dto/user/request/GetUserByIdReq";
import type { ToggleFollowReq } from "../dto/user/request/ToggleFollowReq";
import type { EditUserRes } from "../dto/user/response/EditUserRes";
import type { GetFollowerPageRes } from "../dto/user/response/GetFollowerPageRes";
import type { GetFollowingPageRes } from "../dto/user/response/GetFollowingPageRes";
import type { GetOwnProfileRes } from "../dto/user/response/GetOwnProfileRes";
import type { GetUserByIdRes } from "../dto/user/response/GetUserByIdRes";

export abstract class UserProfileRepositoryI {
    abstract edit(dto: EditUserReq): Promise<EditUserRes>;
    abstract getUserById(dto: GetUserByIdReq): Promise<GetUserByIdRes>;
    abstract getOwnProfile(dto: GetOwnProfileReq): Promise<GetOwnProfileRes>;
    abstract toggleFollow(dto: ToggleFollowReq): Promise<void>;
    abstract getFollowers(dto: GetFollowerPageReq): Promise<GetFollowerPageRes>;
    abstract getFollowing(dto: GetFollowingPageReq): Promise<GetFollowingPageRes>;
}
