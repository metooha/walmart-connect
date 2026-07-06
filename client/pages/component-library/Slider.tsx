import React from 'react';
import SliderExample from '@/components/examples/SliderExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function SliderPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Slider" description="A draggable slider control for selecting numeric values within a range." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SliderExample />
        </React.Suspense>
      </div>
    </div>
  );
}
