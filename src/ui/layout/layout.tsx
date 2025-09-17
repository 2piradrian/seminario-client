import Header from "../components/organisms/header/header";
import "../styles/global.css";

type Props = {
    children: React.ReactNode;
    withHeader: boolean;
};

export default function Layout({ children, withHeader }: Props) {
    return (
        <div className="container">
            { withHeader && <Header /> }
            <main className="delimiter">{children}</main>
        </div>
    );
}