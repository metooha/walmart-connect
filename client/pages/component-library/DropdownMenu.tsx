import React from 'react';
import DropdownMenuExample from '@/components/examples/DropdownMenuExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function DropdownMenuPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Dropdown Menu" description="A dropdown menu with keyboard navigation, submenus, checkbox and radio items." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <DropdownMenuExample />
        </React.Suspense>
      </div>
    </div>
  );
}
