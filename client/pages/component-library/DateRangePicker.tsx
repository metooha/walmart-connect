import React from 'react';
import DateRangePickerExample from '@/components/examples/DateRangePickerExample';
import { PageHeader } from '@/components/ui/PageHeader';

export default function DateRangePickerPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section="Components" title="Date Range Picker" description="LD 3.5 date range picker with two side-by-side calendars for selecting start and end dates. Supports standard week view (Sun-Sat) and week numbers variant (Sat-Fri). Includes Cancel and Apply action buttons." />
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <DateRangePickerExample />
        </React.Suspense>
      </div>
    </div>
  );
}
