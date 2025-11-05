import musicalNoteEmpty from "../../../assets/icons/musical-note-music-svgrepo-empty.svg";
import musicalNoteFilled from "../../../assets/icons/musical-note-music-svgrepo-filled.svg";
import style from "./style.module.css";

type Props = {
  isSelected: boolean;
  onClick?: () => void; 
  modifier?: string;
};

export default function MusicalNoteRating({ isSelected, onClick, modifier= "" }: Props) {
  return (
    <div className={style.container} onClick={onClick}>
      <img
        src={isSelected ? musicalNoteFilled : musicalNoteEmpty}
        alt="nota musical"
        className={`${style.icon} ${modifier}`}
      />
    </div>
  );
}
