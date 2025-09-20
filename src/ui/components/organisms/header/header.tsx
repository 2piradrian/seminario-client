import isotipo from '../../../assets/ISOTIPO_CONTRASTE_FT.svg';
import HeaderMenu from '../../molecules/header-menu/header-menu';
import style from './style.module.css';

export default function Header() {
  return (
    <header className={`${style.container}`}>
      <div className={`${style.delimiter} delimiter`}>
        <div className={style.content}>
          <div className={style.isologo}>
            <img src={isotipo} alt="Isologo" />
          </div>
          <div className={style.routesContainer}>
            <HeaderMenu />
          </div>
        </div>
      </div>
    </header>
  );
}