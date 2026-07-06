import { useState } from "react";
import { Search, Settings as SettingsIcon, Download } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";
import { MastHead } from "../components/ui/MastHead";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import { Button } from "../components/ui/Button";
import { Divider } from "../components/ui/Divider";
import { OLQTag } from "../components/ui/olq-tag";
import CleaningSpray from "../components/icons/CleaningSpray";
import DishSoap from "../components/icons/DishSoap";
import PaperTowels from "../components/icons/PaperTowels";
import LaundryDetergent from "../components/icons/LaundryDetergent";
import Sponge from "../components/icons/Sponge";

interface ItemHealthData {
  itemImage: React.ReactNode;
  hasAlertIcon?: boolean;
  hasRecIcon?: boolean;
  itemId: string;
  campaignIds: string[];
  adGroupIds: string[];
  olq: string;
  primaryVariant: string;
  productDetailPageViewsToday: number;
  productDetailPageViewsLast7Days: number;
  itemAvailableToday: string;
  itemAvailableLast7Days: string;
  buyBoxWinRateToday: string;
  buyBoxWinRateLast7Days: string;
}

export default function OmniROAS() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Sponsored Search');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="#2E2F32"/>
        </svg>
      );
    }

    if (sortDirection === 'asc') {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3Z" fill="#0053E2"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8 13L12 9H4L8 13Z" fill="#BABBBE"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3Z" fill="#BABBBE"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8 13L12 9H4L8 13Z" fill="#0053E2"/>
        </svg>
      );
    }
  };


  const itemHealthData: ItemHealthData[] = [
    {
      itemImage: <CleaningSpray />,
      hasAlertIcon: true,
      itemId: "1750942750",
      campaignIds: ["432081"],
      adGroupIds: ["580546"],
      olq: "75%",
      primaryVariant: "1750942750",
      productDetailPageViewsToday: 4956,
      productDetailPageViewsLast7Days: 51124,
      itemAvailableToday: "96.74%",
      itemAvailableLast7Days: "93.57%",
      buyBoxWinRateToday: "96.75%",
      buyBoxWinRateLast7Days: "96.66%"
    },
    {
      itemImage: <DishSoap />,
      hasAlertIcon: true,
      itemId: "875633804",
      campaignIds: ["3920037"],
      adGroupIds: ["4934907"],
      olq: "72%",
      primaryVariant: "875633804",
      productDetailPageViewsToday: 4543,
      productDetailPageViewsLast7Days: 57267,
      itemAvailableToday: "99.68%",
      itemAvailableLast7Days: "99.83%",
      buyBoxWinRateToday: "100%",
      buyBoxWinRateLast7Days: "99.98%"
    },
    {
      itemImage: <PaperTowels />,
      itemId: "1566660392",
      campaignIds: ["4001729", "4345285", "3920926", "3225492"],
      adGroupIds: ["4834896", "4706485", "3692926", "3387680"],
      olq: "28%",
      primaryVariant: "1566660392",
      productDetailPageViewsToday: 3275,
      productDetailPageViewsLast7Days: 40379,
      itemAvailableToday: "99.68%",
      itemAvailableLast7Days: "99.85%",
      buyBoxWinRateToday: "97.22%",
      buyBoxWinRateLast7Days: "98.48%"
    },
    {
      itemImage: <LaundryDetergent />,
      itemId: "3452723904",
      campaignIds: ["4001729", "3920926", "3225492"],
      adGroupIds: ["4834896", "4706485", "3692214"],
      olq: "45%",
      primaryVariant: "3452723904",
      productDetailPageViewsToday: 2331,
      productDetailPageViewsLast7Days: 30360,
      itemAvailableToday: "100%",
      itemAvailableLast7Days: "99.83%",
      buyBoxWinRateToday: "100%",
      buyBoxWinRateLast7Days: "99.95%"
    },
    {
      itemImage: <Sponge />,
      itemId: "1403322750",
      campaignIds: ["4345285", "4001729", "4706485"],
      adGroupIds: ["4834896", "4706485"],
      olq: "54%",
      primaryVariant: "1403322750",
      productDetailPageViewsToday: 2352,
      productDetailPageViewsLast7Days: 30353,
      itemAvailableToday: "99.49%",
      itemAvailableLast7Days: "99.62%",
      buyBoxWinRateToday: "98.33%",
      buyBoxWinRateLast7Days: "100%"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MastHead
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />
      {/* Old custom header removed - using MastHead above */}
      <header style={{display:'none'}}>
        <div className="flex items-center gap-5">
          {/* App Switcher */}
          <button className="w-6 h-6 p-1 rounded-full hover-ld-gray">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="0" y="0" width="2" height="2" fill="#2E2F32"/>
              <rect x="0" y="5" width="2" height="2" fill="#2E2F32"/>
              <rect x="0" y="10" width="2" height="2" fill="#2E2F32"/>
              <rect x="5" y="0" width="2" height="2" fill="#2E2F32"/>
              <rect x="5" y="5" width="2" height="2" fill="#2E2F32"/>
              <rect x="5" y="10" width="2" height="2" fill="#2E2F32"/>
              <rect x="10" y="0" width="2" height="2" fill="#2E2F32"/>
              <rect x="10" y="5" width="2" height="2" fill="#2E2F32"/>
              <rect x="10" y="10" width="2" height="2" fill="#2E2F32"/>
            </svg>
          </button>

          {/* Logo */}
          <div className="h-[14px]">
            <svg width="241" height="14" viewBox="0 0 241 14" fill="none">
              <path d="M14.3131 0.262451L12.5653 9.03428L10.6022 0.262451H7.19181L5.22872 9.03428L3.48087 0.262451H0L2.83702 13.6607H6.88937L8.86916 4.76444L10.8508 13.6607H14.8141L17.6326 0.262451H14.3131Z" fill="#001F64"/>
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setMediaSolutionsOpen(!mediaSolutionsOpen)}
              className="flex items-center gap-1 text-xs hover-ld-gray px-2 py-1 rounded transition-colors"
            >
              <span className="text-foreground">{selectedMediaSolution === 'Display Advertising' ? 'Display' : selectedMediaSolution === 'Sponsored Search' ? 'Sponsored Search' : selectedMediaSolution === 'Shop Builder' ? 'Shop Builder' : selectedMediaSolution === 'Store Ads' ? 'Store Ads' : 'Unified Reports'}</span>
              {mediaSolutionsOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {mediaSolutionsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMediaSolutionsOpen(false)}
                />
                <div className="absolute top-full mt-2 right-0 w-80 bg-ld-main rounded-lg border border-ld-disabled shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="text-sm font-extrabold text-foreground mb-2">Media solutions</h3>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        onClick={() => {
                          navigate('/sponsored-search');
                          setSelectedMediaSolution('Sponsored Search');
                          setMediaSolutionsOpen(false);
                        }}
                        className={`flex flex-col items-center justify-center p-3 rounded border ${selectedMediaSolution === 'Sponsored Search' ? 'border-[#0053E2] bg-[#E9F1FE]' : 'border-border'} hover:border-[#0053E2] transition-colors min-h-[100px]`}
                      >
                        <div className="w-12 h-12 mb-2 relative">
                          <div className="w-8 h-8 rounded bg-sky-400 absolute left-1 top-0" />
                          <div className="w-8 h-8 rounded bg-[#001E60] absolute left-0 top-1 flex items-center justify-center">
                            <Search className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <span className="text-xs text-ld-primary text-center">Sponsored Search</span>
                      </button>

                      <button
                        onClick={() => {
                          navigate('/');
                          setMediaSolutionsOpen(false);
                        }}
                        className={`flex flex-col items-center justify-center p-3 rounded border ${selectedMediaSolution === 'Display Advertising' ? 'border-[#0053E2] bg-[#E9F1FE]' : 'border-border'} hover:border-[#0053E2] transition-colors min-h-[100px]`}
                      >
                        <div className="w-12 h-12 mb-2">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="7" y="7" width="34" height="34" rx="3" fill="#001E60"/>
                            <path d="M12 18.9997C12 18.4474 12.4477 17.9997 13 17.9997H16V24.9997H13C12.4477 24.9997 12 24.552 12 23.9997V18.9997Z" fill="white"/>
                            <path d="M14 17.9997C14 17.4474 14.4477 16.9997 15 16.9997H21V25.9997H15C14.4477 25.9997 14 25.552 14 24.9997V17.9997Z" fill="#29B8FF"/>
                            <path d="M36.5 21.5C36.5 23.433 34.933 25 33 25C31.067 25 29.5 23.433 29.5 21.5C29.5 19.567 31.067 18 33 18C34.933 18 36.5 19.567 36.5 21.5Z" fill="#29B8FF"/>
                            <path d="M23 16.9998L33.1715 13.4621C33.8213 13.236 34.5 13.7185 34.5 14.4066V28.5936C34.5 29.2816 33.8214 29.7641 33.1716 29.5382L22.9937 25.9998L23 16.9998Z" fill="white"/>
                            <path d="M16.0001 25.9997H20.997L22.7383 32.9649C22.8697 33.4905 22.4721 33.9997 21.9303 33.9997H18.6503C18.2681 33.9997 17.935 33.7396 17.8423 33.3689L16.0001 25.9997Z" fill="white"/>
                          </svg>
                        </div>
                        <span className="text-xs text-ld-primary text-center">Display Advertising</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMediaSolution('Shop Builder');
                          setMediaSolutionsOpen(false);
                        }}
                        className="flex flex-col items-center justify-center p-3 rounded border border-border hover:border-[#0053E2] transition-colors min-h-[100px]"
                      >
                        <div className="w-12 h-12 mb-2">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20H38V39C38 40.6569 36.6569 42 35 42H13C11.3431 42 10 40.6569 10 39V20Z" fill="#001E60"/>
                            <path d="M23.8058 26.1225C23.8804 25.9592 24.1196 25.9592 24.1942 26.1225L25.913 29.8845C25.9438 29.952 26.0096 29.9983 26.0854 30.0059L30.3091 30.4273C30.4925 30.4456 30.5664 30.6659 30.4291 30.7852L27.2677 33.5316C27.211 33.5809 27.1859 33.6558 27.2019 33.728L28.0934 37.7504C28.1321 37.9251 27.9386 38.0613 27.7792 37.9716L24.1066 35.907C24.0407 35.87 23.9593 35.87 23.8934 35.907L20.2208 37.9716C20.0613 38.0613 19.8679 37.9251 19.9066 37.7505L20.7981 33.728C20.8141 33.6558 20.789 33.5809 20.7323 33.5316L17.5709 30.7852C17.4336 30.6659 17.5076 30.4456 17.6909 30.4273L21.9146 30.0059C21.9904 29.9983 22.0562 29.952 22.087 29.8845L23.8058 26.1225Z" fill="white"/>
                            <path d="M10 23.5C11.933 23.5 13.5 21.933 13.5 20H6.5C6.5 21.933 8.067 23.5 10 23.5Z" fill="#0053E2"/>
                            <path d="M17 23.5C18.933 23.5 20.5 21.933 20.5 20H13.5C13.5 21.933 15.067 23.5 17 23.5Z" fill="#29B8FF"/>
                            <path d="M24 23.5C25.933 23.5 27.5 21.933 27.5 20H20.5C20.5 21.933 22.067 23.5 24 23.5Z" fill="#0053E2"/>
                            <path d="M31 23.5C32.933 23.5 34.5 21.933 34.5 20H27.5C27.5 21.933 29.067 23.5 31 23.5Z" fill="#29B8FF"/>
                            <path d="M38 23.5C39.933 23.5 41.5 21.933 41.5 20H34.5C34.5 21.933 36.067 23.5 38 23.5Z" fill="#0053E2"/>
                            <path d="M10.7068 6.40864C10.9661 5.57107 11.7406 5 12.6174 5H35.3825C36.2593 5 37.0339 5.57106 37.2931 6.40863L41.5 20H6.5L10.7068 6.40864Z" fill="white"/>
                            <path d="M10.5724 6.4253C10.8262 5.57934 11.6048 5 12.4881 5H16L13.5 20H6.5L10.5724 6.4253Z" fill="#29B8FF"/>
                            <path d="M21.5 5H26.5L27.5 20H20.5L21.5 5Z" fill="#29B8FF"/>
                            <path d="M32 5H35.5119C36.3952 5 37.1738 5.57934 37.4276 6.4253L41.5 20H34.5L32 5Z" fill="#29B8FF"/>
                          </svg>
                        </div>
                        <span className="text-xs text-ld-primary text-center">Shop Builder</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMediaSolution('Store Ads');
                          setMediaSolutionsOpen(false);
                          navigate('/store-ads');
                        }}
                        className="flex flex-col items-center justify-center p-3 rounded border border-border hover:border-[#0053E2] transition-colors min-h-[100px]"
                      >
                        <div className="w-12 h-12 mb-2">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 15C7 13.3431 8.34315 12 10 12H13.4585C14.1331 12 14.788 11.7726 15.3174 11.3546L22.7607 5.47838C23.4873 4.90474 24.5127 4.90474 25.2393 5.47839L32.6826 11.3546C33.212 11.7726 33.8669 12 34.5415 12H38C39.6569 12 41 13.3431 41 15V38C41 39.6569 39.6569 41 38 41H10C8.34315 41 7 39.6569 7 38V15Z" fill="#001E60"/>
                            <circle cx="24" cy="26" r="9" fill="white"/>
                            <path d="M21 22.1465V30.3535C21 30.745 21.4296 30.9846 21.7627 30.7789L28.4065 26.6754C28.7228 26.48 28.7228 26.02 28.4065 25.8246L21.7627 21.7211C21.4296 21.5154 21 21.755 21 22.1465Z" fill="#29B8FF"/>
                          </svg>
                        </div>
                        <span className="text-xs text-ld-primary text-center">Store Ads</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMediaSolution('Unified Reports');
                          setMediaSolutionsOpen(false);
                        }}
                        className="flex flex-col items-center justify-center p-3 rounded border border-border hover:border-[#0053E2] transition-colors min-h-[100px] col-span-2"
                      >
                        <div className="w-12 h-12 mb-2">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="7" y="7" width="34" height="34" rx="3" fill="#001E60"/>
                            <path d="M12 24.9267V34.5C12 35.0523 12.4477 35.5 13 35.5H35C35.5523 35.5 36 35.0523 36 34.5V16.5113C36 16.1902 35.8458 15.8886 35.5855 15.7006L32.1375 13.2104C31.7634 12.9403 31.253 12.9612 30.9022 13.261L22.8004 20.1874C22.5693 20.385 22.2609 20.4667 21.9624 20.4095L17.7246 19.5972C17.4064 19.5362 17.0784 19.6332 16.8445 19.8574L12.3081 24.2047C12.1113 24.3934 12 24.6541 12 24.9267Z" fill="white"/>
                            <path d="M12 26.5936V34.5C12 35.0523 12.4477 35.5 13 35.5H35C35.5523 35.5 36 35.0523 36 34.5V20.6499C36 20.2547 35.7673 19.8966 35.4061 19.7361L32.0473 18.2432C31.7103 18.0935 31.3183 18.1413 31.0272 18.3677L22.9528 24.6478C22.6723 24.866 22.2973 24.9189 21.9674 24.787L17.937 23.1748C17.6602 23.0641 17.3485 23.0826 17.0868 23.2254L12.5211 25.7157C12.1999 25.891 12 26.2277 12 26.5936Z" fill="#4DBDF5"/>
                            <path d="M12 31.6876V35C12 35.5523 12.4477 36 13 36H35C35.5523 36 36 35.5523 36 35V29.5785C36 29.2206 35.8087 28.89 35.4985 28.7116L31.2914 26.2926C30.9773 26.1119 30.59 26.1154 30.2791 26.3016L22.8522 30.75C22.5887 30.9078 22.2673 30.9358 21.9804 30.8258L17.5753 29.1372C17.3449 29.0489 17.0899 29.0489 16.8595 29.1372L12.6421 30.7539C12.2553 30.9021 12 31.2734 12 31.6876Z" fill="#0053E2"/>
                          </svg>
                        </div>
                        <span className="text-xs text-ld-primary text-center">Unified Reports</span>
                      </button>
                    </div>

                    <h3 className="text-sm font-extrabold text-foreground mb-2">Tools and help</h3>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setMediaSolutionsOpen(false)}
                        className="flex items-center gap-2 p-2 rounded border border-border hover:border-[#0053E2] transition-colors"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#C3E7EF] flex items-center justify-center flex-shrink-0">
                          <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="15" height="10" rx="1" fill="#E3E4E5"/>
                            <rect x="0" y="1" width="15" height="3" fill="#171819"/>
                            <rect x="1" y="6" width="4" height="3" rx="0.5" fill="#90B5F9"/>
                          </svg>
                        </div>
                        <span className="text-xs text-ld-primary">Billing Manager</span>
                      </button>

                      <button
                        onClick={() => setMediaSolutionsOpen(false)}
                        className="flex items-center gap-2 p-2 rounded border border-border hover:border-[#0053E2] transition-colors"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#C3E7EF] flex items-center justify-center flex-shrink-0">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#C3E7EF"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.1229 4.928C16.3784 5.47725 16.3422 6.14398 15.9698 6.67587C15.5829 7.2284 14.9352 7.48978 14.3095 7.41013L6.73269 14.9869C6.8077 15.5146 6.64226 16.0699 6.23637 16.4758C5.55121 17.1609 4.44036 17.1609 3.7552 16.4758C3.07005 15.7906 3.07005 14.6798 3.7552 13.9946C4.16103 13.5888 4.71622 13.4233 5.24383 13.4983L12.7995 5.94265C12.7313 5.50965 12.8242 5.05068 13.0954 4.66325C13.4679 4.1313 14.0821 3.86922 14.6857 3.92151L13.814 5.1664L15.2512 6.17272L16.1229 4.928Z" fill="#909196"/>
                          </svg>
                        </div>
                        <span className="text-xs text-ld-primary">Associate tools</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <Divider orientation="vertical" UNSAFE_className="h-[22px]" />
          <div className="flex items-center gap-1 text-xs">
            <span className="text-foreground">Coca Cola</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <Divider orientation="vertical" UNSAFE_className="h-[22px]" />
          <div className="flex items-center gap-1">
            <button className="relative p-1 rounded-full hover-ld-gray">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            </button>
            <button className="p-1 rounded hover-ld-gray">
              <HelpCircle className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover-ld-gray">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />
        
        <div className="flex-1 overflow-y-auto">
          {/* Page Content */}
          <div className="bg-ld-main p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-[32px] font-normal text-ld-primary">Omni ROAS</h1>
              <button className="h-10 px-6 rounded-full border border-ld bg-ld-main text-ld-primary text-sm font-normal hover-ld-gray transition-colors">
                Export to CSV
              </button>
            </div>

            {/* Date Range Info */}
            <div className="flex flex-col gap-0.5 mb-6">
              <p className="text-sm text-ld-primary">
                Item's health on as of the date, date range: 01/06/2026 - 01/13/2026
              </p>
              <p className="text-sm text-ld-primary">
                *Report only shows enabled items that have been live for at least 3 days
              </p>
              <p className="text-sm text-ld-primary">
                **The data below is from Walmart.com only
              </p>
            </div>

            {/* Filters and Search */}
            <div className="flex items-center gap-3 mb-6 bg-ld-subtle p-4 rounded-lg">
              {/* Filter Dropdowns */}
              <div className="relative">
                <button className="h-10 px-4 bg-ld-main border border-ld-disabled rounded text-sm text-ld-primary flex items-center gap-2 hover-ld-gray transition-colors min-w-[140px]">
                  Item Status (2)
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </button>
              </div>

              <div className="relative">
                <button className="h-10 px-4 bg-ld-main border border-ld-disabled rounded text-sm text-ld-primary flex items-center gap-2 hover-ld-gray transition-colors min-w-[160px]">
                  All Campaigns (3)
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </button>
              </div>

              <div className="relative">
                <button className="h-10 px-4 bg-ld-main border border-ld-disabled rounded text-sm text-ld-primary flex items-center gap-2 hover-ld-gray transition-colors min-w-[160px]">
                  All Ad Groups (3)
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex-1 flex items-center gap-2 h-10 px-4 bg-background border border-[#BABBBE] rounded">
                <input
                  type="text"
                  placeholder="Search for item ID or primary variant ID"
                  className="flex-1 text-sm text-foreground border-none outline-none bg-transparent placeholder:text-[#909196]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-ld-main">
              <table className="w-full text-sm">
                <thead className="bg-ld-fill-subtlest sticky top-0 z-10">
                  <tr>
                    <th className="p-2 text-center font-bold text-foreground border-b border-t border-border w-16">
                      {/* Alerts/Notifications column */}
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border max-w-[100px]">
                      <div className="flex items-center gap-1">Item Image</div>
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border max-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('itemId')}>
                        Item ID
                        {renderSortIcon('itemId')}
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border max-w-[100px]">
                      <div className="flex items-center gap-1">Campaign ID</div>
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border max-w-[100px]">
                      <div className="flex items-center gap-1">Ad Group ID</div>
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border max-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('primaryVariant')}>
                        Primary Variant
                        {renderSortIcon('primaryVariant')}
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border max-w-[120px]">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('productDetailPageViewsToday')}>
                        Product Detail Page Views Today
                        {renderSortIcon('productDetailPageViewsToday')}
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border max-w-[120px]">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('productDetailPageViewsLast7Days')}>
                        Product Detail Page Views in Last 7 Days
                        {renderSortIcon('productDetailPageViewsLast7Days')}
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border max-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('itemAvailableToday')}>
                        Item Available Today
                        {renderSortIcon('itemAvailableToday')}
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border max-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('itemAvailableLast7Days')}>
                        Item Available in Last 7 Days
                        {renderSortIcon('itemAvailableLast7Days')}
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border max-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('buyBoxWinRateToday')}>
                        Buy Box Win Rate Today
                        {renderSortIcon('buyBoxWinRateToday')}
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border max-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('buyBoxWinRateLast7Days')}>
                        Buy Box Win Rate in Last 7 Days
                        {renderSortIcon('buyBoxWinRateLast7Days')}
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-foreground border-b border-t border-border min-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('olq')}>
                        OLQ
                        {renderSortIcon('olq')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itemHealthData.map((item, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted">
                      <td className="px-2 py-2">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F8D2D3]">
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]">
                              <path d="M10.1322 5.0656C10.4529 5.0656 10.7178 5.30386 10.7598 5.61299L10.7656 5.69893V12.2104C10.7656 12.5602 10.482 12.8438 10.1322 12.8438C9.81161 12.8438 9.54663 12.6055 9.50469 12.2964L9.49891 12.2104V5.69893C9.49891 5.34915 9.78246 5.0656 10.1322 5.0656Z" fill="#A20C00"/>
                              <path d="M10.1322 15.1989C10.482 15.1989 10.7656 14.9153 10.7656 14.5655C10.7656 14.2158 10.482 13.9322 10.1322 13.9322C9.78246 13.9322 9.49891 14.2158 9.49891 14.5655C9.49891 14.9153 9.78246 15.1989 10.1322 15.1989Z" fill="#A20C00"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M18.9989 10.1322C18.9989 5.23534 15.0291 1.26562 10.1322 1.26562C5.23534 1.26562 1.26562 5.23534 1.26562 10.1322C1.26562 15.0291 5.23534 18.9989 10.1322 18.9989C15.0291 18.9989 18.9989 15.0291 18.9989 10.1322ZM2.53228 10.1322C2.53228 5.9349 5.9349 2.53228 10.1322 2.53228C14.3296 2.53228 17.7322 5.9349 17.7322 10.1322C17.7322 14.3296 14.3296 17.7322 10.1322 17.7322C5.9349 17.7322 2.53228 14.3296 2.53228 10.1322Z" fill="#A20C00"/>
                            </svg>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="w-12 h-12 rounded flex items-center justify-center">
                          {item.itemImage}
                        </div>
                      </td>
                      <td className="px-2 py-2 text-sm underline cursor-pointer hover:no-underline">
                        {item.itemId}
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex flex-col gap-1">
                          {item.campaignIds.map((id, i) => (
                            <span key={i} className="text-sm underline cursor-pointer hover:no-underline">
                              {id}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex flex-col gap-1">
                          {item.adGroupIds.map((id, i) => (
                            <span key={i} className="text-sm underline cursor-pointer hover:no-underline">
                              {id}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-2 py-2 text-sm text-foreground">{item.primaryVariant}</td>
                      <td className="px-2 py-2 text-sm text-foreground">{item.productDetailPageViewsToday.toLocaleString()}</td>
                      <td className="px-2 py-2 text-sm text-foreground">{item.productDetailPageViewsLast7Days.toLocaleString()}</td>
                      <td className="px-2 py-2 text-sm text-foreground">{item.itemAvailableToday}</td>
                      <td className="px-2 py-2 text-sm text-foreground">{item.itemAvailableLast7Days}</td>
                      <td className="px-2 py-2 text-sm text-foreground">{item.buyBoxWinRateToday}</td>
                      <td className="px-2 py-2 text-sm text-foreground">{item.buyBoxWinRateLast7Days}</td>
                      <td className="px-2 py-2">
                        <OLQTag value={item.olq} size="md" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Marty Panel */}
        {showMartyPanel && <MartyFloatingPanel />}
      </div>
    </div>
  );
}
