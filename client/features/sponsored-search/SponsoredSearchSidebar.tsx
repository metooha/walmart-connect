import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

const SpeedometerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M13.8615 4.20765C13.7991 4.31954 13.7221 4.42043 13.6304 4.50847L13.1681 4.95237C13.6286 5.72828 13.9074 6.59589 13.9807 7.5112H13.5167C13.247 7.5112 13.0287 7.72948 13.0287 7.99912C13.0287 8.26693 13.2489 8.48521 13.5203 8.48521H13.9789C13.878 9.7472 13.3938 10.9175 12.572 11.8805L12.2473 11.5558C12.1776 11.4861 12.0896 11.4402 11.9942 11.4219C11.8328 11.3889 11.6677 11.4402 11.554 11.5558C11.3632 11.7466 11.3632 12.0566 11.554 12.2455L11.8823 12.5738C10.8936 13.4158 9.6885 13.9037 8.39533 13.9862H7.60843C6.30792 13.9037 5.10096 13.4139 4.11228 12.572L4.43878 12.2455C4.53049 12.1538 4.58185 12.0309 4.58185 11.9006C4.58185 11.7704 4.53049 11.6475 4.43878 11.5558C4.36908 11.4861 4.2792 11.4384 4.18381 11.4219C4.02423 11.3907 3.86098 11.4402 3.74542 11.5558L3.42075 11.8805C2.59899 10.9175 2.11474 9.7472 2.01385 8.48521H2.47609C2.7439 8.48521 2.96401 8.26693 2.96401 7.99912C2.96401 7.72948 2.74573 7.5112 2.47242 7.5112H2.01385C2.11474 6.24921 2.59899 5.07894 3.42075 4.11594L3.74542 4.44061C3.81512 4.51031 3.90317 4.55617 3.99855 4.57451C4.15997 4.60753 4.32322 4.55617 4.43878 4.44061C4.62954 4.24984 4.62954 3.93985 4.43878 3.75091L4.11044 3.42258C5.07528 2.60082 6.24555 2.11657 7.5057 2.01568V2.47792C7.5057 2.74756 7.72398 2.96584 7.99362 2.96584C8.26143 2.96584 8.48154 2.74756 8.48154 2.47792V2.01568C9.53443 2.10006 10.5194 2.45407 11.3779 3.04471L11.8181 2.62283C11.9172 2.52745 12.0327 2.45041 12.1556 2.39171C10.9615 1.50025 9.51608 1.01416 7.99729 1.01416C6.13182 1.01416 4.37872 1.74037 3.06134 3.05775C1.74396 4.37513 1.01776 6.12823 1.01776 7.99369C1.01776 9.85916 1.74396 11.6123 3.06134 12.9296C4.37872 14.247 6.13182 14.9732 7.99729 14.9732C9.86276 14.9732 11.6159 14.247 12.9332 12.9296C14.2506 11.6123 14.9768 9.85916 14.9768 7.99369C14.9768 6.45656 14.4761 5.01113 13.5736 3.81387L13.8615 4.20765Z"/>
    <path d="M11.9742 3.49233L9.04852 6.30063C8.74219 6.11169 8.38267 6.00347 7.99564 6.00347C6.88956 6.00347 5.9926 6.8986 5.98893 8.00284V8.01018C5.98893 9.11809 6.88773 10.0169 7.99564 10.0169C9.10355 10.0169 10.0005 9.11809 10.0005 8.01018V8.00284C10.0005 7.70019 9.93264 7.41404 9.81158 7.15724L12.7483 4.33794L12.8803 4.20954L13.1206 3.97842C13.1995 3.90138 13.2509 3.80783 13.2765 3.70878C13.2876 3.66843 13.2931 3.62991 13.2949 3.58772C13.2967 3.53269 13.2894 3.47949 13.2765 3.4263C13.2527 3.33275 13.2087 3.24287 13.1353 3.16767C13.0656 3.09429 12.9794 3.0466 12.8895 3.01909C12.8363 3.00258 12.7831 2.99157 12.7263 2.99157C12.6859 2.99157 12.6456 2.99524 12.6052 3.00441C12.5025 3.02459 12.4034 3.07412 12.3227 3.15116L12.0274 3.43364L11.9687 3.4905L11.9742 3.49233ZM7.99747 8.86863C7.52239 8.86863 7.13719 8.48343 7.13719 8.00835V8.00101C7.14086 7.5296 7.52423 7.14807 7.99564 7.14807C8.46705 7.14807 8.85041 7.5296 8.85408 8.00101V8.00835C8.85408 8.48343 8.46888 8.86679 7.99564 8.86863H7.99747Z" fill="currentColor"/>
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

const AnalyticsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5.5H4C4.27614 5.5 4.5 5.72386 4.5 6V14C4.5 14.2761 4.27614 14.5 4 14.5H2C1.72386 14.5 1.5 14.2761 1.5 14V6C1.5 5.72386 1.72386 5.5 2 5.5ZM7 7.5H9C9.27614 7.5 9.5 7.72386 9.5 8V14C9.5 14.2761 9.27614 14.5 9 14.5H7C6.72386 14.5 6.5 14.2761 6.5 14V8C6.5 7.72386 6.72386 7.5 7 7.5ZM12 1.5H14C14.2761 1.5 14.5 1.72386 14.5 2V14C14.5 14.2761 14.2761 14.5 14 14.5H12C11.7239 14.5 11.5 14.2761 11.5 14V2C11.5 1.72386 11.7239 1.5 12 1.5Z" stroke="currentColor"/>
  </svg>
);

const VideoArrowUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 6.38376V6C8 4.34315 6.65685 3 5 3C3.34315 3 2 4.34315 2 6C2 6.76152 2.28243 7.45464 2.74974 7.98409L3 8.26763V8.30961L3.50073 8.59927C3.94097 8.85393 4.45191 9 5 9C6.39651 9 7.57246 8.04488 7.90555 6.75074L8 6.38376ZM3 10.5837V12C3 12.5523 3.44772 13 4 13H10C10.5523 13 11 12.5523 11 12V11.1535V9.12329V8C11 7.44772 10.5523 7 10 7H9H8.87398C8.42994 8.72523 6.86384 10 5 10C4.6547 10 4.31962 9.95625 4 9.87398C3.64523 9.78267 3.30951 9.64391 3 9.46487V10.5837ZM12 12V11.875L14.3244 12.7467C14.6513 12.8692 15 12.6276 15 12.2785V7.77329C15 7.41046 14.6257 7.16844 14.2948 7.31733L12 8.35V8C12 6.89543 11.1046 6 10 6H9C9 3.79086 7.20914 2 5 2C2.79086 2 1 3.79086 1 6C1 7.01445 1.37764 7.94069 2 8.64582V9.46487V12C2 13.1046 2.89543 14 4 14H10C11.1046 14 12 13.1046 12 12ZM14 11.557L12 10.807V9.44659L14 8.54659V11.557ZM3.23222 5.76778C3.03695 5.96305 3.03695 6.27963 3.23222 6.47489C3.42748 6.67015 3.74406 6.67015 3.93932 6.47489L4.46448 5.94974V7.49998C4.46448 7.77613 4.68834 7.99998 4.96448 7.99998C5.24062 7.99998 5.46448 7.77613 5.46448 7.49998V5.87873L6.06064 6.47489C6.2559 6.67015 6.57249 6.67015 6.76775 6.47489C6.96301 6.27963 6.96301 5.96305 6.76775 5.76778L5.35354 4.35357C5.15827 4.15831 4.84169 4.15831 4.64643 4.35357L3.23222 5.76778Z" fill="currentColor"/>
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

