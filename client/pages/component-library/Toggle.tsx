import React from 'react';
import ToggleExample from '@/components/examples/ToggleExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function TogglePage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Toggle" description="A two-state button that can be toggled on or off, useful for toolbar actions and view modes." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ToggleExample />
        </React.Suspense>
      </div>
    </div>
  );
}
