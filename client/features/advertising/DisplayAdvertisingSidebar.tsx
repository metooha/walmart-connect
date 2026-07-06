import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/components/ui/IconButton';
import * as Icons from '@/components/icons';

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.00049 14.012H6.00049V11.512C6.00049 10.4074 6.89592 9.512 8.00049 9.512C9.10506 9.512 10.0005 10.4074 10.0005 11.512V14.012H13.0005V8.012H14.0005V14.012C14.0005 14.5643 13.5528 15.012 13.0005 15.012H9.00049V12.012C9.00049 11.4597 8.55277 11.012 8.00049 11.012C7.4482 11.012 7.00049 11.4597 7.00049 12.012V15.012H3.00049C2.4482 15.012 2.00049 14.5643 2.00049 14.012V8.012H3.00049V14.012ZM7.37923 1.21645C7.77589 0.927885 8.32508 0.927885 8.72174 1.21645L15.2615 6.21445L14.6399 7.09895L8.05049 2.06395L1.46109 7.09895L0.839493 6.21445L7.37923 1.21645Z"
      fill="currentColor"
    />
  </svg>
);

const MegaphoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5 1.85177C13.5 1.25526 12.9016 0.844293 12.3449 1.05843L6.40716 3.34216H4C2.34315 3.34216 1 4.68531 1 6.34216C1 7.93946 2.24832 9.2452 3.82259 9.337L4.01633 10.0766L4.98761 13.7015C5.23776 14.6351 6.19736 15.1891 7.13092 14.9389C8.06448 14.6888 8.6185 13.7292 8.36836 12.7956L7.56202 9.78634L12.3449 11.6259C12.9016 11.84 13.5 11.4291 13.5 10.8326V8.46414C14.3739 8.15526 15 7.32183 15 6.34217C15 5.36251 14.3739 4.52908 13.5 4.2202V1.85177ZM6.3906 9.34216H4.85769L4.98334 9.82182L5.95354 13.4427C6.06075 13.8428 6.472 14.0802 6.8721 13.973C7.2722 13.8658 7.50964 13.4546 7.40244 13.0545L6.44009 9.46297L6.3906 9.34216ZM4.5 4.34216H6V8.34216H4.5V4.34216ZM13.5 7.34226C13.8036 7.11421 14 6.75112 14 6.34217C14 5.93322 13.8036 5.57013 13.5 5.34208V7.34226ZM7 4.18556L12.5 2.07018V10.6141L7 8.49876V4.18556ZM3.5 4.40517C2.63739 4.62719 2 5.41024 2 6.34216C2 7.27408 2.63739 8.05713 3.5 8.27915V4.40517Z"
      fill="currentColor"
    />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5.5H4C4.27614 5.5 4.5 5.72386 4.5 6V14C4.5 14.2761 4.27614 14.5 4 14.5H2C1.72386 14.5 1.5 14.2761 1.5 14V6C1.5 5.72386 1.72386 5.5 2 5.5ZM7 7.5H9C9.27614 7.5 9.5 7.72386 9.5 8V14C9.5 14.2761 9.27614 14.5 9 14.5H7C6.72386 14.5 6.5 14.2761 6.5 14V8C6.5 7.72386 6.72386 7.5 7 7.5ZM12 1.5H14C14.2761 1.5 14.5 1.72386 14.5 2V14C14.5 14.2761 14.2761 14.5 14 14.5H12C11.7239 14.5 11.5 14.2761 11.5 14V2C11.5 1.72386 11.7239 1.5 12 1.5Z" stroke="currentColor"/>
  </svg>
);

const ToolboxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.08813 3.5V5H2C1.44772 5 1 5.44772 1 6V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V6C15 5.44772 14.5523 5 14 5H10.9999V3.5C10.9999 2.67157 10.3283 2 9.4999 2H6.58813C5.75971 2 5.08813 2.67157 5.08813 3.5ZM6.58813 3C6.31199 3 6.08813 3.22386 6.08813 3.5V5H9.9999V3.5C9.9999 3.22386 9.77604 3 9.4999 3H6.58813ZM2 8.5V6H14V8.5H12V7.5C12 7.22386 11.7761 7 11.5 7H9.5C9.22386 7 9 7.22386 9 7.5V8.5H7V7.5C7 7.22386 6.77614 7 6.5 7H4.5C4.22386 7 4 7.22386 4 7.5V8.5H2ZM2 9.5V13H14V9.5H12V10.5C12 10.7761 11.7761 11 11.5 11H9.5C9.22386 11 9 10.7761 9 10.5V9.5H7V10.5C7 10.7761 6.77614 11 6.5 11H4.5C4.22386 11 4 10.7761 4 10.5V9.5H2ZM5 8V10H6V8H5ZM10 10V8H11V10H10Z"
      fill="currentColor"
    />
  </svg>
);

const ImageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2 2C1.44772 2 1 2.44772 1 3V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V3C15 2.44772 14.5523 2 14 2H2ZM2 3H14V9.586L11.707 7.293C11.5195 7.10553 11.2652 7.00021 11 7.00021C10.7348 7.00021 10.4805 7.10553 10.293 7.293L7 10.586L5.707 9.293C5.5195 9.10553 5.26522 9.00021 5 9.00021C4.73478 9.00021 4.4805 9.10553 4.293 9.293L2 11.586V3ZM2 12.414L5 9.414L6.293 10.707C6.4805 10.8945 6.73478 10.9998 7 10.9998C7.26522 10.9998 7.5195 10.8945 7.707 10.707L11 7.414L14 10.414V13H2V12.414ZM5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6Z" fill="currentColor"/>
  </svg>
);

const CloudUploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.5 1C10.433 1 12 2.567 12 4.5C12 4.67 11.99 4.837 11.971 5H12C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11H11.5V10H12C13.105 10 14 9.105 14 8C14 6.895 13.105 6 12 6H11V5.5C11 3.567 9.433 2 7.5 2C5.567 2 4 3.567 4 5.5V6H3.5C2.672 6 2 6.672 2 7.5C2 8.328 2.672 9 3.5 9H5V10H3.5C2.119 10 1 8.881 1 7.5C1 6.119 2.119 5 3.5 5H3.971C3.99 4.837 4 4.67 4 4.5C4 2.567 5.567 1 7.5 1H8.5ZM8 7V13H7V7H4.5L7.5 4L10.5 7H8Z" fill="currentColor"/>
  </svg>
);

const ArrowRightLineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5 14.5C5 14.7761 4.77614 15 4.5 15C4.22386 15 4 14.7761 4 14.5V1.5C4 1.22386 4.22386 1 4.5 1C4.77614 1 5 1.22386 5 1.5V7.5H10.293L7.64645 4.85355L7.58859 4.78431C7.4536 4.58944 7.47288 4.32001 7.64645 4.14645C7.82001 3.97288 8.08944 3.9536 8.28431 4.08859L8.35355 4.14645L11.8824 7.67786L11.9333 7.75024L11.9624 7.8094L11.9834 7.87186L11.9948 7.92772L12 8L11.9937 8.07862L11.9834 8.12815L11.9622 8.19104L11.9228 8.26701L11.8654 8.34129L8.35355 11.8536L8.28431 11.9114C8.1138 12.0295 7.8862 12.0295 7.71569 11.9114L7.64645 11.8536L7.58859 11.7843C7.47047 11.6138 7.47047 11.3862 7.58859 11.2157L7.64645 11.1464L10.291 8.5H5V14.5Z" fill="currentColor"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11 1.5C11 1.22386 11.2239 1 11.5 1C11.7761 1 12 1.22386 12 1.5V14.5C12 14.7761 11.7761 15 11.5 15C11.2239 15 11 14.7761 11 14.5V8.5H5.707L8.35355 11.1464L8.41141 11.2157C8.5464 11.4106 8.52712 11.68 8.35355 11.8536C8.17999 12.0271 7.91056 12.0464 7.71569 11.9114L7.64645 11.8536L4.11765 8.32214L4.06671 8.24976L4.03764 8.1906L4.01661 8.12814L4.00518 8.07228L4 8L4.00626 7.92138L4.01661 7.87185L4.03777 7.80896L4.07724 7.73299L4.13465 7.65871L7.64645 4.14645L7.71569 4.08859C7.8862 3.97047 8.1138 3.97047 8.28431 4.08859L8.35355 4.14645L8.41141 4.21569C8.52953 4.3862 8.52953 4.6138 8.41141 4.78431L8.35355 4.85355L5.709 7.5H11V1.5Z" fill="currentColor"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface DisplayAdvertisingSidebarProps {
  activeMenuItem: string;
  onMenuItemClick: (itemId: string) => void;
}

