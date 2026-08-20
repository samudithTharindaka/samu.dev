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

/** Path from ImageResources/Vector 7.svg — viewBox 0 0 199 831.5 */
const VECTOR_7_PATH = "M0.5 0V525.5H87V612H145V774H198V831.5";

export function Timeline({ items }: TimelineProps) {
  return (
    <div className={styles.timeline} data-timeline>
      <svg
        className={styles.line}
        viewBox="0 0 199 831.5"
        width="100%"
        height="100%"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          data-draw
          d={VECTOR_7_PATH}
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
