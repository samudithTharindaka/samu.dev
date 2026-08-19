import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SceneShell } from "../../components/SceneShell/SceneShell";
import { PillButton, ArrowIcon } from "../../components/PillButton/PillButton";
import { Timeline } from "../../components/Timeline/Timeline";
import {
  aboutLines,
  aboutTimeline,
  journeyCtas,
} from "../../content/site";
import { prepareDrawPaths, drawLine } from "../../motion/drawLine";
import type { SceneController } from "../../motion/sceneController";
import styles from "./AboutScene.module.css";

type AboutSceneProps = {
  active: boolean;
  controller: SceneController | null;
};

const LINE_STEP_MS = 520;
const LINE_FADE_DURATION = 0.72;

export function AboutScene({ active, controller }: AboutSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(1);
  const stepLockRef = useRef(false);
  const [revealedCount, setRevealedCount] = useState(1);

  useEffect(() => {
    if (!active) {
      revealedRef.current = 1;
      setRevealedCount(1);
      stepLockRef.current = false;
      return;
    }
    if (!controller) return;

    controller.setIntentGate((direction) => {
      if (stepLockRef.current) return false;

      const total = aboutLines.length;
      const current = revealedRef.current;

      if (direction === 1) {
        if (current < total) {
          stepLockRef.current = true;
          const next = current + 1;
          revealedRef.current = next;
          setRevealedCount(next);
          window.setTimeout(() => {
            stepLockRef.current = false;
          }, LINE_STEP_MS);
          return false;
        }
        return true;
      }

      if (current > 1) {
        stepLockRef.current = true;
        const next = current - 1;
        revealedRef.current = next;
        setRevealedCount(next);
        window.setTimeout(() => {
          stepLockRef.current = false;
        }, LINE_STEP_MS);
        return false;
      }
      return true;
    });

    return () => {
      controller.setIntentGate(null);
    };
  }, [active, controller]);

  useEffect(() => {
    if (!rootRef.current) return;
    const lines =
      rootRef.current.querySelectorAll<HTMLElement>("[data-about-line]");

    lines.forEach((el, index) => {
      const isOn = active && index < revealedCount;
      gsap.to(el, {
        color: isOn ? "#0a0a0a" : "#8a8a8a",
        duration: active ? LINE_FADE_DURATION : 0.25,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    });
  }, [active, revealedCount]);

  useEffect(() => {
    if (!active || !rootRef.current) return;
    const paths = prepareDrawPaths(rootRef.current);
    paths.forEach((path) => drawLine(path, 1, { duration: 1.15 }));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-line]",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        "[data-about-cta]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.25,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        "[data-reveal]",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.12,
          delay: 0.2,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        "[data-next]",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, delay: 0.55 },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <SceneShell id="about" active={active}>
      <div className={styles.root} ref={rootRef}>
        <div className={styles.left}>
          <div className={styles.lines}>
            {aboutLines.map((line) => (
              <p key={line.text} className={styles.line} data-about-line>
                {line.text}
              </p>
            ))}
          </div>

          <div className={styles.ctas}>
            {journeyCtas.map((cta) => (
              <div key={cta.id} data-about-cta>
                <PillButton
                  to={cta.to}
                  className={styles.cta}
                  icon={<ArrowIcon />}
                >
                  {cta.label}
                </PillButton>
              </div>
            ))}
          </div>

          <div className={styles.next} data-next>
            <span>Next Page</span>
            <svg width="64" height="10" viewBox="0 0 64 10" fill="none" aria-hidden>
              <path
                d="M1 5H63M63 5L58 1M63 5L58 9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className={styles.right}>
          <Timeline items={aboutTimeline} active={active} />
        </div>
      </div>
    </SceneShell>
  );
}
