import React from 'react';
import { MetricExample } from '@/components/examples/MetricExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function MetricsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Metrics" description="Display critical data points with trend indicators and units. Metric components help users identify meaningful changes and take action. Supports positive/negative trends with up/down indicators using Living Design 3.5 semantic tokens." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <MetricExample />
        </React.Suspense>
      </div>
    </div>
  );
}
