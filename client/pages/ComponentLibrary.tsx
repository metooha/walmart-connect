import React from 'react';

// Lazy load all example components for significantly better initial load performance
const AlertExample = React.lazy(() => import('@/components/examples/AlertExample').then(m => ({ default: m.AlertExample })));
const BadgeExample = React.lazy(() => import('@/components/examples/BadgeExample').then(m => ({ default: m.BadgeExample })));
const ButtonExample = React.lazy(() => import('@/components/examples/ButtonExample').then(m => ({ default: m.ButtonExample })));
const BreadcrumbExample = React.lazy(() => import('@/components/examples/BreadcrumbExample').then(m => ({ default: m.BreadcrumbExample })));
const LinkExample = React.lazy(() => import('@/components/examples/LinkExample').then(m => ({ default: m.LinkExample })));
const LinkButtonExample = React.lazy(() => import('@/components/examples/LinkButtonExample').then(m => ({ default: m.LinkButtonExample })));
const IconButtonExample = React.lazy(() => import('@/components/examples/IconButtonExample'));
const CalloutExample = React.lazy(() => import('@/components/examples/CalloutExample').then(m => ({ default: m.CalloutExample })));
const CardHeaderExample = React.lazy(() => import('@/components/examples/CardHeaderExample').then(m => ({ default: m.CardHeaderExample })));
const CheckboxExample = React.lazy(() => import('@/components/examples/CheckboxExample').then(m => ({ default: m.CheckboxExample })));
const RadioExample = React.lazy(() => import('@/components/examples/RadioExample').then(m => ({ default: m.RadioExample })));
const RatingExample = React.lazy(() => import('@/components/examples/RatingExample').then(m => ({ default: m.RatingExample })));
const FormGroupExample = React.lazy(() => import('@/components/examples/FormGroupExample').then(m => ({ default: m.FormGroupExample })));
const ChipExample = React.lazy(() => import('@/components/examples/ChipExample').then(m => ({ default: m.ChipExample })));
const FilterChipExample = React.lazy(() => import('@/components/examples/FilterChipExample').then(m => ({ default: m.FilterChipExample })));
const TagExample = React.lazy(() => import('@/components/examples/TagExample').then(m => ({ default: m.TagExample })));
const ContentMessageExample = React.lazy(() => import('@/components/examples/ContentMessageExample').then(m => ({ default: m.ContentMessageExample })));
const DateFieldExample = React.lazy(() => import('@/components/examples/DateFieldExample').then(m => ({ default: m.DateFieldExample })));
const DatePickerExample = React.lazy(() => import('@/components/examples/DatePickerExample').then(m => ({ default: m.DatePickerExample })));
const DividerExample = React.lazy(() => import('@/components/examples/DividerExample').then(m => ({ default: m.DividerExample })));
const ListExample = React.lazy(() => import('@/components/examples/ListExample').then(m => ({ default: m.ListExample })));
const MagicBoxExample = React.lazy(() => import('@/components/examples/MagicBoxExample').then(m => ({ default: m.MagicBoxExample })));
const MenuExample = React.lazy(() => import('@/components/examples/MenuExample').then(m => ({ default: m.MenuExample })));
const ScrimExample = React.lazy(() => import('@/components/examples/ScrimExample').then(m => ({ default: m.ScrimExample })));
const SpinnerExample = React.lazy(() => import('@/components/examples/SpinnerExample').then(m => ({ default: m.SpinnerExample })));
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badge';
import { IconButton } from '@/components/ui/IconButton';
import { Link } from '@/components/ui/Link';
import { LinkButton } from '@/components/ui/LinkButton';
import { Tag } from '@/components/ui/Tag';
import { Chip } from '@/components/ui/Chip';
import { FilterChip } from '@/components/ui/FilterChip';
import { OLQTag } from '@/components/ui/olq-tag';
import { DatePicker } from '@/components/ui/DatePicker';
import { Radio } from '@/components/ui/Radio';
import { RadioGroup } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/Spinner';
import { Switch } from '@/components/ui/Switch';
import * as Icons from '@/components/icons';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { MastHead } from '@/components/ui/MastHead';

