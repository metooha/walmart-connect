import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const BoxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 1L1 4V12L8 15L15 12V4L8 1ZM8 2.118L13.764 4.5L8 6.882L2.236 4.5L8 2.118ZM2 5.618L7.5 7.882V13.382L2 11.118V5.618ZM8.5 13.382V7.882L14 5.618V11.118L8.5 13.382Z" fill="currentColor"/>
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

interface StoreAdsSidebarProps {
  activeMenuItem: string;
  onMenuItemClick: (itemId: string) => void;
}

export default function StoreAdsSidebar({
  activeMenuItem,
  onMenuItemClick,
}: StoreAdsSidebarProps) {
  const navigate = useNavigate();

  // Sidebar state management
  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [sidebarResizeStartX, setSidebarResizeStartX] = useState(0);
  const [sidebarResizeStartWidth, setSidebarResizeStartWidth] = useState(0);

  // Sidebar is expanded if either locked or hovered
  const sidebarExpanded = sidebarLocked || sidebarHovered;

  const menuItems = [
    { id: 'home', label: 'Home', Icon: HomeIcon, path: '/store-ads' },
    { id: 'campaigns', label: 'Campaigns', Icon: MegaphoneIcon, path: '/store-ads/campaigns' },
    { id: 'performance', label: 'Performance', Icon: AnalyticsIcon, path: '/store-ads/performance' },
    { id: 'inventory', label: 'Inventory', Icon: BoxIcon, path: '/store-ads/inventory' },
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
          const isActive = activeMenuItem === item.id;
          const IconComponent = item.Icon;

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  onMenuItemClick(item.id);
                  if (item.path) {
                    navigate(item.path);
                  }
                }}
                className={`flex items-center ${
                  sidebarExpanded ? 'gap-3 px-3 w-full justify-between' : 'justify-center w-10 mx-auto'
                } h-9 rounded ${
                  isActive && sidebarExpanded ? 'bg-[var(--ld-semantic-color-fill-brand-subtle,#E9F1FE)]' : ''
                } ${!isActive ? 'hover:bg-muted' : ''} transition-colors`}
                aria-label={item.label}
                title={!sidebarExpanded ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-primary' : 'text-foreground'}>
                    <IconComponent />
                  </span>
                  {sidebarExpanded && (
                    <span className={`text-sm truncate ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {item.label}
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Toggle button at bottom */}
      <div>
        <button
          onClick={handleToggle}
          className={`flex items-center text-foreground ${
            sidebarExpanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'
          } h-9 rounded hover:bg-muted transition-colors`}
          aria-label={sidebarLocked ? 'Collapse sidebar' : 'Lock sidebar open'}
          aria-expanded={sidebarLocked}
        >
          {sidebarExpanded ? (
            <>
              <ArrowLeftIcon />
              <span className="text-sm truncate text-foreground">Lock</span>
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
