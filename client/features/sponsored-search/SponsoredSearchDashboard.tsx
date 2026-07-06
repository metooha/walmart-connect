import React, { useState, useEffect } from "react";
import { ChevronDown } from "@/components/icons";
import { Checkbox } from "@/components/ui/Checkbox";
import { useNavigate } from "react-router-dom";
import CampaignChart from "@/features/advertising/CampaignChart";
import { Select, SelectItem } from "@/components/ui/Select";
import EditMetricsModal from "./EditMetricsModal";
import DailyBudgetModal from "./DailyBudgetModal";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Alert } from "@/components/ui/Alert";
import { Divider } from "@/components/ui/Divider";

interface Campaign {
  name: string;
  roas: string;
  cpc: string;
  ctr: string;
  cvr: string;
  spend: number;
}

export default function SponsoredSearchDashboard() {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<string | null>('spend');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Date range filter state
  const [dateRange, setDateRange] = useState<string>("aug1-aug8");

  // Attribution filter state
  const [attribution, setAttribution] = useState<string>("14 days attribution");

  // Edit metrics modal state
  const [isEditMetricsModalOpen, setIsEditMetricsModalOpen] = useState(false);

  // Daily budget modal state
  const [isDailyBudgetModalOpen, setIsDailyBudgetModalOpen] = useState(false);

  // Chart series visibility state
  const [visibleSeries, setVisibleSeries] = useState({
    impressions: true,
    clicks: true,
    cpc: true
  });

  const toggleSeries = (series: 'impressions' | 'clicks' | 'cpc') => {
    setVisibleSeries(prev => ({
      ...prev,
      [series]: !prev[series]
    }));
  };

  // Metrics state (will be adjusted based on attribution)
  const [metrics, setMetrics] = useState({
    impressions: 18689154,
    clicks: 148782,
    cpc: 1.36,
    ctr: 0.84,
    adSpend: 195607
  });

  // Calculate metrics based on attribution window
  useEffect(() => {
    const attributionDays = parseInt(attribution.split(" ")[0]);

    // Simulate how different attribution windows affect metrics
    // Longer attribution windows typically capture more conversions
    const attributionMultiplier = {
      7: 0.85,   // 7 days - fewer conversions attributed
      14: 1.0,   // 14 days - baseline
      30: 1.18,  // 30 days - more conversions attributed
      60: 1.32,  // 60 days - even more conversions
      90: 1.45   // 90 days - most conversions attributed
    }[attributionDays] || 1.0;

    // Base metrics (14-day attribution)
    const baseMetrics = {
      impressions: 18689154,
      clicks: 148782,
      cpc: 1.36,
      ctr: 0.84,
      adSpend: 195607
    };

    // Adjust metrics based on attribution window
    // Longer windows = better metrics (more conversions counted)
    setMetrics({
      impressions: Math.round(baseMetrics.impressions * (0.95 + (attributionMultiplier - 1) * 0.15)),
      clicks: Math.round(baseMetrics.clicks * (0.95 + (attributionMultiplier - 1) * 0.2)),
      cpc: parseFloat((baseMetrics.cpc * (1.05 - (attributionMultiplier - 1) * 0.05)).toFixed(2)),
      ctr: parseFloat((baseMetrics.ctr * (0.95 + (attributionMultiplier - 1) * 0.15)).toFixed(2)),
      adSpend: Math.round(baseMetrics.adSpend * (0.98 + (attributionMultiplier - 1) * 0.08))
    });

    // Also update campaign metrics
    const adjustedCampaigns = initialCampaigns.map(campaign => ({
      ...campaign,
      roas: `$${(parseFloat(campaign.roas.replace('$', '')) * attributionMultiplier).toFixed(2)}`,
      cvr: `${(parseFloat(campaign.cvr.replace('%', '')) * attributionMultiplier).toFixed(2)}%`,
      cpc: `$${(parseFloat(campaign.cpc.replace('$', '')) * (1.1 - (attributionMultiplier - 1) * 0.1)).toFixed(2)}`,
      ctr: `${(parseFloat(campaign.ctr.replace('%', '')) * (0.95 + (attributionMultiplier - 1) * 0.15)).toFixed(2)}%`,
    }));
    setCampaigns(adjustedCampaigns);
  }, [attribution]);

  const initialCampaigns: Campaign[] = [
    {
      name: "Cool Beans, Hot Days (Summer 2025)",
      roas: "$7.68",
      cpc: "$1.09",
      ctr: "2.37%",
      cvr: "57.48%",
      spend: 1.09
    },
    {
      name: "Decaf, Not Defeated (Evergreen)",
      roas: "$10.52",
      cpc: "$0.78",
      ctr: "0.60%",
      cvr: "63.92%",
      spend: 0.78
    },
    {
      name: "Press, Sip, Reign, K-Cups (Evergreen)",
      roas: "$6.78",
      cpc: "$1.32",
      ctr: "0.78%",
      cvr: "44.67%",
      spend: 1.32
    }
  ];

  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === 'desc' ? 'asc' : 'desc';
    setSortColumn(column);
    setSortDirection(newDirection);

    const sorted = [...campaigns].sort((a, b) => {
      let aVal: any = a[column as keyof Campaign];
      let bVal: any = b[column as keyof Campaign];

      // Convert string values to numbers for proper comparison
      if (column === 'spend') {
        // spend is already a number
      } else if (column === 'name') {
        // string comparison
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      } else {
        // Remove $ and % symbols for numeric comparison
        aVal = parseFloat(aVal.replace(/[$%]/g, ''));
        bVal = parseFloat(bVal.replace(/[$%]/g, ''));
      }

      if (newDirection === 'desc') {
        return bVal > aVal ? 1 : -1;
      } else {
        return aVal > bVal ? 1 : -1;
      }
    });

    setCampaigns(sorted);
  };

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="currentColor"/>
        </svg>
      );
    }

    if (sortDirection === 'asc') {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3Z" fill="var(--ld-semantic-color-action-fill-primary,#0053E2)"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8 13L12 9H4L8 13Z" fill="var(--ld-semantic-color-border-strong,#BABBBE)"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3Z" fill="var(--ld-semantic-color-border-strong,#BABBBE)"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8 13L12 9H4L8 13Z" fill="var(--ld-semantic-color-action-fill-primary,#0053E2)"/>
        </svg>
      );
    }
  };
  return (
    <div className="flex flex-col gap-[25px] p-6 bg-muted overflow-y-auto relative justify-center items-start">
      {/* Page Header */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold text-foreground leading-10">Hi, Gabriela</h1>
          <Button
            variant="primary"
            size="medium"
            onClick={() => navigate('/campaign')}
          >
            Create campaign
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-3">
            <Select
              label="Date range"
              size="small"
              value={dateRange}
              onValueChange={setDateRange}
            >
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last14">Last 14 days</SelectItem>
              <SelectItem value="aug1-aug8">Aug 1 – Aug 8, 2025</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
              <SelectItem value="lastMonth">Last month</SelectItem>
              <SelectItem value="thisMonth">This month</SelectItem>
            </Select>
            <Select
              label="Attribution"
              size="small"
              value={attribution}
              onValueChange={setAttribution}
            >
              <SelectItem value="7 days attribution">7 days</SelectItem>
              <SelectItem value="14 days attribution">14 days</SelectItem>
              <SelectItem value="30 days attribution">30 days</SelectItem>
              <SelectItem value="60 days attribution">60 days</SelectItem>
              <SelectItem value="90 days attribution">90 days</SelectItem>
            </Select>
          </div>
          {/* Attribution info alert */}
          <Alert variant="info">
            Metrics shown with <strong>{attribution}</strong> attribution window. Longer windows capture more conversions.
          </Alert>
        </div>
      </div>

      {/* Chart */}
      <div className="flex flex-col items-start gap-[-1px] self-stretch rounded-xl shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] bg-background">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 self-stretch p-4">
          <h2 className="text-2xl font-bold text-foreground leading-9">All campaigns</h2>
          <button
            className="flex w-8 h-8 p-1 justify-center items-center rounded-full transition-colors hover:[background:var(--ld-primitive-color-gray-10)] active:[background:var(--ld-primitive-color-gray-20)]"
            aria-label="Settings"
            onClick={() => setIsEditMetricsModalOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M17.904 2.001a2 2 0 0 1 1.936 1.494l.045.223.416 2.928.57.284c.238.129.473.268.705.419l.349.236 2.75-1.102a2 2 0 0 1 2.184.467l.157.184.135.205 1.918 3.323a2 2 0 0 1-.312 2.41l-.184.163-2.333 1.83.033.424.013.512-.003.256-.01.255-.033.423 2.332 1.83c.653.513.909 1.36.688 2.127l-.08.227-.11.22-1.919 3.323a2 2 0 0 1-2.243.934l-.233-.078-2.75-1.104-.526.35a10.23 10.23 0 0 1-.71.402l-.388.186-.416 2.931a1.979 1.979 0 0 1-1.203 1.546l-.257.093-.246.058-.275.021h-3.836c-.783 0-1.483-.456-1.828-1.214l-.092-.236-.06-.268-.42-2.928-.566-.285c-.24-.129-.474-.267-.703-.415l-.354-.24-2.746 1.103a1.978 1.978 0 0 1-1.923-.256l-.208-.172-.191-.201-.156-.227-1.918-3.323c-.387-.672-.348-1.496.122-2.17l.173-.218.202-.185 2.329-1.83-.03-.424L5.687 16l.002-.257.01-.255.03-.427L3.4 13.236a1.979 1.979 0 0 1-.74-1.794l.045-.264.08-.268.118-.247L4.821 7.34c.392-.679 1.137-1.057 1.965-.977l.251.038.262.083 2.746 1.102.527-.348c.232-.143.468-.278.71-.402l.387-.19.419-2.927A2.001 2.001 0 0 1 13.62 2.05l.22-.037.227-.013h3.836Zm-4.336 5.485a1 1 0 0 1-.623.79 8.288 8.288 0 0 0-2.127 1.23 1.001 1.001 0 0 1-.826.197l-.17-.052L6.64 8.37l-.087-.03-1.876 3.242-.042.081 2.77 2.176a1 1 0 0 1 .371.933 8.386 8.386 0 0 0 0 2.46 1 1 0 0 1-.242.811l-.129.121-2.7 2.116-.07.06 1.869 3.246.05.077 3.268-1.312a1 1 0 0 1 .996.145c.644.513 1.36.929 2.127 1.23a1 1 0 0 1 .583.617l.04.173.483 3.396.017.09 3.746.004.091-.004.498-3.485a1 1 0 0 1 .623-.79 8.292 8.292 0 0 0 2.127-1.23c.235-.187.538-.256.835-.197l.162.052 3.18 1.28.086.03 1.876-3.243.042-.08-2.771-2.177a1 1 0 0 1-.371-.933 8.38 8.38 0 0 0 0-2.46 1 1 0 0 1 .242-.81l.13-.122 2.7-2.116.069-.06-1.87-3.246-.049-.077-3.268 1.312a1 1 0 0 1-.996-.145 8.292 8.292 0 0 0-2.127-1.23 1 1 0 0 1-.583-.617l-.04-.173-.483-3.396-.017-.09-3.746-.004-.09.004-.498 3.485ZM16 11a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
            </svg>
          </button>
        </div>

        {/* Metrics Ribbon */}
        <div className="flex items-start gap-[11.5px] self-stretch px-4">
          {/* Impressions */}
          <div
            className="flex flex-col items-start gap-4 flex-1 self-stretch cursor-pointer"
            onClick={() => toggleSeries('impressions')}
          >
            <div className="h-2 self-stretch rounded-b-full transition-opacity" style={{ backgroundColor: '#993EF4', opacity: visibleSeries.impressions ? 1 : 0.3 }}></div>
            <div className="flex flex-col justify-center items-start self-stretch transition-opacity" style={{ opacity: visibleSeries.impressions ? 1 : 0.5 }}>
              <div className="flex h-6 items-center gap-1">
                <span className="text-sm text-foreground leading-5">Impressions</span>
                <ChevronDown className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground leading-9">{metrics.impressions.toLocaleString()}</div>
            </div>
          </div>

          {/* Divider */}
          <Divider orientation="vertical" UNSAFE_className="h-[103px]" />

          {/* Clicks */}
          <div
            className="flex flex-col items-start gap-4 flex-1 self-stretch cursor-pointer"
            onClick={() => toggleSeries('clicks')}
          >
            <div className="h-2 self-stretch rounded-b-full transition-opacity" style={{ backgroundColor: '#4DBDF5', opacity: visibleSeries.clicks ? 1 : 0.3 }}></div>
            <div className="flex flex-col justify-center items-start self-stretch transition-opacity" style={{ opacity: visibleSeries.clicks ? 1 : 0.5 }}>
              <div className="flex h-6 items-center gap-1">
                <span className="text-sm text-foreground leading-5">Clicks</span>
                <ChevronDown className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground leading-9">{metrics.clicks.toLocaleString()}</div>
            </div>
          </div>

          {/* Divider */}
          <Divider orientation="vertical" UNSAFE_className="h-[103px]" />

          {/* Cost per click */}
          <div
            className="flex flex-col items-start gap-4 flex-1 self-stretch cursor-pointer"
            onClick={() => toggleSeries('cpc')}
          >
            <div className="h-2 self-stretch rounded-b-full transition-opacity" style={{ backgroundColor: '#0053E2', opacity: visibleSeries.cpc ? 1 : 0.3 }}></div>
            <div className="flex flex-col justify-center items-start self-stretch transition-opacity" style={{ opacity: visibleSeries.cpc ? 1 : 0.5 }}>
              <div className="flex h-6 items-center gap-1">
                <span className="text-sm text-foreground leading-5">Cost per click</span>
                <ChevronDown className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground leading-9">${metrics.cpc.toFixed(2)}</div>
            </div>
          </div>

          {/* Divider */}
          <Divider orientation="vertical" UNSAFE_className="h-[103px]" />

          {/* Click through */}
          <div className="flex flex-col items-start gap-4 flex-1 self-stretch">
            <div className="h-2 self-stretch rounded-b-full"></div>
            <div className="flex flex-col justify-center items-start self-stretch">
              <div className="flex h-6 items-center gap-1">
                <span className="text-sm text-foreground leading-5">Click through</span>
                <ChevronDown className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground leading-9">{metrics.ctr.toFixed(2)}%</div>
            </div>
          </div>

          {/* Divider */}
          <Divider orientation="vertical" UNSAFE_className="h-[103px]" />

          {/* Ad spend */}
          <div className="flex flex-col items-start gap-4 flex-1 self-stretch">
            <div className="h-2 self-stretch rounded-b-full"></div>
            <div className="flex flex-col justify-center items-start self-stretch">
              <div className="flex h-6 items-center gap-1">
                <span className="text-sm text-foreground leading-5">Ad spend</span>
                <ChevronDown className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground leading-9">${metrics.adSpend.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Campaign Chart */}
        <CampaignChart visibleSeries={visibleSeries} attribution={attribution} />
      </div>

      {/* Recommendations */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[32px] font-bold text-foreground leading-10">Alerts and recommendations</h2>
        <Button variant="secondary" size="small" onClick={() => navigate('/recommendations')}>Visit All Recommendations page</Button>
      </div>
      
      {/* Recommendation Cards Row 1 */}
      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Card 1 */}
        <div className="bg-background rounded-xl border-4 border-background shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-full bg-[#FBD0CC] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.9C8.29823 3.9 8.54565 4.11759 8.59215 4.40268L8.6 4.5V9.6407C8.6 9.97207 8.33137 10.2407 8 10.2407C7.70177 10.2407 7.45435 10.0231 7.40785 9.73802L7.4 9.6407V4.5C7.4 4.16863 7.66863 3.9 8 3.9Z" fill="#EA1100"/>
                <path d="M8 12.1016C8.33224 12.1016 8.60157 11.8322 8.60157 11.5C8.60157 11.1678 8.33224 10.8984 8 10.8984C7.66776 10.8984 7.39843 11.1678 7.39843 11.5C7.39843 11.8322 7.66776 12.1016 8 12.1016Z" fill="#EA1100"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8ZM2.2 8C2.2 4.79675 4.79675 2.2 8 2.2C11.2033 2.2 13.8 4.79675 13.8 8C13.8 11.2033 11.2033 13.8 8 13.8C4.79675 13.8 2.2 11.2033 2.2 8Z" fill="#EA1100"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-foreground">Update daily budgets</h3>
          </div>
          <p className="text-base text-foreground">
            10 of your campaigns reached their daily budgets. Update your budget with our recommendations to serve your ads all day.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <div className="text-xs text-foreground mb-1">Campaigns</div>
              <div className="text-lg font-bold text-foreground">10</div>
            </div>
            <div>
              <div className="text-xs text-foreground mb-1">Rec. budget increase</div>
              <div className="text-lg font-bold text-foreground">$1,000</div>
            </div>
            <div>
              <div className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)] mb-1">Est. missed sales (last 7 days)</div>
              <div className="text-lg font-bold text-[var(--ld-semantic-color-text-positive,#2A8703)]">$24k-$30k</div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-4">
            <button className="text-sm underline hover:no-underline text-center sm:text-left" onClick={() => setIsDailyBudgetModalOpen(true)}>See details</button>
            <button className="h-8 px-4 border border-foreground rounded-full text-sm font-bold text-foreground hover:bg-muted">Update 10 campaigns</button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-background rounded-xl border-4 border-background shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-foreground">Switch your bidding strategy</h3>
          </div>
          <p className="text-base text-foreground">
            You could see a revenue increase by switching 24 campaigns to a Target RoAS bidding strategy with our recommended targets.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <div className="text-xs text-foreground mb-1">Campaigns</div>
              <div className="text-lg font-bold text-foreground">24</div>
            </div>
            <div>
              <div className="text-xs text-foreground mb-1">Est. ROAS</div>
              <div className="text-lg font-bold text-foreground">2.00-3.00</div>
            </div>
            <div>
              <div className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)] mb-1">Est. sales increase</div>
              <div className="text-lg font-bold text-[var(--ld-semantic-color-text-positive,#2A8703)]">$124k-$130k</div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-4">
            <button className="text-sm underline hover:no-underline text-center sm:text-left">See details</button>
            <button className="h-8 px-4 border border-foreground rounded-full text-sm font-bold text-foreground hover:bg-muted">Update 24 campaigns</button>
          </div>
        </div>
      </div>

      {/* Recommendation Cards Row 2 */}
      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Card 3 */}
        <div className="bg-background rounded-xl border-4 border-background shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-foreground">Update your RoAS target</h3>
          </div>
          <p className="text-base text-foreground">
            You could see a revenue increase by updating the Target RoAS on 4 of your campaigns.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <div className="text-xs text-foreground mb-1">Campaigns</div>
              <div className="text-lg font-bold text-foreground">4</div>
            </div>
            <div>
              <div className="text-xs text-foreground mb-1">Est. ROAS</div>
              <div className="text-lg font-bold text-foreground">2.50-3.50</div>
            </div>
            <div>
              <div className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)] mb-1">Est. sales increase</div>
              <div className="text-lg font-bold text-[var(--ld-semantic-color-text-positive,#2A8703)]">$32k-40k</div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-4">
            <button className="text-sm underline hover:no-underline text-center sm:text-left">See details</button>
            <button className="h-8 px-4 border border-foreground rounded-full text-sm font-bold text-foreground hover:bg-muted">Update 4 campaigns</button>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-background rounded-xl border-4 border-background shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground">Advertise these high quality items</h3>
            </div>
            <span className="text-xs text-muted-foreground">Updated Oct 10, 2025</span>
          </div>
          <p className="text-sm text-foreground">
            We found items that you're not advertising that have the potential to drive sales in a Sponsored Products automatic campaign. <span className="underline cursor-pointer hover:no-underline">Learn more</span>
          </p>
          <div className="flex items-center gap-8 flex-wrap">
            <div>
              <div className="text-xs text-foreground mb-1">Number of items</div>
              <div className="text-lg font-bold text-foreground">1,000</div>
            </div>
            <div>
              <div className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)] mb-1">Average listing quality</div>
              <div className="text-lg font-bold text-[var(--ld-semantic-color-text-positive,#2A8703)]">88.5%</div>
            </div>
            <div className="flex items-center gap-2.5">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/c04ef675f842aa0f2c9c1a3292268267f5cd2203?width=96" alt="Product" className="w-12 h-12 object-cover" />
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/e3b58a71f6bde1765cd30f82d152e9bf0db3400c?width=96" alt="Product" className="w-12 h-12 object-cover" />
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/7e3d5aa0b2caeacb2e0dd9a07394026e5d0244bc?width=96" alt="Product" className="w-12 h-12 object-cover" />
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/bb319b37f89c1feb714d0e5ad392bd7062c7edef?width=96" alt="Product" className="w-12 h-12 object-cover" />
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/fa81303645e82b1387b2f225cd10e485d3c956fe?width=52" alt="Product" className="w-[26px] h-12 object-cover" />
            </div>
          </div>
          <Divider />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-4">
            <button className="text-sm underline hover:no-underline text-center sm:text-left">Request report</button>
            <button className="h-8 px-4 border border-foreground rounded-full text-sm font-bold text-foreground hover:bg-muted">Create new campaign</button>
            <button className="h-8 px-4 border border-foreground rounded-full text-sm font-bold text-foreground hover:bg-muted">Add items to existing campaign</button>
          </div>
        </div>
      </div>

      {/* Top Campaigns */}
      <h2 className="text-[32px] font-bold text-foreground leading-10 mt-0.5 w-full">Top campaigns</h2>

      <div className="overflow-x-auto bg-background shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] rounded-xl w-full">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-muted sticky top-0 z-10">
            <tr>
              <th className="py-4 pl-6 pr-4 text-left font-bold text-foreground border-b border-t border-border w-[40%]">
                <div className="flex items-center gap-3">
                  <Checkbox aria-label="Select all campaigns" />
                  <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('name')}>
                    Campaign
                    {renderSortIcon('name')}
                  </div>
                </div>
              </th>
              <th className="py-4 px-4 text-left font-bold text-foreground border-b border-t border-border w-[12%]">
                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('roas')}>
                  ROAS
                  {renderSortIcon('roas')}
                </div>
              </th>
              <th className="py-4 px-4 text-left font-bold text-foreground border-b border-t border-border w-[12%]">
                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('cpc')}>
                  CPC
                  {renderSortIcon('cpc')}
                </div>
              </th>
              <th className="py-4 px-4 text-left font-bold text-foreground border-b border-t border-border w-[12%]">
                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('ctr')}>
                  CTR
                  {renderSortIcon('ctr')}
                </div>
              </th>
              <th className="py-4 px-4 text-left font-bold text-foreground border-b border-t border-border w-[12%]">
                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('cvr')}>
                  CVR
                  {renderSortIcon('cvr')}
                </div>
              </th>
              <th className="py-4 pl-4 pr-6 text-left font-bold text-foreground border-b border-t border-border w-[12%]">
                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('spend')}>
                  Spend
                  {renderSortIcon('spend')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted">
                <td className="py-4 pl-6 pr-4">
                  <div className="flex items-center gap-3">
                    <Checkbox aria-label={`Select ${campaign.name}`} />
                    <span className="underline hover:no-underline cursor-pointer">{campaign.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-foreground">{campaign.roas}</td>
                <td className="py-4 px-4 text-foreground">{campaign.cpc}</td>
                <td className="py-4 px-4 text-foreground">{campaign.ctr}</td>
                <td className="py-4 px-4 text-foreground">{campaign.cvr}</td>
                <td className="py-4 pl-4 pr-6 text-foreground">${campaign.spend.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-1 py-6 text-xs text-foreground w-full">
        <span>© 2025 Walmart Inc. All Rights reserved.</span>
        <Link href="#">Privacy</Link>
        <span>and</span>
        <Link href="#">Terms</Link>
      </div>

      {/* Edit Metrics Modal */}
      <EditMetricsModal
        open={isEditMetricsModalOpen}
        onOpenChange={setIsEditMetricsModalOpen}
      />

      {/* Daily Budget Modal */}
      <DailyBudgetModal
        open={isDailyBudgetModalOpen}
        onOpenChange={setIsDailyBudgetModalOpen}
      />
    </div>
  );
}
