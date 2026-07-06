import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BarGraph,
  Box,
  Calendar,
  Chat,
  Check,
  ChevronDown,
  Circle,
  Edit,
  ExclamationCircle,
  Filter,
  InfoCircle,
  Link as LinkIcon,
  List,
  Magic,
  Menu as MenuIcon,
  Minus,
  Note,
  PanelLeft,
  Refresh,
  Search,
  Settings,
  Star,
  Tag,
} from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { getComponentPreview } from './ComponentCardPreviews';
import { PageHeader } from '@/components/ui/PageHeader';
import styles from './Overview.module.css';

type IconComponent = React.ComponentType<{ size?: number; style?: React.CSSProperties }>;

const ICON_MAP: Record<string, IconComponent> = {
  ArrowRight,
  BarGraph,
  Box,
  Calendar,
  Chat,
  Check,
  ChevronDown,
  Circle,
  Edit,
  ExclamationCircle,
  Filter,
  InfoCircle,
  Link: LinkIcon,
  List,
  Magic,
  Menu: MenuIcon,
  Minus,
  Note,
  PanelLeft,
  Refresh,
  Search,
  Settings,
  Star,
  Tag,
};

interface ComponentEntry {
  title: string;
  description: string;
  path: string;
  icon: string;
  section: 'ld' | 'shadcn';
}

