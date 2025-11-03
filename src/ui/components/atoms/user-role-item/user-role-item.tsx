import { User } from "../../../../domain";
import IconButton from "../main-icon-button/main-icon-button";
import closeCircle from "../../../assets/icons/close-circle.svg"
import Avatar from "../avatar/avatar";
import style from "./style.module.css";

type Props = {
  profile: User;
  onRemove: () => void;
};

export default function UserRoleItem({ profile, onRemove }: Props) {
  return (
    <div className={style.container}>
      <div className={style.info}>
        <Avatar
          profile={profile.toProfile()}
          onClick={() => {}}
          hideName={false}
        />
      </div>

      <IconButton enabled onClick={onRemove} type="button" icon={closeCircle} text="" modifier={style.button}/>
    </div>
  );
}