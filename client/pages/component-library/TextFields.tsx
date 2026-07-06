import React from 'react';
import { TextFieldExample } from '@/components/examples/TextFieldExample';
import { PageHeader } from '@/components/ui/PageHeader';

const LabelExample = React.lazy(() => import('@/components/examples/LabelExample'));

export default function TextFieldsPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Components" title="Text Fields" description="Single-line text inputs with built-in labels, error states, helper text, leading icons, trailing content, and AI-generated content indicators. Text fields support multiple sizes, input types, and accessibility features. This component also replaces the previous standalone Label component." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        marginBottom: '32px'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <TextFieldExample />
        </React.Suspense>
      </div>

      {/* Label Usage Examples */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '8px'
        }}>
          Labels
        </h2>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          TextField includes integrated labels. For standalone labels (e.g., with checkboxes), use native HTML label elements.
        </p>
      </div>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <LabelExample />
        </React.Suspense>
      </div>
    </div>
  );
}
