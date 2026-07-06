import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import * as Icons from '@/components/icons';

/**
 * AdminButton - Fixed position button for accessing admin/settings panel
 * 
 * Appears in bottom-left corner on all pages.
 * Only visible to admin users.
 */
export function AdminButton() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show on settings page itself
  if (location.pathname === '/settings') {
    return null;
  }
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      zIndex: 1000
    }}>
      <Button
        variant="primary"
        size="medium"
        onClick={() => navigate('/settings')}
        UNSAFE_style={{
          boxShadow: 'var(--ld-semantic-elevation-300)',
          minWidth: '140px'
        }}
      >
        <Icons.Gear style={{ width: 20, height: 20, marginRight: 8 }} />
        Admin Panel
      </Button>
    </div>
  );
}
