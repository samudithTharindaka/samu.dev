import gsap from "gsap";

/**
 * Draw an SVG path from 0 → progress (0..1).
 * Works with any path that supports getTotalLength().
 */
export function drawLine(
  path: SVGPathElement | SVGGeometryElement | null,
  progress: number,
  options: { duration?: number; ease?: string; immediate?: boolean } = {},
) {
  if (!path) return;
  const length = path.getTotalLength();
  const { duration = 1.1, ease = "power2.inOut", immediate = false } = options;
  const clamped = Math.max(0, Math.min(1, progress));

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  if (immediate) {
    gsap.set(path, { strokeDashoffset: length * (1 - clamped) });
    return;
  }

  return gsap.to(path, {
    strokeDashoffset: length * (1 - clamped),
    duration,
    ease,
  });
}

export function prepareDrawPaths(
  root: ParentNode | null,
  selector = "[data-draw]",
) {
  if (!root) return [];
  const paths = Array.from(
    root.querySelectorAll(selector),
  ) as SVGGeometryElement[];
  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  });
  return paths;
}
