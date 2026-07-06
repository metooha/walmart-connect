import React from 'react';
import ScrollAreaExample from '@/components/examples/ScrollAreaExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ScrollAreaPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Scroll Area" description="A custom scrollable container with styled scrollbars that augments native scroll functionality." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ScrollAreaExample />
        </React.Suspense>
      </div>
    </div>
  );
}
