import type { BannedUser } from "../../../../domain";
import style from "./style.module.css";

type Props = {
    users: BannedUser[];
}

export default function BannedUsersTable( { users }: Props) {
    return (
        <div className={style.container}>
            <table className={style.table}>
                <thead>
                <tr>
                    <th>Email usuario bloqueado</th>
                    <th>Email usuario bloqueador</th>
                    <th>Razón de bloqueo</th>
                </tr>
                </thead>

                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.bannedBy}</td>
                        <td>{user.reason.name}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
}