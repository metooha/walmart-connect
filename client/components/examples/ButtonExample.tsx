import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Plus, ChevronRight, Download, Trash, X, Settings } from '@/components/icons';

/**
 * Example component demonstrating Button usage with Living Design 3.5
 * ✅ Uses icons from centralized icon library
 */
export const ButtonExample: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Button Variants
        </h2>
        <ButtonGroup>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="destructive">Destructive</Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Button Sizes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <ButtonGroup>
            <Button variant="primary" size="small">Small</Button>
            <Button variant="primary" size="medium">Medium</Button>
            <Button variant="primary" size="large">Large</Button>
          </ButtonGroup>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Buttons with Icons
        </h2>
        <ButtonGroup>
          <Button
            variant="primary"
            leading={<Plus style={{ width: 20, height: 20 }} />}
          >
            Add Item
          </Button>
          <Button
            variant="secondary"
            trailing={<ChevronRight style={{ width: 20, height: 20 }} />}
          >
            Next
          </Button>
          <Button
            variant="tertiary"
            leading={<Download style={{ width: 20, height: 20 }} />}
          >
            Download
          </Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Disabled State
        </h2>
        <ButtonGroup>
          <Button variant="primary" disabled>Primary Disabled</Button>
          <Button variant="secondary" disabled>Secondary Disabled</Button>
          <Button variant="tertiary" disabled>Tertiary Disabled</Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Full Width Buttons
        </h2>
        <div style={{ maxWidth: '400px' }}>
          <Button variant="primary" size="large" isFullWidth>
            Full Width Primary
          </Button>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Button as Link
        </h2>
        <ButtonGroup>
          <Button href="https://www.walmart.com" variant="primary" target="_blank">
            Visit Walmart
          </Button>
          <Button href="#section" variant="secondary">
            Jump to Section
          </Button>
          <Button href="/help" variant="tertiary">
            Get Help
          </Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Form Actions
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{ maxWidth: '400px' }}
        >
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            />
          </div>
          <ButtonGroup>
            <Button variant="tertiary" type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </ButtonGroup>
        </form>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Destructive Actions
        </h2>
        <ButtonGroup>
          <Button variant="secondary">Keep Item</Button>
          <Button
            variant="destructive"
            leading={<Trash style={{ width: 20, height: 20 }} />}
          >
            Delete Permanently
          </Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Icon-Only Button
        </h2>
        <ButtonGroup>
          <Button
            variant="tertiary"
            aria-label="Close"
            leading={<X style={{ width: 20, height: 20 }} />}
          />
          <Button
            variant="secondary"
            aria-label="Settings"
            leading={<Settings style={{ width: 20, height: 20 }} />}
          />
        </ButtonGroup>
      </section>
    </div>
  );
};
