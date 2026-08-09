import React, { useState } from 'react';
import styles from './featured-projects.module.css';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export type Project = {
  id: string;
  name: string;
  shortDescription: string;
  category: string;
  technologies?: string[];
  cta: {
    label: string;
    href?: string;
    external?: boolean;
  };
  image: string;
  details: {
    overview: string;
    problem: string;
    solution: string;
    keyFeatures: string[];
    technologies: string[];
    role: string;
    outcome: string;
    liveLink?: string;
  };
};

const PROJECTS: Project[] = [
  {
    id: 'jctm',
    name: 'JCTM',
    shortDescription:
      "A modern church website designed to provide visitors with information about the church, its activities, services, announcements, and digital presence.",
    category: 'Web Development',
    technologies: ['Responsive Web', 'CMS-friendly'],
    cta: { label: 'Visit Project', href: 'https://jctm.org.ng/', external: true },
    image: '/images/projects/jctm.svg',
    details: {
      overview:
        'A modern, accessible website for JCTM providing visitors with clear information about services, events, and announcements.',
      problem:
        'The church needed a structured, mobile-first online presence to centralize announcements and make events discoverable for congregants and visitors.',
      solution:
        'Built a responsive website with clear navigation, content blocks for announcements, events calendar integration, and media embeds for sermons.',
      keyFeatures: [
        'Events & announcements',
        'Service schedule and media embeds',
        'Accessible navigation and responsive layout',
      ],
      technologies: ['HTML', 'CSS', 'TypeScript', 'Server-rendered pages'],
      role: 'Built by JOE Technologies',
      outcome: 'A modern, mobile-first web presence for JCTM. Live site available.',
      liveLink: 'https://jctm.org.ng/',
    },
  },
  {
    id: 'templetv',
    name: 'Temple TV',
    shortDescription:
      "A mobile application that delivers Temple TV's 24/7 broadcasting experience through a digital platform.",
    category: 'Mobile Development',
    technologies: ['Mobile App', 'Streaming'],
    cta: { label: 'Mobile App', external: false },
    image: '/images/projects/templetv.svg',
    details: {
      overview:
        "A mobile-first streaming application that brings Temple TV's broadcast to users' devices with 24/7 play and scheduling.",
      problem:
        'Viewers needed a convenient way to access live broadcast content on mobile devices with a simple, reliable interface.',
      solution:
        'A lightweight mobile app shell with a streaming player, intuitive playback controls, and offline-ready assets for quick startup.',
      keyFeatures: ['24/7 live streaming', 'Lightweight player', 'Low-latency playback'],
      technologies: ['React Native / Native'],
      role: 'Built by JOE Technologies',
      outcome: 'A mobile app prototype for Temple TV. No public store link provided.',
    },
  },
  {
    id: 'globalxchange',
    name: 'GlobalXchange',
    shortDescription:
      'An online marketplace designed to connect customers with locally sourced farm produce from different parts of the world.',
    category: 'E-commerce & Full-Stack Development',
    technologies: ['Marketplace', 'Payments-ready'],
    cta: { label: 'View Case Study', external: false },
    image: '/images/projects/globalxchange.svg',
    details: {
      overview:
        'A marketplace connecting customers to locally sourced farm produce globally, focusing on discoverability and seller onboarding.',
      problem:
        'Local producers needed a simpler way to reach wider markets while maintaining control of listings and fulfillment options.',
      solution:
        'Built a marketplace with product catalog, seller dashboards, and configurable fulfillment/payment flows.',
      keyFeatures: ['Product catalog', 'Seller dashboards', 'Order management'],
      technologies: ['TypeScript', 'Node.js', 'Postgres'],
      role: 'Built by JOE Technologies',
      outcome: 'A marketplace MVP and case study. No public URL provided.',
    },
  },
  {
    id: 'invoiceflow',
    name: 'InvoiceFlow',
    shortDescription:
      'A smart invoicing platform to help freelancers and businesses create professional invoices, automate reminders, and manage payments.',
    category: 'SaaS / FinTech / Automation',
    technologies: ['Invoicing', 'PDF export', 'Auth'],
    cta: { label: 'Visit Project', href: 'https://invoiceflow.com.ng/', external: true },
    image: '/images/projects/invoiceflow.svg',
    details: {
      overview:
        'A smart invoicing platform focused on automating invoice generation, reminders, and payment tracking for small businesses and freelancers.',
      problem:
        'Small businesses needed a reliable way to issue invoices, remind clients, and track payments without manual overhead.',
      solution:
        'Delivered a secure invoicing platform with invoice templates, automated reminders, online payments, and an analytics dashboard.',
      keyFeatures: [
        'Professional invoice generation',
        'Automated payment reminders',
        'Online payments & payment tracking',
        'PDF invoice export',
        'Multi-factor authentication',
      ],
      technologies: ['TypeScript', 'Node.js', 'Stripe (optional)'],
      role: 'Built by JOE Technologies',
      outcome: 'A secure SaaS invoicing platform. Live site available.',
      liveLink: 'https://invoiceflow.com.ng/',
    },
  },
];

export default function FeaturedProjects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section className={styles.section} aria-labelledby="featured-projects-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="featured-projects-heading">Featured Projects</h2>
          <p className={styles.lead}>
            JOE Technologies doesn't just talk about technology — we build real
            software products. Explore a selection of projects showcasing our
            approach to solving product and technical challenges.
          </p>
        </header>

        <div className={styles.grid}>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
          ))}
        </div>

        <div className={styles.footer}
          aria-hidden="true">
          <a className={styles.viewAll} href="/work">View full case studies</a>
        </div>
      </div>

      {active && (
        <ProjectModal project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
