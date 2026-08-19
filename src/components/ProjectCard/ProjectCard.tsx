import { Link } from "react-router-dom";
import type { Project } from "../../content/projects";
import { ArrowIcon } from "../PillButton/PillButton";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={styles.card} data-reveal>
      <Link to={`/works/web/${project.slug}`} className={styles.link}>
        <div className={styles.media}>
          <img src={project.image} alt={project.title} />
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{project.title}</h3>
          <div className={styles.footer}>
            <ul className={styles.tags}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className={styles.arrow} aria-hidden>
              <ArrowIcon direction="down-right" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
