import styles from "./StaircaseLine.module.css";

type StaircaseLineProps = {
  variant?: "horizontal" | "vertical" | "zigzag";
  className?: string;
};

const paths = {
  horizontal: "M0 40 H520 V70 H600 V100 H680 V130 H900",
  vertical: "M40 0 V360 H70 V400 H100 V440 H120 V520",
  zigzag:
    "M40 20 V90 H180 V160 H320 V230 H460 V300 H600 V370 H740 V440",
} as const;

export function StaircaseLine({
  variant = "horizontal",
  className = "",
}: StaircaseLineProps) {
  const viewBoxes = {
    horizontal: "0 0 900 160",
    vertical: "0 0 140 520",
    zigzag: "0 0 780 460",
  } as const;

  return (
    <svg
      className={`${styles.line} ${styles[variant]} ${className}`}
      viewBox={viewBoxes[variant]}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        data-draw
        d={paths[variant]}
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
