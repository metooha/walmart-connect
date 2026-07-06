import React from 'react';
import PanelExample from '@/components/examples/PanelExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function PanelsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Panels" description="Slide-out panels for supplemental content, settings, and forms. Supports three size variants (small: 320px, medium: 420px, large: 600px) and can be positioned on the left or right. Fully accessible with focus management, keyboard navigation, and screen reader support." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <PanelExample />
        </React.Suspense>
      </div>
    </div>
  );
}
