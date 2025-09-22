import type { Error } from "./error";
import { Errors } from "./errors";

export class ErrorHandler {

    public static handleError(error: Error): string {
        switch (error.message) {
            case "Internal error":
                return Errors.INTERNAL_ERROR;
            default:
                return Errors.INTERNAL_ERROR;
        }
    }

}