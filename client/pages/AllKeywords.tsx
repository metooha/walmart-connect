import { useState, useRef, useMemo } from "react";
import { ChevronDown, ChevronUp, Bell, HelpCircle, User, Search, Calendar, Filter, Download, Settings as SettingsIcon, X, Menu, Gear, Sliders } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select, SelectItem } from "@/components/ui/Select";
import { Chip } from "@/components/ui/Chip";
import { Switch } from "@/components/ui/Switch";
import { IconButton } from "@/components/ui/IconButton";
import { Link } from "@/components/ui/Link";
import { useNavigate } from "react-router-dom";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import KeywordsPerformanceChart from "../features/sponsored-search/KeywordsPerformanceChart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Divider } from "../components/ui/Divider";
import { MastHead } from "../components/ui/MastHead";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";

interface Keyword {
  id: string;
  keywordId: string;
  keyword: string;
  status: string;
  matchType: string;
  suggestedBid: string;
  bid: string;
  campaignName: string;
  campaignId: string;
  campaignStatus: string;
  adGroupName: string;
  adGroupId: string;
  adGroupStatus: string;
  totalAttributedSales: string;
  roas: string;
  omniRoas: string;
  adSpend: string;
  averageCPC: string;
  impressions: string;
  clicks: string;
  ctr: string;
  totalProductDetailPageViews: string;
  totalAddToCart: string;
  conversionRate: string;
  orders: string;
  unitsSold: string;
}

