import React from 'react';
import { MenuExample } from '@/components/examples/MenuExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function MenuPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Menu" description="Dropdown menus with keyboard navigation, positioning options, and menu items." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <MenuExample />
        </React.Suspense>
      </div>
    </div>
  );
}
