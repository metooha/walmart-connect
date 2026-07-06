import { useState } from "react";
import { MastHead } from "../components/ui/MastHead";
import { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";

/* ─── Icons ─────────────────────────────────────────────────────────────── */

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3.9C8.29823 3.9 8.54565 4.11759 8.59215 4.40268L8.6 4.5V9.6407C8.6 9.97207 8.33137 10.2407 8 10.2407C7.70177 10.2407 7.45435 10.0231 7.40785 9.73802L7.4 9.6407V4.5C7.4 4.16863 7.66863 3.9 8 3.9Z" fill="#EA1100"/>
    <path d="M8 12.1016C8.33224 12.1016 8.60157 11.8322 8.60157 11.5C8.60157 11.1678 8.33224 10.8984 8 10.8984C7.66776 10.8984 7.39843 11.1678 7.39843 11.5C7.39843 11.8322 7.66776 12.1016 8 12.1016Z" fill="#EA1100"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8ZM2.2 8C2.2 4.79675 4.79675 2.2 8 2.2C11.2033 2.2 13.8 4.79675 13.8 8C13.8 11.2033 11.2033 13.8 8 13.8C4.79675 13.8 2.2 11.2033 2.2 8Z" fill="#EA1100"/>
  </svg>
);

const LightningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
  </svg>
);

const CaretDownIcon = () => (
  <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground" width="12" height="12" viewBox="0 0 16 16" fill="none">
    <path d="M7.62372 10.3293C7.71866 10.4378 7.85583 10.5 8.00001 10.5C8.14419 10.5 8.28135 10.4378 8.3763 10.3293L11.8763 6.32925C12.0055 6.18161 12.0364 5.97205 11.9553 5.79339C11.8743 5.61474 11.6962 5.5 11.5 5.5H4.50001C4.30382 5.5 4.12576 5.61474 4.04469 5.79339C3.96362 5.97205 3.99453 6.18161 4.12372 6.32925L7.62372 10.3293Z" fill="currentColor"/>
  </svg>
);

/* ─── Filter Select ──────────────────────────────────────────────────────── */

function FilterSelect({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-foreground">{label}</label>
      <div className="relative">
        <select className="appearance-none h-10 pl-3 pr-9 border border-border rounded text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[var(--ld-semantic-color-action-focus-outline,#0071DC)] min-w-[200px] cursor-pointer">
          <option value="all">All</option>
        </select>
        <CaretDownIcon />
      </div>
    </div>
  );
}

/* ─── Pill Button ────────────────────────────────────────────────────────── */

function PillButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-8 px-4 border border-foreground rounded-full text-sm font-bold text-foreground hover:bg-muted transition-colors whitespace-nowrap"
    >
      {children}
    </button>
  );
}

/* ─── Underline Link ─────────────────────────────────────────────────────── */

function UnderlineLink({ children }: { children: React.ReactNode }) {
  return (
    <a href="#" className="text-sm text-foreground underline hover:no-underline whitespace-nowrap">
      {children}
    </a>
  );
}

/* ─── Card ───────────────────────────────────────────────────────────────── */

interface Metric {
  label: string;
  value: string;
  green?: boolean;
  red?: boolean;
}

interface CardProps {
  iconBg: string;
  icon: React.ReactNode;
  title: string;
  updated: string;
  description: React.ReactNode;
  metrics: Metric[];
  footer: React.ReactNode;
}

