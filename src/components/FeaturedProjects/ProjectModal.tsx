import React, { useEffect, useRef } from 'react';
import styles from './featured-projects.module.css';
import { Project } from './FeaturedProjects';

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    // focus the close button
    setTimeout(() => closeButtonRef.current?.focus(), 0);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function onOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  const ld = {
    '@context': 'https://schema.org',
    '@type': project.details.liveLink ? 'WebSite' : 'CreativeWork',
    name: project.name,
    description: project.shortDescription,
    url: project.details.liveLink || undefined,
  };

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby={`modal-${project.id}-title`} ref={overlayRef} onClick={onOverlayClick}>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <h3 id={`modal-${project.id}-title`}>{project.name}</h3>
          <button ref={closeButtonRef} className={styles.modalClose} onClick={onClose} aria-label="Close project details">✕</button>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.modalMedia}>
            <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" />
          </div>

          <section className={styles.modalContent}>
            <p className={styles.lead}>{project.details.overview}</p>

            <h4>Problem</h4>
            <p>{project.details.problem}</p>

            <h4>Solution</h4>
            <p>{project.details.solution}</p>

            <h4>Key features</h4>
            <ul>
              {project.details.keyFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <h4>Technology used</h4>
            <p>{project.details.technologies.join(', ')}</p>

            <h4>My role</h4>
            <p>{project.details.role}</p>

            <h4>Outcome</h4>
            <p>{project.details.outcome}</p>

            {project.details.liveLink && (
              <p>
                <a className={styles.visitBtn} href={project.details.liveLink} target="_blank" rel="noopener noreferrer">Visit project ↗</a>
              </p>
            )}
          </section>
        </div>

        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </div>
    </div>
  );
}
