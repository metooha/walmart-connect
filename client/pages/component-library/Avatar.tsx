import React from 'react';
import AvatarExample from '@/components/examples/AvatarExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function AvatarPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Shared Components" title="Avatar" description="Circular representation of a user with image fallback support." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <AvatarExample />
        </React.Suspense>
      </div>
    </div>
  );
}
