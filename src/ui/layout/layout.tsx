import Header from "../components/organisms/header/header";
import style from "./style.module.css";
import "../styles/global.css";

type Props = {
    children: React.ReactNode;
    withHeader: boolean;
};

export default function Layout({ children, withHeader }: Props) {
    return (
        <div className={`container ${withHeader && style.customContainer}`}>
            { withHeader && <Header /> }
            <main className={`delimiter ${withHeader && style.customContainer}`}>{children}</main>
        </div>
    );
}