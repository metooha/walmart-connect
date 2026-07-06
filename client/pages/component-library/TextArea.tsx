import React from 'react';
import TextareaExample from '@/components/examples/TextareaExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function TextAreaPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Text Area" description="Multi-line text input component with support for labels, error states, helper text, character counting, and AI-generated content indicators. Built with Living Design 3.5 semantic tokens for consistent styling across all states and sizes." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <TextareaExample />
        </React.Suspense>
      </div>
    </div>
  );
}
