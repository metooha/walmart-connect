import React from 'react';
import { ChipExample } from '@/components/examples/ChipExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ChipsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Chips" description="Interactive, selectable buttons with subtle rounded corners for categories and selections." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ChipExample />
        </React.Suspense>
      </div>
    </div>
  );
}
