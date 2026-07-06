import React from 'react';
import ContextMenuExample from '@/components/examples/ContextMenuExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ContextMenuPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Context Menu" description="A right-click context menu with keyboard navigation, submenus, and checkbox items." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContextMenuExample />
        </React.Suspense>
      </div>
    </div>
  );
}
