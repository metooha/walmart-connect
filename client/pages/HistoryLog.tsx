import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MastHead } from "../components/ui/MastHead";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import { DataTable, DataTableHead, DataTableBody } from "../components/ui/DataTable";
import { DataTableRow } from "../components/ui/DataTableRow";
import { DataTableHeader } from "../components/ui/DataTableHeader";
import { DataTableCell } from "../components/ui/DataTableCellText";
import { Checkbox } from "../components/ui/Checkbox";

interface HistoryLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  campaignStatus?: string;
  budget?: string;
  endDate?: string;
  campaignName?: string;
  expandedTargeting?: string;
  campaignBiddingStrategy?: string;
  bidMultiplier?: string;
  offsiteProductAds?: string;
  adgroupCreation?: string;
  adgroupName?: string;
  adgroupStatus?: string;
  itemsSection?: string;
  keywordsSection?: string;
  newCampaignStatus?: string;
  targetROAS?: string;
  startDate?: string;
  itemBid?: string;
  keywordBid?: string;
  placementInclusion?: string;
  negativeKeywords?: string;
  itemSuggestedBidsApply?: string;
  keywordsSuggestedBidsApply?: string;
  brandName?: string;
  adHeadline?: string;
  brandLogo?: string;
  brandLink?: string;
}

