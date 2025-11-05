import style from "./style.module.css";

type Props = {
  tabs: { id: string; label: string; }[];
  activeTab: string;
  onTabClick: (tab: string) => void;
};

export default function TabNavigator({ tabs, activeTab, onTabClick }: Props) {
  return (
    <nav className={style.container}>
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          className={`${style.tab} ${activeTab === id ? style.active : ""}`}
          onClick={() => onTabClick(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}