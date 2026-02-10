import { PrefixedUUID } from "../../core";
import { NotificationContent } from "./notification-content";
import { User } from "./user";
import { EntityType } from "./uuid";
import type { ModerationReason } from "./moderation-reason";

export class Notification {

    constructor(
        public id: string,
        public targetId: string,
        public sourceId: string,
        public content: NotificationContent,
        public carriedOutBy: User,
        public moderationReason: ModerationReason, 
        public createdAt: Date,
        public updatedAt: Date,
        public isRead: boolean
    ) {}

    public static fromObject(object: { [key: string]: any }): Notification {
        if (!object) return null;

        return new Notification(
            object.id,
            object.targetId,
            object.sourceId,
            NotificationContent.fromString(object.content),
            User.fromObject(object.carriedOutBy),
            object.moderationReason,
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

    private buildModerationMessage(source: EntityType): string {
        const reason = this.moderationReason ? this.moderationReason.name : "incumplimiento de normas";
        
        switch (source) {
            case EntityType.POST: 
                return `Tu post ha sido eliminado. Razón: ${reason}.`;
            case EntityType.COMMENT: 
                return `Tu comentario ha sido eliminado. Razón: ${reason}.`;
            case EntityType.EVENT: 
                return `Tu evento ha sido eliminado. Razón: ${reason}.`;
            case EntityType.REVIEW: 
                return `Tu reseña ha sido eliminada. Razón: ${reason}.`;
            default: 
                return `Tu contenido ha sido eliminado. Razón: ${reason}.`;
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

}
