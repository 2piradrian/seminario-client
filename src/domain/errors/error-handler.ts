import type { Error } from "./error";
import { Errors } from "./errors";

export class ErrorHandler {

    public static handleError(error: Error): string {
        switch (error.message) {

            // ===== Internal =====
            case "Internal error":
                return Errors.INTERNAL_ERROR;

            // ===== Generics =====
            case "Missing required fields":
                return Errors.MISSING_REQUIRED_FIELDS;

            case "Invalid fields":
                return Errors.INVALID_FIELDS;

            // ===== User =====
            case "User not activated":
                return Errors.EMAIL_NOT_VERIFIED;

            case "User has been banned":
                return Errors.USER_DELETED;

            case "Passwords do not match":
                return Errors.PASSWORDS_DO_NOT_MATCH;

            case "User already activated":
                return Errors.USER_ALREADY_ACTIVATED;

            case "User already has no assigned role":
                return Errors.USER_ALREADY_HAS_NO_ROLE;

            case "User already has assigned role":
                return Errors.USER_ALREADY_HAS_ROLE;

            case "User already is the event author":
                return Errors.USER_ALREADY_IS_AUTHOR;

            case "User not found":
                return Errors.USER_NOT_FOUND;

            case "Unauthorized":
                return Errors.UNAUTHORIZED;

            case "Invalid password":
                return Errors.INVALID_PASSWORD;

            case "Full name of the user already exists":
                return Errors.FULLNAME_ALREADY_EXISTS;

            case "Email already exists":
                return Errors.EMAIL_ALREADY_EXISTS;

            case "Review not found":
                return Errors.REVIEW_NOT_FOUND;

            // ===== Event =====
            case "Event is not started":
                return Errors.EVENT_NOT_STARTED;

            case "Event is already ended":
                return Errors.EVENT_ALREADY_ENDED;

            case "Event not found":
                return Errors.EVENT_NOT_FOUND;

            // ===== Post =====
            case "Forum not found":
                return Errors.POST_NOT_FOUND;

            case "Post not active":
                return Errors.POST_NOT_ACTIVE;

            case "Comment not found":
                return Errors.COMMENT_NOT_FOUND;

            // ===== Page =====
            case "Page not found":
                return Errors.PAGE_NOT_FOUND;

            case "Page name already exists":
                return Errors.PAGENAME_ALREADY_EXISTS;

            case "User is not a member of the page":
                return Errors.USER_NOT_MEMBER;

            case "User is already a member of the page":
                return Errors.USER_ALREADY_MEMBER;

            case "Invitation has already been used":
                return Errors.INVITATION_ALREADY_USED;

            // ===== Catalog =====
            case "Role not found":
                return Errors.ROLE_NOT_FOUND;

            case "Page type not found":
                return Errors.PAGE_TYPE_NOT_FOUND;

            case "Instrument not found":
                return Errors.INSTRUMENT_NOT_FOUND;

            case "Category not found":
                return Errors.CATEGORY_NOT_FOUND;

            case "Post type not found":
                return Errors.POSTYPE_NOT_FOUND;

            case "Content type not found":
                return Errors.CONTENT_TYPE_NOT_FOUND;

            case "Style not found":
                return Errors.STYLE_NOT_FOUND;

            // ===== Notification =====
            case "Notification not found":
                return Errors.NOTIFICATION_NOT_FOUND;

            // ===== Extras que ya tenías =====
            case "Invalid type":
                return Errors.INVALID_TYPE;

            case "Invalid image":
                return Errors.INVALID_IMAGE;

            case "Unknown error":
                return Errors.UNKNOWN_ERROR;

            default:
                return Errors.INTERNAL_ERROR;
        }
    }

}