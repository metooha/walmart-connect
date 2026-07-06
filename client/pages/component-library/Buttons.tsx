import React from 'react';
import { ButtonExample } from '@/components/examples/ButtonExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ButtonsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Buttons" description="Primary, secondary, tertiary, and destructive button variants with full accessibility support. All buttons use Living Design 3.5 semantic tokens and support multiple sizes." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ButtonExample />
        </React.Suspense>
      </div>
    </div>
  );
}
