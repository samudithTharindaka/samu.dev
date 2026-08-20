import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./PillButton.module.css";

type Variant = "soft" | "solid" | "ghost" | "outline";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

type LinkProps = CommonProps & {
  to: string;
  onClick?: () => void;
};

export function PillButton(props: ButtonProps | LinkProps) {
  const {
    children,
    variant = "soft",
    icon,
    className = "",
  } = props;

  const classes = `${styles.pill} ${styles[variant]} ${className}`;

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        <span className={styles.label}>{children}</span>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
      </Link>
    );
  }

  const buttonProps = props as ButtonProps;
  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
    >
      <span className={styles.label}>{children}</span>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
    </button>
  );
}

export function ArrowIcon({
  direction = "up-right",
  className = "",
}: {
  direction?: "up-right" | "down-right" | "left";
  className?: string;
}) {
  if (direction === "left") {
    return (
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden className={className}>
        <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  const directionClass =
    direction === "down-right" ? styles.arrowDownRight : styles.arrowUpRight;

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={`${styles.arrow} ${directionClass} ${className}`.trim()}
    >
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
