import React from 'react';
import { ProgressTrackerExample } from '@/components/examples/ProgressTrackerExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ProgressTrackerPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Components" title="Progress Tracker" description="A visual representation of a user's progress through a set of steps. Progress Trackers show the steps of a process and highlight completed, current, and future steps. They can be used for both user and system tasks." />

      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ProgressTrackerExample />
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
              <li>Multi-step forms and wizards</li>
              <li>Checkout processes (e.g., Cart → Shipping → Payment → Review)</li>
              <li>Onboarding flows</li>
              <li>Order fulfillment tracking</li>
              <li>Application review processes</li>
              <li>Account setup workflows</li>
              <li>Any process with discrete, sequential steps</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>When NOT to use</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>For continuous progress (0-100%) - use <strong>ProgressIndicator</strong> instead</li>
              <li>For file uploads or downloads - use <strong>ProgressIndicator</strong> instead</li>
              <li>For loading states - use <strong>ProgressIndicator</strong> or Spinner instead</li>
              <li>For processes without clear, distinct steps</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Status Variants</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>Info (default):</strong> Standard process tracking (blue)</li>
              <li><strong>Success:</strong> Completed or successful processes (green)</li>
              <li><strong>Warning:</strong> Processes requiring attention (orange)</li>
              <li><strong>Error:</strong> Failed or problematic processes (red)</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Step States</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>Completed:</strong> Steps before the active step (filled circle in status color)</li>
              <li><strong>Active:</strong> Current step (double-circle indicator in status color)</li>
              <li><strong>Future:</strong> Steps after the active step (filled circle in gray)</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Best Practices</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>Keep labels short and clear (1-3 words)</li>
              <li>Use 3-5 steps for optimal UX (maximum 7)</li>
              <li>Choose status based on process state</li>
              <li>Ensure steps are sequential and logical</li>
              <li>Consider mobile layout with 6+ steps</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Accessibility</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>Component is visual-only (non-interactive)</li>
              <li>Ensure parent context provides accessible announcements for step changes</li>
              <li>Consider using <code>aria-live</code> region in parent component for dynamic updates</li>
              <li>Labels should be clear and concise for screen readers</li>
              <li>Color alone should not convey information - use labels</li>
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
                    <td style={{ padding: '12px 8px' }}><code>steps</code></td>
                    <td style={{ padding: '12px 8px' }}>string[]</td>
                    <td style={{ padding: '12px 8px' }}>required</td>
                    <td style={{ padding: '12px 8px' }}>Array of step labels (minimum 2, maximum 7)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>activeStep</code></td>
                    <td style={{ padding: '12px 8px' }}>number</td>
                    <td style={{ padding: '12px 8px' }}>required</td>
                    <td style={{ padding: '12px 8px' }}>Index of current step (0-indexed)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>status</code></td>
                    <td style={{ padding: '12px 8px' }}>"info" | "warning" | "success" | "error"</td>
                    <td style={{ padding: '12px 8px' }}>"info"</td>
                    <td style={{ padding: '12px 8px' }}>Visual status variant</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px' }}><code>className</code></td>
                    <td style={{ padding: '12px 8px' }}>string</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Optional custom className</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Design Tokens</h3>
            <p style={{ marginBottom: '12px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              This component uses Living Design 3.5 semantic tokens exclusively:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>Progress colors:</strong> <code>--ld-semantic-color-progress-fill-*</code> (info, warning, positive, negative)</li>
              <li><strong>Typography:</strong> <code>--ld-semantic-font-caption-family</code>, <code>--ld-semantic-font-caption-size</code></li>
              <li><strong>Text colors:</strong> <code>--ld-semantic-color-text</code>, <code>--ld-semantic-color-text-subtlest</code></li>
              <li><strong>Spacing:</strong> <code>--ld-primitive-scale-space-25</code>, <code>--ld-primitive-scale-space-50</code></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Related Components</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>ProgressIndicator:</strong> For continuous progress (0-100%)</li>
              <li><strong>ButtonGroup:</strong> Often used with Progress Tracker for step navigation</li>
              <li><strong>Tag:</strong> Can complement status indication</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