function RecommendationCard({ iconBg, icon, title, updated, description, metrics, footer }: CardProps) {
  return (
    <div className="bg-background rounded-xl border border-border shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] p-6 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`p-1 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
          <h3 className="text-base font-bold text-foreground leading-5">{title}</h3>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0 pt-0.5">{updated}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-foreground leading-5">{description}</p>

      {/* Metrics */}
      <div className="flex items-start gap-6 flex-wrap">
        {metrics.map((m, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <span className={`text-xs leading-4 ${m.green ? 'text-[var(--ld-semantic-color-text-positive,#2A8703)]' : m.red ? 'text-[var(--ld-semantic-color-text-negative,#C4281A)]' : 'text-foreground'}`}>
              {m.label}
            </span>
            <span className={`text-base font-bold leading-6 ${m.green ? 'text-[var(--ld-semantic-color-text-positive,#2A8703)]' : m.red ? 'text-[var(--ld-semantic-color-text-negative,#C4281A)]' : 'text-foreground'}`}>
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-border pt-4">
        {footer}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function AllRecommendations() {
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Sponsored Search');

  return (
    <div className="min-h-screen bg-background">
      <MastHead
        companyName="PepsiCo (Sponsored) (PepsiCo) (1p-MS)"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />

      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-8 py-8 flex flex-col gap-6">

            {/* Page title */}
            <h1 className="text-[32px] font-bold text-foreground leading-10">Recommendations</h1>

            {/* Filters */}
            <div className="flex items-end gap-4">
              <FilterSelect label="Campaigns" />
              <FilterSelect label="Categories" />
            </div>

            {/* Row 1: budget cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
              <RecommendationCard
                iconBg="bg-[#FBD0CC]"
                icon={<AlertIcon />}
                title="Update total budget"
                updated="Updated Oct 10, 2025"
                description={<>You have campaigns that have run out of total budget. Applying our recommendations could help keep your ads running all day. <a href="#" className="underline hover:no-underline">Learn more</a></>}
                metrics={[
                  { label: 'Number of campaigns', value: '12' },
                  { label: 'Combined recommended total budget increase', value: '$1,000' },
                ]}
                footer={
                  <div className="flex items-center justify-end gap-4">
                    <UnderlineLink>View 12 campaigns</UnderlineLink>
                    <PillButton>Apply all</PillButton>
                  </div>
                }
              />
              <RecommendationCard
                iconBg="bg-[#FBD0CC]"
                icon={<AlertIcon />}
                title="Update daily budget"
                updated="Updated Oct 10, 2025"
                description={<>You have campaigns that have run out of daily budget. Applying our recommendations could help keep your ads running all day. <a href="#" className="underline hover:no-underline">Learn more</a></>}
                metrics={[
                  { label: 'Number of campaigns', value: '4' },
                  { label: 'Combined recommended daily budget increase', value: '$1,000' },
                ]}
                footer={
                  <div className="flex items-center justify-end gap-4">
                    <UnderlineLink>View 4 campaigns</UnderlineLink>
                    <PillButton>Apply all</PillButton>
                  </div>
                }
              />
            </div>

            {/* Row 2: paused learning */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
              <RecommendationCard
                iconBg="bg-[#FBD0CC]"
                icon={<AlertIcon />}
                title="Review campaigns with paused learning"
                updated="Updated Oct 10, 2025"
                description={<>You have Target ROAS campaigns that could not exit the learning phase because they didn't perform as expected. Please review and update the campaigns to resume learning. <a href="#" className="underline hover:no-underline">Learn more</a></>}
                metrics={[
                  { label: 'Number of campaigns', value: '10' },
                  { label: 'Status', value: 'Learning paused', red: true },
                ]}
                footer={
                  <div className="flex items-center justify-end gap-4">
                    <UnderlineLink>View 10 campaigns</UnderlineLink>
                  </div>
                }
              />
              <RecommendationCard
                iconBg="bg-[#FBD0CC]"
                icon={<AlertIcon />}
                title="Review campaigns with paused learning"
                updated="Updated Oct 10, 2025"
                description={<>You have Target ROAS campaigns that could not exit the learning phase because they didn't perform as expected. Please review and update the campaigns to resume learning. <a href="#" className="underline hover:no-underline">Learn more</a></>}
                metrics={[
                  { label: 'Number of campaigns', value: '10' },
                  { label: 'Status', value: 'Learning paused', red: true },
                ]}
                footer={
                  <div className="flex items-center justify-end gap-4">
                    <UnderlineLink>View 10 campaigns</UnderlineLink>
                  </div>
                }
              />
            </div>

            {/* Row 3: bidding / ROAS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
              <RecommendationCard
                iconBg="bg-[#F5D5E9]"
                icon={<LightningIcon />}
                title="Switch your bidding strategy"
                updated="Updated Oct 10, 2025"
                description={<>Switching these campaigns to Target ROAS bidding and applying our target and budget recommendations could help increase your sales. <a href="#" className="underline hover:no-underline">Learn more</a></>}
                metrics={[
                  { label: 'Number of campaigns', value: '15' },
                  { label: 'Recommended ROAS target for all campaigns', value: '2.00-3.00' },
                  { label: 'Combined recommended daily budget increase', value: '$1,000', green: true },
                  { label: 'Combined potential increase in sales/week', value: '$124k', green: true },
                ]}
                footer={
                  <div className="flex items-center justify-end gap-4">
                    <UnderlineLink>View 15 campaigns</UnderlineLink>
                    <PillButton>Apply all</PillButton>
                  </div>
                }
              />
              <RecommendationCard
                iconBg="bg-[#F5D5E9]"
                icon={<LightningIcon />}
                title="Update your ROAS target"
                updated="Updated Oct 10, 2025"
                description={<>Applying our ROAS target and budget recommendations to these campaigns could help increase your sales. <a href="#" className="underline hover:no-underline">Learn more</a></>}
                metrics={[
                  { label: 'Number of campaigns', value: '4' },
                  { label: 'Recommended ROAS target for all campaigns', value: '2.50-3.50' },
                  { label: 'Combined recommended daily budget increase', value: '$1,200', green: true },
                  { label: 'Combined potential increase in sales/week', value: '$32k', green: true },
                ]}
                footer={
                  <div className="flex items-center justify-end gap-4">
                    <UnderlineLink>View 4 campaigns</UnderlineLink>
                    <PillButton>Apply all</PillButton>
                  </div>
                }
              />
            </div>

            {/* Row 4: items / keywords */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
              {/* Advertise high quality items – custom layout for product images */}
              <div className="bg-background rounded-xl border border-border shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
                      <LightningIcon />
                    </div>
                    <h3 className="text-base font-bold text-foreground leading-5">Advertise these high quality items</h3>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0 pt-0.5">Updated Oct 10, 2025</span>
                </div>

                <p className="text-sm text-foreground leading-5">
                  We found items that you're not advertising that have the potential to drive sales in a Sponsored Products automatic campaign. <a href="#" className="underline hover:no-underline">Learn more</a>
                </p>

                <div className="flex items-end gap-6 flex-wrap">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-foreground leading-4">Number of items</span>
                    <span className="text-base font-bold text-foreground leading-6">1,000</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)] leading-4">Average listing quality</span>
                    <span className="text-base font-bold text-[var(--ld-semantic-color-text-positive,#2A8703)] leading-6">88.5%</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/c04ef675f842aa0f2c9c1a3292268267f5cd2203?width=96" alt="Product" className="w-12 h-12 object-cover rounded" />
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/e3b58a71f6bde1765cd30f82d152e9bf0db3400c?width=96" alt="Product" className="w-12 h-12 object-cover rounded" />
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/7e3d5aa0b2caeacb2e0dd9a07394026e5d0244bc?width=96" alt="Product" className="w-12 h-12 object-cover rounded" />
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/bb319b37f89c1feb714d0e5ad392bd7062c7edef?width=96" alt="Product" className="w-12 h-12 object-cover rounded" />
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/fa81303645e82b1387b2f225cd10e485d3c956fe?width=52" alt="Product" className="w-6 h-12 object-cover rounded" />
                  </div>
                </div>

                <div className="mt-auto border-t border-border pt-4">
                  <div className="flex items-center justify-end gap-3 flex-wrap">
                    <UnderlineLink>Request report</UnderlineLink>
                    <PillButton>Create new campaign</PillButton>
                    <PillButton>Add items to existing campaign</PillButton>
                  </div>
                </div>
              </div>

              {/* Add new keywords */}
              <RecommendationCard
                iconBg="bg-[#F5D5E9]"
                icon={<LightningIcon />}
                title="Add new keywords"
                updated="Updated Oct 10, 2025"
                description={<>Adding these recommended keywords could help enhance your item visibility and boost sales. We will apply our platform's suggested bids. <a href="#" className="underline hover:no-underline">Learn more</a></>}
                metrics={[
                  { label: 'Number of campaigns', value: '12' },
                  { label: 'Number of ad groups', value: '23' },
                  { label: 'Total keywords', value: '280' },
                  { label: 'Unique keywords', value: '155' },
                ]}
                footer={
                  <div className="flex items-center justify-end gap-3 flex-wrap">
                    <UnderlineLink>Request report</UnderlineLink>
                    <UnderlineLink>View 12 campaigns</UnderlineLink>
                    <PillButton>Apply all</PillButton>
                  </div>
                }
              />
            </div>

            {/* Footer disclaimer */}
            <p className="text-xs text-muted-foreground leading-4 pb-4">
              Recommendations are derived from AI/machine learning models. Walmart cannot guarantee any future campaign performance results. Review and validate before making decisions based on these recommendations.
            </p>
          </div>
        </main>
      </div>

      <MartyFloatingPanel />
    </div>
  );
}
