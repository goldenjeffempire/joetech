import Head from 'next/head';
import React from 'react';
import FeaturedProjects from '../src/components/FeaturedProjects/FeaturedProjects';

export default function WorkPage() {
  return (
    <>
      <Head>
        <title>Our Work — JOE Technologies</title>
        <meta name="description" content="Featured projects built by JOE Technologies — case studies across web, mobile, e-commerce, and SaaS." />
      </Head>

      <main>
        <FeaturedProjects />
      </main>
    </>
  );
}
