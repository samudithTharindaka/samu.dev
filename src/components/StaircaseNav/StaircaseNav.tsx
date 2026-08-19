import type { CSSProperties } from "react";
import styles from "./StaircaseNav.module.css";
import { navItems } from "../../content/site";

type StaircaseNavProps = {
  activeScene: number;
  onNavigate: (sceneIndex: number) => void;
};

/** ViewBox 1200×640 — bottom-of-riser corners the pills sit on */
const STEP_CORNERS = [
  { x: 700, y: 430 },
  { x: 860, y: 345 },
  { x: 1020, y: 260 },
  { x: 1180, y: 175 },
] as const;

const PATH = "M0 430 H700 V345 H860 V260 H1020 V175 H1180 V0";

export function StaircaseNav({ activeScene, onNavigate }: StaircaseNavProps) {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {/* Left page edge → mid stairs → top page edge */}
      <svg
        className={styles.lines}
        viewBox="0 0 1200 640"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          data-draw
          d={PATH}
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ul className={styles.steps}>
        {navItems.map((item, index) => {
          const isActive = activeScene === item.sceneIndex;
          const corner = STEP_CORNERS[index] ?? STEP_CORNERS[0];
          return (
            <li
              key={item.id}
              className={styles.step}
              style={
                {
                  "--x": `${(corner.x / 1200) * 100}%`,
                  "--y": `${(corner.y / 640) * 100}%`,
                } as CSSProperties
              }
            >
              <button
                type="button"
                className={`${styles.pill} ${isActive ? styles.active : ""}`}
                onClick={() => onNavigate(item.sceneIndex)}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
