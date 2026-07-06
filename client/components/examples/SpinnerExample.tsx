import React from 'react';
import { Spinner } from '../ui/Spinner';
import { Button } from '../ui/Button';

export const SpinnerExample: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-6, 48px)' }}>
      {/* Size Variants */}
      <section>
        <h3
          style={{
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: 'var(--ld-primitive-scale-space-4, 24px)',
            color: 'var(--ld-semantic-color-text-primary)',
          }}
        >
          Size Variants
        </h3>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ld-primitive-scale-space-5, 32px)',
            alignItems: 'center',
            padding: 'var(--ld-primitive-scale-space-4, 24px)',
            backgroundColor: 'var(--ld-semantic-color-fill-secondary)',
            borderRadius: '8px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-2, 8px)', alignItems: 'center' }}>
            <Spinner size="large" />
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text-secondary)',
              }}
            >
              Large (48px)
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-2, 8px)', alignItems: 'center' }}>
            <Spinner size="small" />
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text-secondary)',
              }}
            >
              Small (24px)
            </span>
          </div>
        </div>
      </section>

      {/* Color Variants */}
      <section>
        <h3
          style={{
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: 'var(--ld-primitive-scale-space-4, 24px)',
            color: 'var(--ld-semantic-color-text-primary)',
          }}
        >
          Color Variants
        </h3>
        <div style={{ display: 'flex', gap: 'var(--ld-primitive-scale-space-4, 24px)' }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ld-primitive-scale-space-2, 8px)',
              alignItems: 'center',
              padding: 'var(--ld-primitive-scale-space-4, 24px)',
              backgroundColor: 'var(--ld-semantic-color-fill-secondary)',
              borderRadius: '8px',
            }}
          >
            <Spinner color="neutral" size="large" />
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text-secondary)',
              }}
            >
              Neutral
            </span>
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '12px',
                color: 'var(--ld-semantic-color-text-tertiary)',
              }}
            >
              For light backgrounds
            </span>
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ld-primitive-scale-space-2, 8px)',
              alignItems: 'center',
              padding: 'var(--ld-primitive-scale-space-4, 24px)',
              backgroundColor: 'var(--ld-semantic-color-fill-primary)',
              borderRadius: '8px',
            }}
          >
            <Spinner color="white" size="large" />
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text-on-fill-primary)',
              }}
            >
              White
            </span>
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '12px',
                color: 'var(--ld-semantic-color-text-on-fill-primary)',
                opacity: 0.8,
              }}
            >
              For dark backgrounds
            </span>
          </div>
        </div>
      </section>

      {/* Common Patterns */}
      <section>
        <h3
          style={{
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: 'var(--ld-primitive-scale-space-4, 24px)',
            color: 'var(--ld-semantic-color-text-primary)',
          }}
        >
          Common Patterns
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-4, 24px)' }}>
          {/* Spinner with text */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ld-primitive-scale-space-3, 12px)',
              padding: 'var(--ld-primitive-scale-space-4, 24px)',
              backgroundColor: 'var(--ld-semantic-color-fill-secondary)',
              borderRadius: '8px',
            }}
          >
            <Spinner size="small" />
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text-primary)',
              }}
            >
              Loading your data…
            </span>
          </div>

          {/* Button with spinner (loading state) */}
          <div style={{ display: 'flex', gap: 'var(--ld-primitive-scale-space-3, 12px)' }}>
            <Button variant="primary" disabled>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-2, 8px)' }}>
                <Spinner color="white" size="small" />
                <span>Saving…</span>
              </div>
            </Button>
            <Button variant="secondary" disabled>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-2, 8px)' }}>
                <Spinner size="small" />
                <span>Processing…</span>
              </div>
            </Button>
          </div>

          {/* Centered loading state */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--ld-primitive-scale-space-3, 12px)',
              padding: 'var(--ld-primitive-scale-space-6, 48px)',
              backgroundColor: 'var(--ld-semantic-color-fill-secondary)',
              borderRadius: '8px',
              minHeight: '200px',
            }}
          >
            <Spinner size="large" a11yLabel="Loading content…" />
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '16px',
                color: 'var(--ld-semantic-color-text-primary)',
              }}
            >
              Loading content…
            </span>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h3
          style={{
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: 'var(--ld-primitive-scale-space-4, 24px)',
            color: 'var(--ld-semantic-color-text-primary)',
          }}
        >
          Accessibility
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ld-primitive-scale-space-3, 12px)',
            padding: 'var(--ld-primitive-scale-space-4, 24px)',
            backgroundColor: 'var(--ld-semantic-color-fill-secondary)',
            borderRadius: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-3, 12px)' }}>
            <Spinner size="small" a11yLabel="Saving your changes…" />
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text-secondary)',
              }}
            >
              Custom aria-label: "Saving your changes…"
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-3, 12px)' }}>
            <Spinner size="small" a11yLabel="Uploading file…" />
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text-secondary)',
              }}
            >
              Custom aria-label: "Uploading file…"
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: '12px',
              color: 'var(--ld-semantic-color-text-tertiary)',
              marginTop: 'var(--ld-primitive-scale-space-2, 8px)',
              fontStyle: 'italic',
            }}
          >
            All spinners include role="status" and customizable aria-label for screen reader support
          </p>
        </div>
      </section>
    </div>
  );
};

export default SpinnerExample;
