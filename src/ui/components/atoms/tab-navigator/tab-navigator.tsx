import style from "./style.module.css";

type Props = {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
};

export default function TabNavigator({ tabs, activeTab, onTabClick }: Props) {
  return (
    <nav className={style.container}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${style.tab} ${activeTab === tab ? style.active : ""}`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}