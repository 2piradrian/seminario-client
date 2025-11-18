import { PrefixedUUID } from "../../core";
import { NotificationContent } from "./notification-content";
import { EntityType } from "./uuid";

export class Notification {

    constructor(
        public id: string,
        public targetId: string,
        public sourceId: string,
        public content: NotificationContent,
        public createdAt: Date,
        public updatedAt: Date
    ) {}

    public static fromObject(object: { [key: string]: any }): Notification {
        return new Notification(
            object.id,
            object.targetId,
            object.sourceId,
            NotificationContent.fromString(object.content),
            object.createdAt ? new Date(object.createdAt) : null,
            object.updatedAt ? new Date(object.updatedAt) : null
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
            case EntityType.POST: return "Han comentado tu post.";
            case EntityType.IMAGE: return "Han comentado tu imagen.";
            case EntityType.COMMENT: return "Han respondido a tu comentario.";
            default: return "Tienes un nuevo comentario.";
        }
    }

}
