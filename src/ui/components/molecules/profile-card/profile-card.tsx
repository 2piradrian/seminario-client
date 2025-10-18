import { Optionable, Profile, type UserProfile } from "../../../../domain";
import style from "./style.module.css";
import ChipList from "../chip-list/chip-list";
import Avatar from "../../atoms/avatar/avatar";

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
        <Avatar profile={Profile.fromEntity(profile, undefined)} onClick={onClickOnAvatar} />
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
            <ChipList list={Optionable.mapToNames(profile.instruments)} />
          )}
        </div>

        <div className={style.section}>
          <div className={style.sectionTitle}>Estilos musicales</div>
          {profile.styles.length === 0 ? (
            <p className={style.muted}>No hay estilos registrados</p>
          ) : (
            <ChipList list={Optionable.mapToNames(profile.styles)} />
          )}
        </div>
      </div>
    </article>
  );
}
