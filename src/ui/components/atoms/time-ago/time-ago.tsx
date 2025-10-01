import { useEffect, useState } from "react";
import style from "./style.module.css";

type Props = {
    createdAt:  Date; 
};

export default function TimeAgo({ createdAt } : Props) {

    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
        setTimeAgo(getTimeAgo());
        const interval = setInterval(() => {
            setTimeAgo(getTimeAgo());
        }, 60000);

        return () => clearInterval(interval);
    }, [createdAt]);

    const getTimeAgo = () => {
        const now = new Date();
        const diff = now.getTime() - createdAt.getTime();

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return "Hace unos segundos";
        if (minutes < 60) return `Hace ${minutes} min${minutes > 1 ? "s" : ""}`;
        if (hours < 24) return `Hace ${hours} hora${hours > 1 ? "s" : ""}`;
        return `Hace ${days} día${days > 1 ? "s" : ""}`;
    };

    return <span className={style.time}>{timeAgo}</span>;
}
