import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { BackLink } from "../../components/BackLink/BackLink";
import { getJourney, buildStepGroups, type StepGroup } from "../../content/journey";
import { logos } from "../../content/logos";
import styles from "./JourneyPage.module.css";

/** Relative width weight for each step (used to proportion treads across full page width) */
const DEFAULT_TREAD_WEIGHT = 2;
const LEAD_IN_TREAD_WEIGHT = 1; // lead-in is narrower than regular steps

function stepWeight(g: StepGroup): number {
  if (g.kind === "leadIn") return 1;
  return g.milestones.length;
}

function treadWeight(g: StepGroup): number {
  // Use explicit stepWidth as a relative weight; fall back to defaults
  if (g.stepWidth !== undefined) return g.stepWidth;
  if (g.kind === "leadIn") return LEAD_IN_TREAD_WEIGHT;
  return DEFAULT_TREAD_WEIGHT;
}

export function JourneyPage() {
  const { type = "interactive" } = useParams();
  const journey = getJourney(type);
  const rootRef = useRef<HTMLDivElement>(null);

  const groups = useMemo(
    () => (journey ? buildStepGroups(journey) : []),
    [journey],
  );

  const layout = useMemo(() => {
    // --- Height pass ---
    const explicitTotal = groups.reduce((sum, g) => sum + (g.stepHeight ?? 0), 0);
    const implicitGroups = groups.filter((g) => !g.stepHeight);
    const implicitWeight = implicitGroups.reduce((sum, g) => sum + stepWeight(g), 0) || 1;
    const implicitPool = Math.max(0, 1 - explicitTotal);

    // --- Tread width pass ---
    // Treads fill 100vw. We sum relative weights, then each tread = (weight/total)*100vw.
    // The last step has no outgoing tread (just the endRun line), so we distribute
    // across the first (n-1) treads only — the last riser's "tread" is the tail.
    const totalTreadWeight = groups.reduce((sum, g) => sum + treadWeight(g), 0) || 1;

    let leftVwCursor = 0;
    let topCursor = 0;

    return groups.map((group, idx) => {
      const tw = treadWeight(group);
      const leftVw = leftVwCursor;
      const treadVw = (tw / totalTreadWeight) * 90;
      leftVwCursor += treadVw;

      const height = group.stepHeight ?? (stepWeight(group) / implicitWeight) * implicitPool;
      const top = topCursor;
      topCursor += height;

      return {
        group,
        idx,
        top,
        height,
        leftVw,
        treadVw,
        isLast: idx === groups.length - 1,
      };
    });
  }, [groups]);

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
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, delay: 0.12, ease: "power3.out" },
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

  return (
    <div className={styles.page} ref={rootRef}>
      <header className={styles.header} data-journey-head>
        <h1 className={styles.title}>{journey.title}</h1>
      </header>

      <div className={styles.track}>
        {layout.map(({ group, idx, top, height, leftVw, treadVw, isLast }) => (
          <div
            key={idx}
            className={`${styles.step} ${group.kind === "leadIn" ? styles.leadIn : ""}`}
            style={
              {
                "--top": top,
                "--h": height,
                "--left-vw": `${leftVw}vw`,
                "--tread-vw": `${treadVw}vw`,
              } as CSSProperties
            }
            data-step
          >
            {group.kind === "milestones" && (
              <ol className={styles.rail}>
                {group.milestones.map((milestone) => (
                  <li key={milestone.id} className={styles.milestone} data-milestone>
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
            )}

            {group.kind === "leadIn" && (
              <div className={styles.railLine} aria-hidden />
            )}

            {!isLast ? (
              <div className={styles.connector} aria-hidden />
            ) : (
              <div className={styles.endRun} aria-hidden />
            )}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <BackLink to="/?scene=1" />
      </div>
    </div>
  );
}
