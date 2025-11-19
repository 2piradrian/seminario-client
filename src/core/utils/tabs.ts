import { ContentType, Role } from "../../domain";

export const Tabs = {
    content: [
        { id: ContentType.POSTS, label: "Posts" },
        { id: ContentType.EVENTS, label: "Eventos" },
        { id: ContentType.REVIEWS, label: "Reseñas" },
        { id: ContentType.PAGES, label: "Páginas" },
        { id: ContentType.USERS, label: "Usuarios" },
    ],
    staff: [
        { id: Role.ADMIN, label: "Administradores" },
        { id: Role.MODERATOR, label: "Moderadores" },
    ],
};