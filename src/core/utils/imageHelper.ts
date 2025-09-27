export class ImageEncoder {
    static convertToBase64(file: File): Promise<string> {
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
    }
}