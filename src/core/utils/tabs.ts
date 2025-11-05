import { Role } from "../../domain";

export const Tabs = {
    profile: ["Posts", "Eventos", "Reseñas"],
    staff: [
        { id: Role.ADMIN, label: "Administradores" },
        { id: Role.MODERATOR, label: "Moderadores" },
    ],
};
