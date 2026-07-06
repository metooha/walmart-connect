import { useState, useEffect } from 'react';

const GridIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 2H7V7H2V2ZM3 3V6H6V3H3ZM9 2H14V7H9V2ZM10 3V6H13V3H10ZM2 9H7V14H2V9ZM3 10V13H6V10H3ZM9 9H14V14H9V9ZM10 10V13H13V10H10Z"
      fill={isActive ? '#0053E2' : '#2E2F32'}
    />
  </svg>
);

const SettingsIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.05023 1C7.27919 1 7.48257 1.14774 7.55454 1.36612L8.07917 2.91389C8.47236 3.04996 8.84371 3.23007 9.18669 3.44878L10.7623 2.99342C10.9849 2.93049 11.2218 3.00682 11.3612 3.18934L12.4114 4.80934C12.5509 4.99186 12.5635 5.24093 12.4436 5.43641L11.3849 7.18311C11.4281 7.4507 11.4507 7.72362 11.4507 8C11.4507 8.27638 11.4281 8.5493 11.3849 8.81689L12.4436 10.5636C12.5635 10.7591 12.5509 11.0081 12.4114 11.1907L11.3612 12.8107C11.2218 12.9932 10.9849 13.0695 10.7623 13.0066L9.18669 12.5512C8.84371 12.7699 8.47236 12.95 8.07917 13.0861L7.55454 14.6339C7.48257 14.8523 7.27919 15 7.05023 15H4.94977C4.72081 15 4.51743 14.8523 4.44546 14.6339L3.92083 13.0861C3.52764 12.95 3.15629 12.7699 2.81331 12.5512L1.23767 13.0066C1.01512 13.0695 0.778192 12.9932 0.638779 12.8107L-0.411428 11.1907C-0.550842 11.0081 -0.563499 10.7591 -0.443607 10.5636L0.615113 8.81689C0.571904 8.5493 0.549316 8.27638 0.549316 8C0.549316 7.72362 0.571904 7.4507 0.615113 7.18311L-0.443607 5.43641C-0.563499 5.24093 -0.550842 4.99186 -0.411428 4.80934L0.638779 3.18934C0.778192 3.00682 1.01512 2.93049 1.23767 2.99342L2.81331 3.44878C3.15629 3.23007 3.52764 3.04996 3.92083 2.91389L4.44546 1.36612C4.51743 1.14774 4.72081 1 4.94977 1H7.05023ZM6 9.5C6.82843 9.5 7.5 8.82843 7.5 8C7.5 7.17157 6.82843 6.5 6 6.5C5.17157 6.5 4.5 7.17157 4.5 8C4.5 8.82843 5.17157 9.5 6 9.5Z"
      fill={isActive ? '#0053E2' : '#2E2F32'}
      transform="translate(2, 0)"
    />
  </svg>
);

const ArrowRightLineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5 14.5C5 14.7761 4.77614 15 4.5 15C4.22386 15 4 14.7761 4 14.5V1.5C4 1.22386 4.22386 1 4.5 1C4.77614 1 5 1.22386 5 1.5V7.5H10.293L7.64645 4.85355L7.58859 4.78431C7.4536 4.58944 7.47288 4.32001 7.64645 4.14645C7.82001 3.97288 8.08944 3.9536 8.28431 4.08859L8.35355 4.14645L11.8824 7.67786L11.9333 7.75024L11.9624 7.8094L11.9834 7.87186L11.9948 7.92772L12 8L11.9937 8.07862L11.9834 8.12815L11.9622 8.19104L11.9228 8.26701L11.8654 8.34129L8.35355 11.8536L8.28431 11.9114C8.1138 12.0295 7.8862 12.0295 7.71569 11.9114L7.64645 11.8536L7.58859 11.7843C7.47047 11.6138 7.47047 11.3862 7.58859 11.2157L7.64645 11.1464L10.291 8.5H5V14.5Z" fill="#2E2F32"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11 1.5C11 1.22386 11.2239 1 11.5 1C11.7761 1 12 1.22386 12 1.5V14.5C12 14.7761 11.7761 15 11.5 15C11.2239 15 11 14.7761 11 14.5V8.5H5.707L8.35355 11.1464L8.41141 11.2157C8.5464 11.4106 8.52712 11.68 8.35355 11.8536C8.17999 12.0271 7.91056 12.0464 7.71569 11.9114L7.64645 11.8536L4.11765 8.32214L4.06671 8.24976L4.03764 8.1906L4.01661 8.12814L4.00518 8.07228L4 8L4.00626 7.92138L4.01661 7.87185L4.03777 7.80896L4.07724 7.73299L4.13465 7.65871L7.64645 4.14645L7.71569 4.08859C7.8862 3.97047 8.1138 3.97047 8.28431 4.08859L8.35355 4.14645L8.41141 4.21569C8.52953 4.3862 8.52953 4.6138 8.41141 4.78431L8.35355 4.85355L5.709 7.5H11V1.5Z" fill="#2E2F32"/>
  </svg>
);

interface SettingsSidebarProps {
  activeSection: 'applications' | 'global';
  onSectionChange: (section: 'applications' | 'global') => void;
}

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [sidebarResizeStartX, setSidebarResizeStartX] = useState(0);
  const [sidebarResizeStartWidth, setSidebarResizeStartWidth] = useState(0);

  const sidebarExpanded = sidebarLocked || sidebarHovered;

  const menuItems = [
    { id: 'applications' as const, label: 'Applications', Icon: GridIcon },
    { id: 'global' as const, label: 'Global Settings', Icon: SettingsIcon },
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
      className="border-r bg-white flex flex-col justify-between h-auto self-stretch overflow-hidden relative"
      style={{
        width: sidebarExpanded ? `${sidebarWidth}px` : '64px',
        transition: isResizingSidebar ? 'none' : 'width 300ms ease-in-out',
        borderColor: 'var(--ld-semantic-color-separator, #E3E4E5)'
      }}
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      {/* Menu items section */}
      <div className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          const IconComponent = item.Icon;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center ${
                sidebarExpanded ? 'gap-3 px-3 w-full justify-start' : 'justify-center w-10 mx-auto'
              } h-9 ${sidebarExpanded ? '' : 'rounded'} ${
                isActive && sidebarExpanded ? 'bg-[#E9F1FE]' : ''
              } ${!isActive ? 'hover:bg-muted' : ''} transition-colors`}
              aria-label={item.label}
              title={!sidebarExpanded ? item.label : undefined}
            >
              <div className="flex items-center gap-3">
                <IconComponent isActive={isActive} />
                {sidebarExpanded && (
                  <span className={`text-sm truncate ${isActive ? 'text-primary' : 'text-foreground'}`}>
                    {item.label}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Toggle button */}
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handleToggle}
          className="w-10 h-10 flex items-center justify-center rounded hover:bg-muted transition-colors"
          aria-label={sidebarLocked ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarLocked ? <ArrowLeftIcon /> : <ArrowRightLineIcon />}
        </button>
      </div>

      {/* Resize handle */}
      {sidebarExpanded && (
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors"
          onMouseDown={(e) => {
            setIsResizingSidebar(true);
            setSidebarResizeStartX(e.clientX);
            setSidebarResizeStartWidth(sidebarWidth);
          }}
        />
      )}
    </aside>
  );
}
