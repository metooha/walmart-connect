import React from 'react';
import { RadioExample } from '@/components/examples/RadioExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function RadioButtonsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Radio Buttons" description="Mutually exclusive selection within a group with bold label when selected." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <RadioExample />
        </React.Suspense>
      </div>
    </div>
  );
}
