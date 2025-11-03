import { Optionable, type UserProfile } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import style from "./style.module.css";

type Props = {
  profile: UserProfile;
  onClickOnAvatar: () => void;
};

export default function ProfileCard({ profile, onClickOnAvatar }: Props) {
  return (
    <article className={style.card}>

      <div className={style.header}>
        <div className={style.headerDecor} />
      </div>

      <div className={style.avatarWrapper} onClick={onClickOnAvatar}>
        <Avatar 
          profile={profile.toProfile()} 
          onClick={onClickOnAvatar} 
        />
      </div>

      <div className={style.body}>
        {profile.shortDescription && (
          <p className={style.description}>{profile.shortDescription}</p>
        )}

        <div className={style.section}>
          <div className={style.sectionTitle}>Instrumentos</div>
          {profile.instruments.length === 0 ? (
            <p className={style.muted}>No hay instrumentos registrados</p>
          ) : (
            <p className={style.textLine}>
              {Optionable.mapToNames(profile.instruments).join(", ")}
            </p>
          )}
        </div>

        <div className={style.section}>
          <div className={style.sectionTitle}>Estilos musicales</div>
          {profile.styles.length === 0 ? (
            <p className={style.muted}>No hay estilos registrados</p>
          ) : (
            <p className={style.textLine}>
              {Optionable.mapToNames(profile.styles).join(", ")}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
