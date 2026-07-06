import React from 'react';
import { NudgeExample } from '@/components/examples/NudgeExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function NudgesPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Nudge" description="Provides non-critical, supportive information such as reminders, tips, or gentle prompts without blocking the user's workflow. Built with Living Design 3.5 tokens and supports leading icons, actions, and dismissible states." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <NudgeExample />
        </React.Suspense>
      </div>
    </div>
  );
}
