import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SceneShell } from "../../components/SceneShell/SceneShell";
import { StaircaseNav } from "../../components/StaircaseNav/StaircaseNav";
import { site } from "../../content/site";
import { prepareDrawPaths, drawLine } from "../../motion/drawLine";
import portrait from "../../assets/meImg.png";
import styles from "./HeroScene.module.css";

type HeroSceneProps = {
  active: boolean;
  activeScene: number;
  onNavigate: (index: number) => void;
};

export function HeroScene({ active, activeScene, onNavigate }: HeroSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !rootRef.current) return;
    const paths = prepareDrawPaths(rootRef.current);
    paths.forEach((path) => drawLine(path, 1, { duration: 1.2 }));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-text]",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        },
      );
      gsap.fromTo(
        "[data-hero-portrait]",
        { y: 36, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", delay: 0.2 },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <SceneShell id="hero" active={active} flush>
      <div className={styles.root} ref={rootRef}>
        <StaircaseNav activeScene={activeScene} onNavigate={onNavigate} />

        <div className={styles.copy}>
          <p className={styles.greeting} data-hero-text>
            {site.greeting}
          </p>
          <h1 className={styles.name} data-hero-text>
            {site.name}
          </h1>
        </div>

        <div className={styles.portraitWrap} data-hero-portrait>
          <img
            src={portrait}
            alt={site.name}
            className={styles.portrait}
          />
        </div>
      </div>
    </SceneShell>
  );
}
