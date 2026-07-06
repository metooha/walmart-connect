import React from 'react';
import { BreadcrumbExample } from '@/components/examples/BreadcrumbExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function BreadcrumbsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Breadcrumbs" description="Navigation breadcrumbs with support for 2-5 levels and custom separators." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BreadcrumbExample />
        </React.Suspense>
      </div>
    </div>
  );
}
