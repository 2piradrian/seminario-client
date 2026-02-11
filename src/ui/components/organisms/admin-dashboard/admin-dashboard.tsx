import AdminCard from "../../atoms/admin-card/admin-card";
import LargeTitle from "../../atoms/large-title/large-title";
import keyIcon from "../../../assets/icons/key.svg";
import reportsIcon from "../../../assets/icons/reports.svg";
import folderIcon from "../../../assets/icons/folder.svg";
import bannedUserIcon from "../../../assets/icons/banned-user.svg";
import style from "./style.module.css";

type Props = {
    onClickOnAssignRole: () => void;
    onClickOnReports: () => void;
    onClickOnManageCatalog: () => void;
    onClickOnBannedUsers: () => void;
}
export default function AdminDashboard( { onClickOnAssignRole, onClickOnReports, onClickOnManageCatalog, onClickOnBannedUsers }: Props) {

    return (
        <div className={style.container}>
            <LargeTitle text="Panel de Administración" />
            <div className={style.activities}>
                <AdminCard
                    src={keyIcon}
                    alt="Icono de llave"
                    title="Asignar roles"
                    description="Controlá los roles y accesos del sistema de forma segura."
                    onClick={onClickOnAssignRole}
                />
                <AdminCard
                    src={reportsIcon}
                    alt="Icono de reporte"
                    title="Reportes"
                    description="Consultá reportes, actividad y datos clave del sistema."
                    onClick={onClickOnReports}
                />
                <AdminCard
                    src={folderIcon}
                    alt="Icono de catalogo"
                    title="Gestionar catálogo"
                    description="Mantené actualizado el catálogo de forma simple."
                    onClick={onClickOnManageCatalog}
                />
                <AdminCard
                    src={bannedUserIcon}
                    alt="Icono de usuarios bloqueados"
                    title="Usuarios bloqueados"
                    description="Supervisá los usuarios bloqueados del sistema."
                    onClick={onClickOnBannedUsers}
                />
            </div>
        </div>
    )
}
