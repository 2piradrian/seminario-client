import { Link, useLocation } from 'react-router-dom';
import closeImg from "../../../assets/icons/cross.svg";
import logoutIcon from "../../../assets/icons/logout.svg";
import style from "./style.module.css";

type Props = {
    show: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export default function NavBar({ 
    show, 
    onClose,
    onLogout
}: Props) {

    const location = useLocation();

    return (
        <>
            <div 
                className={`${style.backdrop} ${show ? style.active : ''}`} 
                onClick={onClose}
            >
            </div>

            <nav className={`${style.navbar} ${show ? style.active : ''}`}>

                <div className={style.close} onClick={onClose}>
                    <img className={style.closeImg} src={closeImg} alt="cerrar" />
                </div>

                <ul className={style.list}>
                    <li className={`${style.item} ${location.pathname === '/' ? style.activeItem : ''}`}>
                        <Link to="/" onClick={onClose}>Feed</Link>
                    </li>
                    <li className={`${style.item} ${location.pathname === '/user' ? style.activeItem : ''}`}>
                        <Link to="/user" onClick={onClose}>Tu Perfil</Link>
                    </li>
                    <li className={style.item}>
                        <Link to="/pages" onClick={onClose}>Páginas</Link>
                    </li>
                    <li className={style.item}>
                        <Link to="/posts" onClick={onClose}>Publicaciones</Link>
                    </li>
                    <li className={style.item}>
                        <Link to="/events" onClick={onClose}>Eventos</Link>
                    </li>
                </ul>

                <div className={style.logoutContainer}>
                    <img
                        onClick={onLogout}
                        className={style.logout}
                        src={logoutIcon}
                        alt="logout"
                    />
                    <span className={style.logoutText}>Cerrar sesión</span>
                </div>

            </nav>
        </>
    ); 
}
