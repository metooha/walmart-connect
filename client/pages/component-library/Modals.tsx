import React from 'react';
import { ModalExample } from '@/components/examples/ModalExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ModalsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Modal" description="Centered overlay dialogs with size variants for focused user interactions. Built with Radix UI Dialog primitives and Living Design 3.5 tokens. Supports three size variants (small, medium, large) with full keyboard accessibility." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ModalExample />
        </React.Suspense>
      </div>
    </div>
  );
}
