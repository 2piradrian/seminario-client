import SecondaryIconButton from "../../atoms/secondary-icon-button/secondary-icon-button";
import comment from "../../../assets/icons/comment.svg";
import type { Profile } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import style from "./style.module.css";

type Props = {
  text: string;
  profile: Profile;
  onClickOnCreate: () => void;
  onClickOnAvatar: () => void;
};

export default function CreateButton({
  profile,
  onClickOnCreate,
  onClickOnAvatar,
  text,
}: Props) {
  return (
    <div className={style.container}>
      <div className={style.delimiter}>
          <div className={style.avatarOnly}>
              <Avatar profile={profile} onClick={onClickOnAvatar} hideName/>
          </div>
          <div className={style.secondaryIconButton}>
              <SecondaryIconButton
              text={text}
              type="button"
              enabled={true}
              onClick={onClickOnCreate}
              icon={comment}
              />
          </div>
      </div>
    </div>
  );
}
