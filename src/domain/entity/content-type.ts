import { Optionable } from "./optionable";

export class ContentType extends Optionable {
    
    static readonly POSTS = "POSTS";
    static readonly EVENTS = "EVENTS";
    static readonly REVIEWS = "REVIEWS";
    static readonly PAGES = "PAGES";
    static readonly USERS = "USERS";

    constructor(
        public override id: string,
        public override name: string
    ) {
        super(id, name);
    }

    public static getList(): ContentType[] {
        return [
            new ContentType(ContentType.POSTS, "Posts"),
            new ContentType(ContentType.EVENTS, "Eventos"),
            new ContentType(ContentType.REVIEWS, "Reseñas"),
            new ContentType(ContentType.PAGES, "Páginas"),
            new ContentType(ContentType.USERS, "Usuarios"),
        ];
    }

    public static fromObject(object: { [key: string]: any }): ContentType {
        if (!object) return null;

        return new ContentType(object.id, object.name);
    }
}
