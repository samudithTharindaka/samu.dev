import type { CSSProperties } from "react";
import { logos, type LogoKey } from "../../content/logos";
import styles from "./Timeline.module.css";

export type TimelineItem = {
  id: string;
  year: string;
  logos: readonly LogoKey[];
};

type TimelineProps = {
  items: readonly TimelineItem[];
  active?: boolean;
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className={styles.timeline} data-timeline>
      <svg
        className={styles.line}
        viewBox="0 0 120 520"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          data-draw
          d="M40 0 V360 H70 V400 H100 V440 H120 V520"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ul className={styles.items}>
        {items.map((item, index) => (
          <li
            key={item.id}
            className={styles.item}
            style={{ "--i": index } as CSSProperties}
            data-reveal
          >
            <span className={styles.year}>{item.year}</span>
            <div className={styles.logos}>
              {item.logos.map((key) => (
                <img
                  key={key}
                  src={logos[key]}
                  alt={key}
                  className={styles.logo}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
