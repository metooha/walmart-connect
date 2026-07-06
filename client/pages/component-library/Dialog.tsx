import React from 'react';
import DialogExample from '@/components/examples/DialogExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function DialogPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Dialog" description="Modal overlay dialog for forms, confirmations, or detailed content." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <DialogExample />
        </React.Suspense>
      </div>
    </div>
  );
}
