import AdminCard from "../../atoms/admin-card/admin-card";
import LargeTitle from "../../atoms/large-title/large-title";
import keyIcon from "../../../assets/icons/key.svg";
import reportsIcon from "../../../assets/icons/reports.svg";
import folderIcon from "../../../assets/icons/folder.svg";
import style from "./style.module.css";

type Props = {
    onClickOnAssignRole: () => void;
    onClickOnReports: () => void;
    onClickOnManageCatalog: () => void;
}
export default function AdminDashboard( { onClickOnAssignRole, onClickOnReports, onClickOnManageCatalog }: Props) {

    return (
        <div className={style.container}>
            <LargeTitle text="Panel de Administrador" />
            <div className={style.activities}>
                <AdminCard
                    img={keyIcon}
                    title="Asignar roles"
                    description="Controlá los roles y accesos del sistema de forma segura."
                    onClick={onClickOnAssignRole}
                />
                <AdminCard
                    img={reportsIcon}
                    title="Reportes"
                    description="Consultá reportes, actividad y datos clave del sistema."
                    onClick={onClickOnReports}
                />
                <AdminCard
                    img={folderIcon}
                    title="Manejar catálogo"
                    description="Mantené actualizado el catálogo de forma simple."
                    onClick={onClickOnManageCatalog}
                />
            </div>
        </div>
    )
}
