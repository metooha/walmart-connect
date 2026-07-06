import React from 'react';
import { FormGroupExample } from '@/components/examples/FormGroupExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function FormGroupsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Form Groups" description="Fieldset containers for checkbox and radio groups with legend and description support." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <FormGroupExample />
        </React.Suspense>
      </div>
    </div>
  );
}
