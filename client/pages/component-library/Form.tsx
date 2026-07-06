import React from 'react';
import FormExample from '@/components/examples/FormExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function FormPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Form" description="Form components with validation, error handling, and accessible field labeling." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <FormExample />
        </React.Suspense>
      </div>
    </div>
  );
}
