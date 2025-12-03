export class StatusTranslator {
    
    private static readonly translations: { [key: string]: string } = {
        "ACTIVE": "ACTIVO",
        "INACTIVE": "INACTIVO",
        "ENDED": "FINALIZADO",
        "DELETED": "ELIMINADO",
    };

    public static translate(statusNameInEnglish: string): string {
        if (!statusNameInEnglish) {
            return "";
        }
        
        const key = statusNameInEnglish.toUpperCase();
        
        return StatusTranslator.translations[key] || statusNameInEnglish;
    }
}