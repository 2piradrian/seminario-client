export class NotificationContent {

    static readonly COMMENT = "COMMENT";
    static readonly UPVOTE = "UPVOTE";
    static readonly DOWNVOTE = "DOWNVOTE";
    static readonly ASSIST = "ASSIST";
    static readonly FOLLOW = "FOLLOW";
    static readonly PAGE_INVITATION = "PAGE_INVITATION";
    static readonly MODERATION = "MODERATION";

    static readonly values = [
        NotificationContent.COMMENT,
        NotificationContent.UPVOTE,
        NotificationContent.DOWNVOTE,
        NotificationContent.ASSIST,
        NotificationContent.FOLLOW,
        NotificationContent.PAGE_INVITATION,
        NotificationContent.MODERATION,
    ] as const;

    public static fromString(value: string | null | undefined): string | null {
        if (!value) return null;

        const upper = value.toUpperCase();

        return NotificationContent.values.includes(upper as any)
            ? upper
            : null;
    }

}
