import Header from "../components/organisms/header/header";
import style from "./style.module.css";
import "../styles/global.css";
import type { Profile } from "../../domain";

type Props = {
    children: React.ReactNode;
    withHeader: boolean;
    headerProfile?: Profile | null;
};

export default function Layout({ children, withHeader, headerProfile }: Props) {
    return (
        <div className={`container ${withHeader && style.customContainer}`}>
            { withHeader && (
                <Header 
                    profile={headerProfile ?? undefined}
                />
            ) }
            <main className={`delimiter ${withHeader && style.customContainer}`}>{children}</main>
        </div>
    );
}
