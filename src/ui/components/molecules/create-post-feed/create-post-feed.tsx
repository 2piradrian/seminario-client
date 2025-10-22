import SecondaryIconButton from "../../atoms/secondary-icon-button/secondary-icon-button";
import comment from "../../../assets/icons/comment.svg";
import style from "./style.module.css";
import type { Profile } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";

type Props = {
  profile: Profile;
  onClickOnCreatePost: () => void;
  onClickOnAvatar: () => void;
};

export default function CreatePostFeed({
  profile,
  onClickOnCreatePost,
  onClickOnAvatar,
}: Props) {
  return (
    <div className={style.container}>
        <div className={style.avatarOnly}>
            <Avatar profile={profile} onClick={onClickOnAvatar} hideName/>
        </div>
        <div className={style.secondaryIconButton}>
            <SecondaryIconButton
            text="Crear publicación"
            type="button"
            enabled={true}
            onClick={onClickOnCreatePost}
            icon={comment}
            />
        </div>
    </div>
  );
}
