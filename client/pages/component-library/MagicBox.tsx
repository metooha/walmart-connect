import React from 'react';
import { MagicBoxExample } from '@/components/examples/MagicBoxExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function MagicBoxPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Magic Box" description="AI-powered loading animation with sparkle effects and gradient borders." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <MagicBoxExample />
        </React.Suspense>
      </div>
    </div>
  );
}
