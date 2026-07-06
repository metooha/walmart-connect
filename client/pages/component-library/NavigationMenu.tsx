import React from 'react';
import NavigationMenuExample from '@/components/examples/NavigationMenuExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function NavigationMenuPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Navigation Menu" description="A top-level navigation menu with multi-column dropdown panels and link groups." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <NavigationMenuExample />
        </React.Suspense>
      </div>
    </div>
  );
}
