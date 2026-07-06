import React from 'react';
import { LinkExample } from '@/components/examples/LinkExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function LinksPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Links" description="Text links with icon support, underline on hover, and semantic color variants." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <LinkExample />
        </React.Suspense>
      </div>
    </div>
  );
}
