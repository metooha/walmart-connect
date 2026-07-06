import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';

// Component library navigation structure with groups
const navigationSections = [
  {
    title: 'Getting Started',
    items: [
      {
        id: 'overview',
        name: 'Overview',
        path: '/component-library'
      },
      {
        id: 'themes',
        name: 'Themes & Tokens',
        path: '/component-library/themes'
      },
      {
        id: 'component-tester',
        name: 'Component Sandbox',
        path: '/component-library/component-tester'
      },
      {
        id: 'guidelines',
        name: 'Guidelines',
        path: '/component-library/guidelines'
      },
    ]
  },
  {
    title: 'Components',
    items: [
      {
        id: 'alerts',
        name: 'Alerts',
        path: '/component-library/alerts'
      },
      {
        id: 'badges',
        name: 'Badges',
        path: '/component-library/badges'
      },
      {
        id: 'breadcrumbs',
        name: 'Breadcrumbs',
        path: '/component-library/breadcrumbs'
      },
      {
        id: 'buttons',
        name: 'Buttons',
        path: '/component-library/buttons'
      },
      {
        id: 'callouts',
        name: 'Callouts',
        path: '/component-library/callouts'
      },
      {
        id: 'cards',
        name: 'Cards',
        path: '/component-library/cards'
      },
      {
        id: 'checkboxes',
        name: 'Checkboxes',
        path: '/component-library/checkboxes'
      },
      {
        id: 'chips',
        name: 'Chips',
        path: '/component-library/chips'
      },
      {
        id: 'content-messages',
        name: 'Content Messages',
        path: '/component-library/content-messages'
      },
      {
        id: 'date-fields',
        name: 'Date Fields',
        path: '/component-library/date-fields'
      },
      {
        id: 'date-picker-calendar',
        name: 'Date Picker Calendar',
        path: '/component-library/calendar'
      },
      {
        id: 'date-pickers',
        name: 'Date Pickers',
        path: '/component-library/date-pickers'
      },
      {
        id: 'date-range-picker',
        name: 'Date Range Picker',
        path: '/component-library/date-range-picker'
      },
      {
        id: 'dividers',
        name: 'Dividers',
        path: '/component-library/dividers'
      },
      {
        id: 'filter-chips',
        name: 'Filter Chips',
        path: '/component-library/filter-chips'
      },
      {
        id: 'form-groups',
        name: 'Form Groups',
        path: '/component-library/form-groups'
      },
      {
        id: 'icon-buttons',
        name: 'Icon Buttons',
        path: '/component-library/icon-buttons'
      },
      {
        id: 'icons',
        name: 'Icons',
        path: '/component-library/icons'
      },
      {
        id: 'link-buttons',
        name: 'Link Buttons',
        path: '/component-library/link-buttons'
      },
      {
        id: 'links',
        name: 'Links',
        path: '/component-library/links'
      },
      {
        id: 'lists',
        name: 'Lists',
        path: '/component-library/lists'
      },
      {
        id: 'magic-box',
        name: 'Magic Box',
        path: '/component-library/magic-box'
      },
      {
        id: 'menu',
        name: 'Menu',
        path: '/component-library/menu'
      },
      {
        id: 'metrics',
        name: 'Metrics',
        path: '/component-library/metrics'
      },
      {
        id: 'modals',
        name: 'Modals',
        path: '/component-library/modals'
      },
      {
        id: 'nudges',
        name: 'Nudges',
        path: '/component-library/nudges'
      },
      {
        id: 'panels',
        name: 'Panels',
        path: '/component-library/panels'
      },
      {
        id: 'popover',
        name: 'Popover',
        path: '/component-library/popover'
      },
      {
        id: 'progress-indicator',
        name: 'Progress Indicator',
        path: '/component-library/progress-indicator'
      },
      {
        id: 'progress-tracker',
        name: 'Progress Tracker',
        path: '/component-library/progress-tracker'
      },
      {
        id: 'radio-buttons',
        name: 'Radio Buttons',
        path: '/component-library/radio-buttons'
      },
      {
        id: 'select',
        name: 'Select',
        path: '/component-library/select'
      },
      {
        id: 'snackbars',
        name: 'Snackbars',
        path: '/component-library/snackbars'
      },
      {
        id: 'spot-icons',
        name: 'Spot Icons',
        path: '/component-library/spot-icons'
      },
      {
        id: 'switches',
        name: 'Switches',
        path: '/component-library/switches'
      },
      {
        id: 'tab-navigation',
        name: 'Tab Navigation',
        path: '/component-library/tabs'
      },
      {
        id: 'tags',
        name: 'Tags',
        path: '/component-library/tags'
      },
      {
        id: 'textarea',
        name: 'Text Area',
        path: '/component-library/textarea'
      },
      {
        id: 'text-fields',
        name: 'Text Fields',
        path: '/component-library/text-fields'
      },
    ]
  },
  {
    title: 'Shared Components',
    items: [
      {
        id: 'accordion',
        name: 'Accordion',
        path: '/component-library/accordion'
      },
      {
        id: 'alert-dialog',
        name: 'Alert Dialog',
        path: '/component-library/alert-dialog'
      },
      {
        id: 'avatar',
        name: 'Avatar',
        path: '/component-library/avatar'
      },
      {
        id: 'carousel',
        name: 'Carousel',
        path: '/component-library/carousel'
      },
      {
        id: 'chart',
        name: 'Chart',
        path: '/component-library/chart'
      },
      {
        id: 'collapsible',
        name: 'Collapsible',
        path: '/component-library/collapsible'
      },
      {
        id: 'command',
        name: 'Command',
        path: '/component-library/command'
      },
      {
        id: 'context-menu',
        name: 'Context Menu',
        path: '/component-library/context-menu'
      },
      {
        id: 'dialog',
        name: 'Dialog',
        path: '/component-library/dialog'
      },
      {
        id: 'bottom-sheet',
        name: 'Bottom Sheet',
        path: '/component-library/bottom-sheet'
      },
      {
        id: 'dropdown-menu',
        name: 'Dropdown Menu',
        path: '/component-library/dropdown-menu'
      },
      {
        id: 'form',
        name: 'Form',
        path: '/component-library/form'
      },
      {
        id: 'menubar',
        name: 'Menubar',
        path: '/component-library/menubar'
      },
      {
        id: 'navigation-menu',
        name: 'Navigation Menu',
        path: '/component-library/navigation-menu'
      },
      {
        id: 'pagination',
        name: 'Pagination',
        path: '/component-library/pagination'
      },
      {
        id: 'scroll-area',
        name: 'Scroll Area',
        path: '/component-library/scroll-area'
      },
      {
        id: 'skeleton',
        name: 'Skeleton',
        path: '/component-library/skeleton'
      },
      {
        id: 'slider',
        name: 'Slider',
        path: '/component-library/slider'
      },
      {
        id: 'table',
        name: 'Table',
        path: '/component-library/table'
      },
      {
        id: 'toggle',
        name: 'Toggle',
        path: '/component-library/toggle'
      },
    ]
  }
];

