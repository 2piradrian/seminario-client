import Header from "../components/organisms/header/header";
import "../styles/global.css";

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <div className="container">
            <Header />
            <main className="delimiter">{children}</main>
        </div>
    );
}