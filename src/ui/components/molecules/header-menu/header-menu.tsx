import { Link } from 'react-router-dom';
import Avatar from '../../atoms/avatar/avatar';
import chat from '../../../assets/icons/chat.svg';
import notification from '../../../assets/icons/notification.svg';
import defaultProfile from '../../../assets/icons/profile.svg';
import search from '../../../assets/icons/search.svg';
import style from './style.module.css';
import type { Profile } from '../../../../domain';

type Props = {
    profile?: Profile | null;
};

export default function HeaderMenu({ profile }: Props) {
    const profileLink = profile?.id ? `/user/${profile.id}` : "/profile";

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
            <Link to={profileLink}>
                {profile 
                    ? <Avatar profile={profile} hideName />
                    : <img src={defaultProfile} alt="Profile Icon" />
                }
            </Link>
        </div>
    )
}
