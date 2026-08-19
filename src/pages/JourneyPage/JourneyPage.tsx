import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { BackLink } from "../../components/BackLink/BackLink";
import { getJourney, groupMilestonesByStep } from "../../content/journey";
import { logos } from "../../content/logos";
import styles from "./JourneyPage.module.css";

export function JourneyPage() {
  const { type = "interactive" } = useParams();
  const journey = getJourney(type);
  const rootRef = useRef<HTMLDivElement>(null);

  const steps = useMemo(
    () => (journey ? groupMilestonesByStep(journey.milestones) : []),
    [journey],
  );

  const layout = useMemo(() => {
    const totalWeight = steps.reduce((sum, group) => sum + group.length, 0) || 1;
    let cursor = 0;
    return steps.map((milestones, stepIndex) => {
      const weight = milestones.length;
      const top = cursor / totalWeight;
      const height = weight / totalWeight;
      cursor += weight;
      return { milestones, stepIndex, top, height };
    });
  }, [steps]);

  useEffect(() => {
    if (!rootRef.current || !journey) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-journey-head]",
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
      );
      gsap.fromTo(
        "[data-step]",
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.12,
          ease: "power3.out",
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [journey]);

  if (!journey) {
    return (
      <div className={styles.missing}>
        <p>Journey not found.</p>
        <Link to="/">Back home</Link>
      </div>
    );
  }

  const stepCount = Math.max(steps.length, 1);

  return (
    <div
      className={styles.page}
      ref={rootRef}
      style={{ "--steps": stepCount } as CSSProperties}
    >
      <header className={styles.header} data-journey-head>
        <h1 className={styles.title}>{journey.title}</h1>
      </header>

      <div className={styles.track}>
        {layout.map(({ milestones, stepIndex, top, height }) => (
          <div
            key={stepIndex}
            className={styles.step}
            style={
              {
                "--c": stepIndex,
                "--top": top,
                "--h": height,
              } as CSSProperties
            }
            data-step
          >
            <ol className={styles.rail}>
              {milestones.map((milestone) => (
                <li
                  key={milestone.id}
                  className={styles.milestone}
                  data-milestone
                >
                  <span className={styles.year}>{milestone.year}</span>
                  <span className={styles.dot} aria-hidden />
                  <div className={styles.info}>
                    {milestone.logo ? (
                      <img
                        src={logos[milestone.logo]}
                        alt={milestone.company}
                        className={styles.logo}
                      />
                    ) : null}
                    <h2 className={styles.role}>{milestone.title}</h2>
                    {milestone.subtitle ? (
                      <p className={styles.subtitle}>{milestone.subtitle}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            {stepIndex < steps.length - 1 ? (
              <div className={styles.connector} aria-hidden />
            ) : (
              <div className={styles.endRun} aria-hidden />
            )}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <BackLink to="/" />
      </div>
    </div>
  );
}