export default function AllKeywords() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);
  const [isMartyMinimized, setIsMartyMinimized] = useLocalStorage('marty:minimized', false);
  const [mediaSolutionsOpen, setMediaSolutionsOpen] = useState(false);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState('Sponsored Search');

  // Selected rows state
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Keyword switches state (track which keywords have switches enabled)
  const [keywordSwitches, setKeywordSwitches] = useState<Record<string, boolean>>({});

  // Search state
  const [dateRange, setDateRange] = useState<string>('jan3-jan9');
  const [dataType, setDataType] = useState<string>('attributed');
  const [attribution, setAttribution] = useState<string>('14');
  const [campaignStatus, setCampaignStatus] = useState<string>('scheduled');
  const [adGroupStatus, setAdGroupStatus] = useState<string>('enabled');
  const [searchScope, setSearchScope] = useState<string>('Keyword');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCampaignStatusDropdown, setShowCampaignStatusDropdown] = useState(false);
  const [showAdGroupStatusDropdown, setShowAdGroupStatusDropdown] = useState(false);
  const [showAttributionDropdown, setShowAttributionDropdown] = useState(false);
  const [showSearchScopeDropdown, setShowSearchScopeDropdown] = useState(false);

  // Refs for scrolling
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [keywordsData] = useState<Keyword[]>([
    {
      id: "kw-001",
      keywordId: "2904183",
      keyword: "hisense 50",
      status: "Enabled",
      matchType: "Exact",
      suggestedBid: "$0.87",
      bid: "$0.88",
      campaignName: "SP - GTV - HISENSE - U7 & U8 Series",
      campaignId: "2904183",
      campaignStatus: "Live",
      adGroupName: "SP - HISENSE 50-2441 ATEGORY BRANDED Y",
      adGroupId: "4733520",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-002",
      keywordId: "2904183",
      keyword: "hisense 65 inch television",
      status: "Enabled",
      matchType: "Exact",
      suggestedBid: "$0.56",
      bid: "$0.56",
      campaignName: "SP - GTV - HISENSE - U7 & U8 Series",
      campaignId: "2904183",
      campaignStatus: "Live",
      adGroupName: "SP - HISENSE 50-2441 ATEGORY BRANDED Y",
      adGroupId: "4733520",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-003",
      keywordId: "4001947",
      keyword: "tcl 42 inch smart television",
      status: "Enabled",
      matchType: "Phrase",
      suggestedBid: "$1.00",
      bid: "$1.00",
      campaignName: "SP - GTV - TCL 43 - BRAND ED",
      campaignId: "4001947",
      campaignStatus: "Paused",
      adGroupName: "SP - GTV - TCL 43 - BR",
      adGroupId: "4733500",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-004",
      keywordId: "4001947",
      keyword: "43 inch tcl television",
      status: "Enabled",
      matchType: "Phrase",
      suggestedBid: "$1.08",
      bid: "$1.00",
      campaignName: "SP - GTV - TCL 43 - BRAND ED",
      campaignId: "4001947",
      campaignStatus: "Paused",
      adGroupName: "SP - GTV - TCL 43 - BR",
      adGroupId: "4733425",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-005",
      keywordId: "4001947",
      keyword: "45 inch tcl",
      status: "Enabled",
      matchType: "Exact",
      suggestedBid: "$1.21",
      bid: "$1.00",
      campaignName: "SP - GTV - TCL 43 - BRAND ED",
      campaignId: "4001947",
      campaignStatus: "Paused",
      adGroupName: "SP - GTV - TCL 43 - BR",
      adGroupId: "4733425",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-006",
      keywordId: "112154471",
      keyword: "jumbo shrimp",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.41",
      bid: "$2.00",
      campaignName: "GV_Red Shrimp",
      campaignId: "4023978",
      campaignStatus: "Paused",
      adGroupName: "RedShrimp 32 OZ",
      adGroupId: "4733497",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-007",
      keywordId: "112154396",
      keyword: "shrimp tail off",
      status: "Disabled",
      matchType: "broad",
      suggestedBid: "$1.91",
      bid: "$2.00",
      campaignName: "GV_Red Shrimp",
      campaignId: "4023978",
      campaignStatus: "Paused",
      adGroupName: "RedShrimp",
      adGroupId: "4733420",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-008",
      keywordId: "112051297",
      keyword: "led flood light bulb daylight",
      status: "Disabled",
      matchType: "broad",
      suggestedBid: "$0.30",
      bid: "$0.75",
      campaignName: "GV_LEDBulb",
      campaignId: "4024073",
      campaignStatus: "Paused",
      adGroupName: "LEDBulb",
      adGroupId: "4733520",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-009",
      keywordId: "112051296",
      keyword: "led flood light bulb",
      status: "Disabled",
      matchType: "broad",
      suggestedBid: "$0.87",
      bid: "$1.50",
      campaignName: "GV_LEDBulb",
      campaignId: "4024073",
      campaignStatus: "Paused",
      adGroupName: "LEDBulb",
      adGroupId: "4733520",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-010",
      keywordId: "112051194",
      keyword: "french vanilla cappuccino liquid",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$2.04",
      bid: "$2.08",
      campaignName: "GV_CappuccinoMix",
      campaignId: "4024056",
      campaignStatus: "Paused",
      adGroupName: "CappuccinoMix",
      adGroupId: "4733500",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-011",
      keywordId: "112051193",
      keyword: "french vanilla cappuccino",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.97",
      bid: "$3.00",
      campaignName: "GV_CappuccinoMix",
      campaignId: "4024056",
      campaignStatus: "Paused",
      adGroupName: "CappuccinoMix",
      adGroupId: "4733500",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-012",
      keywordId: "112051192",
      keyword: "french vanilla cappuccino mix",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$1.01",
      bid: "$3.00",
      campaignName: "GV_CappuccinoMix",
      campaignId: "4024056",
      campaignStatus: "Paused",
      adGroupName: "CappuccinoMix",
      adGroupId: "4733500",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-013",
      keywordId: "112051163",
      keyword: "frozen shrimp",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.51",
      bid: "$0.46",
      campaignName: "GV_Red Shrimp",
      campaignId: "4023978",
      campaignStatus: "Paused",
      adGroupName: "RedShrimp 32 OZ",
      adGroupId: "4733497",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-014",
      keywordId: "112051162",
      keyword: "easy peel shrimp",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$3.00",
      bid: "$3.00",
      campaignName: "GV_Red Shrimp",
      campaignId: "4023978",
      campaignStatus: "Paused",
      adGroupName: "RedShrimp 32 OZ",
      adGroupId: "4733497",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-015",
      keywordId: "112050940",
      keyword: "gel pack for injury",
      status: "Disabled",
      matchType: "broad",
      suggestedBid: "$0.97",
      bid: "$0.69",
      campaignName: "Equate_GelPak",
      campaignId: "4023982",
      campaignStatus: "Paused",
      adGroupName: "GelPak",
      adGroupId: "4733425",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-016",
      keywordId: "110865922",
      keyword: "t-mobile iphone",
      status: "Enabled",
      matchType: "exact",
      suggestedBid: "$2.70",
      bid: "$2.00",
      campaignName: "TMobile Test Campaign 1",
      campaignId: "3973132",
      campaignStatus: "Paused",
      adGroupName: "TMobile Test Campaign",
      adGroupId: "4672126",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-017",
      keywordId: "110865921",
      keyword: "t-mobile iphone",
      status: "Enabled",
      matchType: "phrase",
      suggestedBid: "$0.30",
      bid: "$2.00",
      campaignName: "TMobile Test Campaign 1",
      campaignId: "3973132",
      campaignStatus: "Paused",
      adGroupName: "TMobile Test Campaign",
      adGroupId: "4672126",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-018",
      keywordId: "110865920",
      keyword: "t-mobile iphone",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$1.50",
      bid: "$2.00",
      campaignName: "TMobile Test Campaign 1",
      campaignId: "3973132",
      campaignStatus: "Paused",
      adGroupName: "TMobile Test Campaign",
      adGroupId: "4672126",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-019",
      keywordId: "73371435",
      keyword: "egg 18 count",
      status: "Disabled",
      matchType: "exact",
      suggestedBid: "$1.13",
      bid: "$0.41",
      campaignName: "KWB_CampaignUnification_NEW",
      campaignId: "1431055",
      campaignStatus: "Paused",
      adGroupName: "test2",
      adGroupId: "3022309",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-020",
      keywordId: "59915184",
      keyword: "noosa yogurt",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.74",
      bid: "$1.62",
      campaignName: "KBC Campaign New 1",
      campaignId: "1833735",
      campaignStatus: "Paused",
      adGroupName: "AG1",
      adGroupId: "1208433",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    }
  ]);

  const keywords = useMemo(() => keywordsData, [keywordsData]);

  // Checkbox handlers
  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      keywords.forEach(keyword => {
        newSelectedRows.add(keyword.id);
      });
    } else {
      keywords.forEach(keyword => {
        newSelectedRows.delete(keyword.id);
      });
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectRow = (keywordId: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      newSelectedRows.add(keywordId);
    } else {
      newSelectedRows.delete(keywordId);
    }

    setSelectedRows(newSelectedRows);
  };

  const isAllSelected = () => {
    if (keywords.length === 0) return false;
    return keywords.every(keyword => selectedRows.has(keyword.id));
  };

  const isSomeSelected = () => {
    if (keywords.length === 0) return false;
    const selectedCount = keywords.filter(keyword => selectedRows.has(keyword.id)).length;
    return selectedCount > 0 && selectedCount < keywords.length;
  };

  const selectAllCheckedState: boolean | 'indeterminate' =
    isAllSelected() ? true : isSomeSelected() ? 'indeterminate' : false;


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MastHead
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />
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
              <path d="M21.8888 2.729C19.7291 2.729 18.2131 3.46076 17.6584 3.97894V6.83726C18.3003 6.26522 19.6567 5.42574 21.4417 5.42574C22.5475 5.42574 22.9594 5.73033 22.9594 6.35437C22.9594 6.89112 22.388 7.1047 20.7997 7.44458C18.3894 7.94418 16.9978 8.82081 16.9978 10.9102C16.9978 12.8399 18.2651 13.9654 20.1039 13.9654C21.6439 13.9654 22.5624 13.2504 23.0671 12.2902V13.6627H26.3865V7.08799C26.3865 4.06809 24.8168 2.729 21.8888 2.729ZM21.425 11.8036C20.6401 11.8036 20.2115 11.3207 20.2115 10.6595C20.2115 9.80144 20.8906 9.46342 21.746 9.15883C22.1931 8.99167 22.6384 8.81709 22.9409 8.5515V10.0336C22.9409 11.1591 22.3527 11.8017 21.4231 11.8017L21.425 11.8036Z" fill="#001F64"/>
              <path d="M31.0734 0.262451H27.6296V13.6607H31.0734V0.262451Z" fill="#001F64"/>
              <path d="M44.8985 2.76358C43.2267 2.76358 42.1469 3.76835 41.5828 5.10743C41.2803 3.67363 40.2728 2.76358 38.8664 2.76358C37.2725 2.76358 36.2335 3.69406 35.7065 5.00157V3.06817H32.3147V13.662H35.7585V7.78374C35.7585 6.33694 36.2409 5.51417 37.2762 5.51417C38.1149 5.51417 38.4007 6.08621 38.4007 6.97955V13.6601H41.8444V7.78188C41.8444 6.33508 42.3268 5.51232 43.3622 5.51232C44.2009 5.51232 44.4866 6.08435 44.4866 6.97769V13.6582H47.9304V6.4948C47.9304 4.26238 46.8765 2.76172 44.8967 2.76172L44.8985 2.76358Z" fill="#001F64"/>
              <path d="M53.5715 2.729C51.4117 2.729 49.8958 3.46076 49.341 3.97894V6.83726C49.983 6.26522 51.3393 5.42574 53.1243 5.42574C54.2301 5.42574 54.6421 5.73033 54.6421 6.35437C54.6421 6.89112 54.0706 7.1047 52.4823 7.44458C50.072 7.94418 48.6804 8.82081 48.6804 10.9102C48.6804 12.8399 49.9477 13.9654 51.7865 13.9654C53.3265 13.9654 54.245 13.2504 54.7497 12.2902V13.6627H58.0691V7.08799C58.0691 4.06809 56.4994 2.729 53.5715 2.729ZM53.1076 11.8036C52.3227 11.8036 51.8941 11.3207 51.8941 10.6595C51.8941 9.80144 52.5732 9.46342 53.4286 9.15883C53.8757 8.99167 54.3211 8.81709 54.6235 8.5515V10.0336C54.6235 11.1591 54.0353 11.8017 53.1057 11.8017L53.1076 11.8036Z" fill="#001F64"/>
              <path d="M62.6203 6.06081V3.06692H59.2471V13.6607H62.6908V9.15872C62.6908 7.08602 63.9767 6.53256 65.2068 6.53256C65.6169 6.53256 66.0103 6.58642 66.1884 6.64028V2.99634C64.2494 2.90348 63.0731 4.14227 62.6185 6.06081H62.6203Z" fill="#001F64"/>
              <path d="M72.7587 5.74587V3.06584H70.5636V1.01172H67.1199V10.1234C67.1199 12.6771 68.5653 13.8751 70.8679 13.8751C71.9385 13.8751 72.51 13.6615 72.7605 13.4999V10.8385C72.5638 10.9815 72.2428 11.0892 71.8328 11.0892C71.0646 11.1078 70.5655 10.7679 70.5655 9.64239V5.74772H72.7605L72.7587 5.74587Z" fill="#001F64"/>
              <path d="M89.2666 3.88538C88.5504 3.38392 87.4965 3.02547 86.3145 3.02547C84.2215 3.02547 82.4867 4.33298 82.4867 6.98143C82.4867 9.62988 84.151 10.9207 86.3145 10.9207C87.4055 10.9207 88.4261 10.6885 89.2666 10.1332V13.2478C88.5875 13.6601 87.5132 13.9461 86.1531 13.9461C82.021 13.9461 78.9075 11.3497 78.9075 6.98143C78.9075 2.61316 82.1119 0 86.1178 0C87.2441 0 88.5856 0.215442 89.2666 0.590608V3.88538Z" fill="#00C0FB"/>
              <path d="M89.9536 8.3078C89.9536 4.94245 92.2433 2.73975 95.4458 2.73975C98.6484 2.73975 100.919 4.94245 100.919 8.3078C100.919 11.6732 98.6113 13.8759 95.4458 13.8759C92.2804 13.8759 89.9536 11.6732 89.9536 8.3078ZM97.5907 8.3078C97.5907 6.57127 96.8207 5.37148 95.444 5.37148C94.0672 5.37148 93.2619 6.57127 93.2619 8.3078C93.2619 10.0443 94.0486 11.2441 95.444 11.2441C96.8393 11.2441 97.5907 10.0629 97.5907 8.3078Z" fill="#00C0FB"/>
              <path d="M105.126 13.6606H101.745V3.0612H105.09V5.29919C105.645 3.81339 106.808 2.73804 108.632 2.73804C110.761 2.73804 111.943 4.25913 111.943 6.62342V13.6587H108.562V7.17688C108.562 6.08481 108.15 5.45892 107.094 5.45892C105.914 5.45892 105.126 6.49712 105.126 8.28752V13.6587V13.6606Z" fill="#00C0FB"/>
              <path d="M116.396 13.6606H113.015V3.0612H116.36V5.29919C116.915 3.81339 118.078 2.73804 119.902 2.73804C122.031 2.73804 123.213 4.25913 123.213 6.62342V13.6587H119.832V7.17688C119.832 6.08481 119.42 5.45892 118.364 5.45892C117.184 5.45892 116.396 6.49712 116.396 8.28752V13.6587V13.6606Z" fill="#00C0FB"/>
              <path d="M130 14.0007C126.154 14.0007 123.918 11.8704 123.918 8.36021C123.918 4.85 126.226 2.71973 129.195 2.71973C132.163 2.71973 134.31 4.61784 134.024 9.18298H127.28C127.53 10.6874 128.478 11.3485 130.34 11.3485C131.646 11.3485 132.88 10.9548 133.524 10.4348V13.1389C133.076 13.5141 131.716 13.9988 130 13.9988V14.0007ZM127.3 7.23286H130.931C130.878 5.76563 130.252 5.15645 129.267 5.15645C128.211 5.15645 127.532 5.76563 127.298 7.23286H127.3Z" fill="#00C0FB"/>
              <path d="M143.335 6.30134C142.762 5.83517 141.94 5.42472 140.831 5.42472C139.309 5.42472 138.129 6.40907 138.129 8.36104C138.129 10.313 139.309 11.2621 140.831 11.2621C141.957 11.2621 142.762 10.9036 143.335 10.4746V13.2493C142.907 13.5354 141.94 13.9477 140.472 13.9477C137.27 13.9477 134.748 11.9251 134.748 8.36104C134.748 4.79697 137.27 2.77441 140.472 2.77441C141.994 2.77441 142.87 3.06043 143.335 3.2573V6.30134Z" fill="#00C0FB"/>
              <path d="M145.4 5.67658H144.094V3.95861C145.4 3.72646 146.365 2.83126 146.58 0.843994H148.781V3.06342H150.981V5.67658H148.781V9.6511C148.781 10.797 149.3 11.1369 150.068 11.1369C150.48 11.1369 150.785 11.0125 150.981 10.8862V13.4993C150.749 13.6609 150.176 13.8745 149.139 13.8745C146.849 13.8745 145.4 12.6747 145.4 10.1321V5.67472V5.67658Z" fill="#00C0FB"/>
              <path d="M164.717 0.818604H167.096L171.458 13.6615H169.816L168.601 10.0826H163.111L161.879 13.6615H160.374L164.719 0.818604H164.717ZM163.537 8.76395H168.172L165.862 2.03511L163.536 8.76395H163.537Z" fill="#002066"/>
              <path d="M179.875 6.1954V0.21875H181.448V13.6597H179.892V11.4849C179.242 12.9057 178.01 13.8473 176.368 13.8473C173.854 13.8473 172.212 11.7245 172.212 8.88099C172.212 6.03753 173.854 3.89798 176.42 3.89798C178.029 3.89798 179.242 4.77089 179.875 6.19169V6.1954ZM173.733 8.88285C173.733 11.0057 174.828 12.5639 176.795 12.5639C178.762 12.5639 179.96 11.0057 179.96 8.88285C179.96 6.76001 178.695 5.20177 176.795 5.20177C174.895 5.20177 173.733 6.77672 173.733 8.88285Z" fill="#002066"/>
              <path d="M196.862 3.21421C196.177 2.5976 195.118 2.03299 193.407 2.03299C190.893 2.03299 188.703 3.93297 188.703 7.27231C188.703 10.6117 190.824 12.4782 193.407 12.4782C194.947 12.4782 196.007 12.0678 196.862 11.3304V12.9054C196.213 13.3678 195.135 13.899 193.355 13.899C189.917 13.899 187.026 11.4511 187.026 7.27231C187.026 3.09349 189.986 0.628906 193.355 0.628906C195.168 0.628906 196.246 1.10808 196.862 1.55382V3.21421Z" fill="#002066"/>
              <path d="M203.449 13.867C200.558 13.867 198.402 12.1212 198.402 8.936C198.402 5.7508 200.438 3.90283 202.987 3.90283C205.537 3.90283 207.281 5.66723 207.025 9.21087H199.959C200.061 11.4024 201.464 12.5335 203.551 12.5335C204.8 12.5335 205.963 12.1565 206.665 11.5064V12.9272C206.219 13.3563 204.937 13.8689 203.449 13.8689V13.867ZM200.011 8.06309H205.52C205.503 6.12783 204.373 5.16948 203.022 5.16948C201.414 5.16948 200.269 6.11111 200.011 8.06309Z" fill="#002066"/>
              <path d="M210.634 13.661H209.077V4.12399H210.634V6.33227C211.164 4.92819 212.328 3.90112 214.072 3.90112C215.953 3.90112 217.219 5.06562 217.219 7.49677V13.661H215.679V7.68435C215.679 5.88653 214.823 5.23649 213.489 5.23649C211.881 5.23649 210.632 6.55514 210.632 8.98629V13.661H210.634Z" fill="#002066"/>
              <path d="M221.703 1.91411V4.12239H224.236V5.44104H221.703V10.7324C221.703 12.051 222.217 12.4968 223.157 12.4782C223.671 12.4782 224.065 12.324 224.236 12.2033V13.4867C224.048 13.6241 223.636 13.8117 222.849 13.8117C221.259 13.8117 220.129 12.9722 220.129 10.9515V5.43733H218.881V4.56442C220.129 4.37684 220.523 3.79366 220.71 1.9104H221.703V1.91411Z" fill="#002066"/>
              <path d="M230.565 13.867C227.674 13.867 225.518 12.1212 225.518 8.936C225.518 5.7508 227.553 3.90283 230.103 3.90283C232.652 3.90283 234.396 5.66723 234.14 9.21087H227.075C227.177 11.4024 228.579 12.5335 230.667 12.5335C231.915 12.5335 233.079 12.1565 233.78 11.5064V12.9272C233.335 13.3563 232.053 13.8689 230.565 13.8689V13.867ZM227.125 8.06309H232.634C232.617 6.12783 231.487 5.16948 230.136 5.16948C228.527 5.16948 227.383 6.11111 227.125 8.06309Z" fill="#002066"/>
              <path d="M237.749 13.6593H236.192V4.12228H237.732V6.50142C238.211 4.92647 239.391 4.00155 241 4.08699V5.73066C240.879 5.69723 240.64 5.66194 240.436 5.66194C239.118 5.66194 237.751 6.55157 237.751 8.86385V13.6574L237.749 13.6593Z" fill="#002066"/>
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
                          <div className="w-8 h-8 rounded bg-[#4DBDF5] absolute left-1 top-0" />
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
          {/* Page Header */}
          <div className="bg-ld-main shadow-sm px-6 py-4">
            {/* Title Row */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-[20px] font-bold text-ld-primary">All Keywords</h1>
              <Button variant="secondary" size="medium" onClick={() => navigate('/campaign')}>
                + Create campaign
              </Button>
            </div>

            {/* Filter Row */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {/* Date Range */}
              <div className="flex items-center gap-1.5 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground cursor-pointer hover:bg-muted transition-colors">
                <Calendar className="w-4 h-4 text-foreground flex-shrink-0" />
                <span>Feb 10, 2026 - Mar 11, 2026</span>
              </div>

              {/* Spacer to push remaining items to the right */}
              <div className="flex-1"></div>

              {/* Data Type Segmented Toggle */}
              <div className="flex items-center border border-[var(--ld-semantic-color-separator)] rounded overflow-hidden text-[13px]">
                <button
                  onClick={() => setDataType('attributed')}
                  className={`h-8 px-3 transition-colors ${
                    dataType === 'attributed'
                      ? 'text-[var(--ld-semantic-color-action-fill-primary)] font-medium'
                      : 'text-foreground hover:bg-muted'
                  } border-r border-[var(--ld-semantic-color-separator)]`}
                >
                  Attributed data
                </button>
                <button
                  onClick={() => setDataType('realtime')}
                  className={`h-8 px-3 transition-colors ${
                    dataType === 'realtime'
                      ? 'text-[var(--ld-semantic-color-action-fill-primary)] font-medium'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  Near real time data
                </button>
              </div>

              {/* Campaign Status Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setShowCampaignStatusDropdown(v => !v); setShowAdGroupStatusDropdown(false); setShowAttributionDropdown(false); }}
                  className="flex items-center gap-1 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground hover:bg-muted transition-colors"
                >
                  <span>
                    Campaign Status:{' '}
                    <span className="font-medium">
                      {campaignStatus === 'all' ? 'All' : campaignStatus === 'live' ? 'Live' : campaignStatus === 'paused' ? 'Paused' : campaignStatus === 'scheduled' ? 'Scheduled, Resc...' : 'Ended'}
                    </span>
                  </span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </button>
                {showCampaignStatusDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowCampaignStatusDropdown(false)} />
                    <div className="absolute top-full mt-1 left-0 w-44 bg-background border border-[var(--ld-semantic-color-separator)] rounded shadow-md z-50 py-1">
                      {[['all','All statuses'],['live','Live'],['paused','Paused'],['scheduled','Scheduled'],['ended','Ended']].map(([val, label]) => (
                        <button key={val} onClick={() => { setCampaignStatus(val); setShowCampaignStatusDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted transition-colors ${campaignStatus === val ? 'font-medium' : ''}`}>{label}</button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Ad Group Status Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setShowAdGroupStatusDropdown(v => !v); setShowCampaignStatusDropdown(false); setShowAttributionDropdown(false); }}
                  className="flex items-center gap-1 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground hover:bg-muted transition-colors"
                >
                  <span>
                    Ad Group Status:{' '}
                    <span className="font-medium">
                      {adGroupStatus === 'all' ? 'All' : adGroupStatus === 'enabled' ? 'Enabled' : adGroupStatus === 'paused' ? 'Paused' : 'Disabled'}
                    </span>
                  </span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </button>
                {showAdGroupStatusDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowAdGroupStatusDropdown(false)} />
                    <div className="absolute top-full mt-1 left-0 w-40 bg-background border border-[var(--ld-semantic-color-separator)] rounded shadow-md z-50 py-1">
                      {[['all','All'],['enabled','Enabled'],['paused','Paused'],['disabled','Disabled']].map(([val, label]) => (
                        <button key={val} onClick={() => { setAdGroupStatus(val); setShowAdGroupStatusDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted transition-colors ${adGroupStatus === val ? 'font-medium' : ''}`}>{label}</button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Attribution Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setShowAttributionDropdown(v => !v); setShowCampaignStatusDropdown(false); setShowAdGroupStatusDropdown(false); }}
                  className="flex items-center gap-1 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground hover:bg-muted transition-colors"
                >
                  <span>
                    Attribution:{' '}
                    <span className="font-medium">{attribution} days</span>
                  </span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </button>
                {showAttributionDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowAttributionDropdown(false)} />
                    <div className="absolute top-full mt-1 left-0 w-32 bg-background border border-[var(--ld-semantic-color-separator)] rounded shadow-md z-50 py-1">
                      {['7','14','30','60','90'].map((val) => (
                        <button key={val} onClick={() => { setAttribution(val); setShowAttributionDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted transition-colors ${attribution === val ? 'font-medium' : ''}`}>{val} days</button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* All Filters */}
              <button className="flex items-center gap-1.5 h-8 px-3 text-[13px] text-foreground hover:bg-muted rounded transition-colors">
                <Sliders className="w-4 h-4" />
                <span>All filters</span>
              </button>
            </div>

            {/* Search Row */}
            <div className="flex items-center gap-2">
              {/* Keyword scope selector */}
              <div className="relative">
                <button
                  onClick={() => setShowSearchScopeDropdown(v => !v)}
                  className="flex items-center gap-1 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {searchScope}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {showSearchScopeDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowSearchScopeDropdown(false)} />
                    <div className="absolute top-full mt-1 left-0 w-32 bg-background border border-[var(--ld-semantic-color-separator)] rounded shadow-md z-50 py-1">
                      {['Keyword','ID'].map((val) => (
                        <button key={val} onClick={() => { setSearchScope(val); setShowSearchScopeDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted transition-colors ${searchScope === val ? 'font-medium' : ''}`}>{val}</button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Search Input */}
              <div className="flex items-center gap-2 flex-1 px-3 h-8 border border-[var(--ld-semantic-color-separator)] rounded bg-background relative">
                <input
                  type="text"
                  placeholder={`Search ${searchScope}`}
                  className="flex-1 text-[13px] border-none outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                  value={searchQuery || ''}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery ? (
                  <button onClick={() => setSearchQuery('')} className="p-0.5 hover:bg-muted rounded-full transition-colors" aria-label="Clear search">
                    <X className="w-4 h-4 text-foreground" />
                  </button>
                ) : (
                  <Search className="w-4 h-4 text-foreground" />
                )}
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="pt-7 pb-4">
            <KeywordsPerformanceChart />
          </div>

          {/* Data Table */}
          <div className="px-6 py-7">
            <div className="bg-background rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
              {/* Table Header */}
              <div className="px-6 py-6">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-[20px] font-bold text-[#000] leading-7">
                    Manage your keywords (4264)
                  </h2>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center w-8 h-8 border border-[rgba(46,47,50,1)] rounded-full hover:bg-muted transition-colors">
                      <Gear className="w-4 h-4 text-foreground" />
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 border border-[rgba(46,47,50,1)] rounded-full hover:bg-muted transition-colors">
                      <Download className="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-5">
                  For Sponsored Products (Manual) campaigns. Analyze performance metrics and make updates to your keywords.{' '}
                  <Link href="#" UNSAFE_style={{ fontSize: '14px' }}>Learn More</Link>
                </p>
              </div>

              {/* Table Content */}
              <div ref={tableContainerRef} className="overflow-x-auto">
                <div className="flex">
                  {/* Checkbox Column */}
                  <div className="flex flex-col flex-shrink-0">
                    {/* Header */}
                    <div className="flex items-center justify-center h-[44px] px-3 border-b border-border bg-[#FAFAFA]">
                      <Checkbox
                        checked={selectAllCheckedState}
                        onCheckedChange={(checked) => handleSelectAll(checked === true)}
                        aria-label="Select all keywords"
                      />
                    </div>
                    {/* Rows */}
                    {keywords.map((keyword, idx) => (
                      <div key={idx} className="flex items-center justify-center h-[44px] px-3 border-b border-border bg-background">
                        <Checkbox
                          checked={selectedRows.has(keyword.id)}
                          onCheckedChange={(checked) => handleSelectRow(keyword.id, !!checked)}
                          aria-label={`Select keyword ${keyword.keyword}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Data Columns */}
                  <div className="flex flex-1 overflow-x-auto">
                    {/* Keyword Column */}
                    <div className="flex flex-col min-w-[300px] flex-1 sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center h-[44px] px-4 gap-1 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Keyword</span>
                        <button className="p-1 hover:bg-gray-200 transition-colors">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 2L6 10" stroke="#74767C" strokeWidth="1.2" strokeLinecap="round"/>
                            <path d="M4 8L6 10L8 8" stroke="#74767C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center gap-2 h-[44px] px-4 border-b border-border bg-background">
                          <Switch
                            aria-labelledby={`keyword-label-${keyword.id}`}
                            checked={keywordSwitches[keyword.id] || false}
                            onChange={(checked) => {
                              setKeywordSwitches(prev => ({
                                ...prev,
                                [keyword.id]: checked
                              }));
                            }}
                          />
                          <span
                            id={`keyword-label-${keyword.id}`}
                            className="text-[13px] text-foreground truncate"
                          >
                            {keyword.keyword}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Match Type Column */}
                    <div className="flex flex-col min-w-[120px] sticky left-[300px] z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Match type</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground capitalize">{keyword.matchType}</span>
                        </div>
                      ))}
                    </div>

                    {/* Suggested Bid Column */}
                    <div className="flex flex-col min-w-[130px] sticky left-[420px] z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Suggested bid</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-between h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.suggestedBid}</span>
                          <Link href="#" className="text-[13px]">
                            Apply
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Bid Column */}
                    <div className="flex flex-col min-w-[150px] sticky left-[550px] z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Bid</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.bid}</span>
                        </div>
                      ))}
                    </div>

                    {/* Campaign Name Column */}
                    <div className="flex flex-col min-w-[220px]">
                      <div className="flex items-center h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Campaign name</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center h-[44px] px-4 border-b border-border bg-background">
                          <a href="#" className="text-[13px] text-foreground underline hover:no-underline truncate">
                            {keyword.campaignName}
                          </a>
                        </div>
                      ))}
                    </div>

                    {/* Campaign Id Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Campaign Id</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.campaignId}</span>
                        </div>
                      ))}
                    </div>

                    {/* Campaign Status Column */}
                    <div className="flex flex-col min-w-[150px]">
                      <div className="flex items-center h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Campaign status</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center h-[44px] px-4 border-b border-border bg-background">
                          <span className={`text-[11px] px-2 py-0.5 rounded ${
                            keyword.campaignStatus === 'Live'
                              ? 'bg-[#E5F7E9] text-[#2A8703]'
                              : keyword.campaignStatus === 'Paused'
                              ? 'bg-[#FFF4E5] text-[#AF7400]'
                              : 'text-foreground'
                          }`}>
                            {keyword.campaignStatus}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Ad Group Name Column */}
                    <div className="flex flex-col min-w-[240px]">
                      <div className="flex items-center h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Ad Group Name</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center h-[44px] px-4 border-b border-border bg-background">
                          <a href="#" className="text-[13px] text-foreground underline hover:no-underline truncate">
                            {keyword.adGroupName}
                          </a>
                        </div>
                      ))}
                    </div>

                    {/* ROAS Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">ROAS</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.roas}</span>
                        </div>
                      ))}
                    </div>

                    {/* Online ROAS Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground whitespace-nowrap">Online ROAS</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.omniRoas}</span>
                        </div>
                      ))}
                    </div>

                    {/* Average CPC Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Average CPC</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.averageCPC}</span>
                        </div>
                      ))}
                    </div>

                    {/* Ad Spend Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Ad spend</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.adSpend}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total Attributed Sales Column */}
                    <div className="flex flex-col min-w-[180px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Total attributed sales</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.totalAttributedSales}</span>
                        </div>
                      ))}
                    </div>

                    {/* Impressions Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Impressions</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.impressions}</span>
                        </div>
                      ))}
                    </div>

                    {/* Clicks Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Clicks</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.clicks}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTR Column */}
                    <div className="flex flex-col min-w-[80px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">CTR</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.ctr}</span>
                        </div>
                      ))}
                    </div>

                    {/* Conversion Rate Column */}
                    <div className="flex flex-col min-w-[140px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Conversion rate</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.conversionRate}</span>
                        </div>
                      ))}
                    </div>

                    {/* Orders Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Orders</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.orders}</span>
                        </div>
                      ))}
                    </div>

                    {/* Units Sold Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-foreground">Units sold</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-border bg-background">
                          <span className="text-[13px] text-foreground">{keyword.unitsSold}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMartyPanel && (
        <MartyFloatingPanel
          isMinimized={isMartyMinimized}
          onMinimize={() => setIsMartyMinimized(true)}
          onExpand={() => setIsMartyMinimized(false)}
        />
      )}
    </div>
  );
}
