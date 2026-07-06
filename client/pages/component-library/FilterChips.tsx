import React from 'react';
import { FilterChipExample } from '@/components/examples/FilterChipExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function FilterChipsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Filter Chips" description="Pill-shaped toggleable chips with optional counts for filtering UI." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <FilterChipExample />
        </React.Suspense>
      </div>
    </div>
  );
}
