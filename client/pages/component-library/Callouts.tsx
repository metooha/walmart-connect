import React from 'react';
import { CalloutExample } from '@/components/examples/CalloutExample';
import { PageHeader } from '@/components/ui/PageHeader';

const TooltipExample = React.lazy(() => import('@/components/examples/TooltipExample'));

export default function CalloutsPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Components" title="Callouts" description="Contextual coaching and onboarding messages with directional arrows (nubbins). Callouts replace the previous Tooltip component with a click-based interaction that works better on mobile devices." />

      {/* Nubbin Positions & Static Examples */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        marginBottom: '32px'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CalloutExample />
        </React.Suspense>
      </div>

      {/* Interactive Examples */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '8px'
        }}>
          Interactive Examples
        </h2>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          Click-triggered callouts anchored to buttons, demonstrating real-world usage patterns.
        </p>
      </div>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <TooltipExample />
        </React.Suspense>
      </div>
    </div>
  );
}
