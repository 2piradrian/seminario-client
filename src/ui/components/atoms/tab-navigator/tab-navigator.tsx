import style from "./style.module.css";

type Props = {
  tabs: { id: string; label: string; }[];
  activeTab: string;
  onTabClick: (tab: string) => void;
  variant?: "underline" | "pill";
};

export default function TabNavigator({ tabs, activeTab, onTabClick, variant = "underline" }: Props) {
  const isPill = variant === "pill";
  const containerClass = `${style.container} ${isPill ? style.pillContainer : ""}`;

  return (
    <nav className={containerClass}>
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          className={[
            style.tab,
            isPill ? style.pill : "",
            activeTab === id ? (isPill ? style.activePill : style.active) : ""
          ].join(" ").trim()}
          onClick={() => onTabClick(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
