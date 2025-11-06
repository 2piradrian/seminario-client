import LargeTitle from "../../atoms/large-title/large-title";
import MainButton from "../../atoms/main-button/main-button";
import SelectLabel from "../../atoms/select-label/select-label";
import InputLabel from "../../atoms/input-label/input-label";
import { Optionable } from "../../../../domain";
import style from "./style.module.css";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  roleOptions: Optionable[];
};

export default function EditRolesForm({ onSubmit, roleOptions }: Props) {

  return (
    <form onSubmit={onSubmit} className={style.formContainer}>
      <LargeTitle text="Fortune Staff" />

      <InputLabel
        id="email"
        label=""
        placeholder="correo@mail.com"
        type="text"
        required={true}
      />

      <SelectLabel
        id="role"
        label=""
        value={Optionable.mapToNames(roleOptions)[0]}
        values={Optionable.mapToNames(roleOptions)}
      />

      <MainButton enabled={true} text="Asignar rol" type="submit" />
    </form>
  );
}