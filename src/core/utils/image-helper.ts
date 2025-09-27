export class ImageHelper {

    private static readonly MAX_SIZE = 1 * 1024 * 1024; // 1 MB
    private static readonly ALLOWED_TYPES = ["image/jpeg", "image/jpg"];

    public static convertToBase64(file: File): Promise<string> {

        if (!ImageHelper.ALLOWED_TYPES.includes(file.type)) {
            return Promise.reject(new Error("INVALID TYPE"));
        }

        if (file.size > ImageHelper.MAX_SIZE) {
            return Promise.reject(new Error("INVALID IMAGE"));
        }

        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = () => {
                const dataurl = String(reader.result)
                const base64 = dataurl.split(",")[1]?? ""
                resolve(base64)
            }

            reader.onerror = () => reject(reader.error)
            reader.readAsDataURL(file)
        })
    };

}