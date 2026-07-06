import React from 'react';
import { LinkButtonExample } from '@/components/examples/LinkButtonExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function LinkButtonsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Link Buttons" description="Link-styled interactive elements with icon support, multiple sizes, and color variants." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <LinkButtonExample />
        </React.Suspense>
      </div>
    </div>
  );
}
