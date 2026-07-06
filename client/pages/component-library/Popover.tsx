import React from 'react';
import { PopoverExample } from '@/components/examples/PopoverExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function PopoverPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Components" title="Popover" description="A non-modal dialog that displays supporting content anchored to a trigger. Use for instructions, short lists of options, and lightweight actions without taking the user away from the current context." />

      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <PopoverExample />
        </React.Suspense>
      </div>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-primary, #2E2F32)', marginBottom: '16px' }}>
          Guidelines
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>When to use</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>Providing relevant supporting information or actions</li>
              <li>Presenting a short list of options for the current view</li>
              <li>Displaying contextual help or tooltips</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>When not to use</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>Displaying complex information or multi-step flows (use Modal instead)</li>
              <li>Making selections (use Select or radio group instead)</li>
              <li>Showing content on page load without user interaction</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Accessibility</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>Trigger must be keyboard-focusable with accessible name</li>
              <li>Focus moves into popover on open and returns to trigger on close</li>
              <li>Supports Escape key and outside click to dismiss</li>
              <li>Tab and Shift+Tab navigate through focusable content</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Props</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--ld-semantic-color-border-moderate, #E6E6E8)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: '700' }}>Prop</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: '700' }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: '700' }}>Default</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: '700' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>align</code></td>
                    <td style={{ padding: '12px 8px' }}>"start" | "center" | "end"</td>
                    <td style={{ padding: '12px 8px' }}>"center"</td>
                    <td style={{ padding: '12px 8px' }}>Alignment relative to trigger</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>sideOffset</code></td>
                    <td style={{ padding: '12px 8px' }}>number</td>
                    <td style={{ padding: '12px 8px' }}>8</td>
                    <td style={{ padding: '12px 8px' }}>Distance in pixels from trigger</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>showArrow</code></td>
                    <td style={{ padding: '12px 8px' }}>boolean</td>
                    <td style={{ padding: '12px 8px' }}>false</td>
                    <td style={{ padding: '12px 8px' }}>Show arrow/nubbin indicator</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px' }}><code>open</code></td>
                    <td style={{ padding: '12px 8px' }}>boolean</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Controlled open state</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
