import workIcon from "../../ui/assets/icons/job.svg";
import marketIcon from "../../ui/assets/icons/market.svg";
import generalIcon from "../../ui/assets/icons/general.svg";
import ArrowDown from "../../ui/assets/icons/vote-down.svg";
import ArrowUp from "../../ui/assets/icons/vote-up.svg";
import MessageSquare from "../../ui/assets/icons/chat.svg";
import UserPlus from "../../ui/assets/icons/followIcon.svg";
import CheckCircle from "../../ui/assets/icons/check.svg";
import Bell from "../../ui/assets/icons/notification.svg";
import AddPage from "../../ui/assets/icons/add-page.svg";
import AlertCircle from "../../ui/assets/icons/alert-circle.svg";
import { NotificationContent } from "../../domain";

export class IconMapper {
    
    private static readonly POST_ICONS: Record<string, string> = {
        "JOB": workIcon,
        "MARKET": marketIcon,
        "GENERAL": generalIcon,
    };

    private static readonly NOTIFICATION_ICONS: Record<string, string> = {
        [NotificationContent.UPVOTE]: ArrowUp,
        [NotificationContent.DOWNVOTE]: ArrowDown,
        [NotificationContent.COMMENT]: MessageSquare,
        [NotificationContent.FOLLOW]: UserPlus,
        [NotificationContent.ASSIST]: CheckCircle,
        [NotificationContent.PAGE_INVITATION]: AddPage,
        [NotificationContent.MODERATION]: AlertCircle
    };

    public static getPostIcon(type?: string): string {
        if (!type) return generalIcon;
        const key = type.toUpperCase().trim();
        return this.POST_ICONS[key] || generalIcon;
    }

    public static getNotificationIcon(type: string | null | undefined): string {
        if (!type) return Bell;
        
        return this.NOTIFICATION_ICONS[type] || Bell;
    }
}