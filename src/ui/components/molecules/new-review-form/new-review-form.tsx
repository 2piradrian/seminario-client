import type { Profile } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import InputLabel from "../../atoms/input-label/input-label";
import style from "./style.module.css";

type Props = {
  profile: Profile;
  onClickOnAvatar: () => void;
}

export default function NewReviewForm({ profile, onClickOnAvatar }: Props) {    
    return (
        <div className={style.formContainer}>
            <Avatar onClick={onClickOnAvatar} profile={profile} />
            <InputLabel 
                id="content"
                placeholder="Contenido"
                required
                type="text"
            />
        </div>
    )
}
