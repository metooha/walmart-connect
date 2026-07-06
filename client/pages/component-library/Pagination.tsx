import React from 'react';
import PaginationExample from '@/components/examples/PaginationExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function PaginationPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Pagination" description="Navigation controls for paging through large data sets with previous, next, and page number buttons." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <PaginationExample />
        </React.Suspense>
      </div>
    </div>
  );
}
