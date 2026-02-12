import { PrefixedUUID } from "../../core";
import { NotificationContent } from "./notification-content";
import { ModerationReason } from "./moderation-reason";
import { User } from "./user";
import { EntityType } from "./uuid";

export class Notification {

    constructor(
        public id: string,
        public targetId: string,
        public sourceId: string,
        public reason: ModerationReason,
        public content: NotificationContent,
        public carriedOutBy: User,
        public createdAt: Date,
        public updatedAt: Date,
        public isRead: boolean
    ) {}

    public static fromObject(object: { [key: string]: any }): Notification {
        if (!object) return null;

        const parsedContent = NotificationContent.fromString(object.content);

        return new Notification(
            object.id,
            object.targetId,
            object.sourceId,
            ModerationReason.fromObject(object.reason),
            parsedContent,
            User.fromObject(object.carriedOutBy),
            object.createdAt ? new Date(object.createdAt) : null,
            object.updatedAt ? new Date(object.updatedAt) : null,
            object.isRead
        );
    }

    public buildMessage(): string {
        if (!this.content) return "Recibiste una nueva notificación.";

        const sourceType = PrefixedUUID.resolveType(this.sourceId);

        switch (this.content) {
            case NotificationContent.UPVOTE:
                return this.buildUpvoteMessage(sourceType);

            case NotificationContent.DOWNVOTE:
                return this.buildDownvoteMessage(sourceType);

            case NotificationContent.COMMENT:
                return this.buildCommentMessage(sourceType);

            case NotificationContent.FOLLOW:
                return "¡Tienes un nuevo seguidor!";

            case NotificationContent.ASSIST:
                return "¡Alguien ha confirmado una asistencia!.";

            case NotificationContent.PAGE_INVITATION:
                return "¡Te han invitado a formar parte de una pagina!";

            case NotificationContent.MODERATION:
                return this.buildModerationMessage(sourceType);

            default:
                return "Recibiste una nueva notificación.";
        }
    }

    private buildUpvoteMessage(source: EntityType): string {
        switch (source) {
            case EntityType.POST: return "¡Tu post ha recibido un upvote!";
            case EntityType.COMMENT: return "¡Tu comentario ha recibido un upvote!";
            case EntityType.IMAGE: return "¡Tu imagen ha recibido un upvote!";
            default: return "¡Has recibido un upvote!";
        }
    }

    private buildDownvoteMessage(source: EntityType): string {
        switch (source) {
            case EntityType.POST: return "Tu post recibió un downvote.";
            case EntityType.COMMENT: return "Tu comentario recibió un downvote.";
            case EntityType.IMAGE: return "Tu imagen recibió un downvote.";
            default: return "Has recibido un downvote.";
        }
    }

    private buildCommentMessage(source: EntityType): string {
        switch (source) {
            case EntityType.POST: return "Ha comentado tu post.";
            case EntityType.IMAGE: return "Ha comentado tu imagen.";
            case EntityType.COMMENT: return "Ha respondido a tu comentario.";
            default: return "Tienes un nuevo comentario.";
        }
    }

    private buildModerationMessage(source: EntityType): string {
        const reasonText = this.reason?.name ? ` Motivo: ${this.reason.name}.` : "";

        switch (source) {
            case EntityType.POST: return `Tu post fue eliminado por moderación.${reasonText}`;
            case EntityType.EVENT: return `Tu evento fue eliminado por moderación.${reasonText}`;
            case EntityType.PAGE: return `Tu página fue eliminada por moderación.${reasonText}`;
            case EntityType.COMMENT: return `Tu comentario fue eliminado por moderación.${reasonText}`;
            default: return `Se eliminó tu contenido por moderación.${reasonText}`;
        }
    }
}
