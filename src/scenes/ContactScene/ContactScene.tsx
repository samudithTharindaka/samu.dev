import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SceneShell } from "../../components/SceneShell/SceneShell";
import { PillButton } from "../../components/PillButton/PillButton";
import { contact } from "../../content/contact";
import styles from "./ContactScene.module.css";

type ContactSceneProps = {
  active: boolean;
};

export function ContactScene({ active }: ContactSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact]",
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <SceneShell id="contact" active={active}>
      <div className={styles.root} ref={rootRef}>
        <div className={styles.copy} data-contact>
          <p className={styles.kicker}>Contacts</p>
          <h2 className={styles.heading}>{contact.heading}</h2>
          <p className={styles.sub}>{contact.subheading}</p>

          <dl className={styles.meta}>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{contact.phone}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{contact.location}</dd>
            </div>
          </dl>

          <ul className={styles.socials}>
            {contact.socials.map((social) => (
              <li key={social.id}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          className={styles.form}
          data-contact
          onSubmit={(event) => event.preventDefault()}
        >
          <label className={styles.field}>
            <span className={styles.label}>Name</span>
            <input
              type="text"
              placeholder={contact.form.namePlaceholder}
              disabled
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              placeholder={contact.form.emailPlaceholder}
              disabled
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Message</span>
            <textarea
              rows={4}
              placeholder={contact.form.messagePlaceholder}
              disabled
            />
          </label>
          <PillButton type="submit" variant="solid" disabled>
            {contact.form.submitLabel}
          </PillButton>
          <p className={styles.note}>{contact.form.note}</p>
        </form>
      </div>
    </SceneShell>
  );
}
