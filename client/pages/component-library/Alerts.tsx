import React from 'react';
import { AlertExample } from '@/components/examples/AlertExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function AlertsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Alerts" description="Banner messages for info, success, warning, and error states with optional close button." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <AlertExample />
        </React.Suspense>
      </div>
    </div>
  );
}