export default function ComponentLibrary() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [quickNavExpanded, setQuickNavExpanded] = React.useState(true);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Scroll listener for scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define all searchable sections
  const allSections = [
    { id: 'component-tester', name: 'Component Sandbox', keywords: ['test', 'playground', 'interactive', 'properties', 'sandbox'] },
    { id: 'icons', name: 'Icons', keywords: ['icon', 'svg', 'graphic', 'symbol'] },
    { id: 'buttons', name: 'Buttons', keywords: ['button', 'action', 'click', 'primary', 'secondary'] },
    { id: 'badges', name: 'Badges', keywords: ['badge', 'count', 'notification', 'label', 'tag'] },
    { id: 'breadcrumbs', name: 'Breadcrumbs', keywords: ['breadcrumb', 'navigation', 'path'] },
    { id: 'links', name: 'Links', keywords: ['link', 'anchor', 'hyperlink', 'url'] },
    { id: 'link-buttons', name: 'Link Buttons', keywords: ['link button', 'link', 'text button', 'underline', 'navigation'] },
    { id: 'icon-buttons', name: 'Icon Buttons', keywords: ['icon button', 'icon', 'action'] },
    { id: 'checkboxes', name: 'Checkboxes', keywords: ['checkbox', 'check', 'select', 'form', 'input', 'indeterminate'] },
    { id: 'radio-buttons', name: 'Radio Buttons', keywords: ['radio', 'radio button', 'radio group', 'select', 'form', 'input', 'option'] },
    { id: 'ratings', name: 'Ratings', keywords: ['rating', 'star', 'review', 'score', 'stars', 'feedback'] },
    { id: 'form-groups', name: 'Form Groups', keywords: ['form', 'group', 'fieldset', 'legend', 'checkbox group', 'radio group'] },
    { id: 'chips', name: 'Chips', keywords: ['chip', 'select', 'toggle', 'tag', 'interactive', 'category'] },
    { id: 'filter-chips', name: 'Filter Chips', keywords: ['filter chip', 'filter', 'pill', 'select', 'toggle'] },
    { id: 'tags', name: 'Tags', keywords: ['tag', 'label', 'category', 'attribute', 'status', 'metadata'] },
    { id: 'callouts', name: 'Callouts', keywords: ['callout', 'tooltip', 'nubbin', 'coaching', 'onboarding', 'pointer'] },
    { id: 'cards', name: 'Cards', keywords: ['card', 'container', 'panel'] },
    { id: 'alerts', name: 'Alerts', keywords: ['alert', 'notification', 'info', 'success', 'warning', 'error', 'message', 'banner'] },
    { id: 'content-messages', name: 'Content Messages', keywords: ['content message', 'error', 'success', 'permission', 'critical', 'blocking', 'state', 'info', 'warning'] },
    { id: 'date-fields', name: 'Date Fields', keywords: ['date', 'input', 'calendar', 'field', 'form'] },
    { id: 'date-pickers', name: 'Date Pickers', keywords: ['date picker', 'calendar', 'popup', 'date selection', 'datepicker'] },
    { id: 'dividers', name: 'Dividers', keywords: ['divider', 'separator', 'line', 'horizontal', 'vertical', 'rule', 'hr'] },
    { id: 'lists', name: 'Lists', keywords: ['list', 'listitem', 'item', 'vertical', 'group', 'spot icon', 'trailing', 'leading'] },
    { id: 'magic-box', name: 'Magic Box', keywords: ['magic box', 'ai', 'agent', 'glow', 'magic', 'loading', 'processing', 'animation', 'sparkle'] },
    { id: 'menu', name: 'Menu', keywords: ['menu', 'dropdown', 'overlay', 'actions', 'menuitem', 'popup', 'context'] },
    { id: 'scrim', name: 'Scrim', keywords: ['scrim', 'overlay', 'backdrop', 'modal', 'panel', 'dimmer', 'background'] },
    { id: 'spinners', name: 'Spinners', keywords: ['spinner', 'loading', 'loader', 'progress', 'indeterminate', 'processing', 'waiting', 'busy'] },
    { id: 'switches', name: 'Switches', keywords: ['switch', 'toggle', 'on', 'off', 'boolean', 'binary', 'checkbox'] },
    { id: 'design-tokens', name: 'Design Tokens', keywords: ['token', 'color', 'spacing', 'typography', 'css', 'variable'] },
  ];

  // Filter sections based on search query
  const filteredSections = searchQuery.trim()
    ? allSections.filter(section => {
        const query = searchQuery.toLowerCase();
        return (
          section.name.toLowerCase().includes(query) ||
          section.keywords.some(keyword => keyword.includes(query))
        );
      })
    : allSections;

  // Organize icons by category
  const iconCategories = {
    'Navigation & Arrows': [
      'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
      'ArrowUpDown', 'ArrowUpLeft', 'ArrowUpRight',
      'ArrowsLeftRight', 'ArrowsUpDown', 'ArrowsLeftRightCurve',
      'ChevronUp', 'ChevronDown', 'ChevronLeft', 'ChevronRight',
      'CaretDown', 'ArrowCircleDot'
    ],
    'Actions & Controls': [
      'Check', 'X', 'Plus', 'Minus',
      'Edit', 'Pencil', 'Trash',
      'Download', 'Upload', 'Refresh', 'RotateCcw', 'Undo',
      'Search', 'Filter', 'Settings', 'Gear', 'Sliders',
      'More', 'MoreHorizontal', 'MoreVertical', 'Menu',
      'Drag', 'GripVertical'
    ],
    'Communication': [
      'Email', 'EmailFill', 'Chat', 'ChatBubbleSquare',
      'Phone', 'Bell', 'Share', 'ShareAndroid',
      'Microphone', 'MicrophoneSlash', 'Speaker', 'SpeakerSlash',
      'VoiceSearch'
    ],
    'Media & Files': [
      'Image', 'ImageIcon', 'Camera', 'Play', 'PlayFill',
      'Pause', 'VideoArrowUp', 'VideoArrowUpFill',
      'Article', 'Note', 'DocumentCorner', 'DocumentExclamation',
      'BoxDocument', 'BoxDocumentFill', 'Clipboard',
      'PaperClip', 'Printer', 'ScanDocument'
    ],
    'User & Account': [
      'User', 'UserCircle', 'UserCircleFill', 'UserPlus',
      'UserBook', 'UserGraph', 'UsersArrows', 'UsersFill',
      'IdCard', 'CardUser', 'SignIn', 'SignOut'
    ],
    'Commerce & Shopping': [
      'Cart', 'CartFill', 'CartArrow', 'Tag', 'TagFill',
      'Dollar', 'DollarCircle', 'DollarCircleFill',
      'Receipt', 'ReceiptPercent', 'ReceiptPercentFill',
      'CreditCard', 'CreditCardFill', 'Wallet',
      'Gift', 'GiftFill', 'Coupon', 'Barcode', 'QrCode',
      'UpcLabel', 'UpcLabelCancel'
    ],
    'Location & Maps': [
      'Location', 'CurrentLocation', 'Map', 'MapRoute', 'MapRouteFill',
      'Pin', 'PinFill', 'PinLine', 'Globe',
      'Facility', 'Home', 'SGHome', 'Building'
    ],
    'Store & Retail': [
      'Store', 'StoreFill', 'StoreAwning', 'StoreAwningFill',
      'StoreClock', 'StoreLocation', 'StoreMap',
      'Associate', 'Services', 'ServicesFill',
      'Returns', 'Restroom'
    ],
    'Charts & Data': [
      'BarGraph', 'BarGraphFill', 'BarGraphThin',
      'LineGraph', 'LineGraphBars', 'LineGraphXY',
      'PieChart', 'DonutChart', 'BubbleChart', 'BubbleChartFill',
      'ScatterChart', 'ChartWaterfall', 'Reports'
    ],
    'Status & Indicators': [
      'CheckCircle', 'CheckCircleFill', 'InfoCircle', 'InfoCircleFill',
      'ExclamationCircle', 'ExclamationCircleFill',
      'CloseCircleFill', 'QuestionCircle', 'HelpCircle',
      'Warning', 'WarningFill', 'Ban',
      'Flag', 'FlagFill', 'FlagStrike',
      'Star', 'StarFill', 'StarHalf',
      'ThumbUp', 'ThumbUpFill', 'ThumbDown', 'ThumbDownFill',
      'Heart', 'HeartFill', 'Spark'
    ],
    'Time & Calendar': [
      'Calendar', 'CalendarMoney', 'Clock', 'History', 'Hourglass'
    ],
    'Logistics & Shipping': [
      'Box', 'BoxArrowUp', 'BoxArrowDown', 'BoxCorners',
      'BoxOpenArrowDown', 'BoxShelves', 'BoxSpark', 'BoxSparkFill',
      'Truck', 'Trailer', 'TrailerArrowRight', 'TrailerDoor',
      'Forklift', 'PalletBoxes', 'ThreeDBoxArrows',
      'FedExBox', 'DockDoor', 'Bulkhead'
    ],
    'Products': [
      'CleaningSpray', 'DishSoap', 'LaundryDetergent',
      'PaperTowels', 'Sponge', 'BottleEach', 'BowlWhisk',
      'FruitCarton', 'FruitEach', 'Shirt'
    ],
    'Tools & Utilities': [
      'Wrench', 'Toolbox', 'ToolboxFill', 'RulerArrow', 'RulerArrowFill',
      'Scale', 'MeasurementConsole', 'Crop', 'Crosshairs',
      'ZoomIn', 'ZoomOut', 'PanelLeft', 'Columns'
    ],
    'Security & Verification': [
      'Lock', 'LockOpen', 'ShieldCheck', 'ShieldCheckFill',
      'Eye', 'EyeSlash'
    ],
    'Technology': [
      'Bluetooth', 'WiFi', 'Mobile', 'Airplane',
      'Headphones', 'Headset', 'Sound'
    ],
    'Business & Finance': [
      'Bank', 'Bill', 'MoneyArrowLeft', 'MoneyArrowRight',
      'HouseMoney', 'Suitcase', 'SuitcaseFill',
      'Trademark', 'TrademarkFill'
    ],
    'Advertising': [
      'SponsoredBrandsCard', 'SponsoredProductsCard', 'SponsoredVideosCard',
      'SGShareImpact', 'CardsHashtag', 'CardsStar',
      'Megaphone', 'MegaphoneFill', 'TargetArrow', 'TargetArrowFill'
    ],
    'Miscellaneous': [
      'Dot', 'Circle', 'Grid', 'GridFill', 'List', 'BulletList',
      'Brackets', 'BoldText', 'Placeholder', 'AppSwitcher',
      'Shuffle', 'SortUp', 'SortDown', 'SortingArrows',
      'Trophy', 'Medal', 'Rocket', 'RocketFill',
      'LightBulb', 'Flash', 'FlashFill', 'FlashSlash',
      'Flames', 'FuelPump', 'Bug', 'Dropper',
      'ConnectLogo', 'Mortarboard'
    ]
  };

  return (
    <>
    <MastHead companyName="Coca Cola" />
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--ld-semantic-color-background-subtle)',
      padding: '40px 60px'
    }}>
      {/* Page Header */}
      <div style={{
        marginBottom: '40px',
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '32px'
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '12px'
          }}>
            Living Design 3.5 Component Library
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            lineHeight: '1.5',
            marginBottom: '24px'
          }}>
            A comprehensive showcase of all UI components and {Object.values(iconCategories).flat().length}+ icons in the Walmart Connect Ad Center.
            Each component follows the Living Design 3.5 specification with proper accessibility,
            semantic tokens, and responsive behavior.
          </p>

          {/* Search Bar */}
        <div style={{ position: 'relative', maxWidth: '600px' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            {React.createElement((Icons as any).Search, { style: { width: 20, height: 20, color: 'var(--ld-semantic-color-text-subtle)' }})}
          </div>
          <input
            type="text"
            placeholder="Search components, icons, or design tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 48px',
              fontSize: '16px',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              border: '2px solid var(--ld-semantic-color-border)',
              borderRadius: 'var(--ld-semantic-border-radius-medium)',
              backgroundColor: 'var(--ld-semantic-color-surface)',
              color: 'var(--ld-semantic-color-text)',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--ld-semantic-color-action-fill-primary)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border)';
            }}
          />
        </div>
        {searchQuery.trim() && (
          <div style={{ marginTop: '16px' }}>
            <p style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtle)',
              marginBottom: '12px'
            }}>
              Found {filteredSections.length} result{filteredSections.length !== 1 ? 's' : ''}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {filteredSections.map(section => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setSearchQuery('')}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
                    color: 'var(--ld-semantic-color-text-brand)',
                    borderRadius: '16px',
                    fontSize: '13px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    border: '1px solid var(--ld-semantic-color-border-info)'
                  }}
                >
                  {section.name}
                </a>
              ))}
            </div>
          </div>
        )}

          {/* Quick Navigation - Collapsible */}
          <div style={{ marginTop: '24px' }}>
            <button
              onClick={() => setQuickNavExpanded(!quickNavExpanded)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ld-primitive-scale-space-100)',
                background: 'none',
                border: 'none',
                padding: '0',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ld-semantic-color-text-subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: quickNavExpanded ? '16px' : '0',
                fontFamily: 'var(--ld-semantic-font-family-sans)',
              }}
            >
              {quickNavExpanded ?
                <Icons.ChevronUp style={{ width: 16, height: 16 }} /> :
                <Icons.ChevronDown style={{ width: 16, height: 16 }} />
              }
              Quick Navigation
            </button>

            {quickNavExpanded && (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Component Sandbox', 'Alerts', 'Badges', 'Breadcrumbs', 'Buttons', 'Callouts', 'Cards', 'Checkboxes', 'Chips', 'Content Messages', 'Date Fields', 'Dividers', 'Filter Chips', 'Form Groups', 'Icon Buttons', 'Link Buttons', 'Links', 'Lists', 'Magic Box', 'Menu', 'Radio Buttons', 'Icons', 'Design Tokens'].map(section => (
                  <Chip
                    key={section}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = section.toLowerCase().replace(/ /g, '-');
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    {section}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <ThemeSwitcher />
        </div>
      </div>

      {/* Component Sandbox */}
      <Section id="component-tester" title="Component Sandbox" description="Interactive playground to test component variants, sizes, and properties in real-time">
        <InteractiveComponentTester />
      </Section>

      {/* Icons Section */}
      <Section id="icons" title="Icons" description={`Complete icon library with ${Object.values(iconCategories).flat().length}+ React components organized by category`}>
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          padding: '32px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          {Object.entries(iconCategories).map(([category, iconNames]) => {
            const CategoryComponent = () => {
              const [isExpanded, setIsExpanded] = React.useState(false);
              const ChevronIcon = isExpanded ? (Icons as any).ChevronDown : (Icons as any).ChevronRight;

              return (
                <div key={category} style={{ marginBottom: '48px' }}>
                  <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      marginBottom: '20px'
                    }}
                  >
                    <ChevronIcon style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-subtle)' }} />
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      margin: 0,
                      color: 'var(--ld-semantic-color-text)',
                      fontFamily: 'var(--ld-semantic-font-family-sans)'
                    }}>
                      {category} ({iconNames.length})
                    </h3>
                  </div>
                  {isExpanded && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                      gap: '16px'
                    }}>
                      {iconNames.map(iconName => {
                        const IconComponent = (Icons as any)[iconName];
                        if (!IconComponent) return null;

                        return (
                          <IconShowcase
                            key={iconName}
                            icon={<IconComponent />}
                            name={iconName}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            };

            return <CategoryComponent key={category} />;
          })}

          {/* Usage Example */}
          <div style={{
            marginTop: '40px',
            padding: 'var(--ld-primitive-scale-space-300)',
            backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
            borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
            borderLeft: `4px solid var(--ld-semantic-color-border-info)`
          }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '12px',
              color: 'var(--ld-semantic-color-text)'
            }}>
              Usage Examples
            </h4>
            <pre style={{
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '13px',
              color: 'var(--ld-semantic-color-text)',
              margin: 0,
              lineHeight: '1.6',
              overflowX: 'auto'
            }}>
{`// Import icons from the centralized library
import { Search, Settings, Cart, User } from '@/components/icons';

// Use with LD design tokens (preferred)
<Search style={{
  color: 'var(--ld-semantic-color-text)',
  width: 'var(--ld-semantic-scale-icon-small)'
}} />

// Use with inline styles and tokens
<Settings style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text)' }} />

// Icons support currentColor for semantic theming
<Cart style={{
  color: 'var(--ld-semantic-color-action-fill-primary)',
  width: 'var(--ld-semantic-scale-icon-small)'
}} />

// Use className with LD utility classes
<User className="w-5 h-5 text-ld-primary" />`}
            </pre>
          </div>
        </div>
      </Section>

      {/* Buttons Section */}
      <Section id="buttons" title="Buttons" description="Primary, secondary, tertiary, and destructive button variants with full accessibility support">
        <ComponentShowcase>
          <ButtonExample />
        </ComponentShowcase>
      </Section>

      {/* Badges Section */}
      <Section id="badges" title="Badges" description="Count badges, status indicators, and semantic color variants for notifications and labels">
        <ComponentShowcase>
          <BadgeExample />
        </ComponentShowcase>
      </Section>

      {/* Breadcrumbs Section */}
      <Section id="breadcrumbs" title="Breadcrumbs" description="Navigation breadcrumbs with support for 2-5 levels and custom separators">
        <ComponentShowcase>
          <BreadcrumbExample />
        </ComponentShowcase>
      </Section>

      {/* Links Section */}
      <Section id="links" title="Links" description="Text links with underline variants, external link support, and hover states">
        <ComponentShowcase>
          <LinkExample />
        </ComponentShowcase>
      </Section>

      {/* Link Buttons Section */}
      <Section id="link-buttons" title="Link Buttons" description="Link-styled interactive elements with icon support, multiple sizes, and color variants. Renders as anchor or button.">
        <ComponentShowcase>
          <LinkButtonExample />
        </ComponentShowcase>
      </Section>

      {/* Icon Buttons Section */}
      <Section id="icon-buttons" title="Icon Buttons" description="Icon-only buttons for compact actions with ghost, primary, secondary, and destructive variants">
        <ComponentShowcase>
          <IconButtonExample />
        </ComponentShowcase>
      </Section>

      {/* Checkboxes Section */}
      <Section id="checkboxes" title="Checkboxes" description="Form checkboxes with checked, unchecked, and indeterminate states using LD 3.5 input tokens">
        <ComponentShowcase>
          <CheckboxExample />
        </ComponentShowcase>
      </Section>

      {/* Radio Buttons Section */}
      <Section id="radio-buttons" title="Radio Buttons" description="Mutually exclusive selection within a group. Uses LD 3.5 input tokens with bold label when selected.">
        <ComponentShowcase>
          <RadioExample />
        </ComponentShowcase>
      </Section>

      {/* Ratings Section */}
      <Section id="ratings" title="Ratings" description="Star ratings with support for whole and half-star values. Two size variants using LD 3.5 semantic tokens.">
        <ComponentShowcase>
          <RatingExample />
        </ComponentShowcase>
      </Section>

      {/* Form Groups Section */}
      <Section id="form-groups" title="Form Groups" description="Semantic fieldset/legend wrapper for grouping related form controls (checkboxes, radios) with label, helper text, and error states.">
        <ComponentShowcase>
          <FormGroupExample />
        </ComponentShowcase>
      </Section>

      {/* Chips Section */}
      <Section id="chips" title="Chips" description="Interactive, selectable buttons with subtle rounded corners (4px) for categories and selections using INPUT tokens">
        <ComponentShowcase>
          <ChipExample />
        </ComponentShowcase>
      </Section>

      {/* Filter Chips Section */}
      <Section id="filter-chips" title="Filter Chips" description="Pill-shaped (fully rounded) filter chips for filtering interfaces. Use same INPUT tokens as Chip but with different border-radius">
        <ComponentShowcase>
          <FilterChipExample />
        </ComponentShowcase>
      </Section>

      {/* Tags Section */}
      <Section id="tags" title="Tags" description="Non-interactive labels for highlighting item attributes. 3 variants (Primary, Secondary, Tertiary) × 17 colors = 51 combinations. Uses LD 3.5 caption tokens.">
        <ComponentShowcase>
          <TagExample />
        </ComponentShowcase>
      </Section>

      {/* Callouts Section */}
      <Section id="callouts" title="Callouts" description="Coaching callouts with nubbin pointers for onboarding guidance anchored to UI elements">
        <ComponentShowcase>
          <CalloutExample />
        </ComponentShowcase>
      </Section>

      {/* Cards Section */}
      <Section id="cards" title="Cards" description="Card containers with headers, content areas, and support for leading/trailing elements">
        <ComponentShowcase>
          <CardHeaderExample />
        </ComponentShowcase>
      </Section>

      {/* Alerts Section */}
      <Section id="alerts" title="Alerts" description="Informational messages with semantic variants (info, success, warning, error) for communicating important updates">
        <ComponentShowcase>
          <AlertExample />
        </ComponentShowcase>
      </Section>

      {/* Content Messages Section */}
      <Section id="content-messages" title="Content Messages" description="Critical, blocking messages for errors, permissions, and states that prevent user progress">
        <ComponentShowcase>
          <ContentMessageExample />
        </ComponentShowcase>
      </Section>

      {/* Date Fields Section */}
      <Section id="date-fields" title="Date Fields" description="Text input for manual date entry in mm/dd/yyyy format with built-in validation, error states, and optional calendar icon.">
        <ComponentShowcase>
          <DateFieldExample />
        </ComponentShowcase>
      </Section>

      {/* Date Pickers Section */}
      <Section id="date-pickers" title="Date Pickers" description="Combined text input and calendar popup for date selection. Supports both manual entry and calendar selection.">
        <ComponentShowcase>
          <DatePickerExample />
        </ComponentShowcase>
      </Section>

      {/* Dividers Section */}
      <Section id="dividers" title="Dividers" description="Visual separators using the LD 3.5 separator token. Horizontal, vertical, and titled variants.">
        <ComponentShowcase>
          <DividerExample />
        </ComponentShowcase>
      </Section>

      {/* Lists Section */}
      <Section id="lists" title="Lists" description="Presentational vertical list of related information with leading (icon, spot icon, custom) and trailing (icon, link, custom) variants.">
        <ComponentShowcase>
          <ListExample />
        </ComponentShowcase>
      </Section>

      {/* Magic Box Section */}
      <Section id="magic-box" title="Magic Box" description="Highlights AI-generated content being actively processed. Wrapper component with animated glow effect that responds to theme.">
        <ComponentShowcase>
          <MagicBoxExample />
        </ComponentShowcase>
      </Section>

      {/* Menu Section */}
      <Section id="menu" title="Menu" description="Displays a list of actions in a small overlay. Built with Living Design 3.5 tokens for consistent spacing, typography, and interactive states.">
        <ComponentShowcase>
          <MenuExample />
        </ComponentShowcase>
      </Section>

      {/* Scrim Section */}
      <Section id="scrim" title="Scrim" description="Semi-transparent backdrop component for overlay interfaces. Provides visual separation between overlay content and background, helping focus user attention on modals, panels, and bottom sheets.">
        <ComponentShowcase>
          <ScrimExample />
        </ComponentShowcase>
      </Section>

      {/* Spinners Section */}
      <Section id="spinners" title="Spinners" description="Loading indicators for indeterminate processes. Spinners inform users of ongoing operations including data retrieval, loading states, and saving. Available in two colors (neutral, white) and two sizes (large, small).">
        <React.Suspense fallback={<div>Loading...</div>}>
          <SpinnerExample />
        </React.Suspense>
      </Section>

      {/* Design Tokens Section */}
      <Section id="design-tokens" title="Design Tokens" description="Complete Living Design 3.5 semantic token system - 624 tokens organized by category">
        <TokenCategorySection />
      </Section>

      {/* Usage Guidelines */}
      <Section id="usage-guidelines" title="Usage Guidelines" description="Best practices for implementing Living Design 3.5 components">
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          padding: '32px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <div style={{ display: 'grid', gap: '24px' }}>
            <GuidelineItem 
              title="Always Use Semantic Tokens"
              description="Never hard-code colors or spacing. Always use LD 3.5 semantic tokens like var(--ld-semantic-color-action-fill-primary) to ensure consistency and support theme switching."
            />
            <GuidelineItem 
              title="Reuse Existing Components"
              description="Before creating custom components, check if an existing LD 3.5 component meets your needs. Reusing components ensures consistency across the application."
            />
            <GuidelineItem 
              title="Use Icon Components"
              description="Always import icons from @/components/icons. All 304+ icons are React components that support currentColor for semantic theming. Never use inline SVG elements."
            />
            <GuidelineItem 
              title="Accessibility First"
              description="All components include proper ARIA labels, keyboard navigation support, and focus indicators. Maintain these standards when implementing components."
            />
            <GuidelineItem 
              title="Responsive Design"
              description="Components are designed to work across all screen sizes. Use responsive utilities and test on mobile, tablet, and desktop viewports."
            />
            <GuidelineItem 
              title="Component Composition"
              description="Break complex UIs into smaller, reusable components. This improves maintainability and follows React best practices."
            />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <div style={{
        marginTop: '64px',
        padding: '24px',
        backgroundColor: 'var(--ld-semantic-color-surface)',
        borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
        textAlign: 'center',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '8px'
        }}>
          Living Design 3.5 Component Library - {Object.values(iconCategories).flat().length} Icons Available
        </p>
        <p style={{
          fontSize: '12px',
          color: 'var(--ld-semantic-color-text-subtlest)'
        }}>
          For more information, visit the{' '}
          <a
            href="/guidelines"
            style={{
              color: 'var(--ld-semantic-color-text-brand)',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Design System Guidelines
          </a>
        </p>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <div
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            zIndex: 30,
            transition: `opacity 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
            opacity: showScrollTop ? 1 : 0,
            transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
          }}
        >
          <IconButton
            aria-label="Scroll to top"
            variant="primary"
            size="medium"
            shape="rounded"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {React.createElement((Icons as any).ChevronUp)}
          </IconButton>
        </div>
      )}
    </div>
    </>
  );
}

// Helper Components
interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

function Section({ id, title, description, children }: SectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const ChevronIcon = isExpanded ? (Icons as any).ChevronDown : (Icons as any).ChevronRight;

  return (
    <div id={id} style={{ marginBottom: '48px', scrollMarginTop: '24px' }}>
      <div
        style={{
          marginBottom: '24px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ChevronIcon style={{ width: 24, height: 24, color: 'var(--ld-semantic-color-text-subtle)' }} />
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '8px',
            flex: 1
          }}>
            {title}
          </h2>
        </div>
        {description && (
          <p style={{
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-subtle)',
            lineHeight: '1.5',
            marginLeft: '36px'
          }}>
            {description}
          </p>
        )}
      </div>
      {isExpanded && children}
    </div>
  );
}

function ComponentShowcase({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
      overflow: 'hidden',
      boxShadow: 'var(--ld-semantic-elevation-100)'
    }}>
      <React.Suspense fallback={
        <div style={{
          padding: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: '14px'
        }}>
          Loading component...
        </div>
      }>
        {children}
      </React.Suspense>
    </div>
  );
}

interface ColorSwatchProps {
  color: string;
  label: string;
  token: string;
}

function ColorSwatch({ color, label, token }: ColorSwatchProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{
        width: '100%',
        height: '100px',
        backgroundColor: color,
        borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
        border: `1px solid var(--ld-semantic-color-separator)`,
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }} />
      <div>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 600,
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '4px'
        }}>
          {label}
        </div>
        <div style={{ 
          fontSize: '11px', 
          color: 'var(--ld-semantic-color-text-subtle)', 
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          wordBreak: 'break-all'
        }}>
          {token}
        </div>
      </div>
    </div>
  );
}

interface GuidelineItemProps {
  title: string;
  description: string;
}

function GuidelineItem({ title, description }: GuidelineItemProps) {
  return (
    <div style={{
      padding: 'var(--ld-primitive-scale-space-300)',
      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
      borderLeft: `4px solid var(--ld-semantic-color-border-info)`,
      borderRadius: 'var(--ld-primitive-scale-border-radius-50)'
    }}>
      <h4 style={{
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '8px'
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: '14px',
        color: 'var(--ld-semantic-color-text-subtle)',
        lineHeight: '1.6',
        margin: 0
      }}>
        {description}
      </p>
    </div>
  );
}

// Searchable Component Select Dropdown
interface SearchableComponentSelectProps {
  selectedComponent: string;
  onComponentChange: (component: string) => void;
  availableComponents: string[];
}

function SearchableComponentSelect({ selectedComponent, onComponentChange, availableComponents }: SearchableComponentSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredComponents = availableComponents.filter(component =>
    component.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ChevronDown = (Icons as any).ChevronDown;
  const SearchIcon = (Icons as any).Search;

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Selected Component Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          fontSize: '14px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontWeight: 500,
          border: '2px solid var(--ld-semantic-color-border)',
          borderRadius: 'var(--ld-semantic-border-radius-medium)',
          backgroundColor: 'var(--ld-semantic-color-surface)',
          color: 'var(--ld-semantic-color-text)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-strong)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border)';
        }}
      >
        <span>{selectedComponent}</span>
        <ChevronDown style={{
          width: 16,
          height: 16,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s'
        }} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'var(--ld-semantic-color-surface)',
          border: '1px solid var(--ld-semantic-color-border)',
          borderRadius: 'var(--ld-semantic-border-radius-medium)',
          boxShadow: 'var(--ld-semantic-elevation-200)',
          overflow: 'hidden'
        }}>
          {/* Search Input */}
          <div style={{ padding: '12px', borderBottom: '1px solid var(--ld-semantic-color-separator)' }}>
            <div style={{ position: 'relative' }}>
              <SearchIcon style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
                color: 'var(--ld-semantic-color-text-subtle)',
                pointerEvents: 'none'
              }} />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  fontSize: '14px',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  border: '1px solid var(--ld-semantic-color-border)',
                  borderRadius: 'var(--ld-semantic-border-radius-small)',
                  backgroundColor: 'var(--ld-semantic-color-background-subtle)',
                  color: 'var(--ld-semantic-color-text)',
                  outline: 'none'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Component List */}
          <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
            {filteredComponents.length > 0 ? (
              filteredComponents.map((component) => (
                <button
                  key={component}
                  onClick={() => {
                    onComponentChange(component);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontFamily: 'var(--ld-semantic-font-family-sans)',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: component === selectedComponent
                      ? 'var(--ld-semantic-color-fill-info-subtle)'
                      : 'transparent',
                    color: 'var(--ld-semantic-color-text)',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                    fontWeight: component === selectedComponent ? 600 : 400
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-hovered)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = component === selectedComponent
                      ? 'var(--ld-semantic-color-fill-info-subtle)'
                      : 'transparent';
                  }}
                >
                  {component}
                </button>
              ))
            ) : (
              <div style={{
                padding: '16px',
                textAlign: 'center',
                color: 'var(--ld-semantic-color-text-subtle)',
                fontSize: '14px'
              }}>
                No components found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Interactive Component Tester - Supports multiple component types
function InteractiveComponentTester() {
  type ComponentType = 'Button' | 'Badge' | 'IconButton' | 'Link' | 'LinkButton' | 'Tag' | 'OLQTag' | 'Chip' | 'FilterChip' | 'DatePicker' | 'Radio' | 'Spinner' | 'Switch';

  const [selectedComponent, setSelectedComponent] = React.useState<ComponentType>('Button');
  const [variant, setVariant] = React.useState<string>('primary');
  const [size, setSize] = React.useState<string>('medium');
  const [disabled, setDisabled] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);
  const [withIcon, setWithIcon] = React.useState(false);
  const [badgeValue, setBadgeValue] = React.useState(5);
  const [shape, setShape] = React.useState<string>('square');
  const [underline, setUnderline] = React.useState(true);
  const [dismissible, setDismissible] = React.useState(false);
  const [clickable, setClickable] = React.useState(false);
  const [olqPercentage, setOlqPercentage] = React.useState(85);
  const [chipSelected, setChipSelected] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('option-a');
  const [radioShowLabel, setRadioShowLabel] = React.useState(true);
  const [switchChecked, setSwitchChecked] = React.useState(false);

  // DatePicker state
  const [datePickerDate, setDatePickerDate] = React.useState<Date>();
  const [datePickerIsOpen, setDatePickerIsOpen] = React.useState(false);

  const SearchIcon = (Icons as any).Search;
  const ArrowRightIcon = (Icons as any).ChevronRight;
  const PlusIcon = (Icons as any).Plus;
  const SettingsIcon = (Icons as any).Settings;

  // Component-specific configurations
  const componentConfigs: Record<ComponentType, {
    variants: string[];
    sizes: string[];
    supportsFullWidth: boolean;
    supportsIcons: boolean;
    supportsValue: boolean;
    supportsShape: boolean;
    supportsUnderline: boolean;
    supportsDismissible: boolean;
    supportsClickable: boolean;
    supportsOLQPercentage: boolean;
  }> = {
    Button: {
      variants: ['primary', 'secondary', 'tertiary', 'destructive'],
      sizes: ['small', 'medium', 'large'],
      supportsFullWidth: true,
      supportsIcons: true,
      supportsValue: false,
      supportsShape: false,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
    Badge: {
      variants: ['info', 'success', 'warning', 'error', 'neutral', 'blue', 'green', 'red'],
      sizes: ['small', 'medium', 'large'],
      supportsFullWidth: false,
      supportsIcons: false,
      supportsValue: true,
      supportsShape: false,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
    IconButton: {
      variants: ['ghost', 'primary', 'secondary', 'destructive'],
      sizes: ['small', 'medium', 'large'],
      supportsFullWidth: false,
      supportsIcons: false,
      supportsValue: false,
      supportsShape: true,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
    Link: {
      variants: ['default', 'subtle', 'white'],
      sizes: [],
      supportsFullWidth: false,
      supportsIcons: false,
      supportsValue: false,
      supportsShape: false,
      supportsUnderline: true,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
    LinkButton: {
      variants: ['default', 'subtle', 'white'],
      sizes: ['small', 'medium', 'large'],
      supportsFullWidth: true,
      supportsIcons: true,
      supportsValue: false,
      supportsShape: false,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
    Tag: {
      variants: ['primary', 'secondary', 'tertiary'],
      sizes: [],
      supportsFullWidth: false,
      supportsIcons: true,
      supportsValue: false,
      supportsShape: false,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
    OLQTag: {
      variants: [],
      sizes: ['sm', 'md', 'lg'],
      supportsFullWidth: false,
      supportsIcons: false,
      supportsValue: false,
      supportsShape: false,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: true,
    },
    Chip: {
      variants: ['default', 'primary'],
      sizes: ['small', 'medium', 'large'],
      supportsFullWidth: false,
      supportsIcons: true,
      supportsValue: false,
      supportsShape: false,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
    FilterChip: {
      variants: ['toggle'],
      sizes: [],
      supportsFullWidth: false,
      supportsIcons: true,
      supportsValue: false,
      supportsShape: false,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
    DatePicker: {
      variants: [],
      sizes: ['small', 'large'],
      supportsFullWidth: false,
      supportsIcons: false,
      supportsValue: false,
      supportsShape: false,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
    Radio: {
      variants: [],
      sizes: [],
      supportsFullWidth: false,
      supportsIcons: false,
      supportsValue: false,
      supportsShape: false,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
    Spinner: {
      variants: ['neutral', 'white'],
      sizes: ['large', 'small'],
      supportsFullWidth: false,
      supportsIcons: false,
      supportsValue: false,
      supportsShape: false,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
    Switch: {
      variants: [],
      sizes: [],
      supportsFullWidth: false,
      supportsIcons: false,
      supportsValue: false,
      supportsShape: false,
      supportsUnderline: false,
      supportsDismissible: false,
      supportsClickable: false,
      supportsOLQPercentage: false,
    },
  };

  const config = componentConfigs[selectedComponent];

  // Reset properties when switching components
  React.useEffect(() => {
    setVariant(config.variants[0] || 'default');
    setSize(config.sizes[0] || 'medium');
    setDisabled(false);
    setFullWidth(false);
    setWithIcon(false);
    setShape('square');
    setUnderline(true);
    setDismissible(false);
    setClickable(false);
    setOlqPercentage(85);
    setChipSelected(false);
  }, [selectedComponent]);

  // Generate code based on selected component
  const generateCode = () => {
    switch (selectedComponent) {
      case 'Button':
        return `<Button
  variant="${variant}"
  size="${size}"${disabled ? '\n  disabled' : ''}${fullWidth ? '\n  isFullWidth' : ''}${withIcon ? `\n  leading={<Search />}\n  trailing={<ChevronRight />}` : ''}
>
  Click Me
</Button>`;

      case 'Badge':
        return `<Badge
  variant="${variant}"
  size="${size}"${badgeValue ? `\n  value={${badgeValue}}` : ''}
  aria-label="${badgeValue} items"
/>`;

      case 'IconButton':
        return `<IconButton
  variant="${variant}"
  size="${size}"${shape !== 'square' ? `\n  shape="${shape}"` : ''}${disabled ? '\n  disabled' : ''}
  aria-label="Settings"
>
  <Settings style={{ width: 20, height: 20 }} />
</IconButton>`;

      case 'Link':
        const linkText = variant === 'subtle' ? 'Subtle Link' : variant === 'white' ? 'White Link' : 'Example Link';
        return `<Link
  href="/example"
  variant="${variant}"${!underline ? '\n  underline={false}' : ''}
>
  ${linkText}
</Link>`;

      case 'LinkButton':
        return `<LinkButton
  color="${variant}"
  size="${size}"${disabled ? '\n  disabled' : ''}${fullWidth ? '\n  isFullWidth' : ''}${withIcon ? `\n  leading={<Home />}\n  trailing={<ChevronRight />}` : ''}
  href="/example"
>
  Button label
</LinkButton>`;

      case 'Tag':
        return `<Tag
  variant="${variant}"
  color="brand"${withIcon ? '\n  leading={<Icon size={14} />}' : ''}
>
  ${variant.charAt(0).toUpperCase() + variant.slice(1)} Tag
</Tag>`;

      case 'OLQTag':
        return `<OLQTag
  value="${olqPercentage}%"
  size="${size}"
/>`;

      case 'Chip':
        return `<Chip
  variant="${variant}"
  size="${size}"${chipSelected ? '\n  selected' : ''}${disabled ? '\n  disabled' : ''}${withIcon ? '\n  iconLeading={<Filter />}' : ''}
  onSelectedChange={setSelected}
>
  Filter Label
</Chip>`;

      case 'Radio':
        return `<RadioGroup value={selected} onValueChange={setSelected}${disabled ? ' disabled' : ''}>
  <Radio value="option-a" label="Option A"${disabled ? ' disabled' : ''} />
  <Radio value="option-b" label="Option B"${disabled ? ' disabled' : ''} />
  <Radio value="option-c" label="Option C"${disabled ? ' disabled' : ''} />
</RadioGroup>`;

      case 'Spinner':
        return `<Spinner
  color="${variant}"
  size="${size}"
  a11yLabel="Loading…"
/>`;

      case 'Switch':
        return `<Switch
  label="Enable notifications"${disabled ? '\n  disabled' : ''}
  checked={enabled}
  onChange={setEnabled}
/>`;

      default:
        return '';
    }
  };

  // Render live preview based on selected component
  const renderPreview = () => {
    switch (selectedComponent) {
      case 'Button':
        return (
          <div style={{ width: fullWidth ? '100%' : 'auto' }}>
            <Button
              variant={variant as any}
              size={size as any}
              disabled={disabled}
              isFullWidth={fullWidth}
              leading={withIcon ? <SearchIcon style={{ width: 20, height: 20 }} /> : undefined}
              trailing={withIcon ? <ArrowRightIcon style={{ width: 20, height: 20 }} /> : undefined}
            >
              Click Me
            </Button>
          </div>
        );

      case 'Badge':
        return (
          <Badge
            variant={variant as any}
            size={size as any}
            value={badgeValue}
            aria-label={`${badgeValue} items`}
          />
        );

      case 'IconButton':
        return (
          <IconButton
            variant={variant as any}
            size={size as any}
            shape={shape as any}
            disabled={disabled}
            aria-label="Settings"
          >
            <SettingsIcon style={{ width: 20, height: 20 }} />
          </IconButton>
        );

      case 'LinkButton': {
        const HomeIcon = (Icons as any).Home;
        const ChevronIcon = (Icons as any).ChevronRight;
        const linkBtnContent = (
          <LinkButton
            color={variant as any}
            size={size as any}
            disabled={disabled}
            isFullWidth={fullWidth}
            leading={withIcon && HomeIcon ? <HomeIcon /> : undefined}
            trailing={withIcon && ChevronIcon ? <ChevronIcon /> : undefined}
          >
            Button label
          </LinkButton>
        );

        if (variant === 'white') {
          return (
            <div style={{
              padding: 'var(--ld-primitive-scale-space-300)',
              backgroundColor: 'var(--ld-semantic-color-surface-inverse)',
              borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
              width: fullWidth ? '100%' : 'auto',
            }}>
              {linkBtnContent}
            </div>
          );
        }

        return <div style={{ width: fullWidth ? '100%' : 'auto' }}>{linkBtnContent}</div>;
      }

      case 'Link':
        const linkContent = (
          <Link
            href="/example"
            variant={variant as any}
            underline={underline}
          >
            {variant === 'subtle' ? 'Subtle Link' : variant === 'white' ? 'White Link' : 'Example Link'}
          </Link>
        );

        // Show white variant on dark background
        if (variant === 'white') {
          return (
            <div style={{
              padding: 'var(--ld-primitive-scale-space-300)',
              backgroundColor: 'var(--ld-semantic-color-surface-inverse)',
              borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
            }}>
              {linkContent}
            </div>
          );
        }

        return linkContent;

      case 'Tag':
        const CheckIcon = (Icons as any).Check;
        return (
          <Tag
            variant={variant as any}
            color="brand"
            leading={withIcon && CheckIcon ? <CheckIcon style={{ width: 14, height: 14 }} /> : undefined}
          >
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Tag
          </Tag>
        );

      case 'OLQTag':
        return (
          <OLQTag
            value={`${olqPercentage}%`}
            size={size as any}
          />
        );

      case 'Chip': {
        const StarIcon = (Icons as any).Star;
        return (
          <Chip
            variant={variant as any}
            size={size as any}
            selected={chipSelected}
            onSelectedChange={setChipSelected}
            disabled={disabled}
            iconLeading={withIcon && StarIcon ? <StarIcon style={{ width: 16, height: 16 }} /> : undefined}
          >
            Chip Label
          </Chip>
        );
      }

      case 'FilterChip': {
        const FilterIcon = (Icons as any).Filter;
        return (
          <FilterChip
            selected={chipSelected}
            onSelectedChange={setChipSelected}
            disabled={disabled}
            iconLeading={withIcon && FilterIcon ? <FilterIcon style={{ width: 16, height: 16 }} /> : undefined}
          >
            Filter Label
          </FilterChip>
        );
      }

      case 'DatePicker':
        return (
          <div style={{ maxWidth: '320px', width: '100%' }}>
            <DatePicker
              label="Choose date (mm/dd/yyyy)"
              value={datePickerDate}
              isOpen={datePickerIsOpen}
              onOpen={() => setDatePickerIsOpen(true)}
              onClose={() => setDatePickerIsOpen(false)}
              onSelect={(date) => setDatePickerDate(date)}
              disabled={disabled}
              size={size as 'small' | 'large'}
              helperText="Select a date from the calendar or type manually"
            />
          </div>
        );

      case 'Radio':
        return (
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <Radio value="option-a" label={radioShowLabel ? 'Option A' : undefined} aria-label="Option A" showLabel={radioShowLabel} disabled={disabled} />
            <Radio value="option-b" label={radioShowLabel ? 'Option B' : undefined} aria-label="Option B" showLabel={radioShowLabel} disabled={disabled} />
            <Radio value="option-c" label={radioShowLabel ? 'Option C' : undefined} aria-label="Option C" showLabel={radioShowLabel} disabled={disabled} />
          </RadioGroup>
        );

      case 'Spinner':
        return (
          <Spinner
            color={variant as any}
            size={size as any}
            a11yLabel="Loading…"
          />
        );

      case 'Switch':
        return (
          <Switch
            label="Enable notifications"
            checked={switchChecked}
            onChange={setSwitchChecked}
            disabled={disabled}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      borderRadius: 'var(--ld-semantic-border-radius-large)',
      padding: 'var(--ld-semantic-spacing-400)',
      boxShadow: 'var(--ld-semantic-elevation-100)'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ld-semantic-spacing-400)' }}>
        {/* Controls Panel */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--ld-semantic-color-text)',
            marginBottom: 'var(--ld-semantic-spacing-200)',
            fontFamily: 'var(--ld-semantic-font-family-sans)'
          }}>
            Component Properties
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-semantic-spacing-200)' }}>
            {/* Component Type Selection */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: 'var(--ld-semantic-spacing-100)',
                fontFamily: 'var(--ld-semantic-font-family-sans)'
              }}>
                Component
              </label>
              <SearchableComponentSelect
                selectedComponent={selectedComponent}
                onComponentChange={(component) => setSelectedComponent(component as ComponentType)}
                availableComponents={Object.keys(componentConfigs) as ComponentType[]}
              />
            </div>

            {/* Variant Selection */}
            {config.variants.length > 0 && (
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--ld-semantic-color-text-subtle)',
                  marginBottom: 'var(--ld-semantic-spacing-100)',
                  fontFamily: 'var(--ld-semantic-font-family-sans)'
                }}>
                  Variant
                </label>
                <div style={{ display: 'flex', gap: 'var(--ld-semantic-spacing-100)', flexWrap: 'wrap' }}>
                  {config.variants.map((v) => (
                    <Chip
                      key={v}
                      selected={variant === v}
                      onClick={() => setVariant(v)}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {config.sizes.length > 0 && (
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--ld-semantic-color-text-subtle)',
                  marginBottom: 'var(--ld-semantic-spacing-100)',
                  fontFamily: 'var(--ld-semantic-font-family-sans)'
                }}>
                  Size
                </label>
                <div style={{ display: 'flex', gap: 'var(--ld-semantic-spacing-100)' }}>
                  {config.sizes.map((s) => (
                    <Chip
                      key={s}
                      selected={size === s}
                      onClick={() => setSize(s)}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {/* Shape Selection */}
            {config.supportsShape && (
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--ld-semantic-color-text-subtle)',
                  marginBottom: 'var(--ld-semantic-spacing-100)',
                  fontFamily: 'var(--ld-semantic-font-family-sans)'
                }}>
                  Shape
                </label>
                <div style={{ display: 'flex', gap: 'var(--ld-semantic-spacing-100)' }}>
                  {(selectedComponent === 'Chip' ? ['square', 'pill'] : ['square', 'rounded']).map((s) => (
                    <Button
                      key={s}
                      variant={shape === s ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => setShape(s)}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Boolean Properties */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-semantic-spacing-100)' }}>
              <Checkbox
                label="Disabled"
                checked={disabled}
                onCheckedChange={(c) => setDisabled(!!c)}
              />

              {config.supportsFullWidth && (
                <Checkbox
                  label="Full Width"
                  checked={fullWidth}
                  onCheckedChange={(c) => setFullWidth(!!c)}
                />
              )}

              {config.supportsIcons && (
                <Checkbox
                  label="With Icons"
                  checked={withIcon}
                  onCheckedChange={(c) => setWithIcon(!!c)}
                />
              )}

              {config.supportsValue && (
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--ld-semantic-color-text)',
                    marginBottom: 'var(--ld-semantic-spacing-50)',
                    fontFamily: 'var(--ld-semantic-font-family-sans)'
                  }}>
                    Badge Value
                  </label>
                  <input
                    type="number"
                    value={badgeValue}
                    onChange={(e) => setBadgeValue(parseInt(e.target.value) || 0)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '14px',
                      border: '1px solid var(--ld-semantic-color-border)',
                      borderRadius: 'var(--ld-semantic-border-radius-small)',
                      width: '100px',
                      fontFamily: 'var(--ld-semantic-font-family-sans)'
                    }}
                  />
                </div>
              )}

              {config.supportsUnderline && (
                <Checkbox
                  label="Underline"
                  checked={underline}
                  onCheckedChange={(c) => setUnderline(!!c)}
                />
              )}

              {config.supportsDismissible && (
                <Checkbox
                  label="Dismissible"
                  checked={dismissible}
                  onCheckedChange={(c) => setDismissible(!!c)}
                />
              )}

              {config.supportsClickable && (
                <Checkbox
                  label="Clickable"
                  checked={clickable}
                  onCheckedChange={(c) => setClickable(!!c)}
                />
              )}

              {selectedComponent === 'Radio' && (
                <Checkbox
                  label="Show Labels"
                  checked={radioShowLabel}
                  onCheckedChange={(c) => setRadioShowLabel(!!c)}
                />
              )}

              {config.supportsOLQPercentage && (
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--ld-semantic-color-text)',
                    marginBottom: 'var(--ld-semantic-spacing-50)',
                    fontFamily: 'var(--ld-semantic-font-family-sans)'
                  }}>
                    OLQ Percentage
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={olqPercentage}
                    onChange={(e) => setOlqPercentage(parseInt(e.target.value) || 0)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '14px',
                      border: '1px solid var(--ld-semantic-color-border)',
                      borderRadius: 'var(--ld-semantic-border-radius-small)',
                      width: '100px',
                      fontFamily: 'var(--ld-semantic-font-family-sans)'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Code Preview */}
            <div style={{ marginTop: 'var(--ld-semantic-spacing-200)' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: 'var(--ld-semantic-spacing-100)',
                fontFamily: 'var(--ld-semantic-font-family-sans)'
              }}>
                Generated Code
              </label>
              <pre style={{
                fontSize: '11px',
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                padding: 'var(--ld-semantic-spacing-150)',
                borderRadius: 'var(--ld-semantic-border-radius-small)',
                color: 'var(--ld-semantic-color-text)',
                overflowX: 'auto',
                lineHeight: '1.5',
                margin: 0
              }}>
                {generateCode()}
              </pre>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--ld-semantic-color-text)',
            marginBottom: 'var(--ld-semantic-spacing-200)',
            fontFamily: 'var(--ld-semantic-font-family-sans)'
          }}>
            Live Preview
          </h3>
          <div style={{
            padding: 'var(--ld-semantic-spacing-400)',
            backgroundColor: 'var(--ld-semantic-color-background-subtle)',
            borderRadius: 'var(--ld-semantic-border-radius-large)',
            border: '2px dashed var(--ld-semantic-color-border-subtlest)',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Token Category Section with Collapsible Groups
function TokenCategorySection() {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    'action-colors': false,
    'text-colors': false,
    'fill-colors': false,
    'border-colors': false,
    'surface-colors': false,
    'spacing': false,
    'typography': false,
    'border-radius': false,
    'elevation': false,
    'duration': false,
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const tokenGroups = {
    'action-colors': {
      title: 'Action Colors (Buttons & Interactive Elements)',
      count: 76,
      tokens: [
        // Primary Button Fill
        { name: 'Fill Primary', token: '--ld-semantic-color-action-fill-primary' },
        { name: 'Fill Primary Hovered', token: '--ld-semantic-color-action-fill-primary-hovered' },
        { name: 'Fill Primary Focused', token: '--ld-semantic-color-action-fill-primary-focused' },
        { name: 'Fill Primary Pressed', token: '--ld-semantic-color-action-fill-primary-pressed' },
        { name: 'Fill Primary Disabled', token: '--ld-semantic-color-action-fill-primary-disabled' },

        // Secondary Button Fill
        { name: 'Fill Secondary', token: '--ld-semantic-color-action-fill-secondary' },
        { name: 'Fill Secondary Hovered', token: '--ld-semantic-color-action-fill-secondary-hovered' },
        { name: 'Fill Secondary Focused', token: '--ld-semantic-color-action-fill-secondary-focused' },
        { name: 'Fill Secondary Pressed', token: '--ld-semantic-color-action-fill-secondary-pressed' },
        { name: 'Fill Secondary Disabled', token: '--ld-semantic-color-action-fill-secondary-disabled' },

        // Tertiary Button Fill
        { name: 'Fill Tertiary', token: '--ld-semantic-color-action-fill-tertiary' },
        { name: 'Fill Tertiary Hovered', token: '--ld-semantic-color-action-fill-tertiary-hovered' },
        { name: 'Fill Tertiary Focused', token: '--ld-semantic-color-action-fill-tertiary-focused' },
        { name: 'Fill Tertiary Pressed', token: '--ld-semantic-color-action-fill-tertiary-pressed' },
        { name: 'Fill Tertiary Disabled', token: '--ld-semantic-color-action-fill-tertiary-disabled' },

        // Negative/Destructive Button Fill
        { name: 'Fill Negative', token: '--ld-semantic-color-action-fill-negative' },
        { name: 'Fill Negative Hovered', token: '--ld-semantic-color-action-fill-negative-hovered' },
        { name: 'Fill Negative Focused', token: '--ld-semantic-color-action-fill-negative-focused' },
        { name: 'Fill Negative Pressed', token: '--ld-semantic-color-action-fill-negative-pressed' },
        { name: 'Fill Negative Disabled', token: '--ld-semantic-color-action-fill-negative-disabled' },

        // Transparent Button Fill
        { name: 'Fill Transparent', token: '--ld-semantic-color-action-fill-transparent' },
        { name: 'Fill Transparent Hovered', token: '--ld-semantic-color-action-fill-transparent-hovered' },
        { name: 'Fill Transparent Focused', token: '--ld-semantic-color-action-fill-transparent-focused' },
        { name: 'Fill Transparent Pressed', token: '--ld-semantic-color-action-fill-transparent-pressed' },
        { name: 'Fill Transparent Disabled', token: '--ld-semantic-color-action-fill-transparent-disabled' },

        // Button Text Colors
        { name: 'Text Primary', token: '--ld-semantic-color-action-text-primary' },
        { name: 'Text Primary Hovered', token: '--ld-semantic-color-action-text-primary-hovered' },
        { name: 'Text Primary Focused', token: '--ld-semantic-color-action-text-primary-focused' },
        { name: 'Text Primary Pressed', token: '--ld-semantic-color-action-text-primary-pressed' },
        { name: 'Text Primary Disabled', token: '--ld-semantic-color-action-text-primary-disabled' },

        { name: 'Text Secondary', token: '--ld-semantic-color-action-text-secondary' },
        { name: 'Text Secondary Hovered', token: '--ld-semantic-color-action-text-secondary-hovered' },
        { name: 'Text Secondary Focused', token: '--ld-semantic-color-action-text-secondary-focused' },
        { name: 'Text Secondary Pressed', token: '--ld-semantic-color-action-text-secondary-pressed' },
        { name: 'Text Secondary Disabled', token: '--ld-semantic-color-action-text-secondary-disabled' },

        { name: 'Text Tertiary', token: '--ld-semantic-color-action-text-tertiary' },
        { name: 'Text Tertiary Hovered', token: '--ld-semantic-color-action-text-tertiary-hovered' },
        { name: 'Text Tertiary Focused', token: '--ld-semantic-color-action-text-tertiary-focused' },
        { name: 'Text Tertiary Pressed', token: '--ld-semantic-color-action-text-tertiary-pressed' },
        { name: 'Text Tertiary Disabled', token: '--ld-semantic-color-action-text-tertiary-disabled' },

        { name: 'Text Negative', token: '--ld-semantic-color-action-text-negative' },
        { name: 'Text Negative Hovered', token: '--ld-semantic-color-action-text-negative-hovered' },
        { name: 'Text Negative Focused', token: '--ld-semantic-color-action-text-negative-focused' },
        { name: 'Text Negative Pressed', token: '--ld-semantic-color-action-text-negative-pressed' },
        { name: 'Text Negative Disabled', token: '--ld-semantic-color-action-text-negative-disabled' },

        { name: 'Text on Fill Primary', token: '--ld-semantic-color-action-text-on-fill-primary' },
        { name: 'Text on Fill Secondary', token: '--ld-semantic-color-action-text-on-fill-secondary' },
        { name: 'Text on Fill Tertiary', token: '--ld-semantic-color-action-text-on-fill-tertiary' },
        { name: 'Text on Fill Negative', token: '--ld-semantic-color-action-text-on-fill-negative' },
        { name: 'Text on Fill Transparent', token: '--ld-semantic-color-action-text-on-fill-transparent' },

        // Button Borders
        { name: 'Border Secondary', token: '--ld-semantic-color-action-border-secondary' },
        { name: 'Border Secondary Hovered', token: '--ld-semantic-color-action-border-secondary-hovered' },
        { name: 'Border Secondary Focused', token: '--ld-semantic-color-action-border-secondary-focused' },
        { name: 'Border Secondary Pressed', token: '--ld-semantic-color-action-border-secondary-pressed' },
        { name: 'Border Secondary Disabled', token: '--ld-semantic-color-action-border-secondary-disabled' },

        { name: 'Border Tertiary', token: '--ld-semantic-color-action-border-tertiary' },
        { name: 'Border Tertiary Hovered', token: '--ld-semantic-color-action-border-tertiary-hovered' },
        { name: 'Border Tertiary Focused', token: '--ld-semantic-color-action-border-tertiary-focused' },
        { name: 'Border Tertiary Pressed', token: '--ld-semantic-color-action-border-tertiary-pressed' },
        { name: 'Border Tertiary Disabled', token: '--ld-semantic-color-action-border-tertiary-disabled' },

        { name: 'Border Transparent', token: '--ld-semantic-color-action-border-transparent' },
        { name: 'Border Transparent Hovered', token: '--ld-semantic-color-action-border-transparent-hovered' },
        { name: 'Border Transparent Focused', token: '--ld-semantic-color-action-border-transparent-focused' },
        { name: 'Border Transparent Pressed', token: '--ld-semantic-color-action-border-transparent-pressed' },
        { name: 'Border Transparent Disabled', token: '--ld-semantic-color-action-border-transparent-disabled' },

        // Focus States
        { name: 'Focus Outline', token: '--ld-semantic-color-action-focus-outline' },
      ]
    },
    'text-colors': {
      title: 'Text Colors',
      count: 90,
      tokens: [
        // Base Text Colors
        { name: 'Text', token: '--ld-semantic-color-text' },
        { name: 'Text Subtle', token: '--ld-semantic-color-text-subtle' },
        { name: 'Text Subtlest', token: '--ld-semantic-color-text-subtlest' },
        { name: 'Text Inverse (White)', token: '--ld-semantic-color-text-inverse' },
        { name: 'Text Disabled', token: '--ld-semantic-color-text-disabled' },
        { name: 'Text Brand', token: '--ld-semantic-color-text-brand' },
        { name: 'Text Placeholder', token: '--ld-semantic-color-text-placeholder' },

        // Semantic Text Colors
        { name: 'Text Info', token: '--ld-semantic-color-text-info' },
        { name: 'Text Positive', token: '--ld-semantic-color-text-positive' },
        { name: 'Text Negative', token: '--ld-semantic-color-text-negative' },
        { name: 'Text Warning', token: '--ld-semantic-color-text-warning' },
        { name: 'Text Edited', token: '--ld-semantic-color-text-edited' },

        // Text on Fill Colors
        { name: 'Text on Fill Activated', token: '--ld-semantic-color-text-on-fill-activated' },
        { name: 'Text on Fill Activated Subtle', token: '--ld-semantic-color-text-on-fill-activated-subtle' },
        { name: 'Text on Fill Brand', token: '--ld-semantic-color-text-on-fill-brand' },
        { name: 'Text on Fill Info', token: '--ld-semantic-color-text-on-fill-info' },
        { name: 'Text on Fill Positive', token: '--ld-semantic-color-text-on-fill-positive' },
        { name: 'Text on Fill Negative', token: '--ld-semantic-color-text-on-fill-negative' },
        { name: 'Text on Fill Warning', token: '--ld-semantic-color-text-on-fill-warning' },
        { name: 'Text on Fill Edited', token: '--ld-semantic-color-text-on-fill-edited' },

        // Accent Text Colors (Blue)
        { name: 'Text Accent Blue', token: '--ld-semantic-color-text-accent-blue' },
        { name: 'Text Accent Blue Bold', token: '--ld-semantic-color-text-accent-blue-bold' },
        { name: 'Text on Fill Accent Blue', token: '--ld-semantic-color-text-on-fill-accent-blue' },
        { name: 'Text on Fill Accent Blue Subtle', token: '--ld-semantic-color-text-on-fill-accent-blue-subtle' },

        // Accent Text Colors (Cyan)
        { name: 'Text Accent Cyan', token: '--ld-semantic-color-text-accent-cyan' },
        { name: 'Text Accent Cyan Bold', token: '--ld-semantic-color-text-accent-cyan-bold' },
        { name: 'Text on Fill Accent Cyan', token: '--ld-semantic-color-text-on-fill-accent-cyan' },
        { name: 'Text on Fill Accent Cyan Subtle', token: '--ld-semantic-color-text-on-fill-accent-cyan-subtle' },

        // Accent Text Colors (Gray)
        { name: 'Text Accent Gray', token: '--ld-semantic-color-text-accent-gray' },
        { name: 'Text Accent Gray Bold', token: '--ld-semantic-color-text-accent-gray-bold' },
        { name: 'Text on Fill Accent Gray', token: '--ld-semantic-color-text-on-fill-accent-gray' },
        { name: 'Text on Fill Accent Gray Subtle', token: '--ld-semantic-color-text-on-fill-accent-gray-subtle' },

        // Accent Text Colors (Green)
        { name: 'Text Accent Green', token: '--ld-semantic-color-text-accent-green' },
        { name: 'Text Accent Green Bold', token: '--ld-semantic-color-text-accent-green-bold' },
        { name: 'Text on Fill Accent Green', token: '--ld-semantic-color-text-on-fill-accent-green' },
        { name: 'Text on Fill Accent Green Subtle', token: '--ld-semantic-color-text-on-fill-accent-green-subtle' },

        // Accent Text Colors (Orange)
        { name: 'Text Accent Orange', token: '--ld-semantic-color-text-accent-orange' },
        { name: 'Text Accent Orange Bold', token: '--ld-semantic-color-text-accent-orange-bold' },
        { name: 'Text on Fill Accent Orange', token: '--ld-semantic-color-text-on-fill-accent-orange' },
        { name: 'Text on Fill Accent Orange Subtle', token: '--ld-semantic-color-text-on-fill-accent-orange-subtle' },

        // Accent Text Colors (Pink)
        { name: 'Text Accent Pink', token: '--ld-semantic-color-text-accent-pink' },
        { name: 'Text Accent Pink Bold', token: '--ld-semantic-color-text-accent-pink-bold' },
        { name: 'Text on Fill Accent Pink', token: '--ld-semantic-color-text-on-fill-accent-pink' },
        { name: 'Text on Fill Accent Pink Subtle', token: '--ld-semantic-color-text-on-fill-accent-pink-subtle' },

        // Accent Text Colors (Purple)
        { name: 'Text Accent Purple', token: '--ld-semantic-color-text-accent-purple' },
        { name: 'Text Accent Purple Bold', token: '--ld-semantic-color-text-accent-purple-bold' },
        { name: 'Text on Fill Accent Purple', token: '--ld-semantic-color-text-on-fill-accent-purple' },
        { name: 'Text on Fill Accent Purple Subtle', token: '--ld-semantic-color-text-on-fill-accent-purple-subtle' },

        // Accent Text Colors (Red)
        { name: 'Text Accent Red', token: '--ld-semantic-color-text-accent-red' },
        { name: 'Text Accent Red Bold', token: '--ld-semantic-color-text-accent-red-bold' },
        { name: 'Text on Fill Accent Red', token: '--ld-semantic-color-text-on-fill-accent-red' },
        { name: 'Text on Fill Accent Red Subtle', token: '--ld-semantic-color-text-on-fill-accent-red-subtle' },

        // Accent Text Colors (Spark)
        { name: 'Text Accent Spark', token: '--ld-semantic-color-text-accent-spark' },
        { name: 'Text Accent Spark Bold', token: '--ld-semantic-color-text-accent-spark-bold' },
        { name: 'Text on Fill Accent Spark', token: '--ld-semantic-color-text-on-fill-accent-spark' },
        { name: 'Text on Fill Accent Spark Subtle', token: '--ld-semantic-color-text-on-fill-accent-spark-subtle' },

        // Accent Text Colors (Teal)
        { name: 'Text Accent Teal', token: '--ld-semantic-color-text-accent-teal' },
        { name: 'Text Accent Teal Bold', token: '--ld-semantic-color-text-accent-teal-bold' },
        { name: 'Text on Fill Accent Teal', token: '--ld-semantic-color-text-on-fill-accent-teal' },
        { name: 'Text on Fill Accent Teal Subtle', token: '--ld-semantic-color-text-on-fill-accent-teal-subtle' },

        // Accent Text Colors (Yellow)
        { name: 'Text Accent Yellow', token: '--ld-semantic-color-text-accent-yellow' },
        { name: 'Text Accent Yellow Bold', token: '--ld-semantic-color-text-accent-yellow-bold' },
        { name: 'Text on Fill Accent Yellow', token: '--ld-semantic-color-text-on-fill-accent-yellow' },
        { name: 'Text on Fill Accent Yellow Subtle', token: '--ld-semantic-color-text-on-fill-accent-yellow-subtle' },

        // Link Text Colors
        { name: 'Link Text', token: '--ld-semantic-color-link-text' },
        { name: 'Link Text Hovered', token: '--ld-semantic-color-link-text-hovered' },
        { name: 'Link Text Focused', token: '--ld-semantic-color-link-text-focused' },
        { name: 'Link Text Pressed', token: '--ld-semantic-color-link-text-pressed' },
        { name: 'Link Text Disabled', token: '--ld-semantic-color-link-text-disabled' },
        { name: 'Link Text Subtle', token: '--ld-semantic-color-link-text-subtle' },
        { name: 'Link Text Subtle Hovered', token: '--ld-semantic-color-link-text-subtle-hovered' },
        { name: 'Link Text Subtle Focused', token: '--ld-semantic-color-link-text-subtle-focused' },
        { name: 'Link Text Subtle Pressed', token: '--ld-semantic-color-link-text-subtle-pressed' },
        { name: 'Link Text Subtle Disabled', token: '--ld-semantic-color-link-text-subtle-disabled' },
      ]
    },
    'fill-colors': {
      title: 'Fill/Background Colors',
      count: 53,
      tokens: [
        // Base Fill Colors
        { name: 'Fill (White)', token: '--ld-semantic-color-fill' },
        { name: 'Fill Subtle', token: '--ld-semantic-color-fill-subtle' },
        { name: 'Fill Hovered', token: '--ld-semantic-color-fill-hovered' },
        { name: 'Fill Focused', token: '--ld-semantic-color-fill-focused' },
        { name: 'Fill Pressed', token: '--ld-semantic-color-fill-pressed' },
        { name: 'Fill Disabled', token: '--ld-semantic-color-fill-disabled' },
        { name: 'Fill Transparent', token: '--ld-semantic-color-fill-transparent' },

        // Activated State
        { name: 'Fill Activated', token: '--ld-semantic-color-fill-activated' },
        { name: 'Fill Activated Hovered', token: '--ld-semantic-color-fill-activated-hovered' },
        { name: 'Fill Activated Focused', token: '--ld-semantic-color-fill-activated-focused' },
        { name: 'Fill Activated Pressed', token: '--ld-semantic-color-fill-activated-pressed' },
        { name: 'Fill Activated Disabled', token: '--ld-semantic-color-fill-activated-disabled' },
        { name: 'Fill Activated Subtle', token: '--ld-semantic-color-fill-activated-subtle' },
        { name: 'Fill Activated Subtle Hovered', token: '--ld-semantic-color-fill-activated-subtle-hovered' },
        { name: 'Fill Activated Subtle Focused', token: '--ld-semantic-color-fill-activated-subtle-focused' },
        { name: 'Fill Activated Subtle Pressed', token: '--ld-semantic-color-fill-activated-subtle-pressed' },
        { name: 'Fill Activated Subtle Disabled', token: '--ld-semantic-color-fill-activated-subtle-disabled' },

        // Semantic Colors
        { name: 'Fill Brand', token: '--ld-semantic-color-fill-brand' },
        { name: 'Fill Brand Bold', token: '--ld-semantic-color-fill-brand-bold' },
        { name: 'Fill Brand Subtle', token: '--ld-semantic-color-fill-brand-subtle' },
        { name: 'Fill Info', token: '--ld-semantic-color-fill-info' },
        { name: 'Fill Info Subtle', token: '--ld-semantic-color-fill-info-subtle' },
        { name: 'Fill Positive', token: '--ld-semantic-color-fill-positive' },
        { name: 'Fill Positive Subtle', token: '--ld-semantic-color-fill-positive-subtle' },
        { name: 'Fill Negative', token: '--ld-semantic-color-fill-negative' },
        { name: 'Fill Negative Subtle', token: '--ld-semantic-color-fill-negative-subtle' },
        { name: 'Fill Warning', token: '--ld-semantic-color-fill-warning' },
        { name: 'Fill Warning Subtle', token: '--ld-semantic-color-fill-warning-subtle' },
        { name: 'Fill Edited', token: '--ld-semantic-color-fill-edited' },
        { name: 'Fill Edited Subtle', token: '--ld-semantic-color-fill-edited-subtle' },
        { name: 'Fill Inverse', token: '--ld-semantic-color-fill-inverse' },

        // Accent Colors
        { name: 'Fill Accent Blue', token: '--ld-semantic-color-fill-accent-blue' },
        { name: 'Fill Accent Blue Subtle', token: '--ld-semantic-color-fill-accent-blue-subtle' },
        { name: 'Fill Accent Cyan', token: '--ld-semantic-color-fill-accent-cyan' },
        { name: 'Fill Accent Cyan Subtle', token: '--ld-semantic-color-fill-accent-cyan-subtle' },
        { name: 'Fill Accent Gray', token: '--ld-semantic-color-fill-accent-gray' },
        { name: 'Fill Accent Gray Subtle', token: '--ld-semantic-color-fill-accent-gray-subtle' },
        { name: 'Fill Accent Green', token: '--ld-semantic-color-fill-accent-green' },
        { name: 'Fill Accent Green Subtle', token: '--ld-semantic-color-fill-accent-green-subtle' },
        { name: 'Fill Accent Orange', token: '--ld-semantic-color-fill-accent-orange' },
        { name: 'Fill Accent Orange Subtle', token: '--ld-semantic-color-fill-accent-orange-subtle' },
        { name: 'Fill Accent Pink', token: '--ld-semantic-color-fill-accent-pink' },
        { name: 'Fill Accent Pink Subtle', token: '--ld-semantic-color-fill-accent-pink-subtle' },
        { name: 'Fill Accent Purple', token: '--ld-semantic-color-fill-accent-purple' },
        { name: 'Fill Accent Purple Subtle', token: '--ld-semantic-color-fill-accent-purple-subtle' },
        { name: 'Fill Accent Red', token: '--ld-semantic-color-fill-accent-red' },
        { name: 'Fill Accent Red Subtle', token: '--ld-semantic-color-fill-accent-red-subtle' },
        { name: 'Fill Accent Spark', token: '--ld-semantic-color-fill-accent-spark' },
        { name: 'Fill Accent Spark Subtle', token: '--ld-semantic-color-fill-accent-spark-subtle' },
        { name: 'Fill Accent Teal', token: '--ld-semantic-color-fill-accent-teal' },
        { name: 'Fill Accent Teal Subtle', token: '--ld-semantic-color-fill-accent-teal-subtle' },
        { name: 'Fill Accent Yellow', token: '--ld-semantic-color-fill-accent-yellow' },
        { name: 'Fill Accent Yellow Subtle', token: '--ld-semantic-color-fill-accent-yellow-subtle' },
      ]
    },
    'border-colors': {
      title: 'Border & Separator Colors',
      count: 44,
      tokens: [
        // Base Borders
        { name: 'Border', token: '--ld-semantic-color-border' },
        { name: 'Border Subtle', token: '--ld-semantic-color-border-subtle' },
        { name: 'Border Subtlest', token: '--ld-semantic-color-border-subtlest' },
        { name: 'Border Strong', token: '--ld-semantic-color-border-strong' },
        { name: 'Separator', token: '--ld-semantic-color-separator' },
        { name: 'Border Inverse', token: '--ld-semantic-color-border-inverse' },
        { name: 'Border Disabled', token: '--ld-semantic-color-border-disabled' },
        { name: 'Border Focus', token: '--ld-semantic-color-border-focus' },
        { name: 'Border Selected', token: '--ld-semantic-color-border-selected' },

        // Semantic Borders
        { name: 'Border Brand', token: '--ld-semantic-color-border-brand' },
        { name: 'Border Info', token: '--ld-semantic-color-border-info' },
        { name: 'Border Positive', token: '--ld-semantic-color-border-positive' },
        { name: 'Border Negative', token: '--ld-semantic-color-border-negative' },
        { name: 'Border Warning', token: '--ld-semantic-color-border-warning' },
        { name: 'Border Edited', token: '--ld-semantic-color-border-edited' },

        // Accent Borders (Blue)
        { name: 'Border Accent Blue', token: '--ld-semantic-color-border-accent-blue' },
        { name: 'Border Accent Blue Subtle', token: '--ld-semantic-color-border-accent-blue-subtle' },

        // Accent Borders (Cyan)
        { name: 'Border Accent Cyan', token: '--ld-semantic-color-border-accent-cyan' },
        { name: 'Border Accent Cyan Subtle', token: '--ld-semantic-color-border-accent-cyan-subtle' },

        // Accent Borders (Gray)
        { name: 'Border Accent Gray', token: '--ld-semantic-color-border-accent-gray' },
        { name: 'Border Accent Gray Subtle', token: '--ld-semantic-color-border-accent-gray-subtle' },

        // Accent Borders (Green)
        { name: 'Border Accent Green', token: '--ld-semantic-color-border-accent-green' },
        { name: 'Border Accent Green Subtle', token: '--ld-semantic-color-border-accent-green-subtle' },

        // Accent Borders (Orange)
        { name: 'Border Accent Orange', token: '--ld-semantic-color-border-accent-orange' },
        { name: 'Border Accent Orange Subtle', token: '--ld-semantic-color-border-accent-orange-subtle' },

        // Accent Borders (Pink)
        { name: 'Border Accent Pink', token: '--ld-semantic-color-border-accent-pink' },
        { name: 'Border Accent Pink Subtle', token: '--ld-semantic-color-border-accent-pink-subtle' },

        // Accent Borders (Purple)
        { name: 'Border Accent Purple', token: '--ld-semantic-color-border-accent-purple' },
        { name: 'Border Accent Purple Subtle', token: '--ld-semantic-color-border-accent-purple-subtle' },

        // Accent Borders (Red)
        { name: 'Border Accent Red', token: '--ld-semantic-color-border-accent-red' },
        { name: 'Border Accent Red Subtle', token: '--ld-semantic-color-border-accent-red-subtle' },

        // Accent Borders (Spark)
        { name: 'Border Accent Spark', token: '--ld-semantic-color-border-accent-spark' },
        { name: 'Border Accent Spark Subtle', token: '--ld-semantic-color-border-accent-spark-subtle' },

        // Accent Borders (Teal)
        { name: 'Border Accent Teal', token: '--ld-semantic-color-border-accent-teal' },
        { name: 'Border Accent Teal Subtle', token: '--ld-semantic-color-border-accent-teal-subtle' },

        // Accent Borders (Yellow)
        { name: 'Border Accent Yellow', token: '--ld-semantic-color-border-accent-yellow' },
        { name: 'Border Accent Yellow Subtle', token: '--ld-semantic-color-border-accent-yellow-subtle' },
      ]
    },
    'surface-colors': {
      title: 'Surface & Elevation Colors',
      count: 19,
      tokens: [
        // Background Colors
        { name: 'Background', token: '--ld-semantic-color-background' },
        { name: 'Background Subtle', token: '--ld-semantic-color-background-subtle' },
        { name: 'Background Inverse', token: '--ld-semantic-color-background-inverse' },

        // Surface Colors
        { name: 'Surface (Cards, Modals)', token: '--ld-semantic-color-surface' },
        { name: 'Surface Subtle', token: '--ld-semantic-color-surface-subtle' },
        { name: 'Surface Hovered', token: '--ld-semantic-color-surface-hovered' },
        { name: 'Surface Focused', token: '--ld-semantic-color-surface-focused' },
        { name: 'Surface Pressed', token: '--ld-semantic-color-surface-pressed' },
        { name: 'Surface Subtle Hovered', token: '--ld-semantic-color-surface-subtle-hovered' },
        { name: 'Surface Subtle Focused', token: '--ld-semantic-color-surface-subtle-focused' },
        { name: 'Surface Subtle Pressed', token: '--ld-semantic-color-surface-subtle-pressed' },
        { name: 'Surface Activated', token: '--ld-semantic-color-surface-activated' },
        { name: 'Surface Activated Hovered', token: '--ld-semantic-color-surface-activated-hovered' },
        { name: 'Surface Activated Focused', token: '--ld-semantic-color-surface-activated-focused' },
        { name: 'Surface Activated Pressed', token: '--ld-semantic-color-surface-activated-pressed' },
        { name: 'Surface Brand', token: '--ld-semantic-color-surface-brand' },
        { name: 'Surface Overlay', token: '--ld-semantic-color-surface-overlay' },
        { name: 'Surface Overlay Inverse', token: '--ld-semantic-color-surface-overlay-inverse' },
        { name: 'Surface Overlay Brand Subtle', token: '--ld-semantic-color-surface-overlay-brand-subtle' },
      ]
    },
    'spacing': {
      title: 'Spacing Scale',
      count: 29,
      tokens: [
        // Base Spacing Scale
        { name: 'Spacing 25 (2px)', token: '--ld-semantic-spacing-25', value: '0.125rem' },
        { name: 'Spacing 50 (4px)', token: '--ld-semantic-spacing-50', value: '0.25rem' },
        { name: 'Spacing 100 (8px)', token: '--ld-semantic-spacing-100', value: '0.5rem' },
        { name: 'Spacing 150 (12px)', token: '--ld-semantic-spacing-150', value: '0.75rem' },
        { name: 'Spacing 200 (16px)', token: '--ld-semantic-spacing-200', value: '1rem' },
        { name: 'Spacing 250 (20px)', token: '--ld-semantic-spacing-250', value: '1.25rem' },
        { name: 'Spacing 300 (24px)', token: '--ld-semantic-spacing-300', value: '1.5rem' },
        { name: 'Spacing 400 (32px)', token: '--ld-semantic-spacing-400', value: '2rem' },
        { name: 'Spacing 500 (40px)', token: '--ld-semantic-spacing-500', value: '2.5rem' },
        { name: 'Spacing 600 (48px)', token: '--ld-semantic-spacing-600', value: '3rem' },
        { name: 'Spacing 700 (56px)', token: '--ld-semantic-spacing-700', value: '3.5rem' },
        { name: 'Spacing 800 (64px)', token: '--ld-semantic-spacing-800', value: '4rem' },
        { name: 'Spacing 900 (72px)', token: '--ld-semantic-spacing-900', value: '4.5rem' },
        { name: 'Spacing 1000 (80px)', token: '--ld-semantic-spacing-1000', value: '5rem' },

        // Component Spacing
        { name: 'Component Padding Small', token: '--ld-semantic-spacing-component-padding-small' },
        { name: 'Component Padding Medium', token: '--ld-semantic-spacing-component-padding-medium' },
        { name: 'Component Padding Large', token: '--ld-semantic-spacing-component-padding-large' },
        { name: 'Component Gap Small', token: '--ld-semantic-spacing-component-gap-small' },
        { name: 'Component Gap Medium', token: '--ld-semantic-spacing-component-gap-medium' },
        { name: 'Component Gap Large', token: '--ld-semantic-spacing-component-gap-large' },

        // Layout Spacing
        { name: 'Layout Margin Small', token: '--ld-semantic-spacing-layout-margin-small' },
        { name: 'Layout Margin Medium', token: '--ld-semantic-spacing-layout-margin-medium' },
        { name: 'Layout Margin Large', token: '--ld-semantic-spacing-layout-margin-large' },
        { name: 'Layout Padding Small', token: '--ld-semantic-spacing-layout-padding-small' },
        { name: 'Layout Padding Medium', token: '--ld-semantic-spacing-layout-padding-medium' },
        { name: 'Layout Padding Large', token: '--ld-semantic-spacing-layout-padding-large' },
        { name: 'Section Gap Small', token: '--ld-semantic-spacing-section-gap-small' },
        { name: 'Section Gap Medium', token: '--ld-semantic-spacing-section-gap-medium' },
        { name: 'Section Gap Large', token: '--ld-semantic-spacing-section-gap-large' },
      ]
    },
    'typography': {
      title: 'Typography Tokens',
      count: 62,
      tokens: [
        // Font Families
        { name: 'Font Family Sans', token: '--ld-semantic-font-family-sans', value: 'EverydaySans' },
        { name: 'Font Family Mono', token: '--ld-semantic-font-family-mono', value: 'EverydaySansMono' },
        { name: 'Action Font Weight', token: '--ld-semantic-font-action-weight', value: '700' },

        // Body Large
        { name: 'Body Large Family', token: '--ld-semantic-font-body-large-family' },
        { name: 'Body Large Size', token: '--ld-semantic-font-body-large-size', value: '1.125rem' },
        { name: 'Body Large Line Height', token: '--ld-semantic-font-body-large-line-height' },
        { name: 'Body Large Weight Default', token: '--ld-semantic-font-body-large-weight-default' },
        { name: 'Body Large Weight Alt', token: '--ld-semantic-font-body-large-weight-alt' },

        // Body Medium
        { name: 'Body Medium Family', token: '--ld-semantic-font-body-medium-family' },
        { name: 'Body Medium Size', token: '--ld-semantic-font-body-medium-size', value: '1rem' },
        { name: 'Body Medium Line Height', token: '--ld-semantic-font-body-medium-line-height' },
        { name: 'Body Medium Weight Default', token: '--ld-semantic-font-body-medium-weight-default' },
        { name: 'Body Medium Weight Alt', token: '--ld-semantic-font-body-medium-weight-alt' },

        // Body Small
        { name: 'Body Small Family', token: '--ld-semantic-font-body-small-family' },
        { name: 'Body Small Size', token: '--ld-semantic-font-body-small-size', value: '0.875rem' },
        { name: 'Body Small Line Height', token: '--ld-semantic-font-body-small-line-height' },
        { name: 'Body Small Weight Default', token: '--ld-semantic-font-body-small-weight-default' },
        { name: 'Body Small Weight Alt', token: '--ld-semantic-font-body-small-weight-alt' },

        // Heading Large
        { name: 'Heading Large Family', token: '--ld-semantic-font-heading-large-family' },
        { name: 'Heading Large Size (Small)', token: '--ld-semantic-font-heading-large-size-b-s', value: '1.5rem' },
        { name: 'Heading Large Size (Large)', token: '--ld-semantic-font-heading-large-size-b-l' },
        { name: 'Heading Large Line Height (Small)', token: '--ld-semantic-font-heading-large-line-height-b-s' },
        { name: 'Heading Large Line Height (Large)', token: '--ld-semantic-font-heading-large-line-height-b-l' },
        { name: 'Heading Large Weight', token: '--ld-semantic-font-heading-large-weight-default' },

        // Heading Medium
        { name: 'Heading Medium Family', token: '--ld-semantic-font-heading-medium-family' },
        { name: 'Heading Medium Size (Small)', token: '--ld-semantic-font-heading-medium-size-b-s', value: '1.25rem' },
        { name: 'Heading Medium Size (Large)', token: '--ld-semantic-font-heading-medium-size-b-l' },
        { name: 'Heading Medium Line Height (Small)', token: '--ld-semantic-font-heading-medium-line-height-b-s' },
        { name: 'Heading Medium Line Height (Large)', token: '--ld-semantic-font-heading-medium-line-height-b-l' },
        { name: 'Heading Medium Weight', token: '--ld-semantic-font-heading-medium-weight-default' },

        // Heading Small
        { name: 'Heading Small Family', token: '--ld-semantic-font-heading-small-family' },
        { name: 'Heading Small Size', token: '--ld-semantic-font-heading-small-size' },
        { name: 'Heading Small Line Height', token: '--ld-semantic-font-heading-small-line-height' },
        { name: 'Heading Small Weight', token: '--ld-semantic-font-heading-small-weight-default' },

        // Caption
        { name: 'Caption Family', token: '--ld-semantic-font-caption-family' },
        { name: 'Caption Size', token: '--ld-semantic-font-caption-size', value: '0.75rem' },
        { name: 'Caption Line Height', token: '--ld-semantic-font-caption-line-height' },
        { name: 'Caption Weight Default', token: '--ld-semantic-font-caption-weight-default' },
        { name: 'Caption Weight Alt', token: '--ld-semantic-font-caption-weight-alt' },
        { name: 'Caption Mono Family', token: '--ld-semantic-font-caption-mono-family' },

        // Label Large
        { name: 'Label Large Family', token: '--ld-semantic-font-label-large-family' },
        { name: 'Label Large Size', token: '--ld-semantic-font-label-large-size' },
        { name: 'Label Large Line Height', token: '--ld-semantic-font-label-large-line-height' },
        { name: 'Label Large Weight', token: '--ld-semantic-font-label-large-weight-default' },

        // Label Medium
        { name: 'Label Medium Family', token: '--ld-semantic-font-label-medium-family' },
        { name: 'Label Medium Size', token: '--ld-semantic-font-label-medium-size' },
        { name: 'Label Medium Line Height', token: '--ld-semantic-font-label-medium-line-height' },
        { name: 'Label Medium Weight', token: '--ld-semantic-font-label-medium-weight-default' },
      ]
    },
    'border-radius': {
      title: 'Border Radius',
      count: 14,
      tokens: [
        { name: 'Small (2px)', token: '--ld-semantic-border-radius-small', value: '0.125rem' },
        { name: 'Medium (4px)', token: '--ld-semantic-border-radius-medium', value: '0.25rem' },
        { name: 'Large (8px)', token: '--ld-semantic-border-radius-large', value: '0.5rem' },
        { name: 'XLarge (12px)', token: '--ld-semantic-border-radius-xlarge', value: '0.75rem' },
        { name: 'XXLarge (16px)', token: '--ld-semantic-border-radius-xxlarge', value: '1rem' },
        { name: 'XXXLarge (24px)', token: '--ld-semantic-border-radius-xxxlarge', value: '1.5rem' },
        { name: 'Round (Pill)', token: '--ld-semantic-border-radius-round', value: '62.5rem' },
        { name: 'Button (Pill)', token: '--ld-semantic-border-radius-button', value: '62.5rem' },
        { name: 'Card', token: '--ld-semantic-border-radius-card', value: '0.5rem' },
        { name: 'Input', token: '--ld-semantic-border-radius-input', value: '0.25rem' },
        { name: 'Modal', token: '--ld-semantic-border-radius-modal', value: '0.5rem' },
        { name: 'Popover', token: '--ld-semantic-border-radius-popover', value: '0.5rem' },
        { name: 'Tag', token: '--ld-semantic-border-radius-tag', value: '62.5rem' },
        { name: 'Badge', token: '--ld-semantic-border-radius-badge', value: '62.5rem' },
      ]
    },
    'elevation': {
      title: 'Elevation/Shadow Tokens',
      count: 3,
      tokens: [
        { name: 'Elevation 100 (Subtle)', token: '--ld-semantic-elevation-100', value: 'box-shadow' },
        { name: 'Elevation 200 (Medium)', token: '--ld-semantic-elevation-200', value: 'box-shadow' },
        { name: 'Elevation 300 (High)', token: '--ld-semantic-elevation-300', value: 'box-shadow' },
      ]
    },
    'duration': {
      title: 'Animation Duration',
      count: 21,
      tokens: [
        // Base Durations
        { name: 'Instant (100ms)', token: '--ld-semantic-duration-instant', value: '0.10s' },
        { name: 'Fast (200ms)', token: '--ld-semantic-duration-fast', value: '0.20s' },
        { name: 'Medium (300ms)', token: '--ld-semantic-duration-medium', value: '0.30s' },
        { name: 'Slow (400ms)', token: '--ld-semantic-duration-slow', value: '0.40s' },
        { name: 'Slower (500ms)', token: '--ld-semantic-duration-slower', value: '0.50s' },
        { name: 'Slowest (600ms)', token: '--ld-semantic-duration-slowest', value: '0.60s' },
        { name: 'Glacial (1000ms)', token: '--ld-semantic-duration-glacial', value: '1.00s' },

        // Button Animations
        { name: 'Button Hover', token: '--ld-semantic-duration-button-hover', value: '0.20s' },
        { name: 'Button Press', token: '--ld-semantic-duration-button-press', value: '0.10s' },

        // Modal Animations
        { name: 'Modal Open', token: '--ld-semantic-duration-modal-open', value: '0.30s' },
        { name: 'Modal Close', token: '--ld-semantic-duration-modal-close', value: '0.20s' },

        // Popover Animations
        { name: 'Popover Open', token: '--ld-semantic-duration-popover-open', value: '0.20s' },
        { name: 'Popover Close', token: '--ld-semantic-duration-popover-close', value: '0.15s' },

        // Tooltip Animations
        { name: 'Tooltip Show', token: '--ld-semantic-duration-tooltip-show', value: '0.15s' },
        { name: 'Tooltip Hide', token: '--ld-semantic-duration-tooltip-hide', value: '0.10s' },

        // Dropdown Animations
        { name: 'Dropdown Open', token: '--ld-semantic-duration-dropdown-open', value: '0.20s' },
        { name: 'Dropdown Close', token: '--ld-semantic-duration-dropdown-close', value: '0.15s' },

        // Fade Animations
        { name: 'Fade In', token: '--ld-semantic-duration-fade-in', value: '0.30s' },
        { name: 'Fade Out', token: '--ld-semantic-duration-fade-out', value: '0.20s' },

        // Slide Animations
        { name: 'Slide In', token: '--ld-semantic-duration-slide-in', value: '0.30s' },
        { name: 'Slide Out', token: '--ld-semantic-duration-slide-out', value: '0.20s' },
      ]
    },
  };

  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      borderRadius: 'var(--ld-semantic-border-radius-large)',
      overflow: 'hidden',
      boxShadow: 'var(--ld-semantic-elevation-100)'
    }}>
      {Object.entries(tokenGroups).map(([key, group]) => (
        <CollapsibleTokenGroup
          key={key}
          title={group.title}
          count={group.count}
          tokens={group.tokens}
          isExpanded={expandedSections[key]}
          onToggle={() => toggleSection(key)}
        />
      ))}
    </div>
  );
}

interface TokenItem {
  name: string;
  token: string;
  value?: string;
}

interface CollapsibleTokenGroupProps {
  title: string;
  count: number;
  tokens: TokenItem[];
  isExpanded: boolean;
  onToggle: () => void;
}

function CollapsibleTokenGroup({ title, count, tokens, isExpanded, onToggle }: CollapsibleTokenGroupProps) {
  const ChevronDown = (Icons as any).ChevronDown;

  return (
    <div style={{ borderBottom: '1px solid var(--ld-semantic-color-separator)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--ld-semantic-spacing-200) var(--ld-semantic-spacing-300)',
          backgroundColor: isExpanded ? 'var(--ld-semantic-color-fill-subtle)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}
        onMouseEnter={(e) => {
          if (!isExpanded) {
            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-hovered)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isExpanded) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--ld-semantic-color-text)',
            margin: 0
          }}>
            {title}
          </h3>
          <span style={{
            fontSize: '12px',
            color: 'var(--ld-semantic-color-text-subtle)',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            padding: '2px 8px',
            borderRadius: 'var(--ld-semantic-border-radius-round)',
            fontWeight: 600
          }}>
            {count} tokens
          </span>
        </div>
        <div style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          <ChevronDown style={{ width: 20, height: 20 }} />
        </div>
      </button>

      {isExpanded && (
        <div style={{
          padding: 'var(--ld-semantic-spacing-300)',
          backgroundColor: 'var(--ld-semantic-color-background-subtle)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--ld-semantic-spacing-200)'
          }}>
            {tokens.map((item) => (
              <TokenSwatch key={item.token} {...item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface TokenSwatchProps {
  name: string;
  token: string;
  value?: string;
}

function TokenSwatch({ name, token, value }: TokenSwatchProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isColorToken = token.includes('color');

  return (
    <div
      onClick={handleCopy}
      style={{
        padding: 'var(--ld-semantic-spacing-150)',
        backgroundColor: 'var(--ld-semantic-color-surface)',
        borderRadius: 'var(--ld-semantic-border-radius-medium)',
        border: '1px solid var(--ld-semantic-color-border-subtlest)',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-brand)';
        e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-100)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-subtlest)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {isColorToken && (
        <div style={{
          width: '100%',
          height: '60px',
          backgroundColor: `var(${token})`,
          borderRadius: 'var(--ld-semantic-border-radius-small)',
          border: '1px solid var(--ld-semantic-color-separator)',
          marginBottom: 'var(--ld-semantic-spacing-100)'
        }} />
      )}
      <div style={{
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '4px'
      }}>
        {name}
      </div>
      <div style={{
        fontSize: '10px',
        color: 'var(--ld-semantic-color-text-subtle)',
        fontFamily: 'var(--ld-semantic-font-family-mono)',
        wordBreak: 'break-all',
        lineHeight: '1.4'
      }}>
        {copied ? '✓ Copied!' : token}
      </div>
      {value && (
        <div style={{
          fontSize: '10px',
          color: 'var(--ld-semantic-color-text-subtlest)',
          marginTop: '4px',
          fontFamily: 'var(--ld-semantic-font-family-mono)'
        }}>
          {value}
        </div>
      )}
    </div>
  );
}

interface IconShowcaseProps {
  icon: React.ReactNode;
  name: string;
}

function IconShowcase({ icon, name }: IconShowcaseProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleCopy}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--ld-primitive-scale-space-150)',
        padding: 'var(--ld-primitive-scale-space-200)',
        backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
        borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
        border: `1px solid transparent`,
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-brand)';
        e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-brand-subtle)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-subtle)';
      }}
    >
      <div style={{
        color: 'var(--ld-semantic-color-text)',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {React.cloneElement(icon as React.ReactElement, {
          style: { width: '24px', height: '24px' }
        })}
      </div>
      <div style={{
        fontSize: '11px',
        color: 'var(--ld-semantic-color-text-subtlest)',
        textAlign: 'center',
        fontFamily: 'var(--ld-semantic-font-family-mono)',
        wordBreak: 'break-word'
      }}>
        {copied ? '✓ Copied!' : name}
      </div>
    </div>
  );
}
