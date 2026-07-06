import React from 'react';

const BottomSheetExample = React.lazy(() => import('../../components/examples/BottomSheetExample'));

export default function BottomSheetPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Bottom Sheet" description="A mobile-friendly modal component that slides up from the bottom of the screen to display supplementary content without leaving the current context. Replaces the previous Drawer component with Living Design 3.5 tokens." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BottomSheetExample />
        </React.Suspense>
      </div>
    </div>
  );
}
