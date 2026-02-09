import Header from "../components/organisms/header/header";
import style from "./style.module.css";
import type { Profile, User } from "../../domain";
import "../styles/global.css";

type Props = {
    children: React.ReactNode;
    withHeader: boolean;
    headerProfile?: Profile | null;
    user?: User;
    onLogout?: () => void;
}

export default function Layout({ children, withHeader, headerProfile, user, onLogout }: Props) {
    return (
        <div className={`container ${withHeader && style.customContainer}`}>
            { withHeader && (
                <Header 
                    user={user}
                    onLogout={onLogout}
                    profile={headerProfile ?? undefined}
                />
            ) }
            <main className={`delimiter ${withHeader && style.customContainer}`}>{children}</main>
        </div>
    );
}
