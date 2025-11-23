export class NotificationContent {

    static readonly COMMENT = "COMMENT";
    static readonly UPVOTE = "UPVOTE";
    static readonly DOWNVOTE = "DOWNVOTE";
    static readonly ASSIST = "ASSIST";
    static readonly FOLLOW = "FOLLOW";

    static readonly values = [
        NotificationContent.COMMENT,
        NotificationContent.UPVOTE,
        NotificationContent.DOWNVOTE,
        NotificationContent.ASSIST,
        NotificationContent.FOLLOW
    ] as const;

    public static fromString(value: string | null | undefined): string | null {
        if (!value) return null;

        const upper = value.toUpperCase();

        return NotificationContent.values.includes(upper as any)
            ? upper
            : null;
    }
    
}
