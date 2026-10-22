'use client';

import Hero from '@/components/landing/Hero';
import ProblemSolution from '@/components/landing/ProblemSolution';
import Features from '@/components/landing/Features';
import TargetUsers from '@/components/landing/TargetUsers';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProblemSolution />
      <Features />
      <TargetUsers />
    </div>
  );
}
