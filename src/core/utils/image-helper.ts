import { env } from "../adapters/env";
import { ErrorHandler } from "../../domain";

export class ImageHelper {

    private static readonly MAX_SIZE = 12 * 1024 * 1024; // 12 MB
    private static readonly ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

    private static readonly MAX_COMPRESSED_SIZE = 1 * 1024 * 1024; // 1 MB

    public static convertToBase64(file: File): Promise<string> {

        if (!ImageHelper.ALLOWED_TYPES.includes(file.type)) {
            throw ErrorHandler.handleError(new Error("INVALID TYPE"));
        }

        if (file.size > ImageHelper.MAX_SIZE) {
            throw ErrorHandler.handleError(new Error("INVALID IMAGE"));
        }

        if (file.size <= ImageHelper.MAX_COMPRESSED_SIZE && file.type !== "image/png") {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const dataurl = String(reader.result);
                    const base64 = dataurl.split(",")[1] ?? "";
                    resolve(base64);
                };
                reader.onerror = () => reject(reader.error);
                reader.readAsDataURL(file);
            });
        }

        return ImageHelper.compress(file);
    }

    private static compress(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            const url = URL.createObjectURL(file);

            image.onload = () => {
                URL.revokeObjectURL(url);

                let width = image.width;
                let height = image.height;
                let quality = 0.9;

                const canvas = document.createElement("canvas");

                const attemptCompression = (): string | null => {
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return null;

                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, width, height);
                    ctx.drawImage(image, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL("image/jpeg", quality);
                    const base64 = dataUrl.split(",")[1] ?? "";

                    const sizeInBytes = base64.length * 0.75;

                    if (sizeInBytes <= ImageHelper.MAX_COMPRESSED_SIZE) {
                        return base64;
                    }
                    return null;
                };

                let result = attemptCompression();
                let attempts = 0;
                const maxAttempts = 10;

                while (!result && attempts < maxAttempts) {
                    attempts++;

                    if (quality > 0.5) {
                        quality -= 0.1;
                    } else {
                        width *= 0.8;
                        height *= 0.8;
                        quality = 0.8;
                    }

                    result = attemptCompression();
                }

                if (result) {
                    resolve(result);
                } else {
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(0, 0, width, height);
                        ctx.drawImage(image, 0, 0, width, height);
                        const dataUrl = canvas.toDataURL("image/jpeg", quality);
                        resolve(dataUrl.split(",")[1] ?? "");
                    } else {
                        reject(new Error("CANVAS_CONTEXT_ERROR"));
                    }
                }
            };

            image.onerror = (e) => reject(e);
            image.src = url;
        });
    }

    public static buildRoute(imageId: string): string {
        return `${env.BASE_URL}/api/images/${imageId}`;
    }

}