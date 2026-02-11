import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderMenu from "../../molecules/header-menu/header-menu";
import { Profile, type User } from "../../../../domain";
import NavBar from "../../atoms/navbar/navbar";
import menuIcon from "../../../assets/icons/navbar-menu.svg";
import style from "./style.module.css";

type Props = {
	user?: User | null;
    profile?: Profile | null;
    onLogout: () => void;
};

export default function Header({ user, profile, onLogout }: Props) {
	const [showNavbar, setShowNavbar] = useState(false);

	const toggleNavbar = () => {
		setShowNavbar((prev) => !prev);
	};

	return (
		<header className={`${style.container}`}>
			<div className={`${style.delimiter} delimiter`}>
				<div className={style.content}>
					<div className={style.burger} onClick={toggleNavbar}>
						<img className={style.burgerImg} src={menuIcon} alt="menu" />
					</div>
					<div className={style.routesContainer}>
						<HeaderMenu profile={profile ?? undefined} />
					</div>
				</div>
			</div>

			<NavBar onLogout={onLogout} show={showNavbar} onClose={toggleNavbar} user={user} />

		</header>

	);
}
