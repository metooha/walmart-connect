import React from 'react';
import { CheckboxExample } from '@/components/examples/CheckboxExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function CheckboxesPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Checkboxes" description="Single and grouped checkboxes with indeterminate state support and proper label associations." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CheckboxExample />
        </React.Suspense>
      </div>
    </div>
  );
}
