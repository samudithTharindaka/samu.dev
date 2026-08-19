import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BackLink } from "../../components/BackLink/BackLink";
import { PillButton } from "../../components/PillButton/PillButton";
import { gameGallery } from "../../content/journey";
import { worksHub } from "../../content/site";
import styles from "./GameGalleryPage.module.css";

export function GameGalleryPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-page-head]",
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
      );
      gsap.fromTo(
        "[data-gallery-item]",
        { y: 30, autoAlpha: 0, scale: 0.98 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.05,
          delay: 0.1,
          ease: "power3.out",
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.page} ref={rootRef}>
      <header className={styles.header} data-page-head>
        <div>
          <h1 className={styles.title}>{worksHub.games.title}</h1>
          <PillButton to="#" variant="solid" className={styles.visit}>
            Visit
          </PillButton>
        </div>
        <BackLink to="/" />
      </header>

      <div className={styles.masonry}>
        {gameGallery.map((item) => (
          <figure
            key={item.id}
            className={`${styles.item} ${item.span ? styles[item.span] : ""}`}
            data-gallery-item
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  );
}
