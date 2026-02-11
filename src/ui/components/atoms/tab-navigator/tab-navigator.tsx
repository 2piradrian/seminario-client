import style from "./style.module.css";

type Props = {
    tabs: { id: string; label: string; }[];
    activeTab: string;
    onTabClick: (tab: string) => void;
    variant?: "underline" | "pill";
};

export default function TabNavigator({ tabs, activeTab, onTabClick, variant = "underline" }: Props) {
    return (
      <nav className={`${style.container} ${variant === "pill" ? style.pillContainer : ""}`}>
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            className={[
              style.tab,
              variant === "pill" ? style.pill : "",
              activeTab === id ? (variant === "pill" ? style.activePill : style.active) : ""
            ].join(" ").trim()}
            onClick={() => onTabClick(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    );
}
