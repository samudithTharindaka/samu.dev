import type { ReactNode } from "react";
import styles from "./SceneShell.module.css";

type SceneShellProps = {
  id: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
  /** Remove page padding — used by full-bleed scenes like Hero */
  flush?: boolean;
};

export function SceneShell({
  id,
  active = false,
  children,
  className = "",
  flush = false,
}: SceneShellProps) {
  return (
    <section
      id={id}
      data-scene={id}
      className={`${styles.scene} ${active ? styles.active : ""} ${className}`}
      aria-hidden={!active}
    >
      <div className={`${styles.inner} ${flush ? styles.flush : ""}`}>
        {children}
      </div>
    </section>
  );
}
