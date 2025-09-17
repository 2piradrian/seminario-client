import style from "./style.module.css";

type Props = {
  text: string;
};

export default function LargeTitle({ text }: Props) {
  return <h1 className={style.container}>{text}</h1>;
}
