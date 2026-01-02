import type { Error } from "./error";
import { Errors } from "./errors";

export class ErrorHandler {

    public static handleError(error: Error): string {
        switch (error.message) {
            case "Internal error":
                return Errors.INTERNAL_ERROR;

            case "Instrument not found":
                return Errors.INSTRUMENT_NOT_FOUND;

            case "Style not found":
                return Errors.STYLE_NOT_FOUND;

            case "Comment not found":
                return Errors.COMMENT_NOT_FOUND;

            case "Forum not found":
                return Errors.POST_NOT_FOUND
            
            case "Forum not active":
                return Errors.POST_NOT_ACTIVE;

            case "Email already exists":
                return Errors.EMAIL_ALREADY_EXISTS;
            
            case "Full name of the user already exists":
                return Errors.FULLNAME_ALREADY_EXISTS;
            
            case "Invalid password":
                return Errors.INVALID_PASSWORD;
            
            case "Unauthorized":
                return Errors.UNAUTHORIZED;
                
            case "User not found":
                return Errors.USER_NOT_FOUND;

            case "Missing required fields":
                return Errors.MISSING_REQUIRED_FIELDS;

            case "Invalid fields":
                return Errors.INVALID_FIELDS;

            case "Invalid type":
                return Errors.INVALID_TYPE;

            case "Invalid image":
                return Errors.INVALID_IMAGE;

            case "User not activated":
                return Errors.EMAIL_NOT_VERIFIED;
            
            case "Unknown error":
                return Errors.UNKNOWN_ERROR;
              
            default:
                return Errors.INTERNAL_ERROR;
        }
    }

}