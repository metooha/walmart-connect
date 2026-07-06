import React from 'react';
import { DatePickerExample } from '@/components/examples/DatePickerExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function DatePickersPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Date Pickers" description="Calendar popup for visual date selection with range support." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <DatePickerExample />
        </React.Suspense>
      </div>
    </div>
  );
}
