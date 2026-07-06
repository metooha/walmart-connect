import React from 'react';
import { TabExample } from '@/components/examples/TabExample';
import { PageHeader } from '@/components/ui/PageHeader';

/**
 * Tab Navigation Component Library Page
 * 
 * Displays the LD 3.5 Tab Navigation component with comprehensive examples
 * showing all variants, states, and usage patterns.
 */
export default function TabsPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Page Header */}
      <PageHeader section="Components" title="Tab Navigation" description="Tab Navigation allows for page-level navigation between sets of content, with a selected state, typically used at the top of the screen. It supports leading icons, trailing badges, and responsive small-screen modes." />
      
      {/* Documentation Link */}
      <div style={{
        marginBottom: '32px',
        padding: '16px',
        backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
        borderRadius: 'var(--ld-semantic-border-radius-medium)',
        borderLeft: '4px solid var(--ld-semantic-color-border-info)',
      }}>
        <p style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-body-small-size)',
          lineHeight: 'var(--ld-semantic-font-body-small-lineheight)',
          color: 'var(--ld-semantic-color-text)',
          margin: 0,
        }}>
          <strong>Living Design 3.5 Documentation:</strong>{' '}
          <a 
            href="https://digitaltoolkit.livingdesign.walmart.com/components/tab-navigation/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--ld-semantic-color-text-brand)',
              textDecoration: 'underline',
            }}
          >
            Tab Navigation Component
          </a>
        </p>
      </div>

      {/* Examples Card */}
      <div style={{
        background: 'var(--ld-semantic-color-surface)',
        borderRadius: 'var(--ld-semantic-border-radius-large)',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        padding: '32px',
      }}>
        <React.Suspense fallback={
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            color: 'var(--ld-semantic-color-text-subtle)',
          }}>
            Loading examples...
          </div>
        }>
          <TabExample />
        </React.Suspense>
      </div>

      {/* Usage Guidelines */}
      <div style={{ marginTop: '48px' }}>
        <h2 style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-heading-medium-size-b-l, 24px)',
          fontWeight: 'var(--ld-semantic-font-heading-medium-weight-default, 700)',
          lineHeight: 'var(--ld-semantic-font-heading-medium-line-height-b-l, 36px)',
          marginBottom: '16px',
          color: 'var(--ld-semantic-color-text)',
        }}>
          Usage Guidelines
        </h2>
        
        <div style={{
          display: 'grid',
          gap: '24px',
        }}>
          {/* When to use */}
          <div>
            <h3 style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-heading-small-size-b-l, 20px)',
              fontWeight: 'var(--ld-semantic-font-heading-small-weight-default, 700)',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              When to Use
            </h3>
            <ul style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-body-medium-size)',
              lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
              color: 'var(--ld-semantic-color-text)',
              paddingLeft: '24px',
            }}>
              <li>For page-level navigation between different content views</li>
              <li>When you need to show/hide large sections of related content</li>
              <li>To organize content that doesn't fit in a single view</li>
              <li>For filtering data tables or lists (e.g., "Active" vs "Archived")</li>
            </ul>
          </div>

          {/* Best practices */}
          <div>
            <h3 style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-heading-small-size-b-l, 20px)',
              fontWeight: 'var(--ld-semantic-font-heading-small-weight-default, 700)',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              Best Practices
            </h3>
            <ul style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-body-medium-size)',
              lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
              color: 'var(--ld-semantic-color-text)',
              paddingLeft: '24px',
            }}>
              <li>Keep tab labels short and descriptive (1-2 words preferred)</li>
              <li>Use 2-5 tabs maximum for optimal usability</li>
              <li>Enable smallScreen mode for mobile-responsive layouts</li>
              <li>Use trailing badges to show counts or status indicators</li>
              <li>Avoid nesting tabs within tabs</li>
              <li>Use TabPanel to properly associate content with each tab</li>
            </ul>
          </div>

          {/* Accessibility */}
          <div>
            <h3 style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-heading-small-size-b-l, 20px)',
              fontWeight: 'var(--ld-semantic-font-heading-small-weight-default, 700)',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              Accessibility
            </h3>
            <ul style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-body-medium-size)',
              lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
              color: 'var(--ld-semantic-color-text)',
              paddingLeft: '24px',
            }}>
              <li>Tabs support keyboard navigation (Tab, Arrow keys, Enter)</li>
              <li>Active tab is indicated with aria-selected="true"</li>
              <li>Each tab panel has role="tabpanel" for screen readers</li>
              <li>Focus states are clearly visible with LD 3.5 focus rings</li>
              <li>Disabled tabs are announced properly to assistive technology</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
