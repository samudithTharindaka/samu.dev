import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { BackLink } from "../../components/BackLink/BackLink";
import { PillButton } from "../../components/PillButton/PillButton";
import { getProjectBySlug } from "../../content/projects";
import styles from "./ProjectDetailPage.module.css";

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || !project) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-detail]",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className={styles.missing}>
        <p>Project not found.</p>
        <Link to="/works/web">Back to projects</Link>
      </div>
    );
  }

  return (
    <div className={styles.page} ref={rootRef}>
      <div className={styles.top}>
        <div className={styles.headingRow} data-detail>
          <h1 className={styles.title}>{project.title}</h1>
          <PillButton to={project.liveUrl} variant="outline" className={styles.inlineVisit}>
            Visit
          </PillButton>
        </div>
        <BackLink to="/works/web" />
      </div>

      <div className={styles.layout}>
        <div className={styles.visual} data-detail>
          <div className={styles.frame}>
            <img src={project.image} alt={project.title} />
          </div>
          <div className={styles.actions}>
            <PillButton
              to={project.githubUrl}
              variant="solid"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.23v3.3c0 .32.22.7.82.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                </svg>
              }
            >
              Visit
            </PillButton>
            <PillButton to={project.liveUrl} variant="solid">
              Visit
            </PillButton>
          </div>
        </div>

        <p className={styles.description} data-detail>
          {project.description}
        </p>
      </div>

      <div className={styles.sideLine} aria-hidden />
    </div>
  );
}
