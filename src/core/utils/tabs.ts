import { ContentType, Role } from "../../domain";

export const Tabs = {
    content: [
        { id: ContentType.POSTS, label: "Posts" },
        { id: ContentType.EVENTS, label: "Eventos" },
        { id: ContentType.REVIEWS, label: "Reseñas" },
    ],
    staff: [
        { id: Role.ADMIN, label: "Administradores" },
        { id: Role.MODERATOR, label: "Moderadores" },
    ],
    results: [
        { id: ContentType.POSTS, label: "Posts" },
        { id: ContentType.USERS, label: "Usuarios" },
        { id: ContentType.EVENTS, label: "Eventos" },
        { id: ContentType.PAGES, label: "Páginas" },
    ],
};