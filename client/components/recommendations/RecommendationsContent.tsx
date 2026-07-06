import { ArrowUp, RotateCcw } from "@/components/icons";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { Link } from "@/components/ui/Link";
import { LinkButton } from "@/components/ui/LinkButton";
import { Checkbox } from "@/components/ui/Checkbox";
import { Alert } from "@/components/ui/Alert";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';
import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";
import { snackbar } from "@/hooks/use-snackbar";

interface RecommendationsContentProps {
  campaignGoal?: string;
  onClose: () => void;
}

interface RecommendationItem {
  id: string;
  type: "campaign" | "adgroup";
  title: string;
  impact: string;
  message: string;
  affectedAdGroups?: string[];
  adGroup?: string;
  recommendationType?: "Budget" | "Targeting" | "Date" | "Creative" | "Frequency";
}

interface AppliedRecommendation {
  id: string;
  title: string;
  campaignName: string;
  type: string;
  dateApplied: string;
  impactType: string;
  impactValue: string;
}

interface DismissedRecommendation {
  id: string;
  title: string;
  campaignName: string;
  type: string;
  impactType: string;
  impactValue: string;
}

interface CampaignSection {
  id: string;
  name: string;
  adGroups: number;
  recommendations: number;
  impact: string;
  description: string;
  goal: string;
  items: RecommendationItem[];
  isHidden: boolean;
  isExpanded: boolean;
}

/**
 * RecommendationsContent - The content component for the recommendations panel
 * Contains all the business logic for managing recommendations, filters, and tabs
 */
