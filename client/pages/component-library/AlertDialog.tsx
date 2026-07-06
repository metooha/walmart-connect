import React from 'react';
import AlertDialogExample from '@/components/examples/AlertDialogExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function AlertDialogPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Alert Dialog" description="Modal dialog for important confirmations or alerts that interrupt user workflow." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <AlertDialogExample />
        </React.Suspense>
      </div>
    </div>
  );
}
