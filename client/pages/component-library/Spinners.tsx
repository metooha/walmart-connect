import React from 'react';
import { SpinnerExample } from '@/components/examples/SpinnerExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function SpinnersPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Spinners" description="Loading indicators for indeterminate processes. Spinners inform users of ongoing processes including data retrieval, loading states, and saving. They provide visual feedback for operations with unknown duration." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SpinnerExample />
        </React.Suspense>
      </div>
    </div>
  );
}
