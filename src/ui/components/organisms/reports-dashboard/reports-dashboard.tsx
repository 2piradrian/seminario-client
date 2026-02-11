import { ContentType, TimeReportContent } from "../../../../domain";
import LargeTitle from "../../atoms/large-title/large-title";
import SmallTitle from "../../atoms/small-title/small-title";
import TabNavigator from "../../atoms/tab-navigator/tab-navigator";
import ReportCard from "../../molecules/report-card/report-card";
import style from "./style.module.css";

type Props = {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabClick: (tab: string) => void;
    reports: {
        users: TimeReportContent;
        posts: TimeReportContent;
        events: TimeReportContent;
        pages: TimeReportContent;
    } | null;
}

export default function ReportsDashboard({
    tabs,
    activeTab,
    onTabClick,
    reports
}: Props) {

    if (!reports) return null;

    return (
        <div className={style.container}>
            <div className={style.titles}>
                <LargeTitle text="Reportes" />
                <SmallTitle text="Seleccione una categoría para visualizar los reportes." />
            </div>

            <TabNavigator
                tabs={tabs}
                activeTab={activeTab}
                onTabClick={onTabClick}
            />

            <div>
                {activeTab === ContentType.USERS && (
                    <ReportCard
                        title="Usuarios"
                        description="Resumen de reportes sobre usuarios"
                        weeklyReport={reports.users.weeklyReport}
                        monthlyReport={reports.users.monthlyReport}
                        yearlyReport={reports.users.yearlyReport}
                    />
                )}

                {activeTab === ContentType.POSTS && (
                    <ReportCard
                        title="Posts"
                        description="Resumen de reportes sobre publicaciones"
                        weeklyReport={reports.posts.weeklyReport}
                        monthlyReport={reports.posts.monthlyReport}
                        yearlyReport={reports.posts.yearlyReport}
                    />
                )}

                {activeTab === ContentType.EVENTS && (
                    <ReportCard
                        title="Eventos"
                        description="Resumen de reportes sobre eventos"
                        weeklyReport={reports.events.weeklyReport}
                        monthlyReport={reports.events.monthlyReport}
                        yearlyReport={reports.events.yearlyReport}
                    />
                )}

                {activeTab === ContentType.PAGES && (
                    <ReportCard
                        title="Páginas"
                        description="Resumen de reportes sobre páginas"
                        weeklyReport={reports.pages.weeklyReport}
                        monthlyReport={reports.pages.monthlyReport}
                        yearlyReport={reports.pages.yearlyReport}
                    />
                )}
            </div>
        </div>
    );
}