export default function DisplayAdvertisingSidebar({
  activeMenuItem,
  onMenuItemClick,
}: DisplayAdvertisingSidebarProps) {
  const navigate = useNavigate();

  // Sidebar state management
  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [sidebarResizeStartX, setSidebarResizeStartX] = useState(0);
  const [sidebarResizeStartWidth, setSidebarResizeStartWidth] = useState(0);
  const [campaignsExpanded, setCampaignsExpanded] = useState(true);
  const [reportsExpanded, setReportsExpanded] = useState(false);
  const [toolsExpanded, setToolsExpanded] = useState(false);

  // Sidebar is expanded if either locked or hovered
  const sidebarExpanded = sidebarLocked || sidebarHovered;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', Icon: HomeIcon },
    {
      id: 'campaigns',
      label: 'Campaigns',
      Icon: MegaphoneIcon,
      submenuItems: [
        { id: 'campaigns-active', label: 'Active' },
        { id: 'campaigns-draft', label: 'Draft' },
        { id: 'campaigns-archived', label: 'Archived' },
      ]
    },
    { id: 'reports', label: 'Reports', Icon: AnalyticsIcon },
    { id: 'tools', label: 'Tools', Icon: ToolboxIcon },
    { id: 'video-manager', label: 'Video manager', Icon: ImageIcon },
    { id: 'bulk-operations', label: 'Bulk operations', Icon: CloudUploadIcon },
  ];

  // Handle resize functionality
  useEffect(() => {
    if (!isResizingSidebar) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - sidebarResizeStartX;
      const newWidth = Math.max(64, Math.min(400, sidebarResizeStartWidth + delta));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar, sidebarResizeStartX, sidebarResizeStartWidth]);

  const handleToggle = () => {
    if (sidebarLocked) {
      setSidebarLocked(false);
    } else {
      setSidebarLocked(true);
      if (sidebarWidth < 220) {
        setSidebarWidth(220);
      }
    }
  };

  const handleCampaignsToggle = () => {
    // If sidebar is collapsed, navigate to campaigns page
    if (!sidebarExpanded) {
      navigate('/display-advertising/campaigns');
      onMenuItemClick('campaigns');
      return;
    }
    // If sidebar is expanded, just toggle the submenu
    setCampaignsExpanded(!campaignsExpanded);
  };

  return (
    <aside
      className="border-r border-border bg-background flex flex-col justify-between p-3 h-auto self-stretch overflow-hidden relative"
      style={{
        width: sidebarExpanded ? `${sidebarWidth}px` : '64px',
        transition: isResizingSidebar ? 'none' : 'width 300ms ease-in-out'
      }}
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      {/* Menu items section */}
      <div className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = activeMenuItem === item.id || (item.id === 'campaigns' && activeMenuItem.startsWith('campaigns'));
          const IconComponent = item.Icon;
          const hasSubmenu = item.submenuItems && item.submenuItems.length > 0;
          const isSubmenuActive = hasSubmenu && item.submenuItems.some(sub => activeMenuItem === sub.id);
          const shouldShowAsActive = isActive || isSubmenuActive;
          const isCampaigns = item.id === 'campaigns';

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (isCampaigns) {
                    handleCampaignsToggle();
                    // If expanded, don't navigate, just toggle submenu
                    if (sidebarExpanded) return;
                  } else {
                    // For other items, update state and navigate if applicable
                    onMenuItemClick(item.id);

                    // Navigate to home/dashboard when clicking dashboard
                    if (item.id === 'dashboard') {
                      navigate('/');
                    }
                  }
                }}
                className={`flex items-center ${
                  sidebarExpanded ? 'gap-3 px-3 w-full justify-between' : 'justify-center w-10 mx-auto'
                } h-9 rounded ${
                  shouldShowAsActive && sidebarExpanded ? 'bg-walmart-blue-bg' : ''
                } ${!shouldShowAsActive ? 'hover:bg-muted' : ''} transition-colors ${
                  shouldShowAsActive ? 'text-primary' : 'text-foreground'
                }`}
                aria-label={item.label}
                title={!sidebarExpanded ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <IconComponent />
                  {sidebarExpanded && (
                    <span className="text-sm truncate">
                      {item.label}
                    </span>
                  )}
                </div>
                {sidebarExpanded && isCampaigns && (
                  <div className={`transform transition-transform ${campaignsExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon />
                  </div>
                )}
              </button>

              {/* Submenu items for Campaigns */}
              {isCampaigns && campaignsExpanded && sidebarExpanded && (
                <div className="flex flex-col gap-1 mt-1">
                  {item.submenuItems.map((subItem) => {
                    const isSubActive = activeMenuItem === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          navigate('/display-advertising/campaigns');
                          onMenuItemClick(subItem.id);
                        }}
                        className="flex items-center gap-3 pl-12 pr-3 w-full h-9 rounded hover:bg-muted transition-colors"
                        aria-label={subItem.label}
                      >
                        <span className="text-xs text-foreground">○</span>
                        <span className="text-sm truncate text-foreground">
                          {subItem.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Actions - Settings and Lock (Stacked) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: sidebarExpanded ? 'stretch' : 'center',
        gap: '8px',
        padding: '12px 0'
      }}>
        {/* Settings Button */}
        <button
          onClick={() => navigate('/settings')}
          className={`flex items-center text-foreground ${
            sidebarExpanded ? 'justify-start gap-3 px-3 w-full' : 'justify-center w-10'
          } h-9 rounded hover:bg-muted transition-colors`}
          aria-label="Settings"
        >
          {sidebarExpanded ? (
            <>
              <Icons.Gear style={{ width: 20, height: 20, flexShrink: 0 }} />
              <span className="text-sm truncate">Settings</span>
            </>
          ) : (
            <Icons.Gear style={{ width: 20, height: 20 }} />
          )}
        </button>

        {/* Lock/Toggle button */}
        <button
          onClick={handleToggle}
          className={`flex items-center text-foreground ${
            sidebarExpanded ? 'justify-start gap-3 px-3 w-full' : 'justify-center w-10'
          } h-9 rounded hover:bg-muted transition-colors`}
          aria-label={sidebarLocked ? 'Collapse sidebar' : 'Lock sidebar open'}
          aria-expanded={sidebarLocked}
        >
          {sidebarExpanded ? (
            <>
              <ArrowLeftIcon />
              <span className="text-sm truncate">Lock</span>
            </>
          ) : (
            <ArrowRightLineIcon />
          )}
        </button>
      </div>

      {/* Resize handle (only when expanded) */}
      {sidebarExpanded && (
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary transition-colors bg-transparent z-10"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsResizingSidebar(true);
            setSidebarResizeStartX(e.clientX);
            setSidebarResizeStartWidth(sidebarWidth);
          }}
        />
      )}
    </aside>
  );
}
