import React from 'react';
import styles from './featured-projects.module.css';
import { Project } from './FeaturedProjects';

type Props = {
  project: Project;
  onOpen: () => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
  const hasLink = !!project.cta.href;

  return (
    <article className={styles.card} tabIndex={0} aria-labelledby={`proj-${project.id}-title`} onClick={onOpen} onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') onOpen();
    }}>
      <div className={styles.media} aria-hidden>
        <img
          src={project.image}
          alt={`${project.name} thumbnail`}
          loading="lazy"
          width={1200}
          height={675}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          <div className={styles.tags}>
            {project.technologies?.slice(0, 3).map((t) => (
              <span className={styles.tag} key={t}>{t}</span>
            ))}
          </div>
        </div>

        <h3 id={`proj-${project.id}-title`} className={styles.title}>{project.name}</h3>
        <p className={styles.desc}>{project.shortDescription}</p>

        <div className={styles.actions}>
          {hasLink ? (
            <a className={styles.cta} href={project.cta.href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              {project.cta.label}
              <span aria-hidden className={styles.ext}>↗</span>
            </a>
          ) : (
            <button className={styles.ctaAlt} onClick={(e) => { e.stopPropagation(); onOpen(); }}>
              {project.cta.label}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
