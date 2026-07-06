import React from 'react';
import * as Icons from '@/components/icons';
import { PageHeader } from '@/components/ui/PageHeader';

// Organize icons by category (same as original ComponentLibrary)
const iconCategories = {
  'Navigation & Arrows': [
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    'ArrowUpDown', 'ArrowUpLeft', 'ArrowUpRight',
    'ArrowDownLeft', 'ArrowDownRight', 'ChevronUp',
    'ChevronDown', 'ChevronLeft', 'ChevronRight',
    'ExpandLess', 'ExpandMore', 'CaretDown', 'CaretUp',
    'Home', 'HomeFill', 'External'
  ],
  'Actions & Controls': [
    'Plus', 'Minus', 'Close', 'Check', 'X',
    'Edit', 'Trash', 'Copy', 'Duplicate', 'Download',
    'Upload', 'Save', 'Refresh', 'Undo', 'Redo',
    'Settings', 'SettingsFill', 'More', 'MoreVertical',
    'Kebab', 'Play', 'PlayFill', 'Pause', 'PauseFill',
    'Stop', 'StopFill', 'Previous', 'Next', 'Replay',
    'Pin', 'PinFill', 'Unpin'
  ],
  'Communication': [
    'Mail', 'MailFill', 'Send', 'Phone', 'PhoneFill',
    'Chat', 'ChatFill', 'Message', 'MessageFill',
    'MessageSquare', 'MessageSquareFill', 'Bell',
    'BellFill', 'Announcement'
  ],
  'Content & Files': [
    'File', 'FileFill', 'FileText', 'FileTextFill',
    'Folder', 'FolderFill', 'FolderOpen', 'Image',
    'ImageFill', 'Video', 'VideoFill', 'Attachment',
    'Paperclip', 'Document'
  ],
  'UI Elements': [
    'Search', 'Filter', 'FilterFill', 'SortUp', 'SortDown',
    'SortingArrows', 'Columns', 'Eye', 'EyeSlash',
    'Lock', 'LockFill', 'Unlock', 'UnlockFill',
    'Menu', 'Grid', 'GridFill', 'List', 'BulletList',
    'Maximize', 'Minimize', 'Fullscreen', 'ExitFullscreen'
  ],
  'Status & Alerts': [
    'Info', 'InfoFill', 'Warning', 'WarningFill',
    'Error', 'ErrorFill', 'Success', 'SuccessFill',
    'Help', 'HelpFill', 'AlertCircle', 'AlertCircleFill',
    'AlertTriangle', 'AlertTriangleFill', 'CheckCircle',
    'CheckCircleFill', 'XCircle', 'XCircleFill'
  ],
  'Users & People': [
    'User', 'UserFill', 'Users', 'UsersFill',
    'UserCircle', 'UserCircleFill', 'UserPlus',
    'UserMinus', 'UserCheck', 'UserX'
  ],
  'Business & Commerce': [
    'Cart', 'CartFill', 'Store', 'StoreFill',
    'Tag', 'TagFill', 'Barcode', 'BarcodeFill',
    'CreditCard', 'CreditCardFill', 'Dollar',
    'DollarCircle', 'DollarCircleFill', 'Percent',
    'PercentCircle', 'Wallet', 'WalletFill',
    'Receipt', 'ReceiptFill', 'TrendingUp', 'TrendingDown',
    'PieChart', 'PieChartFill', 'BarChart', 'BarChartFill',
    'LineChart', 'LineChartFill'
  ],
  'Time & Calendar': [
    'Calendar', 'CalendarFill', 'Clock', 'ClockFill',
    'Timer', 'Stopwatch', 'Hourglass'
  ],
  'Location & Map': [
    'Map', 'MapFill', 'MapPin', 'MapPinFill',
    'Navigation', 'NavigationFill', 'Compass',
    'CompassFill', 'Globe', 'GlobeFill'
  ],
  'Advertising Specific': [
    'Campaign', 'CampaignFill', 'Keyword', 'KeywordFill',
    'Ads', 'AdsFill', 'Sponsored', 'SponsoredFill',
    'SponsoredBrandsCard', 'SponsoredProductsCard', 'SponsoredVideosCard',
    'SGShareImpact', 'CardsHashtag', 'CardsStar',
    'Megaphone', 'MegaphoneFill', 'TargetArrow', 'TargetArrowFill'
  ],
  'Miscellaneous': [
    'Dot', 'Circle', 'Square', 'Star', 'StarFill',
    'Heart', 'HeartFill', 'Bookmark', 'BookmarkFill',
    'Share', 'ShareFill', 'Link', 'LinkExternal',
    'Brackets', 'BoldText', 'Placeholder', 'AppSwitcher',
    'Shuffle', 'Trophy', 'Medal', 'Rocket', 'RocketFill',
    'LightBulb', 'Flash', 'FlashFill', 'FlashSlash',
    'Flames', 'FuelPump', 'Bug', 'Dropper',
    'ConnectLogo', 'Mortarboard', 'Sparkles', 'Palette',
    'Target'
  ]
};

export default function IconsPage() {
  const totalIconCount = Object.values(iconCategories).flat().length;

  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section="Components" title="Icons" description={`Complete icon library with ${totalIconCount}+ React components organized by category. All icons support customizable size and color properties.`} />

      {Object.entries(iconCategories).map(([category, iconNames]) => (
        <div
          key={category}
          style={{
            backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            marginBottom: '24px'
          }}
        >
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
          }}>
            {category}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '16px'
          }}>
            {iconNames.map((iconName) => {
              const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ size?: number }>;
              if (!IconComponent) return null;

              return (
                <div
                  key={iconName}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    border: '1px solid var(--ld-semantic-color-border-subtle, #F0F0F1)',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-surface-secondary, #F7F7F8)';
                    e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-moderate, #E6E6E8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-subtle, #F0F0F1)';
                  }}
                >
                  <IconComponent size={32} />
                  <span style={{
                    marginTop: '12px',
                    fontSize: '12px',
                    color: 'var(--ld-semantic-color-text-secondary, #74767C)',
                    textAlign: 'center',
                    wordBreak: 'break-word'
                  }}>
                    {iconName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
