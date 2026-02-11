import style from "./style.module.css";

type Props = {
    title: string;
    description: string;
    weeklyReport: string;
    monthlyReport: string;
    yearlyReport: string;
};

export default function ReportCard({
    title,
    description,
    weeklyReport,
    monthlyReport,
    yearlyReport,
}: Props) {
    return (
        <div className={style.card}>
            {/* <div
                className={style.icon}
                style={{ backgroundImage: `url(${src})` }}
            /> */}

            <div className={style.content}>
                <div className={style.titles}>
                <h3>{title}</h3>
                <p>{description}</p>
                </div>

                <div className={style.metrics}>
                <div>
                    <span className={style.label}>Semanal</span>
                    <p className={style.value}>{weeklyReport}</p>
                </div>

                <div>
                    <span className={style.label}>Mensual</span>
                    <p className={style.value}>{monthlyReport}</p>
                </div>

                <div>
                    <span className={style.label}>Anual</span>
                    <p className={style.value}>{yearlyReport}</p>
                </div>
                </div>
            </div>
        </div>
    );
}
