import React from 'react';
import CalendarExample from '@/components/examples/CalendarExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function CalendarPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Components" title="Date Picker Calendar" description="LD 3.5 date selection calendar component with support for standard week view (Sun-Sat) and week numbers variant (Sat-Fri). Supports single, multiple, and range selection modes." />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CalendarExample />
        </React.Suspense>
      </div>
    </div>
  );
}
