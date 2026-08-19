import { useEffect, useState } from "react";
import {
  SceneController,
  animateSceneTransition,
  type SceneChangeMeta,
} from "./sceneController";
import { stopLenis, startLenis } from "./lenis";

/**
 * Hook that owns the home-page snap journey.
 */
export function useSnapScenes(total: number, enabled: boolean) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [controller, setController] = useState<SceneController | null>(null);

  useEffect(() => {
    if (!enabled) {
      startLenis();
      return;
    }

    stopLenis();
    const ctrl = new SceneController({ total, duration: 0.85 });
    setController(ctrl);

    const detachInput = ctrl.attach();
    const unsubscribe = ctrl.subscribe((index) => {
      setActiveIndex(index);
    });

    return () => {
      detachInput();
      unsubscribe();
      setController(null);
    };
  }, [total, enabled]);

  const goTo = (index: number) => controller?.goTo(index);

  return { activeIndex, goTo, controller };
}

export function runSceneTransition(
  container: HTMLElement | null,
  meta: SceneChangeMeta,
) {
  if (!container) return;
  const panels = Array.from(
    container.querySelectorAll<HTMLElement>("[data-scene]"),
  );
  return animateSceneTransition(
    panels,
    meta.from,
    meta.to,
    meta.direction,
  );
}

export type { SceneChangeMeta };
