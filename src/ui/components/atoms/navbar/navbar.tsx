import { Link, useLocation } from 'react-router-dom';
import closeImg from "../../../assets/icons/cross.svg";
import logoutIcon from "../../../assets/icons/logout.svg";
import isologo from "../../../assets/ISOLOGO_FT.svg";
import { Profile, Role, type User } from '../../../../domain';
import style from "./style.module.css";

type Props = {
    show: boolean;
    onClose: () => void;
    onLogout: () => void;
    user: User;
}

export default function NavBar({ 
    show, 
    onClose,
    onLogout,
    user
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
                 <div className={style.header}>
                    <Link className={style.isologo} to={"/"}>
                        <img src={isologo} alt="Isologo" />
                    </Link>

                    <div className={style.close} onClick={onClose}>
                        <img className={style.closeImg} src={closeImg} alt="cerrar" />
                    </div>
                </div>
                <ul className={style.list}>
                    <li className={`${style.item} ${location.pathname === '/' ? style.activeItem : ''}`}>
                        <Link to="/" onClick={onClose}>Feed</Link>
                    </li>
                    <li className={`${style.item} ${location.pathname.startsWith("/user") ? style.activeItem : ''}`}>
                        <Link to={`/user/${user?.id}`} onClick={onClose}>Tu Perfil</Link>
                    </li>
                    <li className={`${style.item} ${location.pathname.startsWith("/posts") ? style.activeItem : ''}`}>
                        <Link to="/posts" onClick={onClose}>Publicaciones</Link>
                    </li>
                    <li className={`${style.item} ${location.pathname.startsWith("/events") ? style.activeItem : ''}`}>
                        <Link to="/events" onClick={onClose}>Eventos</Link>
                    </li>
                    <li className={`${style.item} ${location.pathname.startsWith("/pages") ? style.activeItem : ''}`}>
                        <Link to="/pages" onClick={onClose}>Páginas</Link>
                    </li>
                    {
                        user?.role === Role.ADMIN && (
                            <li className={`${style.item} ${location.pathname.startsWith("/admin") ? style.activeItem : ''}`}>
                                <Link to="/admin" onClick={onClose}>Panel de Admin</Link>
                            </li>
                        )
                    }
                </ul>
                <div className={style.logoutContainer} onClick={onLogout}>
                    <img className={style.logout} src={logoutIcon} alt="logout" />
                    <span className={style.logoutText}>Cerrar sesión</span>
                </div>
            </nav>
        </>
    ); 
}
