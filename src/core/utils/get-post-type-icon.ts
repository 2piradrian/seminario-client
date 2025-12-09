// Asegúrate de importar tus imágenes reales aquí
import workIcon from "../../ui/assets/icons/job.svg";
import marketIcon from "../../ui/assets/icons/market.svg";
import generalIcon from "../../ui/assets/icons/general.svg";

export class PostTypeIconMapper {

    private static readonly icons: { [key: string]: string } = {
        "JOB": workIcon,
        "MARKET": marketIcon,
        "GENERAL": generalIcon,
    };

    private static readonly defaultIcon = generalIcon;

    public static getIcon(postTypeName?: string): string {
        if (!postTypeName) {
            return this.defaultIcon;
        }

        const key = postTypeName.toUpperCase().trim();

        return PostTypeIconMapper.icons[key] || this.defaultIcon;
    }
}