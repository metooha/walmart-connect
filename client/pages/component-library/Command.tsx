import React from 'react';
import CommandExample from '@/components/examples/CommandExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function CommandPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Command" description="A command palette for fast keyboard-driven search and navigation." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CommandExample />
        </React.Suspense>
      </div>
    </div>
  );
}
