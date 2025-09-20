import { Link } from 'react-router-dom';
import chat from '../../../assets/icons/chat.svg';
import notification from '../../../assets/icons/notification.svg';
import profile from '../../../assets/icons/profile.svg';
import search from '../../../assets/icons/search.svg';
import style from './style.module.css';

export default function HeaderMenu() {
    return (
        <div className={style.container}>
            <Link to="/search">
                <img src={search} alt="Search Icon" />
            </Link>
            <Link to="/chat">
                <img src={chat} alt="Chat Icon" />
            </Link>
            <Link to="/notifications">
                <img src={notification} alt="Notifications Icon" />
            </Link>
            <Link to="/profile">
                <img src={profile} alt="Profile Icon" />
            </Link>
        </div>
    )
}