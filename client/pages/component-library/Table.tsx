import React from 'react';
import DataTableExample from '@/components/examples/DataTableExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function TablePage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Data Table" description="Living Design 3.5 Data Table with sortable headers, row selection, bulk actions, status tags, inline editing, and action buttons. Uses LD semantic tokens exclusively." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)', overflow: 'hidden', border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)' }}>
        <React.Suspense fallback={<div style={{ padding: '32px' }}>Loading...</div>}>
          <DataTableExample />
        </React.Suspense>
      </div>
    </div>
  );
}
