import styles from "./StaircaseLine.module.css";

type StaircaseLineProps = {
  variant?: "horizontal" | "web" | "vertical" | "zigzag";
  className?: string;
};

const paths = {
  /** ImageResources/Vector 8.svg — works hub divider */
  horizontal: "M0 0.5H838V31.5H885V59.5H949V85H1024",
  /** ImageResources/Vector 9.svg — web projects header */
  web: "M0.5 0V63H87V84H249V158H315V174H776",
  vertical: "M40 0 V360 H70 V400 H100 V440 H120 V520",
  zigzag:
    "M40 20 V90 H180 V160 H320 V230 H460 V300 H600 V370 H740 V440",
} as const;

export function StaircaseLine({
  variant = "horizontal",
  className = "",
}: StaircaseLineProps) {
  const viewBoxes = {
    horizontal: "0 0 1024 86",
    web: "0 0 776 175",
    vertical: "0 0 140 520",
    zigzag: "0 0 780 460",
  } as const;

  const preserve =
    variant === "horizontal" || variant === "web" ? "xMidYMid meet" : "none";

  return (
    <svg
      className={`${styles.line} ${styles[variant]} ${className}`}
      viewBox={viewBoxes[variant]}
      fill="none"
      preserveAspectRatio={preserve}
      aria-hidden
    >
      <path
        data-draw
        d={paths[variant]}
        pathLength={100}
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
