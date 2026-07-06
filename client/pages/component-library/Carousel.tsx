import React from 'react';
import CarouselExample from '@/components/examples/CarouselExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function CarouselPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Carousel" description="Slideshow component for cycling through images or content panels." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CarouselExample />
        </React.Suspense>
      </div>
    </div>
  );
}
