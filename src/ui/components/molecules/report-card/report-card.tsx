import style from "./style.module.css";

type Props = {
    title: string;
    description: string;
    weeklyReport: number;
    monthlyReport: number;
    yearlyReport: number;
    entityLabel: string;
};

export default function ReportCard({
    title,
    description,
    weeklyReport,
    monthlyReport,
    yearlyReport,
    entityLabel
}: Props) {
    return (
        <div className={style.card}>
            <div className={style.titles}>
            <h3>{title}</h3>
            <p>{description}</p>
            </div>

            <div className={style.metrics}>
                <div>
                    <span className={style.label}>
                        {`${entityLabel} esta semana`}
                    </span>
                    <p className={style.value}>{weeklyReport}</p>
                </div>

                <div>
                    <span className={style.label}>
                        {`${entityLabel} este mes`}
                    </span>
                    <p className={style.value}>{monthlyReport}</p>
                </div>

                <div>
                    <span className={style.label}>
                        {`${entityLabel} este año`}
                    </span>
                    <p className={style.value}>{yearlyReport}</p>
                </div>
            </div>
        </div>
    );
}
