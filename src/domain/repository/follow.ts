import type { GetFollowerPageReq } from '../dto/follow/request/GetFollowerPageReq';
import type { GetFollowerPageRes } from '../dto/follow/response/GetFollowerPageRes';
import type { GetFollowingPageReq } from '../dto/follow/request/GetFollowingPageReq';
import type { GetFollowingPageRes } from '../dto/follow/response/GetFollowingPageRes';
import type { ToggleFollowReq } from '../dto/follow/request/ToggleFollowReq';

export abstract class FollowRepositoryI {
    abstract getFollowerPage(dto: GetFollowerPageReq): Promise<GetFollowerPageRes>;
    abstract getFollowingPage(dto: GetFollowingPageReq): Promise<GetFollowingPageRes>;
    abstract toggleFollow(dto: ToggleFollowReq): Promise<void>;
}
