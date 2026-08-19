import { Link } from "react-router-dom";
import styles from "./BackLink.module.css";

type BackLinkProps = {
  to: string;
  label?: string;
  className?: string;
};

export function BackLink({
  to,
  label = "Back",
  className = "",
}: BackLinkProps) {
  return (
    <Link to={to} className={`${styles.back} ${className}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.line} aria-hidden>
        <svg width="72" height="10" viewBox="0 0 72 10" fill="none">
          <path
            d="M71 5H1M1 5L6 1M1 5L6 9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
