import gsap from "gsap";

export type SceneChangeMeta = {
  from: number;
  to: number;
  direction: 1 | -1;
};

type Listener = (index: number, meta: SceneChangeMeta) => void;

/** Return false to consume the scroll/key intent (no scene change). */
export type IntentGate = (direction: 1 | -1) => boolean;

type SceneControllerOptions = {
  total: number;
  duration?: number;
  onChange?: Listener;
};

/**
 * Full-viewport snap controller.
 * Customize duration via tokens / options; subscribe with onChange / subscribe.
 */
export class SceneController {
  private index = 0;
  private total: number;
  private duration: number;
  private locked = false;
  private listeners = new Set<Listener>();
  private intentGate: IntentGate | null = null;
  private wheelHandler: ((event: WheelEvent) => void) | null = null;
  private keyHandler: ((event: KeyboardEvent) => void) | null = null;
  private touchStartY = 0;

  constructor(options: SceneControllerOptions) {
    this.total = options.total;
    this.duration = options.duration ?? 0.85;
    if (options.onChange) this.listeners.add(options.onChange);
  }

  get current() {
    return this.index;
  }

  /**
   * Optional interceptor for wheel/keyboard/touch step intents.
   * Direct goTo() (e.g. nav dots) bypasses the gate.
   */
  setIntentGate(gate: IntentGate | null) {
    this.intentGate = gate;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** Silently move the internal index without firing listeners or locking — use on init only */
  seed(index: number) {
    this.index = Math.max(0, Math.min(this.total - 1, index));
  }

  goTo(next: number) {
    if (this.locked) return;
    const clamped = Math.max(0, Math.min(this.total - 1, next));
    if (clamped === this.index) return;

    const from = this.index;
    const direction: 1 | -1 = clamped > from ? 1 : -1;
    this.index = clamped;
    this.locked = true;

    const meta: SceneChangeMeta = { from, to: clamped, direction };
    this.listeners.forEach((listener) => listener(clamped, meta));

    window.setTimeout(() => {
      this.locked = false;
    }, this.duration * 1000 + 80);
  }

  next() {
    if (this.intentGate && !this.intentGate(1)) return;
    this.goTo(this.index + 1);
  }

  prev() {
    if (this.intentGate && !this.intentGate(-1)) return;
    this.goTo(this.index - 1);
  }

  attach() {
    this.wheelHandler = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      if (event.deltaY > 0) this.next();
      else this.prev();
    };

    this.keyHandler = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "Space"].includes(event.code)) {
        event.preventDefault();
        this.next();
      }
      if (["ArrowUp", "PageUp"].includes(event.code)) {
        event.preventDefault();
        this.prev();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      this.touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const endY = event.changedTouches[0]?.clientY ?? 0;
      const delta = this.touchStartY - endY;
      if (Math.abs(delta) < 50) return;
      if (delta > 0) this.next();
      else this.prev();
    };

    window.addEventListener("wheel", this.wheelHandler, { passive: false });
    window.addEventListener("keydown", this.keyHandler);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      if (this.wheelHandler) {
        window.removeEventListener("wheel", this.wheelHandler);
      }
      if (this.keyHandler) {
        window.removeEventListener("keydown", this.keyHandler);
      }
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }
}

/** Animate a scene panel in/out — customize y / opacity here */
export function animateSceneTransition(
  panels: HTMLElement[],
  from: number,
  to: number,
  direction: 1 | -1,
  duration = 0.85,
) {
  const outgoing = panels[from];
  const incoming = panels[to];
  if (!outgoing || !incoming) return;

  gsap.set(incoming, { autoAlpha: 1, zIndex: 2 });
  gsap.set(outgoing, { zIndex: 1 });

  const tl = gsap.timeline({
    defaults: { duration, ease: "power3.inOut" },
  });

  tl.fromTo(
    incoming,
    { yPercent: direction * 18, autoAlpha: 0.35 },
    { yPercent: 0, autoAlpha: 1 },
    0,
  ).to(
    outgoing,
    {
      yPercent: direction * -12,
      autoAlpha: 0,
    },
    0,
  );

  return tl;
}
