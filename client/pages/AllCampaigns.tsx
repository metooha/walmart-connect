import { useState, useRef, useMemo, useEffect } from "react";
import { ChevronDown, ChevronUp, Bell, HelpCircle, User, Search, Calendar, Filter, Download, Settings as SettingsIcon, X, MoreVertical, Wrench, BoxCorners, Pause, BarGraph, History } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import RecommendationsPopover from "../components/shared/RecommendationsPopover";
import BiddingStrategyModal from "../features/sponsored-search/BiddingStrategyModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Button } from "../components/ui/Button";
import { Select, SelectItem } from "../components/ui/Select";
import { Chip } from "../components/ui/Chip";
import { Checkbox } from "../components/ui/Checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import { Menu } from "../components/ui/Menu";
import { MenuItem } from "../components/ui/MenuItem";
import { Divider } from "../components/ui/Divider";
import { MastHead } from "../components/ui/MastHead";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";

interface Alert {
  type: 'item-health-issues' | 'out-of-budget';
  message: string;
  targetColumn?: 'biddingStrategy' | 'totalBudget';
}

interface Recommendation {
  type: 'update-roas';
  message: string;
  suggestedValue: string;
  targetColumn?: 'biddingStrategy';
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  totalBudget: string;
  suggestedTotalBudget: string;
  hasWarning: boolean;
  hasBolt: boolean;
  hasAlertIcon: boolean;
  hasRecIcon: boolean;
  dailyBudget: string;
  suggestedDailyBudget: string;
  biddingStrategy: string;
  biddingTarget: string;
  roasTarget: string;
  recommendedRoasTarget: string;
  biddingIcon: boolean;
  biddingStatus: string;
  biddingStatusDate: string;
  campaignType: string;
  avgCapOutTime: string;
  estMissedImpressions: string;
  estMissedClicks: string;
  campaignReviewStatus: string;
  roas: string;
  omniRoas: string;
  avgCPC: string;
  spend: string;
  totalAttributedSales: string;
  impressions: string;
  clicks: string;
  ctr: string;
  totalProductDetailPageViews: string;
  totalAddToCart: string;
  conversionRate: string;
  orders: string;
  unitsSold: string;
  alerts?: Alert[];
  recommendations?: Recommendation[];
}

