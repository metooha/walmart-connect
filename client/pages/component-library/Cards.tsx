import React from 'react';
import { CardHeaderExample } from '@/components/examples/CardHeaderExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function CardsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Cards" description="Card containers with headers, optional actions, and content areas." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CardHeaderExample />
        </React.Suspense>
      </div>
    </div>
  );
}
