import React from 'react';
import AccordionExample from '@/components/examples/AccordionExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function AccordionPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Shared Components" title="Accordion" description="Vertically stacked set of interactive headings with collapsible content panels." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <AccordionExample />
        </React.Suspense>
      </div>
    </div>
  );
}
