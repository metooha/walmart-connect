import React from 'react';
import DrawerExample from '@/components/examples/DrawerExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function DrawerPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        marginBottom: '32px',
        padding: '16px',
        backgroundColor: 'var(--ld-primitive-color-purple-10)',
        borderLeft: '4px solid var(--ld-primitive-color-purple-100)',
        borderRadius: '4px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: 'var(--ld-primitive-color-purple-100)' }}>
          ⚠️ Component Replaced
        </h2>
        <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--ld-semantic-color-text)' }}>
          The SHADCN/Radix Drawer component has been replaced with <strong>BottomSheet</strong> from Living Design 3.5.
          The example below demonstrates the new BottomSheet component.
        </p>
      </div>
      <PageHeader section="Shared Components" title="Bottom Sheet (LD 3.5)" description="A mobile-friendly modal component that slides up from the bottom of the screen to display supplementary content without leaving the current context." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <DrawerExample />
        </React.Suspense>
      </div>
    </div>
  );
}
