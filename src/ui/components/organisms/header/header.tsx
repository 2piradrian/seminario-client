import { Link } from 'react-router-dom';
import isotipo from '../../../assets/ISOTIPO_CONTRASTE_FT.svg';
import HeaderMenu from '../../molecules/header-menu/header-menu';
import style from './style.module.css';

export default function Header() {
  return (
    <header className={`${style.container}`}>
      <div className={`${style.delimiter} delimiter`}>
        <div className={style.content}>
          <Link className={style.isologo} to={"/"}>
            <img src={isotipo} alt="Isologo" />
          </Link>
          <div className={style.routesContainer}>
            <HeaderMenu />
          </div>
        </div>
      </div>
    </header>
  );
}