import style from "./style.module.css";

type Props = {
  text: string;
};

export default function MediumTitle({ text }: Props) {
  return <h2 className={style.container}>{text}</h2>;
}