export default function HistoryLog() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const campaignId = searchParams.get('campaignId');
  const campaignName = searchParams.get('campaignName');

  const [showMartyPanel] = useState(true);
  const [isMartyMinimized, setIsMartyMinimized] = useLocalStorage('marty:minimized', false);
  const [mediaSolutionsOpen, setMediaSolutionsOpen] = useState(false);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState('Sponsored Search');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Sample history log data
  const historyEntries: HistoryLogEntry[] = [
    {
      id: "1",
      timestamp: "2025-03-12 14:32:15",
      user: "lisa.kellman@walmart.com",
      action: "Updated",
      campaignStatus: "Live → Paused",
      budget: "$100 → $150",
      endDate: "14th Jan, 2025 → 20th Jan, 2025",
      campaignName: "SP - GTV - Hisense - Auto 2025 - All Products",
      targetROAS: "3.25 → 2.50",
    },
    {
      id: "1a",
      timestamp: "2025-03-12 13:15:30",
      user: "john.doe@walmart.com",
      action: "Updated",
      budget: "$150 → $200",
      targetROAS: "2.50 → 2.75",
      campaignName: "SP - GTV - Hisense - Auto 2025 - All Products",
    },
    {
      id: "1b",
      timestamp: "2025-03-12 11:45:22",
      user: "lisa.kellman@walmart.com",
      action: "Updated",
      campaignBiddingStrategy: "Target ROAS → Manual",
      itemBid: "$0.45 → $0.55",
      keywordBid: "$0.60 → $0.70",
      campaignName: "SP - GTV - Hisense - Auto 2025 - All Products",
    },
    {
      id: "1c",
      timestamp: "2025-03-12 10:20:45",
      user: "sarah.miller@walmart.com",
      action: "Updated",
      offsiteProductAds: "Disabled → Enabled",
      placementInclusion: "On Walmart only → All placements",
      expandedTargeting: "Disabled → Enabled",
      campaignName: "SP - GTV - Hisense - Auto 2025 - All Products",
    },
    {
      id: "1d",
      timestamp: "2025-03-12 09:10:15",
      user: "mike.chen@walmart.com",
      action: "Updated",
      itemsSection: "15 items added",
      keywordsSection: "12 keywords added",
      negativeKeywords: "5 keywords added",
      campaignName: "SP - GTV - Hisense - Auto 2025 - All Products",
    },
    {
      id: "1e",
      timestamp: "2025-03-11 16:30:50",
      user: "lisa.kellman@walmart.com",
      action: "Created",
      startDate: "1st Jan, 2025",
      budget: "$100",
      targetROAS: "3.25",
      expandedTargeting: "Disabled",
      newCampaignStatus: "Live",
      campaignBiddingStrategy: "Target ROAS",
      offsiteProductAds: "Disabled",
      campaignName: "SP - GTV - Hisense - Auto 2025 - All Products",
    },
    {
      id: "2",
      timestamp: "2025-03-12 14:32:15",
      user: "lisa.kellman@walmart.com",
      action: "Updated",
      campaignStatus: "Live → Paused",
      budget: "$100 → $150",
      endDate: "14th Jan, 2025 → 20th Jan, 2025",
      campaignName: "SP - GTV - HiSense",
      targetROAS: "3.25 → 2.50",
    },
    {
      id: "2",
      timestamp: "2025-03-12 13:45:22",
      user: "john.doe@walmart.com",
      action: "Updated",
      campaignBiddingStrategy: "Manual → Target ROAS",
      itemBid: "$0.50 → $0.75",
      keywordBid: "$0.65 → $0.85",
      campaignName: "SP - Electronics - TCL TVs",
    },
    {
      id: "3",
      timestamp: "2025-03-12 11:20:08",
      user: "lisa.kellman@walmart.com",
      action: "Created",
      campaignName: "SP - Home & Garden - Spring Sale",
      startDate: "15th Mar, 2025",
      budget: "$200",
      targetROAS: "4.00",
      expandedTargeting: "Enabled",
      newCampaignStatus: "Live",
      campaignBiddingStrategy: "Target ROAS",
    },
    {
      id: "4",
      timestamp: "2025-03-12 10:15:43",
      user: "sarah.miller@walmart.com",
      action: "Updated",
      campaignStatus: "Live → Paused",
      adgroupStatus: "Active → Paused",
      campaignName: "SP - Fashion - Winter Clearance",
    },
    {
      id: "5",
      timestamp: "2025-03-12 09:30:17",
      user: "lisa.kellman@walmart.com",
      action: "Updated",
      offsiteProductAds: "Disabled → Enabled",
      placementInclusion: "On Amazon only → All placements",
      campaignName: "SP - GTV - HiSense - New SKUs",
    },
    {
      id: "6",
      timestamp: "2025-03-11 16:45:55",
      user: "john.doe@walmart.com",
      action: "Updated",
      adgroupCreation: "New adgroup created",
      adgroupName: "Electronics - Premium",
      itemsSection: "25 items added",
      keywordsSection: "15 keywords added",
      campaignName: "SP - Electronics - TCL TVs",
    },
    {
      id: "7",
      timestamp: "2025-03-11 15:20:30",
      user: "lisa.kellman@walmart.com",
      action: "Updated",
      bidMultiplier: "1.0 → 1.25",
      itemSuggestedBidsApply: "No → Yes",
      keywordsSuggestedBidsApply: "No → Yes",
      campaignName: "SP - GTV - HiSense",
    },
    {
      id: "8",
      timestamp: "2025-03-11 14:10:12",
      user: "sarah.miller@walmart.com",
      action: "Updated",
      negativeKeywords: "5 keywords added",
      brandName: "Samsung",
      adHeadline: "Updated headline",
      brandLogo: "Updated",
      brandLink: "Updated URL",
      campaignName: "SP - Electronics - Samsung TVs",
    },
    {
      id: "9",
      timestamp: "2025-03-11 13:05:45",
      user: "mike.chen@walmart.com",
      action: "Created",
      campaignName: "SP - Beauty - Skincare Launch",
      startDate: "18th Mar, 2025",
      budget: "$500",
      targetROAS: "3.75",
      expandedTargeting: "Disabled",
      newCampaignStatus: "Paused",
      campaignBiddingStrategy: "Manual",
      offsiteProductAds: "Enabled",
    },
    {
      id: "10",
      timestamp: "2025-03-11 11:52:33",
      user: "lisa.kellman@walmart.com",
      action: "Updated",
      campaignStatus: "Paused → Live",
      budget: "$250 → $300",
      targetROAS: "2.80 → 3.00",
      campaignName: "SP - GTV - HiSense - New SKUs",
    },
    {
      id: "11",
      timestamp: "2025-03-11 10:30:22",
      user: "john.doe@walmart.com",
      action: "Updated",
      itemsSection: "12 items added, 3 items removed",
      keywordsSection: "8 keywords added",
      adgroupName: "Premium Electronics",
      campaignName: "SP - Electronics - TCL TVs",
    },
    {
      id: "12",
      timestamp: "2025-03-11 09:15:10",
      user: "sarah.miller@walmart.com",
      action: "Updated",
      endDate: "20th Mar, 2025 → 25th Mar, 2025",
      budget: "$150 → $175",
      campaignName: "SP - Fashion - Winter Clearance",
    },
    {
      id: "13",
      timestamp: "2025-03-10 17:45:30",
      user: "mike.chen@walmart.com",
      action: "Created",
      campaignName: "SP - Home Improvement - Spring Tools",
      startDate: "12th Mar, 2025",
      budget: "$350",
      targetROAS: "3.50",
      expandedTargeting: "Enabled",
      newCampaignStatus: "Live",
      campaignBiddingStrategy: "Target ROAS",
      offsiteProductAds: "Disabled",
    },
    {
      id: "14",
      timestamp: "2025-03-10 16:20:15",
      user: "lisa.kellman@walmart.com",
      action: "Updated",
      campaignBiddingStrategy: "Target ROAS → Manual",
      itemBid: "$0.75 → $0.60",
      keywordBid: "$0.85 → $0.70",
      campaignName: "SP - GTV - HiSense",
    },
    {
      id: "15",
      timestamp: "2025-03-10 15:10:45",
      user: "john.doe@walmart.com",
      action: "Updated",
      negativeKeywords: "12 keywords added",
      placementInclusion: "All placements → On Walmart only",
      campaignName: "SP - Electronics - TCL TVs",
    },
    {
      id: "16",
      timestamp: "2025-03-10 14:05:20",
      user: "sarah.miller@walmart.com",
      action: "Updated",
      adgroupCreation: "New adgroup created",
      adgroupName: "Clearance Items",
      adgroupStatus: "Active",
      itemsSection: "45 items added",
      keywordsSection: "22 keywords added",
      campaignName: "SP - Fashion - Winter Clearance",
    },
    {
      id: "17",
      timestamp: "2025-03-10 12:50:30",
      user: "mike.chen@walmart.com",
      action: "Updated",
      brandName: "L'Oreal",
      adHeadline: "New Spring Collection",
      brandLogo: "Updated",
      brandLink: "https://walmart.com/loreal",
      campaignName: "SP - Beauty - Skincare Launch",
    },
    {
      id: "18",
      timestamp: "2025-03-10 11:30:15",
      user: "lisa.kellman@walmart.com",
      action: "Updated",
      bidMultiplier: "1.25 → 1.10",
      itemSuggestedBidsApply: "Yes → No",
      keywordsSuggestedBidsApply: "Yes → No",
      campaignName: "SP - GTV - HiSense",
    },
    {
      id: "19",
      timestamp: "2025-03-10 10:15:50",
      user: "john.doe@walmart.com",
      action: "Updated",
      campaignStatus: "Live → Paused",
      endDate: "28th Mar, 2025 → 30th Mar, 2025",
      campaignName: "SP - Electronics - TCL TVs",
    },
    {
      id: "20",
      timestamp: "2025-03-10 09:05:25",
      user: "sarah.miller@walmart.com",
      action: "Updated",
      budget: "$175 → $200",
      targetROAS: "3.20 → 3.40",
      offsiteProductAds: "Disabled → Enabled",
      campaignName: "SP - Fashion - Winter Clearance",
    },
    {
      id: "21",
      timestamp: "2025-03-09 16:45:10",
      user: "mike.chen@walmart.com",
      action: "Created",
      campaignName: "SP - Toys - Easter Promotion",
      startDate: "10th Mar, 2025",
      budget: "$450",
      targetROAS: "4.25",
      expandedTargeting: "Enabled",
      newCampaignStatus: "Live",
      campaignBiddingStrategy: "Target ROAS",
      offsiteProductAds: "Enabled",
    },
    {
      id: "22",
      timestamp: "2025-03-09 15:30:45",
      user: "lisa.kellman@walmart.com",
      action: "Updated",
      itemsSection: "8 items removed",
      keywordsSection: "15 keywords removed",
      negativeKeywords: "7 keywords added",
      campaignName: "SP - GTV - HiSense - New SKUs",
    },
    {
      id: "23",
      timestamp: "2025-03-09 14:20:30",
      user: "john.doe@walmart.com",
      action: "Updated",
      adgroupStatus: "Paused → Active",
      itemBid: "$0.60 → $0.80",
      keywordBid: "$0.70 → $0.90",
      campaignName: "SP - Electronics - TCL TVs",
    },
    {
      id: "24",
      timestamp: "2025-03-09 13:10:15",
      user: "sarah.miller@walmart.com",
      action: "Updated",
      campaignStatus: "Paused → Live",
      startDate: "10th Mar, 2025 → 12th Mar, 2025",
      campaignName: "SP - Fashion - Winter Clearance",
    },
    {
      id: "25",
      timestamp: "2025-03-09 11:55:40",
      user: "mike.chen@walmart.com",
      action: "Updated",
      campaignBiddingStrategy: "Manual → Target ROAS",
      targetROAS: "3.75",
      bidMultiplier: "1.00 → 1.15",
      campaignName: "SP - Beauty - Skincare Launch",
    },
    {
      id: "26",
      timestamp: "2025-03-09 10:40:25",
      user: "lisa.kellman@walmart.com",
      action: "Updated",
      placementInclusion: "On Walmart only → All placements",
      expandedTargeting: "Disabled → Enabled",
      campaignName: "SP - GTV - HiSense",
    },
    {
      id: "27",
      timestamp: "2025-03-09 09:25:50",
      user: "john.doe@walmart.com",
      action: "Updated",
      brandName: "TCL",
      adHeadline: "Smart TVs on Sale",
      brandLogo: "Updated",
      itemSuggestedBidsApply: "No → Yes",
      keywordsSuggestedBidsApply: "No → Yes",
      campaignName: "SP - Electronics - TCL TVs",
    },
    {
      id: "28",
      timestamp: "2025-03-09 08:15:35",
      user: "sarah.miller@walmart.com",
      action: "Created",
      campaignName: "SP - Apparel - Summer Preview",
      startDate: "15th Mar, 2025",
      budget: "$600",
      targetROAS: "3.90",
      expandedTargeting: "Enabled",
      newCampaignStatus: "Paused",
      campaignBiddingStrategy: "Target ROAS",
    },
    {
      id: "29",
      timestamp: "2025-03-08 17:50:20",
      user: "mike.chen@walmart.com",
      action: "Updated",
      budget: "$450 → $500",
      endDate: "30th Mar, 2025 → 5th Apr, 2025",
      offsiteProductAds: "Enabled → Disabled",
      campaignName: "SP - Toys - Easter Promotion",
    },
    {
      id: "30",
      timestamp: "2025-03-08 16:35:10",
      user: "lisa.kellman@walmart.com",
      action: "Updated",
      campaignStatus: "Live → Paused",
      adgroupStatus: "Active → Paused",
      budget: "$300 → $250",
      campaignName: "SP - GTV - HiSense - New SKUs",
    }
  ];

  // Filter entries by campaign if campaignId is present
  const filteredEntries = campaignId
    ? historyEntries.filter(entry => entry.campaignName === campaignName)
    : historyEntries;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(filteredEntries.map(entry => entry.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const selectAllCheckedState = selectedRows.size === filteredEntries.length ? true : selectedRows.size > 0 ? 'indeterminate' : false;

  return (
    <div className="min-h-screen bg-background">
      <MastHead
        userName="Lisa Kellman"
        mediaSolution={selectedMediaSolution as MediaSolution}
        onMediaSolutionChange={(solution) => setSelectedMediaSolution(solution)}
        mediaSolutionsOpen={mediaSolutionsOpen}
        onMediaSolutionsOpenChange={setMediaSolutionsOpen}
      />

      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-[32px] font-bold text-foreground leading-10 mb-2">
                {campaignName ? `${campaignName} - History log` : 'History log'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {campaignName
                  ? `View all changes made to ${campaignName}. Track who made changes and when.`
                  : 'View all changes made to campaigns, keywords, and settings. Track who made changes and when.'
                }
              </p>
            </div>

            {/* Data Table */}
            <div className="bg-background rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] overflow-x-auto">
              <DataTable>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeader width="48px">
                      <Checkbox
                        checked={selectAllCheckedState}
                        onCheckedChange={(checked) => handleSelectAll(checked === true)}
                        aria-label="Select all entries"
                      />
                    </DataTableHeader>
                    <DataTableHeader width="180px">Timestamp</DataTableHeader>
                    <DataTableHeader width="260px">User</DataTableHeader>
                    <DataTableHeader width="120px">Action</DataTableHeader>
                    {/* EXISTING columns */}
                    <DataTableHeader width="180px">Campaign Status</DataTableHeader>
                    <DataTableHeader width="180px">Budget</DataTableHeader>
                    <DataTableHeader width="240px">End Date</DataTableHeader>
                    {/* NEW proposed columns */}
                    <DataTableHeader width="280px">Campaign Name</DataTableHeader>
                    <DataTableHeader width="180px">Expanded Targeting</DataTableHeader>
                    <DataTableHeader width="240px">Campaign Bidding Strategy</DataTableHeader>
                    <DataTableHeader width="150px">Bid Multiplier</DataTableHeader>
                    <DataTableHeader width="180px">Offsite Product Ads</DataTableHeader>
                    <DataTableHeader width="180px">Adgroup Creation</DataTableHeader>
                    <DataTableHeader width="200px">Adgroup Name</DataTableHeader>
                    <DataTableHeader width="160px">Adgroup Status</DataTableHeader>
                    <DataTableHeader width="160px">Items Section</DataTableHeader>
                    <DataTableHeader width="180px">Keywords Section</DataTableHeader>
                    <DataTableHeader width="200px">New Campaign Status</DataTableHeader>
                    <DataTableHeader width="150px">Target ROAS</DataTableHeader>
                    <DataTableHeader width="180px">Start Date</DataTableHeader>
                    <DataTableHeader width="120px">Item Bid</DataTableHeader>
                    <DataTableHeader width="140px">Keyword Bid</DataTableHeader>
                    <DataTableHeader width="220px">Placement Inclusion</DataTableHeader>
                    <DataTableHeader width="200px">Negative Keywords</DataTableHeader>
                    <DataTableHeader width="240px">Item Suggested Bids Apply</DataTableHeader>
                    <DataTableHeader width="260px">Keywords Suggested Bids Apply</DataTableHeader>
                    <DataTableHeader width="150px">Brand Name</DataTableHeader>
                    <DataTableHeader width="160px">Ad Headline</DataTableHeader>
                    <DataTableHeader width="140px">Brand Logo</DataTableHeader>
                    <DataTableHeader width="140px">Brand Link</DataTableHeader>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {filteredEntries.map((entry) => (
                    <DataTableRow key={entry.id}>
                      <DataTableCell>
                        <Checkbox
                          checked={selectedRows.has(entry.id)}
                          onCheckedChange={(checked) => handleSelectRow(entry.id, checked === true)}
                          aria-label={`Select entry ${entry.id}`}
                        />
                      </DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.timestamp}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.user}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>
                        <span className={
                          entry.action === 'Created' ? 'text-[var(--ld-semantic-color-text-positive)]' :
                          entry.action === 'Paused' ? 'text-[var(--ld-semantic-color-text-negative)]' :
                          'text-foreground'
                        }>
                          {entry.action}
                        </span>
                      </DataTableCell>
                      {/* EXISTING columns */}
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.campaignStatus || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.budget || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.endDate || '-'}</DataTableCell>
                      {/* NEW proposed columns */}
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.campaignName || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.expandedTargeting || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.campaignBiddingStrategy || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.bidMultiplier || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.offsiteProductAds || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.adgroupCreation || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.adgroupName || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.adgroupStatus || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.itemsSection || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.keywordsSection || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.newCampaignStatus || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.targetROAS || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.startDate || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.itemBid || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.keywordBid || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.placementInclusion || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.negativeKeywords || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.itemSuggestedBidsApply || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.keywordsSuggestedBidsApply || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.brandName || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.adHeadline || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.brandLogo || '-'}</DataTableCell>
                      <DataTableCell UNSAFE_style={{ whiteSpace: 'nowrap' }}>{entry.brandLink || '-'}</DataTableCell>
                    </DataTableRow>
                  ))}
                </DataTableBody>
              </DataTable>
            </div>
          </div>
        </main>
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
