import React from 'react';
import MenubarExample from '@/components/examples/MenubarExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function MenubarPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Menubar" description="A horizontal menu bar with dropdown menus, keyboard navigation, and nested submenus." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <MenubarExample />
        </React.Suspense>
      </div>
    </div>
  );
}
