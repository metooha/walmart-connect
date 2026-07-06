import React from 'react';
import { ContentMessageExample } from '@/components/examples/ContentMessageExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ContentMessagesPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Content Messages" description="Full-page state messages for errors, permissions, critical states, and loading." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContentMessageExample />
        </React.Suspense>
      </div>
    </div>
  );
}
