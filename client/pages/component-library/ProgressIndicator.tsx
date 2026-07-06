import React from 'react';
import { ProgressIndicatorExample } from '@/components/examples/ProgressIndicatorExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ProgressIndicatorPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Components" title="Progress Indicator" description="A visual indicator that displays the completion status of a task or process. Use Progress Indicators to communicate system activity, loading states, file uploads, or task completion to users." />

      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ProgressIndicatorExample />
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
              <li>Showing progress of file uploads or downloads</li>
              <li>Displaying task completion status</li>
              <li>Indicating system resource usage (storage, memory, etc.)</li>
              <li>Communicating multi-step process completion</li>
              <li>Showing loading or processing states with known duration</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>When not to use</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>For indeterminate loading states (use Spinner instead)</li>
              <li>For stepper navigation (use Stepper component instead)</li>
              <li>As a decorative element without meaningful progress data</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Variants</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>Primary:</strong> Default variant for general progress indication</li>
              <li><strong>Success:</strong> Use when progress indicates successful completion or positive state</li>
              <li><strong>Warning:</strong> Use when progress is in a cautionary state (e.g., storage almost full)</li>
              <li><strong>Error:</strong> Use when progress indicates a critical or error state</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Accessibility</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>Uses <code>role="progressbar"</code> for screen reader support</li>
              <li>Includes <code>aria-valuenow</code>, <code>aria-valuemin</code>, and <code>aria-valuemax</code> attributes</li>
              <li>Label prop provides accessible name via <code>aria-label</code></li>
              <li>Color variants must not be the sole indicator of status (always include labels)</li>
              <li>Sufficient color contrast between fill and background (WCAG AA compliant)</li>
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
                    <td style={{ padding: '12px 8px' }}><code>value</code></td>
                    <td style={{ padding: '12px 8px' }}>number</td>
                    <td style={{ padding: '12px 8px' }}>required</td>
                    <td style={{ padding: '12px 8px' }}>Current progress value (0-100)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>max</code></td>
                    <td style={{ padding: '12px 8px' }}>number</td>
                    <td style={{ padding: '12px 8px' }}>100</td>
                    <td style={{ padding: '12px 8px' }}>Maximum value for progress</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>label</code></td>
                    <td style={{ padding: '12px 8px' }}>string</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Label displayed on the left side</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>valueLabel</code></td>
                    <td style={{ padding: '12px 8px' }}>string</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Custom label displayed on the right side</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>variant</code></td>
                    <td style={{ padding: '12px 8px' }}>"primary" | "success" | "warning" | "error"</td>
                    <td style={{ padding: '12px 8px' }}>"primary"</td>
                    <td style={{ padding: '12px 8px' }}>Visual variant for different states</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>showValue</code></td>
                    <td style={{ padding: '12px 8px' }}>boolean</td>
                    <td style={{ padding: '12px 8px' }}>false</td>
                    <td style={{ padding: '12px 8px' }}>Auto-display percentage if no valueLabel</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px' }}><code>className</code></td>
                    <td style={{ padding: '12px 8px' }}>string</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Additional CSS class name</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Design Tokens</h3>
            <p style={{ marginBottom: '12px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              This component uses Living Design 3.5 semantic tokens for consistent styling:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>Colors:</strong> <code>--ld-semantic-color-action-fill-primary</code>, <code>--ld-semantic-color-feedback-fill-*</code></li>
              <li><strong>Typography:</strong> <code>--ld-semantic-font-family-sans</code>, <code>--ld-semantic-font-body-small-*</code></li>
              <li><strong>Spacing:</strong> <code>--ld-primitive-scale-space-100</code></li>
              <li><strong>Border radius:</strong> <code>--ld-primitive-scale-borderradius-50</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
