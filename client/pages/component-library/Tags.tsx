import React from 'react';
import { TagExample } from '@/components/examples/TagExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function TagsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Tags" description="Tags are compact labels for categorizing and organizing content. They support multiple variants (primary, secondary, tertiary), semantic colors, and optional leading icons. Tags are non-interactive display elements." />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <TagExample />
        </React.Suspense>
      </div>
    </div>
  );
}
