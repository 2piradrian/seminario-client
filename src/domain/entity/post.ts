import { PageProfile } from "./page-profile.ts";
import { PostType } from "./post-type.ts";
import { Profile } from "./profile.ts";
import { User } from "./user.ts";

export class Post {

    constructor(
        public id: string,
        public title: string,
        public content: string,
        public views: number,
        public author: User,
        public pageProfile: PageProfile,
        public upvotersQuantity: number,
        public downvotersQuantity: number,
        public createdAt: Date,
        public updatedAt: Date,
        public imageId: string,
        public postType: PostType
    ){}

    public static fromObject(object: {[key: string]: any}): Post {
        return new Post(
            object.id || object.postId, 
            object.title, 
            object.content, 
            object.views, 
            User.fromObject(object.author),
            PageProfile.fromObject(object.pageProfile),
            object.upvotersQuantity,
            object.downvotersQuantity,
            new Date(object.createdAt), 
            new Date(object.updatedAt),
            object.imageId,
            PostType.fromObject(object.postType)
        )
    };

    public getProfile(): Profile {
        return Profile.fromEntity(this.author.profile, this.pageProfile);
    }
    
}