const componentSections: ComponentEntry[] = [
  // ── Living Design 3.5 Components ──
  { title: 'Alerts', description: 'Banner messages for info, success, warning, and error states', path: '/component-library/alerts', icon: 'ExclamationCircle', section: 'ld' },
  { title: 'Badges', description: 'Count badges, status indicators, and semantic color variants', path: '/component-library/badges', icon: 'Tag', section: 'ld' },
  { title: 'Breadcrumbs', description: 'Navigation breadcrumbs with support for 2-5 levels and custom separators', path: '/component-library/breadcrumbs', icon: 'ArrowRight', section: 'ld' },
  { title: 'Buttons', description: 'Primary, secondary, tertiary, and destructive button variants with full accessibility', path: '/component-library/buttons', icon: 'Circle', section: 'ld' },
  { title: 'Callouts', description: 'Contextual tooltips with directional arrows for onboarding', path: '/component-library/callouts', icon: 'InfoCircle', section: 'ld' },
  { title: 'Cards', description: 'Card containers with headers, actions, and content areas', path: '/component-library/cards', icon: 'Box', section: 'ld' },
  { title: 'Checkboxes', description: 'Single and grouped checkboxes with indeterminate state support', path: '/component-library/checkboxes', icon: 'Check', section: 'ld' },
  { title: 'Chips', description: 'Interactive, selectable buttons for categories and selections', path: '/component-library/chips', icon: 'Tag', section: 'ld' },
  { title: 'Content Messages', description: 'Full-page state messages for errors, permissions, and loading', path: '/component-library/content-messages', icon: 'Chat', section: 'ld' },
  { title: 'Date Fields', description: 'Text input fields for date entry with validation', path: '/component-library/date-fields', icon: 'Calendar', section: 'ld' },
  { title: 'Date Pickers', description: 'Calendar popup for visual date selection', path: '/component-library/date-pickers', icon: 'Calendar', section: 'ld' },
  { title: 'Dividers', description: 'Horizontal and vertical separators for content sections', path: '/component-library/dividers', icon: 'Minus', section: 'ld' },
  { title: 'Filter Chips', description: 'Pill-shaped toggleable chips with counts for filtering', path: '/component-library/filter-chips', icon: 'Filter', section: 'ld' },
  { title: 'Form Groups', description: 'Fieldset containers for checkbox and radio groups', path: '/component-library/form-groups', icon: 'List', section: 'ld' },
  { title: 'Icon Buttons', description: 'Icon-only buttons for compact actions with ghost, primary, secondary variants', path: '/component-library/icon-buttons', icon: 'Star', section: 'ld' },
  { title: 'Icons', description: 'Complete icon library with 100+ React components organized by category', path: '/component-library/icons', icon: 'Star', section: 'ld' },
  { title: 'Link Buttons', description: 'Link-styled interactive elements with icon support and multiple sizes', path: '/component-library/link-buttons', icon: 'Link', section: 'ld' },
  { title: 'Links', description: 'Text links with icon support and semantic color variants', path: '/component-library/links', icon: 'Link', section: 'ld' },
  { title: 'Lists', description: 'Vertical lists with leading icons and trailing content', path: '/component-library/lists', icon: 'List', section: 'ld' },
  { title: 'Magic Box', description: 'AI-powered loading animation with sparkle effects', path: '/component-library/magic-box', icon: 'Magic', section: 'ld' },
  { title: 'Menu', description: 'Dropdown menus with keyboard navigation and positioning', path: '/component-library/menu', icon: 'Menu', section: 'ld' },
  { title: 'Metrics', description: 'Display critical data points with trend indicators and units', path: '/component-library/metrics', icon: 'BarGraph', section: 'ld' },
  { title: 'Modals', description: 'Centered overlay dialogs with size variants for focused user interactions', path: '/component-library/modals', icon: 'Box', section: 'ld' },
  { title: 'Nudges', description: 'Non-critical supportive information with actions and dismissible states', path: '/component-library/nudges', icon: 'InfoCircle', section: 'ld' },
  { title: 'Panels', description: 'Slide-out panels for supplemental content and forms with three size variants', path: '/component-library/panels', icon: 'PanelLeft', section: 'ld' },
  { title: 'Progress Indicator', description: 'Circular or linear progress indicators for loading states', path: '/component-library/progress-indicator', icon: 'Refresh', section: 'ld' },
  { title: 'Progress Tracker', description: 'Step-by-step progress visualization for multi-step processes and workflows', path: '/component-library/progress-tracker', icon: 'ArrowRight', section: 'ld' },
  { title: 'Radio Buttons', description: 'Mutually exclusive selection within a group', path: '/component-library/radio-buttons', icon: 'Circle', section: 'ld' },
  { title: 'Select', description: 'Dropdown select component with error states, AI-assisted variant, and full accessibility', path: '/component-library/select', icon: 'ChevronDown', section: 'ld' },
  { title: 'Snackbars', description: 'Brief feedback messages that appear at the bottom of the screen', path: '/component-library/snackbars', icon: 'Chat', section: 'ld' },
  { title: 'Spinners', description: 'Loading indicators for indeterminate processes with color and size variants', path: '/component-library/spinners', icon: 'Refresh', section: 'ld' },
  { title: 'Spot Icons', description: 'Decorative icon containers with brand and neutral color variants', path: '/component-library/spot-icons', icon: 'Star', section: 'ld' },
  { title: 'Switches', description: 'Toggle controls for binary on/off settings with immediate state changes', path: '/component-library/switches', icon: 'Circle', section: 'ld' },
  { title: 'Tab Navigation', description: 'Page-level navigation tabs with selected state and icon support', path: '/component-library/tabs', icon: 'List', section: 'ld' },
  { title: 'Tags', description: 'Compact labels for categorization, status, and metadata', path: '/component-library/tags', icon: 'Tag', section: 'ld' },
  { title: 'Text Area', description: 'Multi-line text input with character counting and AI-generated content indicators', path: '/component-library/textarea', icon: 'Note', section: 'ld' },
  { title: 'Text Fields', description: 'Single-line text inputs with labels, error states, helper text, and icons', path: '/component-library/text-fields', icon: 'Edit', section: 'ld' },
  { title: 'Bottom Sheet', description: 'Mobile-friendly modal that slides up from the bottom with LD 3.5 tokens', path: '/component-library/bottom-sheet', icon: 'PanelLeft', section: 'ld' },
  { title: 'Collapsible', description: 'Expandable and collapsible content sections', path: '/component-library/collapsible', icon: 'ChevronDown', section: 'ld' },
  { title: 'Skeleton', description: 'Loading placeholder animations for content', path: '/component-library/skeleton', icon: 'Box', section: 'ld' },
  { title: 'Table', description: 'Structured data table with header, body, and footer', path: '/component-library/table', icon: 'List', section: 'ld' },

  // ── Shared Components ──
  { title: 'Accordion', description: 'Vertically stacked collapsible content panels', path: '/component-library/accordion', icon: 'ChevronDown', section: 'shadcn' },
  { title: 'Alert Dialog', description: 'Modal dialog for important confirmations that interrupt user workflow', path: '/component-library/alert-dialog', icon: 'ExclamationCircle', section: 'shadcn' },
  { title: 'Avatar', description: 'User profile image with fallback initials and status indicators', path: '/component-library/avatar', icon: 'Circle', section: 'shadcn' },
  { title: 'Calendar', description: 'Date picker calendar with single and range selection', path: '/component-library/calendar', icon: 'Calendar', section: 'shadcn' },
  { title: 'Carousel', description: 'Horizontal scrolling content carousel with navigation controls', path: '/component-library/carousel', icon: 'ArrowRight', section: 'shadcn' },
  { title: 'Chart', description: 'Data visualization charts with Recharts and LD 3.5 tokens', path: '/component-library/chart', icon: 'BarGraph', section: 'shadcn' },
  { title: 'Command', description: 'Command palette for fast keyboard-driven search and navigation', path: '/component-library/command', icon: 'Search', section: 'shadcn' },
  { title: 'Context Menu', description: 'Right-click context menu with submenus and keyboard navigation', path: '/component-library/context-menu', icon: 'Menu', section: 'shadcn' },
  { title: 'Dialog', description: 'Modal overlay dialog for focused interactions', path: '/component-library/dialog', icon: 'Box', section: 'shadcn' },
  { title: 'Dropdown Menu', description: 'Dropdown menu with submenus, checkbox, and radio items', path: '/component-library/dropdown-menu', icon: 'ChevronDown', section: 'shadcn' },
  { title: 'Form', description: 'Form components with validation, error handling, and accessible labels', path: '/component-library/form', icon: 'Edit', section: 'shadcn' },
  { title: 'Menubar', description: 'Horizontal menu bar with dropdown menus and keyboard navigation', path: '/component-library/menubar', icon: 'Menu', section: 'shadcn' },
  { title: 'Navigation Menu', description: 'Top-level navigation with multi-column dropdown panels', path: '/component-library/navigation-menu', icon: 'List', section: 'shadcn' },
  { title: 'Pagination', description: 'Navigation controls for paging through large data sets', path: '/component-library/pagination', icon: 'ArrowRight', section: 'shadcn' },
  { title: 'Popover', description: 'Floating popover panel with arrow indicator', path: '/component-library/popover', icon: 'Box', section: 'shadcn' },
  { title: 'Progress', description: 'Horizontal progress bar for determinate operations', path: '/component-library/progress', icon: 'Refresh', section: 'shadcn' },
  { title: 'Radio Group', description: 'Mutually exclusive radio buttons with Radix primitives', path: '/component-library/radio-group', icon: 'Circle', section: 'shadcn' },
  { title: 'Scroll Area', description: 'Custom scrollable container with styled scrollbars', path: '/component-library/scroll-area', icon: 'List', section: 'shadcn' },
  { title: 'Separator', description: 'Visual divider in horizontal or vertical orientation', path: '/component-library/separator', icon: 'Minus', section: 'shadcn' },
  { title: 'Sheet', description: 'Side sheet overlay for supplemental content', path: '/component-library/sheet', icon: 'PanelLeft', section: 'shadcn' },
  { title: 'Slider', description: 'Draggable slider for selecting numeric values within a range', path: '/component-library/slider', icon: 'Minus', section: 'shadcn' },
  { title: 'Switch', description: 'Toggle switch built with Radix primitives', path: '/component-library/switch', icon: 'Circle', section: 'shadcn' },
  { title: 'Toast', description: 'Brief non-intrusive notifications using Sonner', path: '/component-library/toast', icon: 'Chat', section: 'shadcn' },
  { title: 'Toggle', description: 'Two-state button for toolbar actions and view modes', path: '/component-library/toggle', icon: 'Check', section: 'shadcn' },
];

