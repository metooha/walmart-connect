import React from 'react';
import { SnackbarExample } from '@/components/examples/SnackbarExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function SnackbarsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Snackbars" description="Brief, non-critical notifications that appear at the bottom of the screen to provide feedback to users. Snackbars support optional action buttons, auto-dismiss functionality, and flexible positioning." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SnackbarExample />
        </React.Suspense>
      </div>
    </div>
  );
}
