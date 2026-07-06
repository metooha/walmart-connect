import React from 'react';
const IconButtonExample = React.lazy(() => import('@/components/examples/IconButtonExample'));

export default function IconButtonsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Icon Buttons" description="Icon-only buttons for compact actions with ghost, primary, secondary, and destructive variants." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <IconButtonExample />
        </React.Suspense>
      </div>
    </div>
  );
}
