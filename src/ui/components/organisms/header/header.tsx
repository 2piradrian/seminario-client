import isotipo from '../../../assets/ISOTIPO_CONTRASTE_FT.svg';
import style from './style.module.css';

export default function Header() {
  return (
    <header className={`${style.container} container`}>
      <div className={`${style.delimiter} delimiter`}>
        <div className={style.content}>
          <div className={style.isologo}>
            <img src={isotipo} alt="Isologo" />
          </div>
          <div className={style.menu}>
            <p>Menu</p>
          </div>
        </div>
      </div>
    </header>
  );
}