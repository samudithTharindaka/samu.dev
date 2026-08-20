import gsap from "gsap";

/**
 * Dash units for a shape. An authored `pathLength` normalises the dash
 * pattern, which keeps the draw correct when the shape is stretched by a
 * viewBox or resized after the tween was set up; otherwise fall back to the
 * measured geometry.
 */
function dashLength(path: SVGGeometryElement): number {
  const authored = Number(path.getAttribute("pathLength"));
  return authored > 0 ? authored : path.getTotalLength();
}

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
  const length = dashLength(path);
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
    const length = dashLength(path);
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  });
  return paths;
}
