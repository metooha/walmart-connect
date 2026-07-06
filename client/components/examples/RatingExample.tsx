import React from 'react';
import { Rating } from '@/components/ui/Rating';

export const RatingExample: React.FC = () => {
  const ratingValues = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  return (
    <div className="space-y-8">
      {/* Header with documentation link */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">Rating</h3>
        <p className="text-muted-foreground mb-2">
          Ratings provide insight into how well a product or service has been received by those who have bought or used it previously.
        </p>
        <a
          href="https://digitaltoolkit.livingdesign.walmart.com/components/rating/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--ld-semantic-color-link-text, #2e2f32)', textDecoration: 'underline', fontSize: '0.875rem' }}
        >
          View Living Design 3.5 Documentation →
        </a>
      </div>

      {/* Size Variants */}
      <div>
        <h4 className="text-lg font-medium mb-4 text-foreground">Size Variants</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Small Size Column */}
          <div>
            <h5 className="text-md font-medium mb-3 text-muted-foreground">Small (Default)</h5>
            <p className="text-sm text-muted-foreground mb-4">12×12px stars - Default use of the rating component</p>
            <div className="space-y-3">
              {ratingValues.map((value) => (
                <div key={`small-${value}`} className="flex items-center gap-3">
                  <Rating value={value} size="small" />
                  <span className="text-sm text-muted-foreground min-w-[80px]">
                    {value} {value === 1 ? 'star' : 'stars'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Large Size Column */}
          <div>
            <h5 className="text-md font-medium mb-3 text-muted-foreground">Large</h5>
            <p className="text-sm text-muted-foreground mb-4">20×20px stars - Use when rating requires increased prominence</p>
            <div className="space-y-3">
              {ratingValues.map((value) => (
                <div key={`large-${value}`} className="flex items-center gap-3">
                  <Rating value={value} size="large" />
                  <span className="text-sm text-muted-foreground min-w-[80px]">
                    {value} {value === 1 ? 'star' : 'stars'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div>
        <h4 className="text-lg font-medium mb-4 text-foreground">Usage Examples</h4>
        <div className="bg-muted rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Product Rating</p>
            <div className="flex items-center gap-2">
              <Rating value={4.5} size="small" />
              <span className="text-sm text-muted-foreground">(4.5 out of 5)</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Featured Rating</p>
            <div className="flex items-center gap-2">
              <Rating value={4.5} size="large" />
              <span className="text-sm text-muted-foreground">(4.5 out of 5)</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Average Customer Rating</p>
            <div className="flex items-center gap-2">
              <Rating value={3.5} size="small" />
              <span className="text-sm text-muted-foreground">Based on 1,234 reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Design Tokens */}
      <div>
        <h4 className="text-lg font-medium mb-4 text-foreground">Design Tokens</h4>
        <div className="bg-muted rounded-lg p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded" style={{ backgroundColor: '#FFC220' }}></div>
            <div>
              <p className="text-sm font-medium text-foreground">Star Fill</p>
              <p className="text-xs text-muted-foreground font-mono">
                var(--ld-semantic-color-rating-fill) / #FFC220
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border-2" style={{ borderColor: '#CC851A' }}></div>
            <div>
              <p className="text-sm font-medium text-foreground">Star Border</p>
              <p className="text-xs text-muted-foreground font-mono">
                var(--ld-semantic-color-rating-border) / #CC851A
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Props API */}
      <div>
        <h4 className="text-lg font-medium mb-4 text-foreground">Props</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-foreground border-b border-border">
                  Prop
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-foreground border-b border-border">
                  Type
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-foreground border-b border-border">
                  Default
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-foreground border-b border-border">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="px-4 py-2 text-sm font-mono text-[#0071DC] border-b border-border">
                  value
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  number
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  required
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  Rating value between 0 and 5, supports 0.5 increments
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-mono text-[#0071DC] border-b border-border">
                  size
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  'small' | 'large'
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  'small'
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  Size variant of the rating stars
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-mono text-[#0071DC] border-b border-border">
                  className
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  string
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  ''
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  Additional CSS classes
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-mono" style={{ color: 'var(--ld-semantic-color-text, #2e2f32)' }}>
                  aria-label
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground">
                  auto-generated
                </td>
                <td className="px-4 py-2 text-sm text-muted-foreground">
                  Custom accessible label for screen readers
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Examples */}
      <div>
        <h4 className="text-lg font-medium mb-4 text-foreground">Code Examples</h4>
        <div className="space-y-4">
          <div className="bg-[#2E2F32] rounded-lg p-4">
            <pre className="text-sm text-white overflow-x-auto">
              <code>{`import { Rating } from '@/components/ui/Rating';

// Basic usage
<Rating value={4.5} />

// Large size
<Rating value={4.5} size="large" />

// With custom aria-label
<Rating value={3.5} aria-label="Average rating: 3.5 stars" />

// With className
<Rating value={5} className="my-custom-class" />`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