export default function AllCampaigns() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);
  const [isMartyMinimized, setIsMartyMinimized] = useLocalStorage('marty:minimized', false);
  const [mediaSolutionsOpen, setMediaSolutionsOpen] = useState(false);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState('Sponsored Search');

  // Recommendations & Modal State
  const [recommendationsOpen, setRecommendationsOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [biddingModalOpen, setBiddingModalOpen] = useState(false);
  const [recommendedRoasValue, setRecommendedRoasValue] = useState<string | undefined>();

  // Selected rows state
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Filter dropdown state
  const [showAttributionDropdown, setShowAttributionDropdown] = useState(false);
  const [showCampaignStatusDropdown, setShowCampaignStatusDropdown] = useState(false);

  // Search state
  const [dateRange, setDateRange] = useState<string>('jan3-jan9');
  const [dataType, setDataType] = useState<string>('attributed');
  const [attribution, setAttribution] = useState<string>('14');
  const [campaignStatus, setCampaignStatus] = useState<string>('all');
  const [searchScope, setSearchScope] = useState<string>('Campaign name');
  const [showSearchScopeDropdown, setShowSearchScopeDropdown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openCampaignMenuId, setOpenCampaignMenuId] = useState<string | null>(null);

  // Refs for scrolling
  const biddingStrategyColumnRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [campaignsData, setCampaignsData] = useState<Campaign[]>([
    {
      id: "4673120",
      name: "SP - GTV - HiSense - New SKUs - Category - Auto",
      status: "Live",
      startDate: "10/08/2025",
      endDate: "No end date",
      totalBudget: "$12,500",
      suggestedTotalBudget: "-",
      hasWarning: true,
      hasBolt: false,
      hasAlertIcon: true,
      hasRecIcon: false,
      dailyBudget: "$150",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 3.25)",
      roasTarget: "3.25",
      recommendedRoasTarget: "2.50",
      biddingIcon: true,
      biddingStatus: "Optimizing",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "08:00am PST",
      estMissedImpressions: "422460 - 571565",
      estMissedClicks: "2747 - 3721",
      campaignReviewStatus: "-",
      roas: "47.84",
      omniRoas: "$52.62",
      avgCPC: "$0.65",
      spend: "$3,800",
      totalAttributedSales: "$181,810.95",
      impressions: "680,052",
      clicks: "5,803",
      ctr: "0.85%",
      totalProductDetailPageViews: "5,321",
      totalAddToCart: "2,822",
      conversionRate: "16.35%",
      orders: "949",
      unitsSold: "1,067",
      alerts: [
        {
          type: 'item-health-issues',
          message: 'Item health issues detected',
          targetColumn: 'biddingStrategy'
        },
        {
          type: 'out-of-budget',
          message: 'Campaign out-of-budget',
          targetColumn: 'totalBudget'
        }
      ],
      recommendations: [
        {
          type: 'update-roas',
          message: 'Update ROAS target',
          suggestedValue: '2.50',
          targetColumn: 'biddingStrategy'
        }
      ]
    },
    {
      id: "2596045",
      name: "SP - GTV - Hisense - Auto 2025 - All Products",
      status: "Live",
      startDate: "06/11/2025",
      endDate: "No end date",
      totalBudget: "$18,750",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: false,
      hasAlertIcon: true,
      hasRecIcon: false,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 2.75)",
      roasTarget: "2.75",
      recommendedRoasTarget: "2.50",
      biddingIcon: true,
      biddingStatus: "Optimizing",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "09:00am PST",
      estMissedImpressions: "1919114 - 2596447",
      estMissedClicks: "3231 - 4368",
      campaignReviewStatus: "-",
      roas: "24.75",
      omniRoas: "$27.23",
      avgCPC: "$0.68",
      spend: "$2,097.37",
      totalAttributedSales: "$51,904.76",
      impressions: "1,518,277",
      clicks: "3,084",
      ctr: "0.20%",
      totalProductDetailPageViews: "3,769",
      totalAddToCart: "848",
      conversionRate: "7.20%",
      orders: "222",
      unitsSold: "233",
      alerts: [
        {
          type: 'out-of-budget',
          message: 'Campaign out-of-budget',
          targetColumn: 'totalBudget'
        }
      ]
    },
    {
      id: "4694172",
      name: "SP - GTV - Philips - Auto 2025 - All Products",
      status: "Live",
      startDate: "06/11/2025",
      endDate: "No end date",
      totalBudget: "$22,300",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: true,
      hasAlertIcon: false,
      hasRecIcon: false,
      dailyBudget: "$100",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 4.10)",
      roasTarget: "4.10",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Optimizing",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "07:00am PST",
      estMissedImpressions: "3829208 - 5180689",
      estMissedClicks: "5530 - 7477",
      campaignReviewStatus: "-",
      roas: "23.04",
      omniRoas: "$25.34",
      avgCPC: "$0.67",
      spend: "$3,182.84",
      totalAttributedSales: "$73,342.94",
      impressions: "2,937,982",
      clicks: "4,732",
      ctr: "0.16%",
      totalProductDetailPageViews: "4,143",
      totalAddToCart: "1,120",
      conversionRate: "4.67%",
      orders: "221",
      unitsSold: "238"
    },
    {
      id: "4401295",
      name: "SP - GTV - TCL - Q Series 55in - Category - Auto",
      status: "Live",
      startDate: "10/14/2025",
      endDate: "No end date",
      totalBudget: "$15,600",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: true,
      hasAlertIcon: false,
      hasRecIcon: true,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 3.75)",
      roasTarget: "3.75",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Learning",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "09:00am PST",
      estMissedImpressions: "386173 - 522470",
      estMissedClicks: "819 - 1110",
      campaignReviewStatus: "-",
      roas: "12.25",
      omniRoas: "$13.48",
      avgCPC: "$1.54",
      spend: "$3,763.20",
      totalAttributedSales: "$46,114.60",
      impressions: "786,749",
      clicks: "2,439",
      ctr: "0.31%",
      totalProductDetailPageViews: "2,302",
      totalAddToCart: "478",
      conversionRate: "6.77%",
      orders: "165",
      unitsSold: "189",
      recommendations: [
        {
          type: 'update-roas',
          message: 'Update ROAS target',
          suggestedValue: '2.50',
          targetColumn: 'biddingStrategy'
        }
      ]
    },
    {
      id: "4683076",
      name: "SP  - GTV - TCL - Q Series 65in - Category - Auto",
      status: "Live",
      startDate: "10/14/2025",
      endDate: "No end date",
      totalBudget: "$27,800",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: true,
      hasAlertIcon: false,
      hasRecIcon: false,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 4.50)",
      roasTarget: "4.50",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Learning",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "08:00am PST",
      estMissedImpressions: "482528 - 652831",
      estMissedClicks: "828 - 1117",
      campaignReviewStatus: "-",
      roas: "10.72",
      omniRoas: "$11.79",
      avgCPC: "$1.51",
      spend: "$2,544.44",
      totalAttributedSales: "$27,281.10",
      impressions: "939,683",
      clicks: "1,689",
      ctr: "0.18%",
      totalProductDetailPageViews: "1,672",
      totalAddToCart: "299",
      conversionRate: "4.38%",
      orders: "74",
      unitsSold: "83"
    },
    {
      id: "4450652",
      name: "SBA - Onn. Q2 - 4K Plus Launch - Category",
      status: "Live",
      startDate: "05/29/2025",
      endDate: "No end date",
      totalBudget: "$9,900",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: false,
      hasAlertIcon: false,
      hasRecIcon: true,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 3.50)",
      roasTarget: "3.50",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Learning",
      biddingStatusDate: "Since 01/06/2025",
      campaignType: "Sponsored Brands",
      avgCapOutTime: "11:00am PST",
      estMissedImpressions: "182676 - 247151",
      estMissedClicks: "1620 - 2191",
      campaignReviewStatus: "Approved",
      roas: "10.69",
      omniRoas: "$11.76",
      avgCPC: "$1.03",
      spend: "$1,689.45",
      totalAttributedSales: "$18,054.63",
      impressions: "167,514",
      clicks: "1,644",
      ctr: "0.98%",
      totalProductDetailPageViews: "1,812",
      totalAddToCart: "651",
      conversionRate: "17.27%",
      orders: "284",
      unitsSold: "663",
      recommendations: [
        {
          type: 'update-roas',
          message: 'Update ROAS target',
          suggestedValue: '2.50',
          targetColumn: 'biddingStrategy'
        }
      ]
    },
    {
      id: "4431941",
      name: "SBA - Q2 2025 GTV - Custom Image - TCL - BRANDED",
      status: "Live",
      startDate: "07/03/2025",
      endDate: "No end date",
      totalBudget: "$24,400",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: false,
      hasAlertIcon: false,
      hasRecIcon: false,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 4.40)",
      roasTarget: "4.40",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Optimizing",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Brands",
      avgCapOutTime: "07:00am PST",
      estMissedImpressions: "238988 - 323334",
      estMissedClicks: "1641 - 2221",
      campaignReviewStatus: "Approved",
      roas: "10.59",
      omniRoas: "$11.65",
      avgCPC: "$2.24",
      spend: "$2,450",
      totalAttributedSales: "$25,936.38",
      impressions: "148,604",
      clicks: "1,095",
      ctr: "0.74%",
      totalProductDetailPageViews: "965",
      totalAddToCart: "198",
      conversionRate: "7.40%",
      orders: "81",
      unitsSold: "92"
    },
    {
      id: "camp-008",
      name: "SP - GTV - HiSense - 55in - Category - Auto",
      status: "Live",
      startDate: "10/15/2025",
      endDate: "No end date",
      totalBudget: "$7,200",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: false,
      hasAlertIcon: false,
      hasRecIcon: true,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 2.90)",
      roasTarget: "2.90",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Optimizing",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "12:00pm PST",
      estMissedImpressions: "221064 - 299087",
      estMissedClicks: "468 - 632",
      campaignReviewStatus: "-",
      roas: "10.23",
      omniRoas: "$11.25",
      avgCPC: "$1.15",
      spend: "$699.38",
      totalAttributedSales: "$7,157",
      impressions: "271,761",
      clicks: "610",
      ctr: "0.22%",
      totalProductDetailPageViews: "666",
      totalAddToCart: "167",
      conversionRate: "5.41%",
      orders: "33",
      unitsSold: "35",
      recommendations: [
        {
          type: 'update-roas',
          message: 'Update ROAS target',
          suggestedValue: '2.50',
          targetColumn: 'biddingStrategy'
        }
      ]
    }
  ]);

  // Sort campaigns: alerts first, then recommendations, then others
  // Only show icons on top rows that have alerts/recommendations
  const campaigns = useMemo(() => {
    const sorted = [...campaignsData].map((campaign, originalIndex) => ({
      ...campaign,
      originalIndex,
      hasAlerts: (campaign.alerts?.length || 0) > 0,
      hasRecs: (campaign.recommendations?.length || 0) > 0,
    }));

    sorted.sort((a, b) => {
      // Priority 1: Alerts first
      if (a.hasAlerts && !b.hasAlerts) return -1;
      if (!a.hasAlerts && b.hasAlerts) return 1;

      // Priority 2: Recommendations second (if neither has alerts)
      if (!a.hasAlerts && !b.hasAlerts) {
        if (a.hasRecs && !b.hasRecs) return -1;
        if (!a.hasRecs && b.hasRecs) return 1;
      }

      // Priority 3: Maintain original order within same group
      return a.originalIndex - b.originalIndex;
    });

    return sorted.map((campaign) => ({
      ...campaign,
      hasAlertIcon: campaign.hasAlerts,
      hasRecIcon: campaign.hasRecs && !campaign.hasAlerts,
    }));
  }, [campaignsData]);

  // Handler: Icon Click
  const handleIconClick = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setRecommendationsOpen(true);
  };

  // Handler: View Recommendation
  const handleViewRecommendation = (type: string) => {
    if (!selectedCampaignId) return;

    setRecommendationsOpen(false);

    // Navigate to item health page for item health issues
    if (type === 'item-health-issues') {
      navigate('/reports/item-health');
      return;
    }

    const campaign = campaigns.find((c) => c.id === selectedCampaignId);
    if (!campaign) return;

    // Find the recommendation or alert
    const rec = campaign.recommendations?.find((r) => r.type === type);
    const alert = campaign.alerts?.find((a) => a.type === type);

    const targetColumn = rec?.targetColumn || alert?.targetColumn;

    // Scroll to target column
    if (targetColumn === 'biddingStrategy' && biddingStrategyColumnRef.current) {
      biddingStrategyColumnRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }

    // Set recommended value if it's a recommendation
    setRecommendedRoasValue(rec?.suggestedValue);

    // Open modal after a short delay to allow scroll to complete
    setTimeout(() => {
      setBiddingModalOpen(true);
    }, 300);
  };

  // Handler: Save ROAS
  const handleSaveRoas = (newValue: string) => {
    if (!selectedCampaignId) return;

    // Update campaigns array
    setCampaignsData((prevCampaigns) =>
      prevCampaigns.map((c) =>
        c.id === selectedCampaignId
          ? {
              ...c,
              biddingTarget: `(set at ${newValue})`,
              // Remove recommendation after applying
              recommendations: c.recommendations?.filter(
                (r) => r.type !== 'update-roas'
              ),
            }
          : c
      )
    );

    setBiddingModalOpen(false);
    setRecommendedRoasValue(undefined);
  };

  // Checkbox handlers
  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      campaigns.forEach(campaign => {
        newSelectedRows.add(campaign.id);
      });
    } else {
      campaigns.forEach(campaign => {
        newSelectedRows.delete(campaign.id);
      });
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectRow = (campaignId: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      newSelectedRows.add(campaignId);
    } else {
      newSelectedRows.delete(campaignId);
    }

    setSelectedRows(newSelectedRows);
  };

  const isAllSelected = () => {
    if (campaigns.length === 0) return false;
    return campaigns.every(campaign => selectedRows.has(campaign.id));
  };

  const isSomeSelected = () => {
    if (campaigns.length === 0) return false;
    const selectedCount = campaigns.filter(campaign => selectedRows.has(campaign.id)).length;
    return selectedCount > 0 && selectedCount < campaigns.length;
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
          <button className="w-6 h-6 p-1 rounded-full hover:bg-muted">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="0" y="0" width="2" height="2" fill="currentColor"/>
              <rect x="0" y="5" width="2" height="2" fill="currentColor"/>
              <rect x="0" y="10" width="2" height="2" fill="currentColor"/>
              <rect x="5" y="0" width="2" height="2" fill="currentColor"/>
              <rect x="5" y="5" width="2" height="2" fill="currentColor"/>
              <rect x="5" y="10" width="2" height="2" fill="currentColor"/>
              <rect x="10" y="0" width="2" height="2" fill="currentColor"/>
              <rect x="10" y="5" width="2" height="2" fill="currentColor"/>
              <rect x="10" y="10" width="2" height="2" fill="currentColor"/>
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
              className="flex items-center gap-1 text-xs hover:bg-muted px-2 py-1 rounded transition-colors"
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
                <div className="absolute top-full mt-2 right-0 w-80 bg-background rounded-lg border border-[#BABBBE] shadow-lg z-50">
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
                        <span className="text-xs text-foreground text-center">Sponsored Search</span>
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
                        <span className="text-xs text-foreground text-center">Display Advertising</span>
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
                        <span className="text-xs text-foreground text-center">Shop Builder</span>
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
                        <span className="text-xs text-foreground text-center">Store Ads</span>
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
                        <span className="text-xs text-foreground text-center">Unified Reports</span>
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
                        <span className="text-xs text-foreground">Billing Manager</span>
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
                        <span className="text-xs text-foreground">Associate tools</span>
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
            <button className="relative p-1 rounded-full hover:bg-muted">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            </button>
            <button className="p-1 rounded hover:bg-muted">
              <HelpCircle className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-muted">
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
          <div className="bg-background shadow-sm px-6 py-4">
            {/* Row 1: Title + Actions */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-[20px] font-bold text-foreground">All Campaigns</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center h-8 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground">
                  <span className="px-3">View draft campaigns</span>
                  <span className="border-l border-[var(--ld-semantic-color-separator)] px-2 flex items-center h-full">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
                <Button variant="primary" size="medium" onClick={() => navigate('/campaign')}>
                  + Create campaign
                </Button>
              </div>
            </div>

            {/* Row 2: Filter bar */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {/* Date Range */}
              <div className="flex items-center gap-1.5 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground cursor-pointer hover:bg-muted transition-colors">
                <Calendar className="w-4 h-4 text-foreground flex-shrink-0" />
                <span>
                  {dateRange === 'jan3-jan9' ? 'Jan 03, 2023 - Jan 09, 2023'
                    : dateRange === 'dec2-jan1' ? 'Dec 2, 2025 - Jan 1, 2026'
                    : dateRange === 'jan24-feb23' ? 'Jan 24 - Feb 23, 2026'
                    : dateRange === 'feb1-mar1' ? 'Feb 1 - Mar 1, 2026'
                    : 'Jan 03, 2023 - Jan 09, 2023'}
                </span>
              </div>

              {/* Attributed / Near real time segmented toggle */}
              <div className="flex items-center border border-[var(--ld-semantic-color-separator)] rounded overflow-hidden text-[13px]">
                <button
                  onClick={() => setDataType('attributed')}
                  className={`h-8 px-3 transition-colors ${
                    dataType === 'attributed'
                      ? 'text-[var(--ld-semantic-color-action-fill-primary)] border-r border-[var(--ld-semantic-color-action-fill-primary)] font-medium'
                      : 'text-foreground border-r border-[var(--ld-semantic-color-separator)] hover:bg-muted'
                  }`}
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

              {/* Attribution Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setShowAttributionDropdown(v => !v); setShowCampaignStatusDropdown(false); }}
                  className="flex items-center gap-1 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground hover:bg-muted transition-colors"
                >
                  <span>Attribution: <span className="font-medium">{attribution} days</span></span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </button>
                {showAttributionDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowAttributionDropdown(false)} />
                    <div className="absolute top-full mt-1 left-0 w-32 bg-background border border-[var(--ld-semantic-color-separator)] rounded shadow-md z-50 py-1">
                      {['7','14','30','60','90'].map(val => (
                        <button key={val} onClick={() => { setAttribution(val); setShowAttributionDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted ${attribution === val ? 'font-medium' : ''}`}>{val} days</button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Campaign Status Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setShowCampaignStatusDropdown(v => !v); setShowAttributionDropdown(false); }}
                  className="flex items-center gap-1 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground hover:bg-muted transition-colors"
                >
                  <span>Campaign status: <span className="font-medium">
                    {campaignStatus === 'all' ? 'Live, Schedu...' : campaignStatus === 'live' ? 'Live' : campaignStatus === 'paused' ? 'Paused' : campaignStatus === 'scheduled' ? 'Scheduled' : 'Ended'}
                  </span></span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </button>
                {showCampaignStatusDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowCampaignStatusDropdown(false)} />
                    <div className="absolute top-full mt-1 left-0 w-44 bg-background border border-[var(--ld-semantic-color-separator)] rounded shadow-md z-50 py-1">
                      {[['all','All statuses'],['live','Live'],['paused','Paused'],['scheduled','Scheduled'],['ended','Ended']].map(([val, label]) => (
                        <button key={val} onClick={() => { setCampaignStatus(val); setShowCampaignStatusDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted ${campaignStatus === val ? 'font-medium' : ''}`}>{label}</button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* All filters */}
              <button className="flex items-center gap-1.5 h-8 px-3 text-[13px] text-foreground border border-[var(--ld-semantic-color-separator)] rounded hover:bg-muted transition-colors">
                <Filter className="w-4 h-4" />
                <span>All filters</span>
              </button>
            </div>

            {/* Row 3: Search bar */}
            <div className="flex items-center gap-0 border border-[var(--ld-semantic-color-separator)] rounded h-8">
              {/* Scope selector */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setShowSearchScopeDropdown(v => !v)}
                  className="flex items-center gap-1 h-8 px-3 text-[13px] font-medium text-foreground border-r border-[var(--ld-semantic-color-separator)] hover:bg-muted transition-colors"
                >
                  {searchScope}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {showSearchScopeDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowSearchScopeDropdown(false)} />
                    <div className="absolute top-full mt-1 left-0 w-40 bg-background border border-[var(--ld-semantic-color-separator)] rounded shadow-md z-50 py-1">
                      {['Campaign name','ID'].map(val => (
                        <button key={val} onClick={() => { setSearchScope(val); setShowSearchScopeDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted ${searchScope === val ? 'font-medium' : ''}`}>{val}</button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {/* Search input */}
              <input
                type="text"
                placeholder="Search"
                className="flex-1 h-full px-3 text-[13px] border-none outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                value={searchQuery || ''}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className="flex items-center justify-center w-8 h-8 text-[var(--ld-semantic-color-action-fill-primary)] hover:bg-muted rounded-r transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Performance Summary Chart Card */}
          <div className="px-6 pt-6 pb-2">
            <div className="bg-background rounded-lg shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] overflow-hidden">
              <div className="px-6 pt-6 pb-0">
                <h3 className="text-lg font-bold text-foreground mb-1">Performance Summary</h3>
                <p className="text-sm text-foreground mb-6">Overview of all campaign performance</p>
              </div>
              <div className="px-6 pb-8 mb-2">
                {/* Metric Tabs */}
                <div className="flex items-start gap-3 py-4 border-b border-[var(--ld-semantic-color-separator)] mb-6">
                  <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
                    <div className="h-2 self-stretch rounded-b-full bg-[#993EF4]" />
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground leading-5">ROAS</span>
                      <span className="text-2xl font-bold text-foreground leading-9">$14.18</span>
                    </div>
                  </div>
                  <div className="w-px h-16 bg-[var(--ld-semantic-color-separator)] flex-shrink-0 mt-2" />
                  <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
                    <div className="h-2 self-stretch rounded-b-full bg-[#4DBDF5]" />
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground leading-5">Ad Spend</span>
                      <span className="text-2xl font-bold text-foreground leading-9">$24,755.45</span>
                    </div>
                  </div>
                  <div className="w-px h-16 bg-[var(--ld-semantic-color-separator)] flex-shrink-0 mt-2" />
                  <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
                    <div className="h-2 self-stretch rounded-b-full bg-[#0053E2]" />
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground leading-5">Total Attributed Sales</span>
                      <span className="text-2xl font-bold text-foreground leading-9">$350,978.96</span>
                    </div>
                  </div>
                  <div className="w-px h-16 bg-[var(--ld-semantic-color-separator)] flex-shrink-0 mt-2" />
                  <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
                    <div className="h-2 self-stretch rounded-b-full bg-transparent" />
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground leading-5">Average CPC</span>
                      <span className="text-2xl font-bold text-foreground leading-9">$1.38</span>
                    </div>
                  </div>
                  <div className="w-px h-16 bg-[var(--ld-semantic-color-separator)] flex-shrink-0 mt-2" />
                  <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
                    <div className="h-2 self-stretch rounded-b-full bg-transparent" />
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground leading-5">Impressions</span>
                      <span className="text-2xl font-bold text-foreground leading-9">2,038,433</span>
                    </div>
                  </div>
                </div>

                {/* Chart Legend */}
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0053E2] border border-[#0053E2]"></div>
                    <span className="text-sm text-foreground">Total Attributed Sales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#993EF4] border border-[#993EF4]"></div>
                    <span className="text-sm text-foreground">ROAS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4DBDF5] border border-[#4DBDF5]"></div>
                    <span className="text-sm text-foreground">Ad Spend</span>
                  </div>
                </div>

                {/* Chart Container */}
                <div className="relative h-[320px] pl-10 pr-16">
                  {/* Y-axis labels (left) */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-right text-xs text-foreground pr-3 pb-4 w-10">
                    <span>$50K</span>
                    <span>$45K</span>
                    <span>$40K</span>
                    <span>$35K</span>
                    <span>$30K</span>
                    <span>$25K</span>
                    <span>$20K</span>
                    <span>$15K</span>
                    <span>$10K</span>
                    <span>$5K</span>
                    <span>$0.00</span>
                  </div>

                  {/* Y-axis labels (right - ROAS) */}
                  <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-left text-xs text-[#993EF4] pb-4 w-12">
                    <span>$10.00</span>
                    <span>$9.00</span>
                    <span>$8.00</span>
                    <span>$7.00</span>
                    <span>$6.00</span>
                    <span>$5.00</span>
                    <span>$4.00</span>
                    <span>$3.00</span>
                    <span>$2.00</span>
                    <span>$1.00</span>
                    <span>$0.00</span>
                  </div>

                  {/* Chart Area */}
                  <div className="relative h-full border-l border-b border-border">
                    {/* X-axis labels */}
                    <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-foreground px-2">
                      <span>Oct 4</span>
                      <span>Oct 7</span>
                      <span>Oct 10</span>
                      <span>Oct 13</span>
                      <span>Oct 16</span>
                      <span>Oct 19</span>
                      <span>Oct 22</span>
                      <span>Oct 25</span>
                      <span>Oct 28</span>
                      <span>Oct 31</span>
                    </div>

                    {/* Chart SVG */}
                    <svg className="w-full h-full pl-[5px]" viewBox="0 0 584 288" fill="none" preserveAspectRatio="none">
                      <defs>
                        <clipPath id="clip0_allcamp_chart">
                          <path d="M0 0H584V288H0V0Z" fill="white"/>
                        </clipPath>
                        <linearGradient id="paint0_linear_allcamp_chart" x1="311.906" y1="81.9307" x2="311.906" y2="237.699" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#4DBDF5" stopOpacity="0.12"/>
                          <stop offset="1" stopColor="#4DBDF5" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_allcamp_chart" x1="253.806" y1="88.7671" x2="253.806" y2="190.356" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#993EF4" stopOpacity="0.12"/>
                          <stop offset="1" stopColor="#993EF4" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_allcamp_chart" x1="298.528" y1="59.1782" x2="298.528" y2="287.999" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#0053E2" stopOpacity="0.12"/>
                          <stop offset="1" stopColor="#0053E2" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <g clipPath="url(#clip0_allcamp_chart)">
                        <path d="M104.449 224.322C50.4019 224.322 10.2535 184.666 0 174.477V237.699H584V175.987C511.973 177.921 534.234 81.2892 494.292 81.9339C454.35 82.5786 484.056 220.633 387.801 220.633C336.226 220.633 329.176 196.522 257.193 196.522C199.309 196.522 157.408 224.322 104.449 224.322Z" fill="url(#paint0_linear_allcamp_chart)"/>
                        <path d="M0 174.633C10.2535 184.839 50.4019 224.562 104.449 224.562C157.408 224.562 199.309 196.715 257.193 196.715C329.176 196.715 336.226 220.867 387.801 220.867C484.056 220.867 454.35 82.5796 494.292 81.9339C534.234 81.2881 511.973 178.083 584 176.146" stroke="#4DBDF5" strokeWidth="2"/>
                        <path d="M102.051 177.658C71.3618 177.383 21.2298 118.283 0 88.7671V190.356H584V180.06C559.418 169.878 494.24 148.76 430.179 145.739C350.102 141.964 351.964 157.065 303.546 157.065C246.561 158.095 248.796 142.65 203.73 143.337C158.663 144.023 140.413 178.001 102.051 177.658Z" fill="url(#paint1_linear_allcamp_chart)"/>
                        <path d="M0 88.7671C21.2298 118.214 71.3618 177.176 102.051 177.45C140.413 177.792 158.663 143.894 203.73 143.21C248.796 142.525 246.561 157.933 303.546 156.906C351.964 156.906 350.102 141.84 430.179 145.606C494.24 148.62 559.418 169.689 584 179.847" stroke="#993EF4" strokeWidth="2"/>
                        <path d="M102.761 82.2171C74.0553 42.1341 27.4994 88.8639 0 146.47V287.999H584V118.221C529.242 120.99 517.454 213.798 483.305 212.591C453.264 213.359 425.855 55.9067 387.742 59.2301C349.628 62.5535 355.259 139.269 299.599 139.269C252.56 129.853 249.907 85.5405 197.079 111.574C150.916 134.323 138.449 132.05 102.761 82.2171Z" fill="url(#paint2_linear_allcamp_chart)"/>
                        <path d="M0 146.749C27.4994 88.959 74.0553 42.0797 102.761 82.2909C138.449 132.284 150.916 134.563 197.079 111.742C249.907 85.6249 252.56 130.079 299.598 139.525C356.081 139.525 349.012 62.5645 387.125 59.2305C425.238 55.8964 453.211 213.235 483.835 213.236C517.325 213.236 529.242 121.188 584 118.41" stroke="#0053E2" strokeWidth="2"/>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="px-6 py-7">
            <div className="bg-background rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
              {/* Table Header + Controls */}
              <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-background">
                <h2 className="text-[20px] font-bold text-foreground leading-7 whitespace-nowrap flex-shrink-0">
                  Manage your campaigns (450)
                </h2>
                <div className="flex items-center justify-end gap-2 flex-1">
                {/* Search Bar */}
                <div className="flex items-center gap-2 flex-1 min-w-[360px] max-w-[600px] px-3 h-8 border border-[rgba(46,47,50,1)] rounded-full bg-background relative">
                  <Search className="w-4 h-4 text-foreground" />
                  <span className="text-sm text-muted-foreground">Search by</span>
                  <Popover open={showSearchScopeDropdown} onOpenChange={setShowSearchScopeDropdown}>
                    <PopoverTrigger asChild>
                      <button
                        className="flex items-center gap-1 text-sm font-bold text-foreground hover:bg-muted px-1 rounded"
                      >
                        {searchScope}
                        {showSearchScopeDropdown ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Menu isOpen={showSearchScopeDropdown} onClose={() => setShowSearchScopeDropdown(false)}>
                        <MenuItem
                          selected={searchScope === 'Campaign name'}
                          onClick={() => {
                            setSearchScope('Campaign name');
                            setShowSearchScopeDropdown(false);
                          }}
                        >
                          Campaign name
                        </MenuItem>
                        <MenuItem
                          selected={searchScope === 'ID'}
                          onClick={() => {
                            setSearchScope('ID');
                            setShowSearchScopeDropdown(false);
                          }}
                        >
                          ID
                        </MenuItem>
                      </Menu>
                    </PopoverContent>
                  </Popover>
                  <input
                    type="text"
                    placeholder=""
                    className="flex-1 text-sm border-none outline-none bg-transparent"
                    value={searchQuery || ''}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-0.5 hover:bg-muted rounded-full transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4 text-foreground" />
                    </button>
                  )}
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center gap-2">
                  {/* All Filters Button */}
                  <button className="flex items-center justify-center h-8 w-8 px-1.5 border border-[rgba(46,47,50,1)] rounded-full bg-background hover:bg-muted transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="2" y1="5" x2="5.5" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="7.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <line x1="9.5" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="2" y1="11" x2="9.5" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="11.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <line x1="13.5" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button className="flex items-center justify-center w-8 h-8 border border-[rgba(46,47,50,1)] rounded-full hover:bg-muted transition-colors">
                    <SettingsIcon className="w-4 h-4 text-foreground" />
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 border border-[rgba(46,47,50,1)] rounded-full hover:bg-muted transition-colors">
                    <Download className="w-4 h-4 text-foreground" />
                  </button>
                </div>
                </div>
              </div>

              {/* Table Content */}
              <div ref={tableContainerRef} className="overflow-x-auto">
                <div className="flex">
                  {/* Checkbox Column */}
                  <div className="flex flex-col flex-shrink-0">
                    {/* Header */}
                    <div className="flex items-center justify-center h-[52px] px-3 border-t border-b border-border bg-muted">
                      <Checkbox
                        checked={selectAllCheckedState}
                        onCheckedChange={(checked) => handleSelectAll(checked === true)}
                        aria-label="Select all campaigns"
                      />
                    </div>
                    {/* Rows */}
                    {campaigns.map((campaign, idx) => (
                      <div key={idx} className="flex items-center justify-center h-[52px] px-3 border-b border-border bg-background">
                        <Checkbox
                          checked={selectedRows.has(campaign.id)}
                          onCheckedChange={(checked) => handleSelectRow(campaign.id, !!checked)}
                          aria-label={`Select campaign ${campaign.name}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Icon Column */}
                  <div className="flex flex-col flex-shrink-0 w-[48px]">
                    {/* Header */}
                    <div className="flex items-center justify-center h-[52px] border-t border-b border-border bg-muted">
                      {/* Empty header for icon column */}
                    </div>
                    {/* Rows */}
                    {campaigns.map((campaign, idx) => (
                      <div key={campaign.id} className="flex items-center justify-center h-[52px] border-b border-border bg-background">
                        {(campaign.hasAlertIcon || campaign.hasRecIcon) && (
                          <RecommendationsPopover
                            open={recommendationsOpen && selectedCampaignId === campaign.id}
                            onOpenChange={(open) => {
                              setRecommendationsOpen(open);
                              if (!open) {
                                setSelectedCampaignId(null);
                              }
                            }}
                            campaignData={campaign}
                            onViewRecommendation={handleViewRecommendation}
                            trigger={
                              <button
                                onClick={() => handleIconClick(campaign.id)}
                                className="flex items-center justify-center w-6 h-6 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
                              >
                                {campaign.hasAlertIcon && (
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F8D2D3]">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0ZM7 1.2002C3.79675 1.2002 1.2002 3.79675 1.2002 7C1.2002 10.2033 3.79675 12.7998 7 12.7998C10.2033 12.7998 12.7998 10.2033 12.7998 7C12.7998 3.79675 10.2033 1.2002 7 1.2002ZM7 9.89844C7.33224 9.89844 7.60156 10.1678 7.60156 10.5C7.60156 10.8322 7.33224 11.1016 7 11.1016C6.66776 11.1016 6.39844 10.8322 6.39844 10.5C6.39844 10.1678 6.66776 9.89844 7 9.89844ZM7 2.90039C7.2981 2.90039 7.54514 3.11744 7.5918 3.40234L7.59961 3.5V8.64062C7.59961 8.972 7.33137 9.24023 7 9.24023C6.70187 9.24023 6.45483 9.02322 6.4082 8.73828L6.40039 8.64062V3.5C6.40039 3.16863 6.66863 2.90039 7 2.90039Z" fill="#9B1419"/>
                                    </svg>
                                  </div>
                                )}
                                {campaign.hasRecIcon && (
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FCE9F5]">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px]">
                                      <path d="M8.42285 6.55273L8.32324 7.1543H13.6016L7.39648 14.2852L8.10938 9.98438L8.20898 9.38281H2.93164L9.13477 2.25293L8.42285 6.55273Z" stroke="#661648" strokeWidth="1.03333"/>
                                    </svg>
                                  </div>
                                )}
                              </button>
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Data Columns */}
                  <div className="flex flex-1 overflow-x-auto">
                    {/* Campaign Name Column */}
                    <div className="flex flex-col min-w-[280px] flex-1 sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Campaign name</span>
                        <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3L8 13" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M5 10L8 13L11 10" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate('/campaign-reports', {
                                state: {
                                  campaignName: campaign.name,
                                  campaignId: campaign.id,
                                  campaignData: campaign
                                }
                              });
                            }}
                            className="text-sm text-foreground underline hover:no-underline truncate cursor-pointer"
                          >
                            {campaign.name}
                          </a>
                        </div>
                      ))}
                    </div>

                    {/* Campaign Status Column */}
                    <div className="flex flex-col min-w-[140px] sticky left-[280px] z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Campaign status</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                          <span className={`inline-block px-2 py-0.5 text-xs rounded ${
                            campaign.status === 'Live'
                              ? 'bg-[#EAF3E6] text-[#1D5F02]'
                              : 'bg-walmart-yellow text-muted-foreground'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total Budget Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Total budget</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <div className="flex items-center gap-1">
                            {campaign.hasWarning && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                                <circle cx="8" cy="8" r="7" stroke="var(--ld-semantic-color-text-negative, #A20C00)" strokeWidth="1.5" fill="none"/>
                                <path d="M8 4.5V8.5" stroke="var(--ld-semantic-color-text-negative, #A20C00)" strokeWidth="1.5" strokeLinecap="round"/>
                                <circle cx="8" cy="11" r="0.75" fill="var(--ld-semantic-color-text-negative, #A20C00)"/>
                              </svg>
                            )}
                            {campaign.hasBolt && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                              </svg>
                            )}
                            <span className="text-sm text-foreground">{campaign.totalBudget}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Daily Budget Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Daily budget</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.dailyBudget}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bidding Strategy Column */}
                    <div ref={biddingStrategyColumnRef} className="flex flex-col min-w-[140px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Bidding strategy</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] pl-[34px] pr-4 border-b border-border bg-background relative">
                          {campaign.biddingIcon && (
                            <button
                              onClick={() => {
                                setSelectedCampaignId(campaign.id);
                                setBiddingModalOpen(true);
                                setRecommendedRoasValue(campaign.recommendedRoasTarget !== '-' ? campaign.recommendedRoasTarget : undefined);
                              }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="7" stroke="var(--ld-semantic-color-text-negative, #A20C00)" strokeWidth="1.5" fill="none"/>
                                <path d="M8 4.5V8.5" stroke="var(--ld-semantic-color-text-negative, #A20C00)" strokeWidth="1.5" strokeLinecap="round"/>
                                <circle cx="8" cy="11" r="0.75" fill="var(--ld-semantic-color-text-negative, #A20C00)"/>
                              </svg>
                            </button>
                          )}
                          {campaign.hasBolt && !campaign.biddingIcon && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 flex-shrink-0">
                              <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                            </svg>
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm text-foreground">{campaign.biddingStrategy}</span>
                            <span className="text-xs text-muted-foreground">{campaign.biddingTarget}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bidding Status Column */}
                    <div className="flex flex-col min-w-[140px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Bidding status</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                          <div className="flex flex-col">
                            <span className="text-sm text-foreground">{campaign.biddingStatus}</span>
                            <span className="text-xs text-muted-foreground">{campaign.biddingStatusDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Average CPC Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Average CPC</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.avgCPC}</span>
                        </div>
                      ))}
                    </div>

                    {/* Spend Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Spend</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.spend}</span>
                        </div>
                      ))}
                    </div>

                    {/* Start Date Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Start date</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.startDate}</span>
                        </div>
                      ))}
                    </div>

                    {/* End Date Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">End date</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.endDate}</span>
                        </div>
                      ))}
                    </div>

                    {/* Suggested Total Budget Column */}
                    <div className="flex flex-col min-w-[150px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Sugg. total budget</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.suggestedTotalBudget}</span>
                        </div>
                      ))}
                    </div>

                    {/* Suggested Daily Budget Column */}
                    <div className="flex flex-col min-w-[150px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Sugg. daily budget</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.suggestedDailyBudget}</span>
                        </div>
                      ))}
                    </div>

                    {/* ROAS Target Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">ROAS target</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.roasTarget}</span>
                        </div>
                      ))}
                    </div>

                    {/* Recommended ROAS Target Column */}
                    <div className="flex flex-col min-w-[180px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Recommended ROAS target</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.recommendedRoasTarget}</span>
                        </div>
                      ))}
                    </div>

                    {/* Campaign Type Column */}
                    <div className="flex flex-col min-w-[200px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Campaign type</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.campaignType}</span>
                        </div>
                      ))}
                    </div>

                    {/* Avg. Cap-out Time Column */}
                    <div className="flex flex-col min-w-[140px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Avg. cap-out time</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.avgCapOutTime}</span>
                        </div>
                      ))}
                    </div>

                    {/* Est. Missed Impressions Column */}
                    <div className="flex flex-col min-w-[180px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Est. missed impressions</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.estMissedImpressions}</span>
                        </div>
                      ))}
                    </div>

                    {/* Est. Missed Clicks Column */}
                    <div className="flex flex-col min-w-[160px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Est. missed clicks</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.estMissedClicks}</span>
                        </div>
                      ))}
                    </div>

                    {/* Campaign Review Status Column */}
                    <div className="flex flex-col min-w-[180px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Campaign review status</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.campaignReviewStatus}</span>
                        </div>
                      ))}
                    </div>

                    {/* ROAS Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">ROAS</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.omniRoas}</span>
                        </div>
                      ))}
                    </div>

                    {/* Online ROAS Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5 whitespace-nowrap">Online ROAS</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.roas}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total Attributed Sales Column */}
                    <div className="flex flex-col min-w-[180px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Online attributed sales</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.totalAttributedSales}</span>
                        </div>
                      ))}
                    </div>

                    {/* Impressions Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Impressions</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.impressions}</span>
                        </div>
                      ))}
                    </div>

                    {/* Clicks Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Clicks</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.clicks}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTR Column */}
                    <div className="flex flex-col min-w-[80px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">CTR</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.ctr}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total Product Detail Page Views Column */}
                    <div className="flex flex-col min-w-[220px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Total product detail page views</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.totalProductDetailPageViews}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total Add to Cart Column */}
                    <div className="flex flex-col min-w-[150px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Total add to cart</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.totalAddToCart}</span>
                        </div>
                      ))}
                    </div>

                    {/* Conversion Rate Column */}
                    <div className="flex flex-col min-w-[140px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Conversion rate</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.conversionRate}</span>
                        </div>
                      ))}
                    </div>

                    {/* Orders Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Orders</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.orders}</span>
                        </div>
                      ))}
                    </div>

                    {/* Campaign ID Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Campaign ID</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.id}</span>
                        </div>
                      ))}
                    </div>

                    {/* Units Sold Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                        <span className="text-sm font-bold text-foreground leading-5">Units sold</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-border bg-background">
                          <span className="text-sm text-foreground">{campaign.unitsSold}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Column - Right Aligned */}
                  <div className="flex flex-col flex-shrink-0 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                    <div className="flex items-center h-[52px] px-4 border-t border-b border-border bg-muted">
                      <span className="text-sm font-bold text-foreground leading-5">Actions</span>
                    </div>
                    {campaigns.map((campaign, idx) => (
                      <div key={idx} className="flex items-center justify-center h-[52px] px-2.5 border-b border-border bg-background">
                        <Popover
                          open={openCampaignMenuId === campaign.id}
                          onOpenChange={(open) => setOpenCampaignMenuId(open ? campaign.id : null)}
                        >
                          <PopoverTrigger asChild>
                            <button className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Campaign actions">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            align="end"
                            side="bottom"
                            showArrow={false}
                            className="w-[200px] p-0"
                          >
                            <Menu
                              isOpen={openCampaignMenuId === campaign.id}
                              onClose={() => setOpenCampaignMenuId(null)}
                            >
                              <MenuItem
                                leadingIcon={<Wrench className="w-4 h-4" />}
                                onClick={() => {
                                  console.log('Edit campaign', campaign.id);
                                  setOpenCampaignMenuId(null);
                                }}
                              >
                                Edit campaign
                              </MenuItem>
                              <MenuItem
                                leadingIcon={<BoxCorners className="w-4 h-4" />}
                                onClick={() => {
                                  console.log('Clone campaign', campaign.id);
                                  setOpenCampaignMenuId(null);
                                }}
                              >
                                Clone campaign
                              </MenuItem>
                              <MenuItem
                                leadingIcon={<Pause className="w-4 h-4" />}
                                onClick={() => {
                                  console.log('Pause campaign', campaign.id);
                                  setOpenCampaignMenuId(null);
                                }}
                              >
                                Pause campaign
                              </MenuItem>
                              <MenuItem
                                leadingIcon={<BarGraph className="w-4 h-4" />}
                                onClick={() => {
                                  console.log('View reports', campaign.id);
                                  setOpenCampaignMenuId(null);
                                }}
                              >
                                View reports
                              </MenuItem>
                              <MenuItem
                                leadingIcon={<History className="w-4 h-4" />}
                                onClick={() => {
                                  navigate(`/history-log?campaignId=${encodeURIComponent(campaign.id)}&campaignName=${encodeURIComponent(campaign.name)}`);
                                  setOpenCampaignMenuId(null);
                                }}
                              >
                                History log
                              </MenuItem>
                            </Menu>
                          </PopoverContent>
                        </Popover>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bidding Strategy Modal */}
      {selectedCampaignId && (
        <BiddingStrategyModal
          open={biddingModalOpen}
          onOpenChange={setBiddingModalOpen}
          campaignData={campaigns.find((c) => c.id === selectedCampaignId)!}
          recommendedValue={recommendedRoasValue}
          onSave={handleSaveRoas}
        />
      )}

      {/* Marty Floating Panel */}
      {showMartyPanel && (
        <MartyFloatingPanel
          isMinimized={isMartyMinimized}
          onMinimizedChange={setIsMartyMinimized}
        />
      )}
    </div>
  );
}