export function ComponentLibraryLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '280px',
          borderRight: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0
        }}
      >
        <div style={{
          padding: '24px 16px',
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: '700',
            marginBottom: '8px',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
          }}>
            Component Library
          </h1>
          <p style={{ 
            fontSize: '14px', 
            color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            marginBottom: '24px'
          }}>
            Living Design 3.5 Components
          </p>
          
          {navigationSections.map((section, sectionIndex) => (
            <div key={section.title} style={{ marginBottom: sectionIndex < navigationSections.length - 1 ? '24px' : '0' }}>
              <h2 style={{
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'var(--ld-semantic-color-text-secondary, #74767C)',
                marginBottom: '8px',
                paddingLeft: '16px'
              }}>
                {section.title}
              </h2>
              <SideNavigation aria-label={`${section.title} Navigation`}>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <SideNavigationItem
                      key={item.id}
                      href={item.path}
                      isCurrent={isActive}
                      onClick={(e) => handleNavClick(e, item.path)}
                    >
                      {item.name}
                    </SideNavigationItem>
                  );
                })}
              </SideNavigation>
            </div>
          ))}

          {/* Back to Home - Bottom of Navigation */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '24px',
            borderTop: '2px solid var(--ld-semantic-color-border-subtle)'
          }}>
            <SideNavigation aria-label="Main Navigation">
              <SideNavigationItem
                href="/"
                onClick={(e) => handleNavClick(e, '/')}
              >
                ← Back to Home
              </SideNavigationItem>
            </SideNavigation>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main style={{
        flex: 1,
        overflowY: 'auto',
        backgroundColor: '#ffffff'
      }}>
        <Outlet />
      </main>

    </div>
  );
}
