import React from 'react';
import ChartExample from '@/components/examples/ChartExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ChartPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Charts" description="Data visualization charts built with Recharts and the ChartContainer wrapper. Uses campaign and advertising data patterns from the project. Includes Line, Bar, Area, and Pie chart types with tooltips and legends." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ChartExample />
        </React.Suspense>
      </div>
    </div>
  );
}
