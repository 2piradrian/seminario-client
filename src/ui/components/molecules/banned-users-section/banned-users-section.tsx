import type { BannedUser, User } from "../../../../domain";
import BannedUsersTable from "../../atoms/banned-users-table/banned-users-table";
import LargeTitle from "../../atoms/large-title/large-title";
import style from "./style.module.css";

type Props = {
    users: BannedUser[];
}

export default function BannedUsersSection( { users }: Props) {
    return (
        <div className={style.container}>
            <div className={style.title}>
                <LargeTitle text="Usuarios bloqueados" />
            </div>

            <div className={style.content}>
                <BannedUsersTable
                    users={users}
                />
            </div>
        </div>
    )
}