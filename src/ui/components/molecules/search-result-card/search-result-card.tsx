import type { ReactNode } from "react";
import MainButton from "../../atoms/main-button/main-button";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import SmallTitle from "../../atoms/small-title/small-title";
import { ImageHelper } from "../../../../core";
import style from "./style.module.css";
import noImage from "../../../assets/other/no-image.png";

type Props = {
    id: string;
    title: string;
    description?: string;
    subtitle?: string;
    badgeLabel: string;
    badgeIcon: string;
    imageId?: string;
    meta?: ReactNode[];
    actionLabel: string;
    onAction: () => void;
    secondaryLabel?: string;
    onSecondary?: () => void;
    isSecondaryActive?: boolean;
};

export default function SearchResultCard({
    title,
    description,
    subtitle,
    badgeLabel,
    badgeIcon,
    imageId,
    meta,
    actionLabel,
    onAction,
    secondaryLabel,
    onSecondary,
    isSecondaryActive
}: Props) {
    return (
        <article className={style.card}>
            <div className={style.media}>
                {imageId ? (
                    <img
                        src={ImageHelper.buildRoute(imageId)}
                        alt={title}
                        onError={(e) => { e.currentTarget.src = noImage; }}
                    />
                ) : (
                    <div className={style.placeholder}>
                        <span>{title?.charAt(0) ?? "?"}</span>
                    </div>
                )}
            </div>

            <div className={style.content}>
                <div className={style.header}>
                    <div className={style.titleBlock}>
                        <SmallTitle text={title} />
                        {subtitle && <p className={style.subtitle}>{subtitle}</p>}
                    </div>
                    <div className={style.badge}>
                        <img src={badgeIcon} alt="" className={style.badgeIcon} />
                        <span className={style.badgeLabel}>{badgeLabel}</span>
                    </div>
                </div>
                {description && <p className={style.description}>{description}</p>}
                {meta?.length ? (
                    <div className={style.meta}>
                        {meta.map((item, idx) => (
                            <span key={`${item}-${idx}`} className={style.metaItem}>{item}</span>
                        ))}
                    </div>
                ) : null}
            </div>

            <div className={style.actions}>
                {onSecondary && secondaryLabel ? (
                    <SecondaryButton 
                        text={secondaryLabel} 
                        type="button" 
                        enabled={true} 
                        onClick={onSecondary}
                        modifier={`${style.button} ${isSecondaryActive ? style.secondaryActive : ""}`}
                    />
                ) : null}
                <MainButton 
                    text={actionLabel} 
                    type="button" 
                    enabled={true} 
                    onClick={onAction}
                    modifier={style.button}
                />
            </div>
        </article>
    );
}
