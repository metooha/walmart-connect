import React from 'react';
import { SelectExample } from '@/components/SelectExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function SelectPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Select" description="Dropdown select component for choosing a single option from a list. Supports error states, AI-assisted (magic) variant, helper text, and full keyboard accessibility." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-background, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SelectExample />
        </React.Suspense>
      </div>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          marginBottom: '16px'
        }}>
          Usage Guidelines
        </h2>
        
        <div style={{ maxWidth: '800px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px' }}>
            When to use
          </h3>
          <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: 'var(--ld-semantic-color-text-subtle, #515357)' }}>
            <li>When users need to choose a single option from 5-15 options</li>
            <li>For forms where screen space is limited</li>
            <li>When options need to be organized into groups</li>
            <li>For AI-powered recommendations (use magic variant)</li>
          </ul>

          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px' }}>
            When not to use
          </h3>
          <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: 'var(--ld-semantic-color-text-subtle, #515357)' }}>
            <li>For 2-4 options, use radio buttons instead for better visibility</li>
            <li>For multiple selections, use checkboxes or a multi-select component</li>
            <li>For more than 15 options, consider using an autocomplete/combobox</li>
          </ul>

          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px' }}>
            Accessibility
          </h3>
          <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: 'var(--ld-semantic-color-text-subtle, #515357)' }}>
            <li>Fully keyboard navigable (Tab, Enter, Arrow keys)</li>
            <li>ARIA labels and descriptions for screen readers</li>
            <li>Error states announced to assistive technologies</li>
            <li>Focus indicators meet WCAG 2.1 AA standards</li>
          </ul>

          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px' }}>
            Best Practices
          </h3>
          <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: 'var(--ld-semantic-color-text-subtle, #515357)' }}>
            <li>Always provide a clear, descriptive label</li>
            <li>Use error messages that explain how to fix the issue</li>
            <li>Provide helpful helper text for complex or important fields</li>
            <li>Use the magic variant sparingly for AI-powered features</li>
            <li>Group related options together for easier scanning</li>
            <li>Use the small size for compact layouts (typically desktop)</li>
            <li>Use the large size (default) for most use cases</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
