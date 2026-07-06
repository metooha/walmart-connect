import { useState } from "react";
import { ExternalLink } from "@/components/icons";
import { useNavigate, useLocation } from "react-router-dom";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import { Button } from "../components/ui/Button";
import { Checkbox } from "../components/ui/Checkbox";
import { MastHead } from "../components/ui/MastHead";
import { Tabs, TabList, Tab } from "../components/ui/Tab";
import { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import { Alert } from "../components/ui/Alert";
import { Link } from "../components/ui/Link";
import { DateField } from "../components/ui/DateField";
import { Divider } from "../components/ui/Divider";
import SponsoredProductsCard from "../components/icons/SponsoredProductsCard";
import SponsoredBrandsCard from "../components/icons/SponsoredBrandsCard";
import SponsoredVideosCard from "../components/icons/SponsoredVideosCard";

export default function Campaign() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMartyPanel] = useState(true);
  const [isMartyMinimized, setIsMartyMinimized] = useState(false);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Sponsored Search');
  const [openAlertPopover, setOpenAlertPopover] = useState<number | null>(null);

  // Extract campaign data from navigation state
  const campaignData = location.state?.campaignData || null;
  const campaignName = location.state?.campaignName || campaignData?.name || 'New Campaign';
  const campaignId = location.state?.campaignId || campaignData?.id || null;
  const isEditMode = !!campaignData || !!location.state?.campaignName;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {/* Header */}
      <MastHead 
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />
        <div className="flex-1 overflow-y-auto bg-muted">
          {/* Page Header */}
          <div className="bg-background border-b border-border px-6 pt-6">
          <div className="flex items-center gap-3 flex-wrap pb-2">
            <h1 className="text-2xl font-bold text-foreground">
              {isEditMode ? campaignName : 'Campaign creation'}
            </h1>
            {isEditMode && (
              <span className="inline-flex items-center h-5 px-2 text-xs font-semibold border border-[#1D5F02] text-[#1D5F02] rounded">
                Live
              </span>
            )}
          </div>
          {isEditMode && (
            <div className="flex items-center gap-2 py-2 text-sm text-foreground border-t border-border">
              <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wide mr-1">Campaign information:</span>
              <span>Start date: <strong>{campaignData?.startDate || '-'}</strong></span>
              <span className="text-border">|</span>
              <span>End date: <strong>{campaignData?.endDate || '-'}</strong></span>
              <span className="text-border">|</span>
              <span>Total budget: <strong>{campaignData?.totalBudget || '-'}</strong></span>
              <span className="text-border">|</span>
              <span>Available budget: <strong>{campaignData?.dailyBudget || '-'}</strong></span>
            </div>
          )}
          {isEditMode && campaignId && (
            <Tabs defaultValue="edit">
              <TabList>
                <Tab
                  value="reports"
                  onClick={() => navigate('/campaign-reports', { state: { campaignName, campaignId, campaignData } })}
                >
                  Reports
                </Tab>
                <Tab value="edit">
                  Settings
                </Tab>
                <Tab
                  value="history-log"
                  onClick={() => navigate(`/reports/la-historia/${campaignId}`, { state: { campaignName, campaignId } })}
                >
                  History log
                </Tab>
              </TabList>
            </Tabs>
          )}
        </div>

        {/* Action buttons strip */}
        <div className="bg-muted px-6 py-3 flex justify-end gap-4">
          <Button variant="secondary" size="medium">Delete</Button>
          <Button variant="secondary" size="medium">Save</Button>
          <Button variant="primary" size="medium">
            {isEditMode ? 'Pause campaign' : 'Launch campaign'}
          </Button>
        </div>

        {/* Campaign Form Content */}
        <div className="px-6 py-6 space-y-6">
          {/* General Information Card */}
          <div className="bg-background rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">General information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Campaign name*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#909196] rounded bg-background text-foreground"
                  defaultValue={campaignData?.name || ''}
                />
                <div className="text-xs text-muted-foreground mt-1">{(campaignData?.name || '').length}/240</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Advertiser</label>
                <div className="text-sm text-foreground mt-2">Walmart</div>
              </div>
            </div>
          </div>

          {/* Targeting Card */}
          <div className="bg-background rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Targeting</h2>
            <div className="mb-8">
              <h3 className="text-sm font-bold text-muted-foreground mb-4">Select campaign type:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-row items-stretch border-2 border-[#0071DC] rounded bg-background hover:bg-muted cursor-pointer overflow-hidden">
                  <div className="flex flex-col gap-4 p-6 w-1/2">
                    <div className="text-xs font-bold text-muted-foreground leading-4">Sponsored Products</div>
                    <div className="text-sm text-muted-foreground leading-5">Get your items included in relevant results when customers search Walmart's site and app.</div>
                  </div>
                  <div className="w-1/2 flex items-end justify-end">
                    <SponsoredProductsCard />
                  </div>
                </div>
                <div className="flex flex-row items-stretch border border-border rounded bg-background hover:border-[#0071DC] hover:bg-muted cursor-pointer overflow-hidden">
                  <div className="flex flex-col gap-4 p-6 w-1/2">
                    <div className="text-xs font-bold text-muted-foreground leading-4">Sponsored Brands</div>
                    <div className="text-sm text-muted-foreground leading-5">This premium ad sends your brand and products to the top of relevant results when customers search our site & app.</div>
                  </div>
                  <div className="w-1/2 flex items-end justify-end">
                    <SponsoredBrandsCard />
                  </div>
                </div>
                <div className="flex flex-row items-stretch border border-border rounded bg-background hover:border-[#0071DC] hover:bg-muted cursor-pointer overflow-hidden">
                  <div className="flex flex-col gap-4 p-6 w-1/2">
                    <div className="text-xs font-bold text-muted-foreground leading-4">Sponsored Videos</div>
                    <div className="text-sm text-muted-foreground leading-5">Have your ads show up in the premium video ad slot.</div>
                  </div>
                  <div className="w-1/2 flex items-end justify-end">
                    <SponsoredVideosCard />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-muted-foreground mb-4">Select targeting tactic:</h3>
              <div className="space-y-6">
                <div>
                  <label className="flex items-start cursor-pointer group">
                    <input type="radio" name="targeting" className="sr-only" defaultChecked />
                    <div className="relative flex items-center mt-0.5">
                      <div className="w-5 h-5 rounded-full border border-[#2E2F32] bg-background flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-foreground"></div>
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-bold text-sm text-foreground leading-5">Smart performance</div>
                      <div className="text-xs text-muted-foreground leading-4 mt-2">
                        Launch a Sponsored Products campaign quickly and easily. Let Walmart's algorithm select relevant keywords for you. Then set cost-per-click bids for individual items or groups of items. Ads can serve in all Sponsored Products placements.
                      </div>
                    </div>
                  </label>
                </div>
                <div>
                  <label className="flex items-start cursor-pointer group">
                    <input type="radio" name="targeting" className="sr-only" />
                    <div className="relative flex items-center mt-0.5">
                      <div className="w-5 h-5 rounded-full border border-[#2E2F32] bg-background flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-transparent"></div>
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="text-sm text-foreground leading-5">Manual</div>
                      <div className="text-xs text-muted-foreground leading-4 mt-2">
                        Launch a Sponsored Products or Sponsored Brands campaign with more control. Choose your own keywords and set cost-per-click bids for each. Ads can appear on search pages and item pages.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Scheduling & Budget Card */}
          <div className="bg-background rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
            {/* Header */}
            <div className="px-6 py-6">
              <h2 className="text-[20px] font-semibold text-foreground leading-7">Scheduling & budget</h2>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="flex flex-col gap-6">
                {/* Fields Row */}
                <div className="flex flex-wrap gap-6">
                  {/* Start Date Field */}
                  <div className="w-full md:w-[296px]">
                    <DateField
                      label="Start date"
                      placeholder="Select a date"
                      defaultValue={campaignData?.startDate || ''}
                      showCalendarIcon
                    />
                  </div>

                  {/* Daily Budget Field */}
                  <div className="flex flex-col w-full md:w-[296px]">
                    <label className="text-xs font-semibold text-foreground leading-4 mb-1">Daily budget</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.68235 3.82195C9.41732 3.70103 9.13832 3.61385 8.85188 3.56235L8.74606 3.54332V2H7.24606V3.57348L7.14407 3.59503C6.90114 3.64637 6.66402 3.72251 6.43646 3.82232C5.98458 4.01688 5.591 4.3272 5.29678 4.72149C5.01596 5.11384 4.86799 5.58706 4.87601 6.06943L4.87611 6.07556C4.86744 6.35448 4.91812 6.63206 5.0251 6.88982C5.13203 7.1475 5.29246 7.37953 5.49588 7.57026L5.49856 7.5725C5.99054 7.98376 6.5736 8.2716 7.19923 8.41209L7.20292 8.41292L8.1972 8.66718L8.19856 8.6675C8.47801 8.7324 8.75096 8.82255 9.0141 8.93672L9.01605 8.9375C9.22299 9.01955 9.40907 9.14663 9.56078 9.3095L9.56645 9.31559C9.69526 9.47316 9.76565 9.67051 9.76606 9.8741L9.76606 9.8759C9.76319 10.1147 9.68181 10.3459 9.53449 10.5338L9.53266 10.5362C9.3725 10.731 9.16395 10.8804 8.92794 10.9693L8.92423 10.9707C8.3417 11.17 7.70942 11.1698 7.12695 10.9703L7.12517 10.9697C6.87513 10.88 6.65342 10.7254 6.48269 10.5219L6.47941 10.518C6.31298 10.3029 6.21673 10.0417 6.20356 9.77H4.64356C4.64253 10.3027 4.79859 10.8239 5.09228 11.2682L5.09356 11.27C5.38753 11.6822 5.79291 12.002 6.26215 12.192L6.26352 12.1925C6.54459 12.2987 6.83684 12.3722 7.13443 12.4118L7.24606 12.4266V14H8.74606V12.4415L8.85537 12.4249C9.18606 12.3749 9.50947 12.2843 9.81829 12.1551C10.2734 11.966 10.666 11.6518 10.95 11.2491L10.9511 11.2475C11.2149 10.8485 11.3509 10.3787 11.3411 9.90049L11.341 9.8945C11.3499 9.55372 11.2778 9.21487 11.1309 8.9071C10.9918 8.62072 10.7956 8.36583 10.5543 8.15815C10.3068 7.95197 10.0282 7.7845 9.72981 7.66298L9.72857 7.6625C9.41184 7.54123 9.08484 7.4487 8.75154 7.38603L8.74046 7.38394L8.00002 7.17584L7.99606 7.175C7.81554 7.13655 7.63836 7.0841 7.46601 7.01833L7.46357 7.0175C7.2961 6.96097 7.13554 6.88577 6.9849 6.79333L6.98217 6.79165C6.84469 6.70248 6.72754 6.58506 6.63856 6.4475C6.54725 6.30671 6.49788 6.14194 6.49605 5.9745C6.49238 5.7662 6.55709 5.56248 6.68021 5.39454L6.68682 5.38553C6.8381 5.21279 7.03027 5.08062 7.24541 5.00025C7.51442 4.89665 7.80139 4.84574 8.08943 4.85019L8.09356 4.85C8.49967 4.83135 8.797 4.8834 9.13646 5.10653L9.20575 5.15142C9.34682 5.25094 9.46455 5.37999 9.5509 5.5295C9.6377 5.67976 9.69065 5.84716 9.70606 6.02L11.2061 6.02C11.2023 5.5524 11.0556 5.09689 10.7859 4.71484C10.5076 4.32224 10.1266 4.01372 9.68477 3.82302L9.68235 3.82195Z" fill="black"/>
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter budget"
                        defaultValue={campaignData?.dailyBudget?.replace('$', '') || ''}
                        className="w-full h-10 pl-11 pr-3 rounded border border-[#909196] bg-background text-sm text-foreground placeholder:text-muted-foreground leading-5"
                      />
                    </div>
                  </div>

                  {/* Help Text */}
                  <div className="flex gap-4 w-full md:w-[296px] items-start">
                    <Divider orientation="vertical" UNSAFE_className="flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-5 flex-1">
                      If your campaign spends all of the daily budget, ads will stop serving. If there is budget remaining, it will roll over.
                    </p>
                  </div>
                </div>

                {/* Additional Settings Accordion */}
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-foreground leading-5">Additional settings (optional)</span>
                  <Button variant="tertiary" size="small" UNSAFE_className="p-0 h-6 w-6 hover:opacity-70">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.71967 8.09467C4.99003 7.82431 5.41546 7.80351 5.70967 8.03228L5.78033 8.09467L12 14.3137L18.2197 8.09467C18.49 7.82431 18.9155 7.80351 19.2097 8.03228L19.2803 8.09467C19.5507 8.36503 19.5715 8.79046 19.3427 9.08467L19.2803 9.15533L12.5303 15.9053C12.26 16.1757 11.8345 16.1965 11.5403 15.9677L11.4697 15.9053L4.71967 9.15533C4.42678 8.86244 4.42678 8.38756 4.71967 8.09467Z" fill="black"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Big Multiplier Card */}
          <div className="bg-background rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-6">
              <h2 className="text-[20px] font-semibold text-foreground leading-7">Big Multiplier</h2>
              <Button variant="tertiary" size="small" UNSAFE_className="p-0 h-6 w-6 hover:opacity-70">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5652 6.99897L21 16.2124L19.8695 17.25L12 8.65402L4.13049 17.25L3 16.2124L11.4348 6.99897C11.58 6.84033 11.7851 6.75 12 6.75C12.2149 6.75 12.42 6.84033 12.5652 6.99897Z" fill="black"/>
                </svg>
              </Button>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="flex flex-wrap gap-4">
                {/* Fields Section */}
                <div className="flex flex-col gap-5 flex-1">
                  {/* Placement Row */}
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-semibold text-foreground leading-5 w-20 flex-shrink-0">Placement</span>
                    <div className="flex gap-4 flex-1">
                      {/* Buy-Box Field */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <label className="text-xs font-semibold text-foreground leading-4 mb-1">Buy-Box</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Select a date"
                            className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-background text-sm text-muted-foreground placeholder:text-muted-foreground leading-5"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground pointer-events-none">%</span>
                        </div>
                      </div>

                      {/* Search Ingrid Field */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <label className="text-xs font-semibold text-foreground leading-4 mb-1">Search Ingrid</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Select a date"
                            className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-background text-sm text-muted-foreground placeholder:text-muted-foreground leading-5"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground pointer-events-none">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second Placement Row */}
                  <div className="flex gap-4 pl-24">
                    {/* Home page Field */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <label className="text-xs font-semibold text-foreground leading-4 mb-1">Home page</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Select a date"
                          className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-background text-sm text-muted-foreground placeholder:text-muted-foreground leading-5"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground pointer-events-none">%</span>
                      </div>
                    </div>

                    {/* Stock up Field */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <label className="text-xs font-semibold text-foreground leading-4 mb-1">Stock up</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Select a date"
                          className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-background text-sm text-muted-foreground placeholder:text-muted-foreground leading-5"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground pointer-events-none">%</span>
                      </div>
                    </div>
                  </div>

                  {/* Platform Row */}
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-semibold text-foreground leading-5 w-20 flex-shrink-0">Platform</span>
                    <div className="flex gap-4 flex-1">
                      {/* Desktop Field */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <label className="text-xs font-semibold text-foreground leading-4 mb-1">Desktop</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Select a date"
                            className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-background text-sm text-muted-foreground placeholder:text-muted-foreground leading-5"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground pointer-events-none">%</span>
                        </div>
                      </div>

                      {/* App Field */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <label className="text-xs font-semibold text-foreground leading-4 mb-1">App</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Select a date"
                            className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-background text-sm text-muted-foreground placeholder:text-muted-foreground leading-5"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground pointer-events-none">%</span>
                        </div>
                      </div>

                      {/* Mobile Field */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <label className="text-xs font-semibold text-foreground leading-4 mb-1">Mobile</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Select a date"
                            className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-background text-sm text-muted-foreground placeholder:text-muted-foreground leading-5"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground pointer-events-none">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help Text Section */}
                <div className="flex gap-4 w-[180px] items-start flex-shrink-0">
                  <Divider orientation="vertical" UNSAFE_className="h-48 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-5 flex-1">
                    Bid multipliers increase your bid by a preset percentage when your ads are eligible to serve in premium placements
                    <br /><br />
                    They help you compete for Buy-Box, Search Ingrid, Home Page, Stock Up on desktop, app and mobile web
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Create and manage ad groups Section */}
          <div className="flex flex-col gap-6 pt-4">
            {/* Title */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold text-foreground leading-8">Create and manage ad groups</h2>
              <p className="text-sm text-muted-foreground leading-5">
                An Ad group is a group of ads sharing the same set of keywords and products. Consider grouping products that fall within the same category and price point roange. You can edit your campaign after launch to create additional ad groups in campaign manager.
              </p>
            </div>

            {/* Manage ad groups Card */}
            <div className="bg-background rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] h-[290px] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-6">
                <h3 className="text-base font-semibold text-foreground leading-6">Manage ad groups</h3>
                <Button variant="tertiary" size="small" UNSAFE_className="p-0 h-6 w-6 hover:opacity-70">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.9053 11.4697C16.1757 11.74 16.1965 12.1655 15.9677 12.4597L15.9053 12.5303L9.15533 19.2803C8.86244 19.5732 8.38756 19.5732 8.09467 19.2803C7.82431 19.01 7.80351 18.5845 8.03228 18.2903L8.09467 18.2197L14.3137 12L8.09467 5.78033C7.82431 5.50997 7.80351 5.08454 8.03228 4.79033L8.09467 4.71967C8.36503 4.44931 8.79046 4.42851 9.08467 4.65728L9.15533 4.71967L15.9053 11.4697Z" fill="black"/>
                  </svg>
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 px-6 flex flex-col justify-between">
                <p className="text-sm text-foreground leading-5">
                  Please setup a new adgroup below to add to this campaign.
                </p>

                {/* Divider and Button */}
                <div className="flex flex-col">
                  <Divider UNSAFE_className="mb-6" />
                  <div className="flex justify-end pb-6">
                    <Button UNSAFE_className="inline-flex items-center gap-2 h-8 px-4 rounded-full bg-[#BABBBE] cursor-not-allowed" disabled>
                      <div className="w-3.5 h-3.5 bg-border rounded-sm"></div>
                      <span className="text-sm font-bold text-white leading-5">Create new ad group</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ad group details Card */}
            <div className="bg-background rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
              {/* Header */}
              <div className="px-6 py-6">
                <h3 className="text-[20px] font-semibold text-foreground leading-7">Ad group details</h3>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-foreground leading-4 mb-1">Ad group name</label>
                  <input
                    type="text"
                    placeholder="Enter ad group name"
                    className="w-full h-10 px-3 rounded border border-[#909196] bg-background text-sm text-muted-foreground placeholder:text-muted-foreground leading-5"
                  />
                  <div className="text-xs text-muted-foreground text-right leading-4">10/253</div>
                </div>
              </div>
            </div>

            {/* Item list Card */}
            <div className="bg-background rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] h-[628px] flex flex-col">
              {/* Header */}
              <div className="px-6 py-6 border-b border-border flex items-center gap-3">
                <h3 className="text-lg font-semibold text-foreground leading-[25px]">Items</h3>
                <div className="inline-flex px-2 py-1 bg-[var(--ld-semantic-color-fill-brand-subtle,#E9F1FE)] rounded-sm">
                  <span className="text-xs text-primary leading-4">Ad group: SpookySoaps</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 px-6 pb-6 overflow-hidden">
                <div className="border border-border rounded h-full flex">
                  {/* Left Panel - Suggested Items */}
                  <div className="flex-1 flex flex-col border-r border-border">
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-3 bg-muted border-b border-border">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-foreground leading-4">Suggested Items (50)</span>
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.55515 6.20147H7.6181V10.1875H6.55515V6.20147Z" fill="black"/>
                          <path d="M7.08594 5.58141C7.52622 5.58141 7.88315 5.22449 7.88315 4.7842C7.88315 4.34391 7.52622 3.98699 7.08594 3.98699C6.64565 3.98699 6.28872 4.34391 6.28872 4.7842C6.28872 5.22449 6.64565 5.58141 7.08594 5.58141Z" fill="black"/>
                          <path d="M7.08628 13.2878C10.5107 13.2878 13.2868 10.5117 13.2868 7.08726C13.2868 3.66279 10.5107 0.886719 7.08628 0.886719C3.66182 0.886719 0.885742 3.66279 0.885742 7.08726C0.885742 10.5117 3.66182 13.2878 7.08628 13.2878ZM7.08628 12.402C4.15103 12.402 1.77153 10.0225 1.77153 7.08726C1.77153 4.152 4.15103 1.77251 7.08628 1.77251C10.0215 1.77251 12.401 4.152 12.401 7.08726C12.401 10.0225 10.0215 12.402 7.08628 12.402Z" fill="black"/>
                        </svg>
                      </div>
                    </div>

                    {/* Column Headers */}
                    <div className="flex items-center px-3 py-3 border-b border-border bg-background">
                      <span className="text-xs font-semibold text-foreground leading-4 ml-2">Item Name</span>
                      <span className="text-xs font-semibold text-foreground leading-4 ml-auto mr-12">Item Id</span>
                      <span className="text-[10px] font-semibold text-foreground leading-3 flex items-center gap-0.5">
                        Sugg.Bid
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.55515 6.20147H7.6181V10.1875H6.55515V6.20147Z" fill="black"/>
                          <path d="M7.08594 5.58141C7.52622 5.58141 7.88315 5.22449 7.88315 4.7842C7.88315 4.34391 7.52622 3.98699 7.08594 3.98699C6.64565 3.98699 6.28872 4.34391 6.28872 4.7842C6.28872 5.22449 6.64565 5.58141 7.08594 5.58141Z" fill="black"/>
                          <path d="M7.08628 13.2878C10.5107 13.2878 13.2868 10.5117 13.2868 7.08726C13.2868 3.66279 10.5107 0.886719 7.08628 0.886719C3.66182 0.886719 0.885742 3.66279 0.885742 7.08726C0.885742 10.5117 3.66182 13.2878 7.08628 13.2878ZM7.08628 12.402C4.15103 12.402 1.77153 10.0225 1.77153 7.08726C1.77153 4.152 4.15103 1.77251 7.08628 1.77251C10.0215 1.77251 12.401 4.152 12.401 7.08726C12.401 10.0225 10.0215 12.402 7.08628 12.402Z" fill="black"/>
                        </svg>
                      </span>
                      <span className="text-xs font-semibold text-foreground leading-4 ml-4">Add</span>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto">
                      {['Clorox blue', 'Clorox liquid', 'Clorox gel', 'Clorox spray', 'Clorox laundry', 'Clorox mist', 'Clorox wands', 'Clorox 360', 'Clorox pen', 'Clorox aloe'].map((item, idx) => {
                        const ids = ['15242283', '18775208', '34571821', '15234651', '18754261', '15246821', '12352075', '17252975', '16251829', '15242283'];
                        const prices = ['$2.56', '$3.91', '$3.91', '$2.56', '$3.91', '$3.91', '$2.56', '$3.91', '$3.91', '$3.91'];
                        const productImages = [
                          'https://images.pexels.com/photos/28921817/pexels-photo-28921817.jpeg',
                          'https://images.pexels.com/photos/28921820/pexels-photo-28921820.jpeg',
                          'https://images.pexels.com/photos/12997254/pexels-photo-12997254.jpeg',
                          'https://images.pexels.com/photos/28921809/pexels-photo-28921809.jpeg'
                        ];
                        return (
                          <div key={idx} className="flex items-center px-3 py-2 border-b border-border hover:bg-muted">
                            <img src={productImages[idx % productImages.length]} alt={item} className="w-8 h-8 rounded flex-shrink-0 object-cover" />
                            <span className="text-xs text-foreground ml-3 flex-1">{item}</span>
                            <span className="text-xs text-foreground w-16 text-right">{ids[idx]}</span>
                            <span className="text-xs text-foreground w-12 text-right">{prices[idx]}</span>
                            <button className="text-xs underline ml-4 hover:no-underline">Add</button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Panel - Added Items */}
                  <div id="added-items-section" className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-muted border-b border-border">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-foreground leading-4">Added Items (3/200)</span>
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.55515 6.20147H7.6181V10.1875H6.55515V6.20147Z" fill="black"/>
                          <path d="M7.08594 5.58141C7.52622 5.58141 7.88315 5.22449 7.88315 4.7842C7.88315 4.34391 7.52622 3.98699 7.08594 3.98699C6.64565 3.98699 6.28872 4.34391 6.28872 4.7842C6.28872 5.22449 6.64565 5.58141 7.08594 5.58141Z" fill="black"/>
                          <path d="M7.08628 13.2878C10.5107 13.2878 13.2868 10.5117 13.2868 7.08726C13.2868 3.66279 10.5107 0.886719 7.08628 0.886719C3.66182 0.886719 0.885742 3.66279 0.885742 7.08726C0.885742 10.5117 3.66182 13.2878 7.08628 13.2878ZM7.08628 12.402C4.15103 12.402 1.77153 10.0225 1.77153 7.08726C1.77153 4.152 4.15103 1.77251 7.08628 1.77251C10.0215 1.77251 12.401 4.152 12.401 7.08726C12.401 10.0225 10.0215 12.402 7.08628 12.402Z" fill="black"/>
                        </svg>
                      </div>
                    </div>

                    {/* Column Headers */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background">
                      <div className="w-4"></div>
                      <span className="text-xs font-semibold text-foreground leading-tight flex-1">Item Name</span>
                      <span className="text-xs font-semibold text-foreground leading-4 w-16 text-right">Item Id</span>
                      <span className="text-[10px] font-semibold text-foreground leading-3 flex items-center gap-0.5 w-16">
                        Sugg.Bid
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.55515 6.20147H7.6181V10.1875H6.55515V6.20147Z" fill="black"/>
                          <path d="M7.08594 5.58141C7.52622 5.58141 7.88315 5.22449 7.88315 4.7842C7.88315 4.34391 7.52622 3.98699 7.08594 3.98699C6.64565 3.98699 6.28872 4.34391 6.28872 4.7842C6.28872 5.22449 6.64565 5.58141 7.08594 5.58141Z" fill="black"/>
                          <path d="M7.08628 13.2878C10.5107 13.2878 13.2868 10.5117 13.2868 7.08726C13.2868 3.66279 10.5107 0.886719 7.08628 0.886719C3.66182 0.886719 0.885742 3.66279 0.885742 7.08726C0.885742 10.5117 3.66182 13.2878 7.08628 13.2878ZM7.08628 12.402C4.15103 12.402 1.77153 10.0225 1.77153 7.08726C1.77153 4.152 4.15103 1.77251 7.08628 1.77251C10.0215 1.77251 12.401 4.152 12.401 7.08726C12.401 10.0225 10.0215 12.402 7.08628 12.402Z" fill="black"/>
                        </svg>
                      </span>
                      <span className="text-xs font-semibold text-foreground leading-4 flex items-center gap-1 w-14">
                        Bid
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.55515 6.20147H7.6181V10.1875H6.55515V6.20147Z" fill="black"/>
                          <path d="M7.08594 5.58141C7.52622 5.58141 7.88315 5.22449 7.88315 4.7842C7.88315 4.34391 7.52622 3.98699 7.08594 3.98699C6.64565 3.98699 6.28872 4.34391 6.28872 4.7842C6.28872 5.22449 6.64565 5.58141 7.08594 5.58141Z" fill="black"/>
                          <path d="M7.08628 13.2878C10.5107 13.2878 13.2868 10.5117 13.2868 7.08726C13.2868 3.66279 10.5107 0.886719 7.08628 0.886719C3.66182 0.886719 0.885742 3.66279 0.885742 7.08726C0.885742 10.5117 3.66182 13.2878 7.08628 13.2878ZM7.08628 12.402C4.15103 12.402 1.77153 10.0225 1.77153 7.08726C1.77153 4.152 4.15103 1.77251 7.08628 1.77251C10.0215 1.77251 12.401 4.152 12.401 7.08726C12.401 10.0225 10.0215 12.402 7.08628 12.402Z" fill="black"/>
                        </svg>
                      </span>
                      <span className="text-xs font-semibold text-foreground leading-4 w-12">Status</span>
                    </div>

                    {/* Added Items List */}
                    <div className="flex-1 overflow-y-auto">
                      {['Clorox wipes', 'Clorox tilex', 'Clorox tabs'].map((item, idx) => {
                        const ids = ['1750942750', '875633804', '1566660392'];
                        const showAlert = idx < 2; // Show alert for first two items
                        const productImages = [
                          'https://images.pexels.com/photos/28921817/pexels-photo-28921817.jpeg',
                          'https://images.pexels.com/photos/28921820/pexels-photo-28921820.jpeg',
                          'https://images.pexels.com/photos/12997254/pexels-photo-12997254.jpeg',
                          'https://images.pexels.com/photos/28921809/pexels-photo-28921809.jpeg'
                        ];

                        // Different alert messages for each item
                        const alertMessages = [
                          "The OLQ score of this item dropped over 10% because of low stock availability and poor content quality. This may negatively affect the ROAS of your campaign.",
                          "This item was recently disabled in SpookySoaps ad group and is no longer getting promoted. This may negatively affect your campaign performance."
                        ];

                        return (
                          <div key={idx} className="flex items-center gap-3 px-4 py-2 border-b border-border">
                            <Checkbox aria-label="Select item" />
                            <div className="flex items-start gap-2 flex-1">
                              {showAlert ? (
                                <Popover open={openAlertPopover === idx} onOpenChange={(open) => setOpenAlertPopover(open ? idx : null)}>
                                  <PopoverTrigger asChild>
                                    <button className="flex-shrink-0 hover:opacity-80 transition-opacity mt-1">
                                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F8D2D3]">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0ZM7 1.2002C3.79675 1.2002 1.2002 3.79675 1.2002 7C1.2002 10.2033 3.79675 12.7998 7 12.7998C10.2033 12.7998 12.7998 10.2033 12.7998 7C12.7998 3.79675 10.2033 1.2002 7 1.2002ZM7 9.89844C7.33224 9.89844 7.60156 10.1678 7.60156 10.5C7.60156 10.8322 7.33224 11.1016 7 11.1016C6.66776 11.1016 6.39844 10.8322 6.39844 10.5C6.39844 10.1678 6.66776 9.89844 7 9.89844ZM7 2.90039C7.2981 2.90039 7.54514 3.11744 7.5918 3.40234L7.59961 3.5V8.64062C7.59961 8.972 7.33137 9.24023 7 9.24023C6.70187 9.24023 6.45483 9.02322 6.4082 8.73828L6.40039 8.64062V3.5C6.40039 3.16863 6.66863 2.90039 7 2.90039Z" fill="#9B1419"/>
                                        </svg>
                                      </div>
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-[421px] p-4 bg-background shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] border border-border rounded"
                                    align="start"
                                    side="bottom"
                                    sideOffset={8}
                                  >
                                    <div className="flex flex-col gap-3">
                                      <p className="text-sm text-foreground leading-5">
                                        {alertMessages[idx]}
                                      </p>
                                      <div className="flex flex-col gap-2">
                                        <Divider />
                                        <div className="flex items-center justify-end gap-4">
                                          <Link
                                            href={`/reports/item-health?itemId=${ids[idx]}`}
                                            className="text-sm cursor-pointer"
                                          >
                                            View item health page
                                          </Link>
                                          <button className="flex items-center gap-2 h-8 px-3 rounded-full border border-[#2E2F32] bg-background text-sm font-bold text-foreground hover:bg-muted transition-colors">
                                            Resolve in Seller Center
                                            <ExternalLink className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              ) : (
                                <div className="w-6 h-6 flex-shrink-0"></div>
                              )}
                              <img src={productImages[idx % productImages.length]} alt={item} className="w-8 h-8 rounded flex-shrink-0 object-cover" />
                              <div className="flex items-center gap-1">
                                <div className="text-xs text-foreground leading-tight">{item}</div>
                              </div>
                            </div>
                            <span className="text-xs text-foreground w-16 text-right">{ids[idx]}</span>
                            <span className="text-xs text-foreground w-16 text-right">$3.91</span>
                            <div className="w-14">
                              <div className="relative h-[18px] w-14 flex items-center">
                                <span className="absolute left-1.5 text-xs text-muted-foreground pointer-events-none">$</span>
                                <input
                                  type="text"
                                  defaultValue="3.91"
                                  className="w-full h-full pl-5 pr-1 text-xs border border-[#C7C8CB] rounded bg-background"
                                />
                              </div>
                            </div>
                            <div className="w-12">
                              <div className="w-10 h-4 bg-primary rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 w-[14px] h-[12px] bg-background rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Marty Floating Panel */}
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
