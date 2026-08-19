import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SceneShell } from "../../components/SceneShell/SceneShell";
import { PillButton } from "../../components/PillButton/PillButton";
import { StaircaseLine } from "../../components/StaircaseLine/StaircaseLine";
import { worksHub } from "../../content/site";
import { prepareDrawPaths, drawLine } from "../../motion/drawLine";
import styles from "./WorksHubScene.module.css";

type WorksHubSceneProps = {
  active: boolean;
};

export function WorksHubScene({ active }: WorksHubSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !rootRef.current) return;
    const paths = prepareDrawPaths(rootRef.current);
    paths.forEach((path) => drawLine(path, 1, { duration: 1.2 }));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-works-block]",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.18,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <SceneShell id="works" active={active}>
      <div className={styles.root} ref={rootRef}>
        <div className={styles.top} data-works-block>
          <h2 className={styles.title}>{worksHub.web.title}</h2>
          <PillButton to={worksHub.web.to} variant="solid" className={styles.visit}>
            {worksHub.web.visitLabel}
          </PillButton>
        </div>

        <div className={styles.lineWrap} aria-hidden>
          <StaircaseLine variant="horizontal" />
        </div>

        <div className={styles.bottom} data-works-block>
          <h2 className={`${styles.title} ${styles.muted}`}>
            {worksHub.games.title}
          </h2>
          <PillButton to={worksHub.games.to} variant="ghost" className={styles.visit}>
            {worksHub.games.visitLabel}
          </PillButton>
        </div>
      </div>
    </SceneShell>
  );
}
