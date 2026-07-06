import React from 'react';
import CollapsibleExample from '@/components/examples/CollapsibleExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function CollapsiblePage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Collapsible" description="An interactive component that expands and collapses content sections." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CollapsibleExample />
        </React.Suspense>
      </div>
    </div>
  );
}