export function RecommendationsContent({ campaignGoal = "Awareness", onClose }: RecommendationsContentProps) {
  const [selectedTab, setSelectedTab] = useState<"active" | "applied" | "dismissed">("active");
  const [selectedRecommendations, setSelectedRecommendations] = useState<Set<string>>(new Set());
  const [campaigns, setCampaigns] = useState<CampaignSection[]>([]);
  const [appliedRecommendations, setAppliedRecommendations] = useState<AppliedRecommendation[]>([]);
  const [dismissedRecommendations, setDismissedRecommendations] = useState<DismissedRecommendation[]>([]);
  const [viewingDetailId, setViewingDetailId] = useState<string | null>(null);
  const [newlyAppliedIds, setNewlyAppliedIds] = useState<Set<string>>(new Set());

  // Filter states
  const [selectedCampaignGoals, setSelectedCampaignGoals] = useState<Set<string>>(new Set([`${campaignGoal} campaign`]));
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedGroupBy, setSelectedGroupBy] = useState<Set<string>>(new Set());

  // Update filter when campaignGoal prop changes
  useEffect(() => {
    if (campaignGoal) {
      setSelectedCampaignGoals(new Set([`${campaignGoal} campaign`]));
    }
  }, [campaignGoal]);

  // Helper to find current recommendation
  const getCurrentRecommendation = () => {
    if (!viewingDetailId) return null;
    for (const campaign of campaigns) {
      const rec = campaign.items.find(item => item.id === viewingDetailId);
      if (rec) return rec;
    }
    return null;
  };

  // Initialize campaigns data
  useEffect(() => {
    setCampaigns([
      {
        id: "campaign-1",
        name: "Coca-Cola Zero Sugar - Summer Campaign 2024",
        adGroups: 3,
        recommendations: 8,
        impact: "2.4M-2.8M",
        description: "Potential increase in impressions",
        goal: "Awareness",
        isHidden: false,
        isExpanded: false,
        items: [
          {
            id: "rec-1-1",
            type: "campaign",
            title: "Reallocate budget across ad groups",
            impact: "2.4M-2.8M",
            message: "Potential increase in impressions",
            affectedAdGroups: ["Young Adults 18-24", "Fitness Enthusiasts", "Health Conscious"],
            recommendationType: "Budget"
          },
          {
            id: "rec-1-2",
            type: "adgroup",
            title: "Add categories",
            impact: "890K-1.2M",
            message: "Potential increase in impressions",
            adGroup: "Young Adults 18-24",
            recommendationType: "Targeting"
          },
          {
            id: "rec-1-3",
            type: "adgroup",
            title: "Optimize creative for mobile devices",
            impact: "750K-920K",
            message: "Potential increase in engagement",
            adGroup: "Fitness Enthusiasts",
            recommendationType: "Creative"
          },
          {
            id: "rec-1-4",
            type: "adgroup",
            title: "Increase budget",
            impact: "640K-780K",
            message: "Potential increase in impressions",
            adGroup: "Health Conscious",
            recommendationType: "Budget"
          },
          {
            id: "rec-1-5",
            type: "adgroup",
            title: "Extend campaign duration",
            impact: "520K-650K",
            message: "Potential increase in reach",
            adGroup: "Young Adults 18-24",
            recommendationType: "Date"
          },
          {
            id: "rec-1-6",
            type: "adgroup",
            title: "Increase budget",
            impact: "450K-580K",
            message: "Potential increase in conversions",
            adGroup: "Young Adults 18-24",
            recommendationType: "Budget"
          },
          {
            id: "rec-1-7",
            type: "adgroup",
            title: "Add video ad format",
            impact: "680K-830K",
            message: "Potential increase in engagement",
            adGroup: "Fitness Enthusiasts",
            recommendationType: "Creative"
          },
          {
            id: "rec-1-8",
            type: "adgroup",
            title: "Add audience segments",
            impact: "590K-720K",
            message: "Potential increase in reach",
            adGroup: "Health Conscious",
            recommendationType: "Targeting"
          }
        ]
      },
      {
        id: "campaign-2",
        name: "Coca-Cola Original - Holiday Brand Campaign",
        adGroups: 4,
        recommendations: 4,
        impact: "3.1M-3.6M",
        description: "Potential increase in impressions",
        goal: "Awareness",
        isHidden: false,
        isExpanded: false,
        items: [
          {
            id: "rec-2-1",
            type: "campaign",
            title: "Reallocate budget across ad groups",
            impact: "3.1M-3.6M",
            message: "Potential increase in impressions",
            affectedAdGroups: ["Families", "Holiday Shoppers", "Gift Buyers", "Entertainment Seekers"],
            recommendationType: "Budget"
          },
          {
            id: "rec-2-2",
            type: "adgroup",
            title: "Increase budget",
            impact: "1.2M-1.5M",
            message: "Potential increase in brand recall",
            adGroup: "Families",
            recommendationType: "Budget"
          },
          {
            id: "rec-2-3",
            type: "adgroup",
            title: "Add video ad formats",
            impact: "980K-1.1M",
            message: "Potential increase in engagement",
            adGroup: "Holiday Shoppers",
            recommendationType: "Creative"
          },
          {
            id: "rec-2-4",
            type: "adgroup",
            title: "Add categories",
            impact: "850K-1.0M",
            message: "Potential increase in impressions",
            adGroup: "Entertainment Seekers",
            recommendationType: "Targeting"
          }
        ]
      },
      {
        id: "campaign-3",
        name: "Coca-Cola Energy - Sports & Gaming",
        adGroups: 3,
        recommendations: 3,
        impact: "1.8M-2.1M",
        description: "Potential increase in clicks",
        goal: "Engagement",
        isHidden: false,
        isExpanded: false,
        items: [
          {
            id: "rec-3-1",
            type: "campaign",
            title: "Reallocate budget across ad groups",
            impact: "1.8M-2.1M",
            message: "Potential increase in clicks",
            affectedAdGroups: ["Gamers 18-35", "Sports Fans", "Esports Viewers"],
            recommendationType: "Budget"
          },
          {
            id: "rec-3-2",
            type: "adgroup",
            title: "Add interactive ad formats",
            impact: "720K-850K",
            message: "Potential increase in engagement rate",
            adGroup: "Gamers 18-35",
            recommendationType: "Creative"
          },
          {
            id: "rec-3-3",
            type: "adgroup",
            title: "Add keywords",
            impact: "650K-780K",
            message: "Potential increase in clicks",
            adGroup: "Sports Fans",
            recommendationType: "Targeting"
          }
        ]
      },
      {
        id: "campaign-4",
        name: "Coca-Cola Mini - Impulse Purchase Driver",
        adGroups: 2,
        recommendations: 3,
        impact: "420K-520K",
        description: "Potential increase in store visits",
        goal: "Conversion",
        isHidden: false,
        isExpanded: false,
        items: [
          {
            id: "rec-4-1",
            type: "campaign",
            title: "Reallocate budget across ad groups",
            impact: "420K-520K",
            message: "Potential increase in store visits",
            affectedAdGroups: ["On-the-Go Consumers", "Convenience Shoppers"],
            recommendationType: "Budget"
          },
          {
            id: "rec-4-2",
            type: "adgroup",
            title: "Enable dynamic product ads with offers",
            impact: "280K-340K",
            message: "Potential increase in click-through rate",
            adGroup: "On-the-Go Consumers",
            recommendationType: "Creative"
          },
          {
            id: "rec-4-3",
            type: "adgroup",
            title: "Add keywords",
            impact: "180K-220K",
            message: "Potential increase in conversions",
            adGroup: "Convenience Shoppers",
            recommendationType: "Targeting"
          }
        ]
      }
    ]);
    setAppliedRecommendations([
      {
        id: "applied-1",
        title: "Reallocate budget across ad groups",
        campaignName: "Campaign name 01",
        type: "Budget",
        dateApplied: "01/20/2026",
        impactType: "Impressions",
        impactValue: "35k"
      },
      {
        id: "applied-2",
        title: "Add 15 keywords",
        campaignName: "Campaign name 02",
        type: "Targeting",
        dateApplied: "01/20/2026",
        impactType: "Clicks",
        impactValue: "2.5%"
      },
      {
        id: "applied-3",
        title: "Add 7 categories",
        campaignName: "Campaign name 02",
        type: "Targeting",
        dateApplied: "01/20/2026",
        impactType: "Transactions",
        impactValue: "15%"
      },
      {
        id: "applied-4",
        title: "Extend campaign duration",
        campaignName: "Campaign name 03",
        type: "Date",
        dateApplied: "01/20/2026",
        impactType: "Impressions",
        impactValue: "15k"
      },
      {
        id: "applied-5",
        title: "Reallocate budget across ad groups",
        campaignName: "Campaign name 01",
        type: "Data",
        dateApplied: "01/20/2026",
        impactType: "Impressions",
        impactValue: "100%"
      },
      {
        id: "applied-6",
        title: "Add 15 keywords",
        campaignName: "Campaign name 02",
        type: "Data",
        dateApplied: "01/20/2026",
        impactType: "Impressions",
        impactValue: "100%"
      },
      {
        id: "applied-7",
        title: "Add 7 categories",
        campaignName: "Campaign name 02",
        type: "Data",
        dateApplied: "01/20/2026",
        impactType: "Transactions",
        impactValue: "100%"
      },
      {
        id: "applied-8",
        title: "Extend campaign duration",
        campaignName: "Campaign name 03",
        type: "Data",
        dateApplied: "01/20/2026",
        impactType: "Transactions",
        impactValue: "100%"
      }
    ]);
    setDismissedRecommendations([
      {
        id: "dismissed-1",
        title: "Reallocate budget across ad groups",
        campaignName: "Campaign name 01",
        type: "Budget",
        impactType: "Impressions",
        impactValue: "27k-35k"
      },
      {
        id: "dismissed-2",
        title: "Add 15 keywords",
        campaignName: "Campaign name 02",
        type: "Targeting",
        impactType: "Clicks",
        impactValue: "2.1%-2.5%"
      },
      {
        id: "dismissed-3",
        title: "Add 7 categories",
        campaignName: "Campaign name 02",
        type: "Targeting",
        impactType: "Transactions",
        impactValue: "13%-15%"
      }
    ]);
    setSelectedRecommendations(new Set());
    setSelectedTab("active");
  }, []);

  const handleToggleRecommendation = (recId: string) => {
    const newSelected = new Set(selectedRecommendations);
    if (newSelected.has(recId)) {
      newSelected.delete(recId);
    } else {
      newSelected.add(recId);
    }
    setSelectedRecommendations(newSelected);
  };

  const handleToggleCampaignExpanded = (campaignId: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === campaignId ? { ...c, isExpanded: !c.isExpanded } : c
    ));
  };

  const handleApplySelected = () => {
    setNewlyAppliedIds(prev => new Set([...prev, ...selectedRecommendations]));
    snackbar({ message: 'Recommendation applied successfully' });
    setSelectedRecommendations(new Set());
  };

  // Helper function to check if a recommendation conflicts with selected or applied ones
  const getConflictingRecommendation = (rec: RecommendationItem, campaignId: string): { isConflicted: boolean; conflictingRecTitle?: string } => {
    const currentCampaign = campaigns.find(c => c.id === campaignId);
    if (!currentCampaign) return { isConflicted: false };

    const conflictingRecsInCampaign = currentCampaign.items.filter(r =>
      selectedRecommendations.has(r.id) || newlyAppliedIds.has(r.id)
    );

    for (const conflictingRec of conflictingRecsInCampaign) {
      if (conflictingRec.id === rec.id) continue;

      if (conflictingRec.type === 'adgroup' && rec.type === 'adgroup' &&
          conflictingRec.adGroup && rec.adGroup && conflictingRec.adGroup === rec.adGroup) {
        return { isConflicted: true, conflictingRecTitle: conflictingRec.title };
      }

      if (conflictingRec.type === 'campaign' && conflictingRec.affectedAdGroups && conflictingRec.affectedAdGroups.length > 0) {
        if (rec.type === 'adgroup') {
          return { isConflicted: true, conflictingRecTitle: conflictingRec.title };
        }
      }

      if (conflictingRec.type === 'adgroup' && rec.type === 'campaign' && rec.affectedAdGroups) {
        return { isConflicted: true, conflictingRecTitle: conflictingRec.title };
      }
    }

    return { isConflicted: false };
  };

  const filteredCampaigns = campaigns
    .filter(campaign => {
      if (selectedCampaignGoals.size === 0) return true;
      return Array.from(selectedCampaignGoals).some(goal =>
        goal.includes(campaign.goal)
      );
    })
    .map(campaign => {
      if (selectedTypes.size > 0) {
        const filteredItems = campaign.items.filter(item =>
          item.recommendationType && selectedTypes.has(item.recommendationType)
        );
        return {
          ...campaign,
          items: filteredItems,
          recommendations: filteredItems.length
        };
      }
      return campaign;
    })
    .filter(campaign => campaign.items.length > 0);

  const totalRecommendations = campaigns.reduce((sum, c) => sum + c.recommendations, 0);

  if (viewingDetailId) {
    // Detail View
    const currentRec = getCurrentRecommendation();
    
    return (
      <div className="flex flex-col h-full">
        {/* Breadcrumb */}
        <div className="pb-4">
          <Breadcrumb aria-label="Breadcrumb navigation">
            <BreadcrumbItem onClick={() => setViewingDetailId(null)}>
              Recommendations
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent>
              {currentRec?.title || "Recommendation details"}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* Detail Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {/* Title and Impact */}
            <div>
              <h3 className="text-base font-bold text-foreground mb-1">
                {currentRec?.title || "Add 15 keywords"}
              </h3>
              <div className="flex items-end gap-1">
                <span className="text-sm font-bold text-[#2A8703]">
                  {currentRec?.impact || "15k-18k"}
                </span>
                <span className="text-sm text-foreground">
                  {currentRec?.message || "Potential increase in reach"}
                </span>
              </div>
            </div>

            {/* Alert Banner */}
            <Alert variant="info">
              Applying this recommendation will update the ad group. Other recommendations for the same ad group may no longer apply.
            </Alert>

            {/* Campaign */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1">Campaign</h4>
              <Link href="#" className="text-sm">
                H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_50839
              </Link>
            </div>

            {/* Ad group */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1">Ad group</h4>
              <Link href="#" className="text-sm">
                Walmart|Display|Auction|Cross Device|Behavioral Targeting|Past Purchasers of Tapatio
              </Link>
            </div>

            {/* Dynamic content based on recommendation type */}
            {(() => {
              const recType = currentRec?.recommendationType;

              if (recType === 'Targeting') {
                return (
                  <>
                    <div className="bg-[#F8F8F8] border border-[#E3E4E5] rounded">
                      <div className="p-4 border-b border-[#E3E4E5] bg-white">
                        <h4 className="text-sm font-bold text-foreground mb-2">
                          {currentRec?.title.includes('keyword') ? 'Recommended keywords' : 'Recommended targeting'}
                        </h4>
                        <p className="text-sm text-foreground mb-2 leading-relaxed">
                          {currentRec?.title.includes('keyword')
                            ? 'Coca-Cola freestyle machine, Coke vending machine, Coca-Cola sponsorship deals, Coke tasting event, Coca-Cola heritage tour, Coke glassware, Coca-Cola recipe pairing, Coke float dessert, Coca-Cola ice cream soda, Coke recipe hacks, Coca-Cola themed cafe, Coke and popcorn combo, Coca-Cola holiday truck tour, Coke art installation, Coca-Cola fan club, Coke TikTok challenge, Coca-Cola merch giveaway'
                            : 'Health-conscious shoppers, Fitness enthusiasts, Zero-sugar beverage consumers, Active lifestyle segment, Weight-conscious millennials'
                          }
                        </p>
                        <button className="text-sm underline hover:no-underline">View more</button>
                      </div>
                      <div>
                        <button className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-100 transition-colors">
                          <h4 className="text-sm font-bold text-foreground">Current</h4>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transform rotate-0">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.14645 5.39645C3.32669 5.2162 3.6103 5.20234 3.80645 5.35485L3.85355 5.39645L8 9.5425L12.1464 5.39645C12.3267 5.2162 12.6103 5.20234 12.8064 5.35485L12.8536 5.39645C13.0338 5.57669 13.0477 5.8603 12.8951 6.05645L12.8536 6.10355L8.35355 10.6036C8.17331 10.7838 7.8897 10.7977 7.69355 10.6451L7.64645 10.6036L3.14645 6.10355C2.95118 5.90829 2.95118 5.59171 3.14645 5.39645Z" fill="#2E2F32"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-2">Why we recommend this</h4>
                      <p className="text-sm text-foreground">
                        Based on your campaign performance, we've identified that expanding your targeting could significantly increase your reach. Similar campaigns saw an average 12% increase in impressions while maintaining conversion quality.
                      </p>
                    </div>
                  </>
                );
              }

              if (recType === 'Budget') {
                return (
                  <>
                    <div className="bg-[#F8F8F8] border border-[#E3E4E5] rounded">
                      <div className="p-4 border-b border-[#E3E4E5] bg-white">
                        <h4 className="text-sm font-bold text-foreground mb-2">Recommended budget allocation</h4>
                        <div className="space-y-2">
                          {currentRec?.affectedAdGroups?.map((adGroup, idx) => (
                            <div key={idx} className="flex justify-between text-sm text-foreground">
                              <span>{adGroup}</span>
                              <span className="font-bold">+{15 + idx * 5}%</span>
                            </div>
                          )) || (
                            <div className="flex justify-between text-sm text-foreground">
                              <span>{currentRec?.adGroup}</span>
                              <span className="font-bold">+20%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-2">Why we recommend this</h4>
                      <p className="text-sm text-foreground">
                        Our analysis shows that reallocating your budget across ad groups will maximize your campaign performance.
                      </p>
                    </div>
                  </>
                );
              }

              // Default fallback
              return (
                <>
                  <div className="bg-[#F8F8F8] border border-[#E3E4E5] rounded">
                    <div className="p-4 border-b border-[#E3E4E5] bg-white">
                      <h4 className="text-sm font-bold text-foreground mb-2">Recommendation details</h4>
                      <p className="text-sm text-foreground">
                        Review the details below to understand the impact of this recommendation on your campaign.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-2">Why we recommend this</h4>
                    <p className="text-sm text-foreground">
                      This recommendation is based on your campaign performance data and industry best practices.
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* Detail Footer */}
        <div className="pt-4">
          {viewingDetailId && newlyAppliedIds.has(viewingDetailId) ? (
            <div className="flex items-center justify-end gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <circle cx="10" cy="10" r="10" fill="#2A8703"/>
                <path d="M14.5 7L8.5 13L5.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-normal text-[#2A8703]">Recommendation applied</span>
            </div>
          ) : (
            <ButtonGroup>
              <LinkButton onClick={() => setViewingDetailId(null)}>
                Cancel
              </LinkButton>
              <LinkButton onClick={() => {}}>
                Dismiss
              </LinkButton>
              <Button
                variant="primary"
                onClick={() => {
                  if (viewingDetailId) {
                    setNewlyAppliedIds(prev => new Set([...prev, viewingDetailId]));
                    snackbar({ message: 'Recommendation applied successfully' });
                  }
                }}
              >
                Apply recommendation
              </Button>
            </ButtonGroup>
          )}
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="overflow-x-auto -mx-6 px-6 mb-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabList>
            <Tab value="active">
              Active recommendations ({totalRecommendations})
            </Tab>
            <Tab value="applied">
              Applied (8)
            </Tab>
            <Tab value="dismissed">
              Dismissed (4)
            </Tab>
          </TabList>
        </Tabs>
      </div>

      {/* Filter Dropdowns - Only show on active tab */}
      {selectedTab === "active" && (
        <div className="overflow-x-auto mb-4">
          <div className="flex items-center gap-3 min-w-max">
            {/* Campaign Goal Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`flex items-center justify-center gap-2 h-8 px-4 rounded-full text-sm font-normal transition-all ${
                    selectedCampaignGoals.size > 0
                      ? 'border-2 border-[#0053E2] bg-[#E5F0FF] text-foreground'
                      : 'border border-[#74767C] bg-white text-foreground hover:bg-gray-50'
                  }`}
                >
                  {selectedCampaignGoals.size === 1
                    ? Array.from(selectedCampaignGoals)[0]
                    : selectedCampaignGoals.size > 1
                      ? `Campaign goal (${selectedCampaignGoals.size})`
                      : 'Campaign goal'
                  }
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.93306 7.24553C4.15578 7.02281 4.51544 7.00292 4.75806 7.18482L4.81694 7.24553L10 12.4281L15.1831 7.24553C15.4058 7.02281 15.7654 7.00292 16.0081 7.18482L16.0669 7.24553C16.2896 7.46825 16.3095 7.82791 16.1276 8.07053L16.0669 8.12941L10.4419 13.7544C10.2192 13.9771 9.85956 13.997 9.61694 13.8151L9.55806 13.7544L3.93306 8.12941C3.68897 7.88532 3.68897 7.48962 3.93306 7.24553Z" fill="#2E2F32"/>
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[226px] p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col gap-3">
                  <div className="text-sm font-bold text-foreground">Campaign goal</div>
                  <div className="flex flex-col gap-3">
                    {['Awareness campaign', 'Engagement campaign', 'Conversion campaign'].map((goal) => (
                      <Checkbox
                        key={goal}
                        label={goal}
                        checked={selectedCampaignGoals.has(goal)}
                        onCheckedChange={(checked) => {
                          const newGoals = new Set(selectedCampaignGoals);
                          if (checked) {
                            newGoals.add(goal);
                          } else {
                            newGoals.delete(goal);
                          }
                          setSelectedCampaignGoals(newGoals);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Type Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`flex items-center justify-center gap-2 h-8 px-4 rounded-full text-sm font-normal transition-all ${
                    selectedTypes.size > 0
                      ? 'border-2 border-[#0053E2] bg-[#E5F0FF] text-foreground'
                      : 'border border-[#74767C] bg-white text-foreground hover:bg-gray-50'
                  }`}
                >
                  {selectedTypes.size === 1
                    ? Array.from(selectedTypes)[0]
                    : selectedTypes.size > 1
                      ? `Type (${selectedTypes.size})`
                      : 'Type'
                  }
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.93306 7.24553C4.15578 7.02281 4.51544 7.00292 4.75806 7.18482L4.81694 7.24553L10 12.4281L15.1831 7.24553C15.4058 7.02281 15.7654 7.00292 16.0081 7.18482L16.0669 7.24553C16.2896 7.46825 16.3095 7.82791 16.1276 8.07053L16.0669 8.12941L10.4419 13.7544C10.2192 13.9771 9.85956 13.997 9.61694 13.8151L9.55806 13.7544L3.93306 8.12941C3.68897 7.88532 3.68897 7.48962 3.93306 7.24553Z" fill="#2E2F32"/>
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[226px] p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col gap-3">
                  <div className="text-sm font-bold text-foreground">Recommendation type</div>
                  <div className="flex flex-col gap-3">
                    {['Budget', 'Targeting', 'Date', 'Creative', 'Frequency'].map((type) => (
                      <Checkbox
                        key={type}
                        label={type}
                        checked={selectedTypes.has(type)}
                        onCheckedChange={(checked) => {
                          const newTypes = new Set(selectedTypes);
                          if (checked) {
                            newTypes.add(type);
                          } else {
                            newTypes.delete(type);
                          }
                          setSelectedTypes(newTypes);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Group By Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`flex items-center justify-center gap-2 h-8 px-4 rounded-full text-sm font-normal transition-all ${
                    selectedGroupBy.size > 0
                      ? 'border-2 border-[#0053E2] bg-[#E5F0FF] text-foreground'
                      : 'border border-[#74767C] bg-white text-foreground hover:bg-gray-50'
                  }`}
                >
                  {selectedGroupBy.size === 1
                    ? `Group by: ${Array.from(selectedGroupBy)[0]}`
                    : selectedGroupBy.size > 1
                      ? `Group by (${selectedGroupBy.size})`
                      : 'Group by'
                  }
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.93306 7.24553C4.15578 7.02281 4.51544 7.00292 4.75806 7.18482L4.81694 7.24553L10 12.4281L15.1831 7.24553C15.4058 7.02281 15.7654 7.00292 16.0081 7.18482L16.0669 7.24553C16.2896 7.46825 16.3095 7.82791 16.1276 8.07053L16.0669 8.12941L10.4419 13.7544C10.2192 13.9771 9.85956 13.997 9.61694 13.8151L9.55806 13.7544L3.93306 8.12941C3.68897 7.88532 3.68897 7.48962 3.93306 7.24553Z" fill="#2E2F32"/>
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[226px] p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col gap-3">
                  <div className="text-sm font-bold text-foreground">Group by</div>
                  <div className="flex flex-col gap-3">
                    {['Campaign', 'Recommendation'].map((group) => (
                      <Checkbox
                        key={group}
                        label={group}
                        checked={selectedGroupBy.has(group)}
                        onCheckedChange={(checked) => {
                          const newGroups = new Set(selectedGroupBy);
                          if (checked) {
                            newGroups.add(group);
                          } else {
                            newGroups.delete(group);
                          }
                          setSelectedGroupBy(newGroups);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      {/* Content Container - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {selectedTab === "applied" ? (
          /* Applied Recommendations Table */
          <div className="bg-background rounded-lg border border-border overflow-hidden">
            <DataTable>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeader>Recommendation</DataTableHeader>
                  <DataTableHeader>Type</DataTableHeader>
                  <DataTableHeader>Date applied</DataTableHeader>
                  <DataTableHeader>Impact</DataTableHeader>
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                {appliedRecommendations.map((rec) => (
                  <DataTableRow key={rec.id}>
                    <DataTableCell>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm text-foreground">{rec.title}</div>
                        <div className="text-sm text-muted-foreground">{rec.campaignName}</div>
                      </div>
                    </DataTableCell>
                    <DataTableCell>
                      <div className="text-sm text-foreground">{rec.type}</div>
                    </DataTableCell>
                    <DataTableCell>
                      <div className="text-sm text-foreground">{rec.dateApplied}</div>
                    </DataTableCell>
                    <DataTableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">{rec.impactType}</span>
                        <span className="flex items-center gap-1 text-sm font-bold text-[#2A8703]">
                          <ArrowUp className="w-4 h-4" />
                          {rec.impactValue}
                        </span>
                      </div>
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </DataTableBody>
            </DataTable>
          </div>
        ) : selectedTab === "dismissed" ? (
          /* Dismissed Recommendations Table */
          <div className="bg-background rounded-lg border border-border overflow-hidden">
            <DataTable>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeader>Recommendation</DataTableHeader>
                  <DataTableHeader>Type</DataTableHeader>
                  <DataTableHeader>Impact</DataTableHeader>
                  <DataTableHeader>Action</DataTableHeader>
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                {dismissedRecommendations.map((rec) => (
                  <DataTableRow key={rec.id}>
                    <DataTableCell>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm text-foreground">{rec.title}</div>
                        <div className="text-sm text-muted-foreground">{rec.campaignName}</div>
                      </div>
                    </DataTableCell>
                    <DataTableCell>
                      <div className="text-sm text-foreground">{rec.type}</div>
                    </DataTableCell>
                    <DataTableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">{rec.impactType}</span>
                        <span className="flex items-center gap-1 text-sm font-bold text-[#2A8703]">
                          <ArrowUp className="w-4 h-4" />
                          {rec.impactValue}
                        </span>
                      </div>
                    </DataTableCell>
                    <DataTableCell>
                      <LinkButton onClick={() => {}}>
                        <RotateCcw className="w-4 h-4" />
                        Restore
                      </LinkButton>
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </DataTableBody>
            </DataTable>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Banner Text */}
            <div className="text-sm text-foreground">
              Some recommendations may become unavailable based on your selection.
            </div>

            {/* Campaign Recommendations */}
            {filteredCampaigns.map((campaign) => {
              const parseImpact = (impact: string): number => {
                const parts = impact.split('-');
                const maxValue = parts[parts.length - 1].trim();
                if (maxValue.endsWith('M')) {
                  return parseFloat(maxValue.replace('M', '')) * 1000000;
                } else if (maxValue.endsWith('K')) {
                  return parseFloat(maxValue.replace('K', '')) * 1000;
                }
                return 0;
              };

              const sortedItems = [...campaign.items].sort((a, b) => {
                return parseImpact(b.impact) - parseImpact(a.impact);
              });

              let visibleItems: RecommendationItem[];
              if (campaign.isExpanded) {
                visibleItems = sortedItems;
              } else {
                const campaignLevelRecs = sortedItems.filter(item => item.affectedAdGroups);
                const adGroupLevelRecs = sortedItems.filter(item => item.adGroup);

                const adGroupMap = new Map<string, RecommendationItem[]>();
                adGroupLevelRecs.forEach(rec => {
                  if (rec.adGroup) {
                    if (!adGroupMap.has(rec.adGroup)) {
                      adGroupMap.set(rec.adGroup, []);
                    }
                    const group = adGroupMap.get(rec.adGroup)!;
                    if (group.length < 2) {
                      group.push(rec);
                    }
                  }
                });

                const limitedAdGroupRecs = Array.from(adGroupMap.values()).flat();
                visibleItems = [...campaignLevelRecs, ...limitedAdGroupRecs];
              }

              const hiddenCount = sortedItems.length - visibleItems.length;

              return (
                <div key={campaign.id} className="rounded-lg border border-[#E3E4E5] overflow-hidden">
                  {/* Campaign Header */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-white flex-wrap">
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <div className="text-sm text-foreground">
                        {campaign.name}
                      </div>
                      <div className="flex items-baseline gap-1 flex-wrap">
                        <span className="text-sm font-bold text-[#2A8703]">{campaign.impact}</span>
                        <span className="text-sm font-bold text-foreground">{campaign.description}</span>
                      </div>
                    </div>
                    <div className="text-sm text-[#74767C] whitespace-nowrap">
                      {campaign.recommendations} recommendation{campaign.recommendations !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Recommendations List */}
                  {!campaign.isHidden && (
                    <div className="bg-[#F4F5F5] p-4 flex flex-col gap-3">
                      {visibleItems.map((rec) => {
                        const conflict = getConflictingRecommendation(rec, campaign.id);
                        const isDisabled = conflict.isConflicted;

                        return (
                          <div
                            key={rec.id}
                            className={`flex flex-col rounded-lg bg-white ${
                              selectedRecommendations.has(rec.id) ? 'border border-black' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3 p-4">
                              {/* Checkbox */}
                              <div className="flex items-start pt-0.5">
                                <Checkbox
                                  checked={selectedRecommendations.has(rec.id)}
                                  onCheckedChange={() => !isDisabled && !newlyAppliedIds.has(rec.id) && handleToggleRecommendation(rec.id)}
                                  disabled={isDisabled || newlyAppliedIds.has(rec.id)}
                                  aria-label={`Select recommendation: ${rec.title}`}
                                />
                              </div>

                              {/* Content and CTAs wrapper */}
                              <div className="flex-1 flex flex-col lg:flex-row items-start gap-3 min-w-0">
                                {/* Content */}
                                <div className="flex-1 flex flex-col gap-2 min-w-0">
                                  <div className="flex flex-col gap-1">
                                    <div className={`text-sm font-normal ${isDisabled ? 'text-[#C7C8CB]' : 'text-foreground'}`}>
                                      {rec.title}
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                      <span className={`text-sm font-bold ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#2A8703]'}`}>
                                        {rec.impact}
                                      </span>
                                      <span className={`text-sm font-bold ${isDisabled ? 'text-[#C7C8CB]' : 'text-foreground'}`}>
                                        {rec.message}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Affected ad groups */}
                                  {rec.affectedAdGroups && (
                                    <div className="flex flex-col gap-1">
                                      <span className={`text-xs ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#74767C]'}`}>
                                        Ad group(s) affected
                                      </span>
                                      <div className={`text-sm ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#74767C]'}`}>
                                        {rec.affectedAdGroups.join(' · ')}
                                      </div>
                                    </div>
                                  )}

                                  {/* Ad group name for adgroup type */}
                                  {rec.adGroup && (
                                    <div className="flex flex-col gap-1">
                                      <span className={`text-xs ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#74767C]'}`}>
                                        Ad group(s) affected
                                      </span>
                                      <div className={`text-sm ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#74767C]'}`}>
                                        {rec.adGroup}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Card CTAs */}
                                <div className="flex flex-wrap items-center gap-4">
                                  {newlyAppliedIds.has(rec.id) ? (
                                    <>
                                      <div className="flex items-center gap-2">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                          <circle cx="10" cy="10" r="10" fill="#2A8703"/>
                                          <path d="M14.5 7L8.5 13L5.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span className="text-sm font-normal text-[#2A8703] whitespace-nowrap">Recommendation applied</span>
                                      </div>
                                      <Button
                                        variant="tertiary"
                                        size="small"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setViewingDetailId(rec.id);
                                        }}
                                      >
                                        View details
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <LinkButton
                                        disabled={isDisabled}
                                        onClick={() => {}}
                                      >
                                        Dismiss
                                      </LinkButton>
                                      <Button
                                        variant="tertiary"
                                        size="small"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setViewingDetailId(rec.id);
                                        }}
                                      >
                                        View details
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Show more/less link */}
                      {campaign.items.length > 2 && (
                        <button
                          onClick={() => handleToggleCampaignExpanded(campaign.id)}
                          className="text-sm underline hover:no-underline self-end"
                        >
                          {campaign.isExpanded ? 'Show less' : `Show more (${hiddenCount})`}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Section - Apply selected button */}
      {selectedTab === "active" && (
        <div className="pt-4">
          <div className="flex items-center justify-between gap-4">
            {selectedRecommendations.size > 0 && (
              <span className="text-sm text-foreground">
                {selectedRecommendations.size} recommendation{selectedRecommendations.size !== 1 ? 's' : ''} selected
              </span>
            )}
            <div className="flex items-center gap-4 ml-auto">
              <LinkButton
                onClick={() => onClose()}
              >
                Cancel
              </LinkButton>
              <Button
                onClick={handleApplySelected}
                disabled={selectedRecommendations.size === 0}
                size="small"
              >
                Apply selected
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
