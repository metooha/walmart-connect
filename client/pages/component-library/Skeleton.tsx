import React from 'react';
import SkeletonExample from '@/components/examples/SkeletonExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function SkeletonPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Shared Components" title="Skeleton" description="Loading placeholder animations that approximate UI elements. Supports rectangle and rounded shapes, with an optional magic variant for AI-generated content shimmer." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SkeletonExample />
        </React.Suspense>
      </div>
    </div>
  );
}
