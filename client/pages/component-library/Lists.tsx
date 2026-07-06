import React from 'react';
import { ListExample } from '@/components/examples/ListExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ListsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Lists" description="Vertical lists with leading icons, spot icons, and trailing content." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ListExample />
        </React.Suspense>
      </div>
    </div>
  );
}
