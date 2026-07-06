import React from 'react';
import { BadgeExample } from '@/components/examples/BadgeExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function BadgesPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Badges" description="Count badges, status indicators, and semantic color variants for notifications and labels." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BadgeExample />
        </React.Suspense>
      </div>
    </div>
  );
}
