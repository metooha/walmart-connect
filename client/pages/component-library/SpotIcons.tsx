import React from 'react';
import { SpotIconExample } from '@/components/examples/SpotIconExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function SpotIconsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Spot Icons" description="Decorative icon containers used to add visual interest and direct user attention to interface elements. Available in small and large sizes with brand and neutral color variants. Spot Icons are not interactive." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SpotIconExample />
        </React.Suspense>
      </div>
    </div>
  );
}
