import type { ReactNode } from "react";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import SmallTitle from "../../atoms/small-title/small-title";
import { ImageHelper } from "../../../../core";
import style from "./style.module.css";
import noImage from "../../../assets/other/no-image.png";

type Props = {
    id: string;
    title: string;
    description?: string;
    badgeLabel: string;
    badgeIcon: string;
    imageId?: string;
    meta?: ReactNode[];
    onAction?: () => void;
    secondaryLabel?: string;
    onSecondary?: () => void;
    isSecondaryActive?: boolean;
};

export default function SearchResultCard({
    title,
    description,
    badgeLabel,
    badgeIcon,
    imageId,
    meta,
    onAction,
    secondaryLabel,
    onSecondary,
    isSecondaryActive
}: Props) {
    return (
        <article
            className={style.card}
            onClick={onAction}
        >
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
                        <div className={style.titleRow}>
                            <SmallTitle text={title} />
                            <span className={style.badge}>
                                <img src={badgeIcon} alt="" className={style.badgeIcon} />
                                <span className={style.badgeLabel}>{badgeLabel}</span>
                            </span>
                        </div>
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

            {secondaryLabel && onSecondary ? (
                <div
                    className={style.actions}
                    onClick={(e) => e.stopPropagation()}
                >
                    <SecondaryButton
                        text={secondaryLabel as string}
                        type="button"
                        enabled={true}
                        onClick={onSecondary}
                        modifier={`${style.button} ${style.secondaryCta} ${isSecondaryActive ? style.secondaryActive : style.secondaryPrimary}`}
                    />
                </div>
            ) : null}
        </article>
    );
}