export default function SponsoredSearchSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar state management
  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [sidebarResizeStartX, setSidebarResizeStartX] = useState(0);
  const [sidebarResizeStartWidth, setSidebarResizeStartWidth] = useState(0);
  const [activeMenuItem, setActiveMenuItem] = useState('home');

  // Sidebar is expanded if either locked or hovered
  const sidebarExpanded = sidebarLocked || sidebarHovered;

  const menuItems = [
    { id: 'home', label: 'Home', Icon: HomeIcon, path: '/sponsored-search' },
    {
      id: 'campaign-management',
      label: 'Campaign management',
      Icon: MegaphoneIcon,
      submenuItems: [
        { id: 'all-campaigns', label: 'All campaigns', path: '/all-campaigns' },
        { id: 'all-keywords', label: 'All keywords', path: '/all-keywords' },
      ]
    },
    { id: 'experiments', label: 'Experiments', Icon: SpeedometerIcon },
    {
      id: 'tools',
      label: 'Tools',
      Icon: ToolboxIcon,
      submenuItems: [
        { id: 'keywords-planner', label: 'Keywords Planner', path: '/keywords-planner' },
        { id: 'rules', label: 'Rules' },
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      Icon: AnalyticsIcon,
      submenuItems: [
        { id: 'advertiser', label: 'Advertiser' },
        { id: 'item-health', label: 'Item Health', path: '/reports/item-health' },
        { id: 'la-historia', label: 'History log', path: '/reports/la-historia' },
        { id: 'on-demand', label: 'On-demand', path: '/reports/on-demand' },
        { id: 'custom', label: 'Custom' },
      ]
    },
    { id: 'video-manager', label: 'Video manager', Icon: VideoArrowUpIcon },
    { id: 'bulk-operations', label: 'Bulk operations', Icon: CloudUploadIcon },
  ];

  // Set active menu item based on current route
  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === '/' || pathname === '/sponsored-search') {
      setActiveMenuItem('home');
    } else if (pathname.includes('/all-campaigns')) {
      setActiveMenuItem('all-campaigns');
    } else if (pathname.includes('/all-keywords')) {
      setActiveMenuItem('all-keywords');
    } else if (pathname.includes('/keywords-planner')) {
      setActiveMenuItem('keywords-planner');
    } else if (pathname.includes('/rules')) {
      setActiveMenuItem('rules');
    } else if (pathname.includes('/reports/advertiser')) {
      setActiveMenuItem('advertiser');
    } else if (pathname.includes('/reports/item-health')) {
      setActiveMenuItem('item-health');
    } else if (pathname.includes('/reports/la-historia')) {
      setActiveMenuItem('la-historia');
    } else if (pathname.includes('/reports/on-demand')) {
      setActiveMenuItem('on-demand');
    } else if (pathname.includes('/reports/custom')) {
      setActiveMenuItem('custom');
    } else if (pathname.includes('/experiment')) {
      setActiveMenuItem('experiments');
    } else if (pathname.includes('/video')) {
      setActiveMenuItem('video-manager');
    } else if (pathname.includes('/bulk')) {
      setActiveMenuItem('bulk-operations');
    }
  }, [location.pathname]);

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
          const hasSubmenu = item.submenuItems && item.submenuItems.length > 0;
          const isSubmenuActive = hasSubmenu && item.submenuItems.some(sub => activeMenuItem === sub.id);
          const shouldShowAsActive = isActive || isSubmenuActive;

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (!hasSubmenu) {
                    setActiveMenuItem(item.id);
                    if (item.path) {
                      navigate(item.path);
                    }
                  }
                }}
                className={`flex items-center ${
                  sidebarExpanded ? 'gap-3 px-3 w-full justify-between' : 'justify-center w-10 mx-auto'
                } h-9 rounded ${
                  shouldShowAsActive && sidebarExpanded ? 'bg-[var(--ld-semantic-color-fill-brand-subtle,#E9F1FE)]' : 'hover:bg-muted'
                } transition-colors`}
                aria-label={item.label}
              >
                <div className="flex items-center gap-3">
                  <span className={shouldShowAsActive ? 'text-primary' : 'text-foreground'}>
                    <IconComponent />
                  </span>
                  {sidebarExpanded && (
                    <span className={`text-sm truncate ${shouldShowAsActive ? 'text-primary' : 'text-foreground'}`}>
                      {item.label}
                    </span>
                  )}
                </div>
                {sidebarExpanded && hasSubmenu && (
                  <span className="text-foreground">
                    <ChevronDownIcon />
                  </span>
                )}
              </button>

              {/* Submenu items */}
              {hasSubmenu && sidebarExpanded && (
                <div className="flex flex-col gap-1 mt-1">
                  {item.submenuItems.map((subItem) => {
                    const isSubActive = activeMenuItem === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          setActiveMenuItem(subItem.id);
                          if (subItem.path) {
                            navigate(subItem.path);
                          }
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

      {/* Toggle button at bottom */}
      <div>
        <button
          onClick={handleToggle}
          className={`flex items-center text-foreground ${
            sidebarExpanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'
          } h-9 rounded hover:bg-muted transition-colors`}
          aria-label={sidebarLocked ? 'Unlock sidebar' : 'Lock sidebar open'}
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
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary transition-colors bg-transparent"
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
