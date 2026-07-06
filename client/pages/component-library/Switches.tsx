import React from 'react';
import SwitchExample from '@/components/examples/SwitchExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function SwitchesPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Switches" description="Toggle controls for binary on/off settings with immediate state changes. Switches use Living Design 3.5 semantic tokens and provide full accessibility support including keyboard navigation and screen reader announcements." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SwitchExample />
        </React.Suspense>
      </div>
    </div>
  );
}