function ComponentCard({ entry }: { entry: ComponentEntry }) {
  return (
    <Link to={entry.path} className={styles.componentCard}>
      <div className={styles.cardPreview}>
        {getComponentPreview(entry.title, entry.icon)}
      </div>
      <div className={styles.cardBody}>
        {entry.section === 'shadcn' && (
          <span className={styles.sharedBadge}>Shared</span>
        )}
        <h3 className={styles.cardTitle}>{entry.title}</h3>
        <p className={styles.cardDescription}>{entry.description}</p>
      </div>
    </Link>
  );
}

export default function ComponentLibraryOverview() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredSections = searchQuery.trim()
    ? componentSections.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : componentSections;

  const ldComponents = filteredSections.filter(s => s.section === 'ld');
  const shadcnComponents = filteredSections.filter(s => s.section === 'shadcn');

  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <PageHeader
        section="Getting Started"
        title="Living Design 3.5"
        description="A comprehensive component library for the Walmart Connect Ad Center. Each component follows the Living Design 3.5 specification with proper accessibility, semantic tokens, and responsive behavior."
      />

      <div style={{ marginBottom: '48px' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', maxWidth: '600px' }}>
          <div style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
          }}>
            <Search size={24} style={{ width: '24px', height: '24px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }} />
          </div>
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 52px',
              fontSize: '16px',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              border: '2px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
              borderRadius: '8px',
              backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--ld-semantic-color-action-fill-primary, #0071DC)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-moderate, #E6E6E8)';
            }}
          />
        </div>

        {searchQuery.trim() && (
          <div style={{ marginTop: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
            Found {filteredSections.length} component{filteredSections.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* LD 3.5 Components */}
      {ldComponents.length > 0 && (
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            marginBottom: '16px',
          }}>
            Living Design 3.5 Components
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {ldComponents.map((entry) => (
              <ComponentCard key={entry.path} entry={entry} />
            ))}
          </div>
        </div>
      )}

      {/* Shared Components */}
      {shadcnComponents.length > 0 && (
        <div>
          <h2 style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            marginBottom: '16px',
          }}>
            Shared Components
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {shadcnComponents.map((entry) => (
              <ComponentCard key={entry.path} entry={entry} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {filteredSections.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '64px 32px',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
        }}>
          <Search size={24} style={{ width: '24px', height: '24px', margin: '0 auto 16px', opacity: 0.5 }} />
          <p style={{ fontSize: '16px', marginBottom: '8px' }}>No components found</p>
          <p style={{ fontSize: '14px' }}>Try a different search term</p>
        </div>
      )}

      {/* Bottom Back to Home */}
      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="secondary" size="small" onClick={() => navigate('/')}>
          <ArrowLeft style={{ width: 16, height: 16, marginRight: 8 }} />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
