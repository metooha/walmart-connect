import React from 'react';
import { DateFieldExample } from '@/components/examples/DateFieldExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function DateFieldsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Date Fields" description="Text input fields for date entry with validation and formatting." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <DateFieldExample />
        </React.Suspense>
      </div>
    </div>
  );
}
