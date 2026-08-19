import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroScene } from "../../scenes/HeroScene/HeroScene";
import { AboutScene } from "../../scenes/AboutScene/AboutScene";
import { WorksHubScene } from "../../scenes/WorksHubScene/WorksHubScene";
import { ContactScene } from "../../scenes/ContactScene/ContactScene";
import { scenes } from "../../content/site";
import { useSnapScenes } from "../../motion/useSnapScenes";
import type { SceneChangeMeta } from "../../motion/useSnapScenes";
import styles from "./HomePage.module.css";

export function HomePage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { activeIndex, goTo, controller } = useSnapScenes(scenes.length, true);
  const ready = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const panels = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-scene]"),
    );
    panels.forEach((panel, index) => {
      gsap.set(panel, {
        autoAlpha: index === 0 ? 1 : 0,
        yPercent: 0,
      });
    });
    ready.current = true;
  }, []);

  useEffect(() => {
    if (!controller || !stageRef.current) return;

    return controller.subscribe((_index, meta: SceneChangeMeta) => {
      const stage = stageRef.current;
      if (!stage || !ready.current) return;
      const panels = Array.from(
        stage.querySelectorAll<HTMLElement>("[data-scene]"),
      );
      const outgoing = panels[meta.from];
      const incoming = panels[meta.to];
      if (!outgoing || !incoming) return;

      gsap.set(incoming, { zIndex: 3, visibility: "visible" });
      gsap.set(outgoing, { zIndex: 2 });

      gsap
        .timeline({
          defaults: { duration: 0.85, ease: "power3.inOut" },
        })
        .fromTo(
          incoming,
          { yPercent: meta.direction * 16, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1 },
          0,
        )
        .to(
          outgoing,
          {
            yPercent: meta.direction * -10,
            autoAlpha: 0,
            onComplete: () => {
              gsap.set(outgoing, { yPercent: 0, visibility: "hidden" });
            },
          },
          0,
        );
    });
  }, [controller]);

  return (
    <div className={styles.home}>
      <div className={styles.stage} ref={stageRef}>
        <HeroScene
          active={activeIndex === 0}
          activeScene={activeIndex}
          onNavigate={(index) => goTo?.(index)}
        />
        <AboutScene active={activeIndex === 1} controller={controller} />
        <WorksHubScene active={activeIndex === 2} />
        <ContactScene active={activeIndex === 3} />
      </div>

      <div className={styles.progress} aria-hidden>
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            type="button"
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
            onClick={() => goTo?.(index)}
            title={scene.label}
          />
        ))}
      </div>
    </div>
  );
}
