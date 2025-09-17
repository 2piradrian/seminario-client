import style from "./style.module.css";

type Props = {
  text: string;
};

export default function SmallTitle({ text }: Props) {
  return <h3 className={style.container}>{text}</h3>;
}
