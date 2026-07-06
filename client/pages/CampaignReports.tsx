import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MastHead } from "../components/ui/MastHead";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import { Button } from "../components/ui/Button";
import { Tabs, TabList, Tab } from "../components/ui/Tab";
import { Select, SelectItem } from "../components/ui/Select";
import { Gear, Download, ChevronLeft, ChevronRight, X as CloseIcon } from "@/components/icons";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";

// ── Chart helpers ─────────────────────────────────────────────────────────────
const VB_W = 900;
const VB_H = 280;

const dailyChartData = [
  { date: 'Mar 11', impressions: 24071, clicks: 56, cpc: 2.68, ctr: 0.23 },
  { date: 'Mar 12', impressions: 21000, clicks: 58, cpc: 2.55, ctr: 0.28 },
  { date: 'Mar 13', impressions: 15000, clicks: 52, cpc: 2.65, ctr: 0.35 },
  { date: 'Mar 14', impressions: 10368, clicks: 47, cpc: 3.19, ctr: 0.45 },
  { date: 'Mar 15', impressions: 13315, clicks: 59, cpc: 2.54, ctr: 0.44 },
  { date: 'Mar 16', impressions: 15736, clicks: 61, cpc: 2.46, ctr: 0.39 },
];

function buildPath(data: typeof dailyChartData, key: keyof (typeof dailyChartData)[0]) {
  const vals = data.map(d => d[key] as number);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const n = data.length - 1;

  const pts = data.map((_, i) => ({
    x: parseFloat(((i / n) * VB_W).toFixed(2)),
    y: parseFloat((VB_H - ((vals[i] - min) / range) * VB_H * 0.78 - 16).toFixed(2)),
  }));

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${pts[n].x},${VB_H} L${pts[0].x},${VB_H} Z`;
  return { line, area, pts };
}

const impPaths  = buildPath(dailyChartData, 'impressions');
const clkPaths  = buildPath(dailyChartData, 'clicks');
const ctrPaths  = buildPath(dailyChartData, 'ctr');

// ── Daily table data ───────────────────────────────────────────────────────────
const tableRows = [
  { date: 'Mar 11', impressions: '15,405', clicks: '55', cpc: '$2.73', ctr: '0.56%', pdp: '66', addToCart: '2',  budget: '$150.00', sales: '$1,132.00', avgCpa: '$7.55' },
  { date: 'Mar 12', impressions: '10,368', clicks: '47', cpc: '$3.19', ctr: '0.45%', pdp: '67', addToCart: '0',  budget: '$150.00', sales: '$596.00',   avgCpa: '$3.97' },
  { date: 'Mar 13', impressions: '10,201', clicks: '51', cpc: '$2.94', ctr: '0.50%', pdp: '74', addToCart: '0',  budget: '$150.00', sales: '$596.00',   avgCpa: '$3.97' },
  { date: 'Mar 14', impressions: '13,315', clicks: '59', cpc: '$2.54', ctr: '0.44%', pdp: '91', addToCart: '0',  budget: '$150.00', sales: '$596.00',   avgCpa: '$3.97' },
  { date: 'Mar 15', impressions: '15,736', clicks: '61', cpc: '$2.46', ctr: '0.39%', pdp: '98', addToCart: '5',  budget: '$150.00', sales: '$376.00',   avgCpa: '$2.51' },
  { date: 'Mar 16', impressions: '24,071', clicks: '56', cpc: '$2.68', ctr: '0.23%', pdp: '90', addToCart: '1',  budget: '$150.00', sales: '$596.00',   avgCpa: '$3.97' },
];

// ── Metric card ────────────────────────────────────────────────────────────────
interface MetricTileProps {
  label: string;
  value: string;
  color: string;
  change?: string;
  active?: boolean;
}

function MetricTile({ label, value, color, active = true }: MetricTileProps) {
  return (
    <div className="flex flex-col min-w-[160px] flex-1">
      {/* Color bar */}
      <div className="h-1 rounded-b-full mb-3" style={{ backgroundColor: active ? color : 'transparent' }} />
      <div className="flex flex-col px-1 pb-4">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-sm text-[var(--ld-semantic-color-text-subtle)]">{label}</span>
          <button className="p-0.5 hover:bg-[var(--ld-semantic-color-fill-subtle)] rounded transition-colors">
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.55515 6.20147H7.6181V10.1875H6.55515V6.20147Z" fill="currentColor" opacity="0.6"/>
              <path d="M7.08594 5.58141C7.52622 5.58141 7.88315 5.22449 7.88315 4.7842C7.88315 4.34391 7.52622 3.98699 7.08594 3.98699C6.64565 3.98699 6.28872 4.34391 6.28872 4.7842C6.28872 5.22449 6.64565 5.58141 7.08594 5.58141Z" fill="currentColor" opacity="0.6"/>
              <path d="M7.08628 13.2878C10.5107 13.2878 13.2868 10.5117 13.2868 7.08726C13.2868 3.66279 10.5107 0.886719 7.08628 0.886719C3.66182 0.886719 0.885742 3.66279 0.885742 7.08726C0.885742 10.5117 3.66182 13.2878 7.08628 13.2878ZM7.08628 12.402C4.15103 12.402 1.77153 10.0225 1.77153 7.08726C1.77153 4.152 4.15103 1.77251 7.08628 1.77251C10.0215 1.77251 12.401 4.152 12.401 7.08726C12.401 10.0225 10.0215 12.402 7.08628 12.402Z" fill="currentColor" opacity="0.6"/>
            </svg>
          </button>
          <button className="p-0.5 hover:bg-[var(--ld-semantic-color-fill-subtle)] rounded transition-colors ml-auto">
            <CloseIcon className="w-3 h-3 text-[var(--ld-semantic-color-text-subtle)]" />
          </button>
        </div>
        <span className="text-[28px] font-bold text-[var(--ld-semantic-color-text)] leading-8">{value}</span>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function CampaignReports() {
  const navigate = useNavigate();
  const location = useLocation();

  const campaignName = location.state?.campaignName || 'SP - GTV - Hisense - New M7 Series - Auto';
  const campaignId   = location.state?.campaignId   || null;
  const campaignData = location.state?.campaignData  || null;

  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Sponsored Search');
  const [reportType, setReportType]     = useState('daily');
  const [attribution, setAttribution]   = useState('14');

  const startDate    = campaignData?.startDate    || 'Feb 09, 2026';
  const endDate      = campaignData?.endDate      || 'No end date';
  const totalBudget  = campaignData?.totalBudget  || 'N/A';
  const dailyBudget  = campaignData?.dailyBudget  || 'N/A';

  // Summary metrics (top tiles)
  const summaryMetrics = [
    { label: 'Impressions', value: '89,096', color: '#0071DC' },
    { label: 'Clicks',      value: '329',    color: '#74C476' },
    { label: 'Average CPC', value: '$2.74',  color: '#993EF4' },
    { label: 'CTR',         value: '0.37%',  color: '#B39DDB' },
    { label: 'Total Product Detail Page Views', value: '486', color: '#4DBDF5' },
  ];

  return (
    <div className="min-h-screen bg-[var(--ld-semantic-color-fill-subtle)] flex flex-col">
      <MastHead
        companyName="GOOGLE INC., TV (Google) (1p - SS)"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />

      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />

        <div className="flex-1 overflow-y-auto">
          {/* ── Page Header ────────────────────────────────────────────── */}
          <div className="bg-[var(--ld-semantic-color-surface)] border-b border-[var(--ld-semantic-color-separator)] px-6 pt-6">

            {/* Title row */}
            <div className="flex items-center gap-3 flex-wrap pb-2">
              <h1 className="text-2xl font-bold text-[var(--ld-semantic-color-text)]">
                {campaignName}
              </h1>
              <span className="inline-flex items-center h-5 px-2 text-xs font-semibold border border-[#1D5F02] text-[#1D5F02] rounded">
                Live
              </span>
            </div>

            {/* Campaign info bar */}
            <div className="flex items-center gap-2 py-2 text-sm text-[var(--ld-semantic-color-text)] border-t border-[var(--ld-semantic-color-separator)]">
              <span className="font-semibold text-[var(--ld-semantic-color-text-subtle)] text-xs uppercase tracking-wide mr-1">Campaign information:</span>
              <span>Start date: <strong>{startDate}</strong></span>
              <span className="text-[var(--ld-semantic-color-separator)]">|</span>
              <span>End date: <strong>{endDate}</strong></span>
              <span className="text-[var(--ld-semantic-color-separator)]">|</span>
              <span>Total budget: <strong>{totalBudget}</strong></span>
              <span className="text-[var(--ld-semantic-color-separator)]">|</span>
              <span>Available budget: <strong>{dailyBudget}</strong></span>
            </div>

            {/* Tabs */}
            <div>
              <Tabs defaultValue="reports">
                <TabList>
                  <Tab value="reports">Reports</Tab>
                  <Tab
                    value="edit"
                    onClick={() => navigate('/campaign', { state: { campaignName, campaignId, campaignData } })}
                  >
                    Edit
                  </Tab>
                  <Tab
                    value="history-log"
                    onClick={() => navigate(
                      campaignId ? `/reports/la-historia/${campaignId}` : '/reports/la-historia',
                      { state: { campaignName, campaignId } }
                    )}
                  >
                    History log
                  </Tab>
                </TabList>
              </Tabs>
            </div>
          </div>

          {/* ── Page content ───────────────────────────────────────────── */}
          <div className="px-6 py-4 space-y-4">

            {/* Filter row */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Date picker */}
              <div className="flex items-center gap-2 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-[var(--ld-semantic-color-surface)] text-[13px] text-[var(--ld-semantic-color-text)] cursor-pointer hover:bg-[var(--ld-semantic-color-fill-subtle)] transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5 1V2.5H4.5V1H3.5V2.5H2.5C1.67157 2.5 1 3.17157 1 4V13C1 13.8284 1.67157 14.5 2.5 14.5H13.5C14.3284 14.5 15 13.8284 15 13V4C15 3.17157 14.3284 2.5 13.5 2.5H12.5V1H11.5ZM14 6H2V13C2 13.2761 2.22386 13.5 2.5 13.5H13.5C13.7761 13.5 14 13.2761 14 13V6ZM2 5V4C2 3.72386 2.22386 3.5 2.5 3.5H3.5V4.5H4.5V3.5H11.5V4.5H12.5V3.5H13.5C13.7761 3.5 14 3.72386 14 4V5H2Z" fill="currentColor"/>
                </svg>
                <span>Mar 11, 2026 - Mar 18, 2026</span>
              </div>

              <div className="flex-1" />

              {/* Report type selector */}
              <div className="w-[220px]">
                <Select
                  size="small"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <SelectItem value="daily">Report type: Daily performance</SelectItem>
                  <SelectItem value="weekly">Report type: Weekly performance</SelectItem>
                  <SelectItem value="monthly">Report type: Monthly performance</SelectItem>
                </Select>
              </div>

              {/* Attribution selector */}
              <div className="w-[200px]">
                <Select
                  size="small"
                  value={attribution}
                  onChange={(e) => setAttribution(e.target.value)}
                >
                  <SelectItem value="14">Attribution: 14 days attribution</SelectItem>
                  <SelectItem value="7">Attribution: 7 days attribution</SelectItem>
                  <SelectItem value="30">Attribution: 30 days attribution</SelectItem>
                </Select>
              </div>
            </div>

            {/* ── Performance Summary Card ─────────────────────────────── */}
            <div className="bg-[var(--ld-semantic-color-surface)] rounded-lg shadow-sm overflow-hidden">

              {/* Card header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-2">
                <h2 className="text-base font-bold text-[var(--ld-semantic-color-text)]">Performance Summary</h2>
                <div className="flex items-center gap-1">
                  <button className="flex items-center justify-center w-8 h-8 hover:bg-[var(--ld-semantic-color-fill-subtle)] rounded transition-colors">
                    <Gear className="w-4 h-4 text-[var(--ld-semantic-color-text-subtle)]" />
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 hover:bg-[var(--ld-semantic-color-fill-subtle)] rounded transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M5 12L9 8M5 12L9 16" stroke="currentColor" strokeWidth="1.5" opacity="0.6" transform="rotate(90 12 12)"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M19 4H5a1 1 0 000 2h14a1 1 0 000-2zM5 18h14a1 1 0 010 2H5a1 1 0 010-2zM12 9l4 4-4 4V9z" fill="currentColor" opacity="0.6"/>
                    </svg>
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 hover:bg-[var(--ld-semantic-color-fill-subtle)] rounded transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4M6 12L12 18M12 18L18 12M12 18V4" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Metric tiles + chevrons */}
              <div className="relative flex items-stretch px-6">
                <button className="flex items-center justify-center w-7 h-full text-[var(--ld-semantic-color-text-subtle)] hover:text-[var(--ld-semantic-color-text)] mr-1">
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex flex-1 overflow-x-auto gap-0 divide-x divide-[var(--ld-semantic-color-separator)]">
                  {summaryMetrics.map((m) => (
                    <MetricTile key={m.label} {...m} />
                  ))}
                </div>

                <button className="flex items-center justify-center w-7 h-full text-[var(--ld-semantic-color-action-fill-primary)] hover:opacity-80 ml-1">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dot pagination indicator */}
              <div className="flex justify-center gap-1.5 py-2">
                <span className="w-2 h-2 rounded-full bg-[var(--ld-semantic-color-text-subtlest)]" />
                <span className="w-2 h-2 rounded-full bg-[var(--ld-semantic-color-action-fill-primary)]" />
              </div>

              {/* Chart */}
              <div className="px-6 pb-6">
                <div className="relative h-[300px] pl-16 pr-16">
                  {/* Left Y-axis (Impressions) */}
                  <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-right text-[11px] text-[var(--ld-semantic-color-text-subtle)] w-16 pr-2">
                    <span>26,000</span>
                    <span>24,000</span>
                    <span>22,000</span>
                    <span>20,000</span>
                    <span>18,000</span>
                    <span>16,000</span>
                    <span>14,000</span>
                    <span>12,000</span>
                    <span>10,000</span>
                  </div>

                  {/* Right Y-axis (CTR) */}
                  <div className="absolute right-0 top-0 bottom-8 flex flex-col justify-between text-left text-[11px] text-[#993EF4] w-16 pl-2">
                    <span>0.50</span>
                    <span>0.45</span>
                    <span>0.40</span>
                    <span>0.35</span>
                    <span>0.30</span>
                    <span>0.25</span>
                    <span>0.20</span>
                  </div>

                  {/* Chart area */}
                  <div className="relative h-[calc(100%-32px)] border-l border-b border-[var(--ld-semantic-color-separator)]">
                    {/* Horizontal grid lines */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className="absolute left-0 right-0 border-t border-[var(--ld-semantic-color-separator)]"
                        style={{ top: `${(i / 8) * 100}%`, opacity: 0.4 }}
                      />
                    ))}

                    {/* SVG chart */}
                    <svg
                      className="w-full h-full"
                      viewBox={`0 0 ${VB_W} ${VB_H}`}
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="cr_grad_imp" x1="0" y1="0" x2="0" y2="1">
                          <stop stopColor="#0071DC" stopOpacity="0.3" />
                          <stop offset="1" stopColor="#0071DC" stopOpacity="0.02" />
                        </linearGradient>
                        <linearGradient id="cr_grad_clk" x1="0" y1="0" x2="0" y2="1">
                          <stop stopColor="#74C476" stopOpacity="0.3" />
                          <stop offset="1" stopColor="#74C476" stopOpacity="0.02" />
                        </linearGradient>
                        <linearGradient id="cr_grad_ctr" x1="0" y1="0" x2="0" y2="1">
                          <stop stopColor="#B39DDB" stopOpacity="0.3" />
                          <stop offset="1" stopColor="#B39DDB" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>

                      {/* Area fills */}
                      <path d={ctrPaths.area} fill="url(#cr_grad_ctr)" />
                      <path d={clkPaths.area} fill="url(#cr_grad_clk)" />
                      <path d={impPaths.area} fill="url(#cr_grad_imp)" />

                      {/* Lines */}
                      <path d={ctrPaths.line} stroke="#B39DDB" strokeWidth="2" strokeLinejoin="round" />
                      <path d={clkPaths.line} stroke="#74C476" strokeWidth="2" strokeLinejoin="round" />
                      <path d={impPaths.line} stroke="#0071DC" strokeWidth="2" strokeLinejoin="round" />
                    </svg>

                    {/* X-axis labels */}
                    <div className="absolute -bottom-7 left-0 right-0 flex justify-between text-[11px] text-[var(--ld-semantic-color-text-subtle)] px-1">
                      {dailyChartData.map(d => (
                        <span key={d.date}>{d.date}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Daily Performance Table ──────────────────────────────── */}
            <div className="bg-[var(--ld-semantic-color-surface)] rounded-lg shadow-sm overflow-hidden">
              {/* Table header */}
              <div className="flex items-start justify-between px-6 py-4 border-b border-[var(--ld-semantic-color-separator)]">
                <div>
                  <h3 className="text-base font-bold text-[var(--ld-semantic-color-text)]">Daily performance</h3>
                  <p className="text-xs text-[var(--ld-semantic-color-text-subtle)] mt-0.5">
                    The Daily performance report shows the performance of the selected campaign by day.
                  </p>
                </div>
                <button className="flex items-center justify-center w-8 h-8 hover:bg-[var(--ld-semantic-color-fill-subtle)] rounded transition-colors mt-1">
                  <Download className="w-4 h-4 text-[var(--ld-semantic-color-text-subtle)]" />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-[var(--ld-semantic-color-text)]">
                  <thead>
                    <tr className="border-b border-[var(--ld-semantic-color-separator)] bg-[var(--ld-semantic-color-fill-subtle)]">
                      {['Date', 'Impressions', 'Clicks', 'Avg CPC', 'CTR', 'Total PDP Views', 'Add To Cart', 'Daily Budget', 'Total Attributed Sales', 'Avg CPA'].map(col => (
                        <th
                          key={col}
                          className="text-left text-xs font-semibold text-[var(--ld-semantic-color-text)] px-4 py-3 whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[var(--ld-semantic-color-separator)] hover:bg-[var(--ld-semantic-color-fill-subtle)] transition-colors"
                      >
                        <td className="px-4 py-3 text-[var(--ld-semantic-color-text-subtle)] whitespace-nowrap">{row.date}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">{row.impressions}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">{row.clicks}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">{row.cpc}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">{row.ctr}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">{row.pdp}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">{row.addToCart}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">{row.budget}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">{row.sales}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">{row.avgCpa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination row */}
              <div className="flex items-center justify-end gap-4 px-6 py-3 border-t border-[var(--ld-semantic-color-separator)]">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--ld-semantic-color-text-subtle)]">Results per page</span>
                  <Select size="small" value="50" onChange={() => {}}>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </Select>
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--ld-semantic-color-text-subtle)]">
                  <button className="p-1 hover:bg-[var(--ld-semantic-color-fill-subtle)] rounded"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="p-1 hover:bg-[var(--ld-semantic-color-fill-subtle)] rounded"><ChevronLeft className="w-4 h-4" /></button>
                  <span className="px-2">Page</span>
                  <input
                    type="text"
                    defaultValue="1"
                    className="w-8 h-7 text-center border border-[var(--ld-semantic-color-separator)] rounded text-xs"
                  />
                  <span className="px-2">of 1</span>
                  <button className="p-1 hover:bg-[var(--ld-semantic-color-fill-subtle)] rounded"><ChevronRight className="w-4 h-4" /></button>
                  <button className="p-1 hover:bg-[var(--ld-semantic-color-fill-subtle)] rounded"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="py-4 text-center text-xs text-[var(--ld-semantic-color-text-subtle)]">
              © 2026 Walmart Inc. All Rights reserved.
              <div className="flex items-center justify-center gap-1 mt-1">
                <a href="#" className="text-[var(--ld-semantic-color-link)] hover:underline">Privacy</a>
                <span>and</span>
                <a href="#" className="text-[var(--ld-semantic-color-link)] hover:underline">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
