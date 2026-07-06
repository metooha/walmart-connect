import { Gear, Download, X as CloseIcon } from "@/components/icons";

interface MetricCardProps {
  label: string;
  value: string;
  color?: string;
  showClose?: boolean;
}

function MetricCard({ label, value, color, showClose = true }: MetricCardProps) {
  return (
    <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
      {color && (
        <div className="h-2 self-stretch rounded-b-full" style={{ backgroundColor: color }} />
      )}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-sm text-foreground leading-5">{label}</span>
          {showClose && (
            <button className="p-0.5 hover:bg-muted rounded transition-colors">
              <CloseIcon className="w-3 h-3 text-foreground" />
            </button>
          )}
        </div>
        <div className="text-2xl font-bold text-foreground leading-9">{value}</div>
      </div>
    </div>
  );
}

const VB_W = 584;
const VB_H = 288;

const chartData = [
  { date: 'Feb 1',  roas: 12.5,  adSpend: 22000, sales: 320000 },
  { date: 'Feb 8',  roas: 13.2,  adSpend: 23000, sales: 335000 },
  { date: 'Feb 15', roas: 13.8,  adSpend: 24000, sales: 345000 },
  { date: 'Feb 22', roas: 14.1,  adSpend: 24500, sales: 348000 },
  { date: 'Mar 1',  roas: 14.5,  adSpend: 25000, sales: 355000 },
  { date: 'Mar 8',  roas: 14.2,  adSpend: 24800, sales: 351000 },
  { date: 'Mar 15', roas: 13.9,  adSpend: 24200, sales: 340000 },
  { date: 'Mar 22', roas: 14.0,  adSpend: 24600, sales: 346000 },
  { date: 'Mar 29', roas: 14.3,  adSpend: 24900, sales: 352000 },
  { date: 'Apr 5',  roas: 14.6,  adSpend: 25200, sales: 358000 },
  { date: 'Apr 12', roas: 14.8,  adSpend: 25400, sales: 362000 },
  { date: 'Apr 19', roas: 14.5,  adSpend: 25100, sales: 356000 },
  { date: 'Apr 26', roas: 14.2,  adSpend: 24700, sales: 350000 },
  { date: 'May 3',  roas: 14.18, adSpend: 24755, sales: 350978 },
];

function buildPaths(key: 'roas' | 'adSpend' | 'sales') {
  const vals = chartData.map(d => d[key]);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const n = chartData.length - 1;

  const pts = chartData.map((d, i) => ({
    x: parseFloat(((i / n) * VB_W).toFixed(2)),
    y: parseFloat((VB_H - ((d[key] - min) / (max - min)) * VB_H * 0.82 - 8).toFixed(2)),
  }));

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
  const area = `${line} L${pts[n].x} ${VB_H} L${pts[0].x} ${VB_H} Z`;
  return { line, area };
}

const salesPaths   = buildPaths('sales');
const roasPaths    = buildPaths('roas');
const spendPaths   = buildPaths('adSpend');

const xLabels = chartData.filter((_, i) => i % 2 === 0).map(d => d.date);

export default function KeywordsPerformanceChart() {
  const metrics = {
    roas: 14.18,
    adSpend: 24755.45,
    totalAttributedSales: 350978.96,
    averageCpc: 1.38,
    impressions: 2038433,
  };

  return (
    <div className="flex flex-col bg-background shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-0">
        <h2 className="text-[20px] font-bold text-foreground">Performance summary</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-8 h-8 border border-[var(--ld-semantic-color-separator)] rounded-full hover:bg-muted transition-colors">
            <Gear className="w-4 h-4 text-foreground" />
          </button>
          <button className="flex items-center justify-center w-8 h-8 border border-[var(--ld-semantic-color-separator)] rounded-full hover:bg-muted transition-colors">
            <Download className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex items-start gap-3 px-6 py-4">
        <MetricCard label="ROAS"                   value={`$${metrics.roas.toFixed(2)}`}                                                                          color="#0053E2" showClose />
        <div className="w-px h-20 bg-[var(--ld-semantic-color-separator)] flex-shrink-0" />
        <MetricCard label="Ad Spend"               value={`$${metrics.adSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}                            color="#4DBDF5" showClose />
        <div className="w-px h-20 bg-[var(--ld-semantic-color-separator)] flex-shrink-0" />
        <MetricCard label="Total Attributed Sales" value={`$${metrics.totalAttributedSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}               color="#74C476" showClose />
        <div className="w-px h-20 bg-[var(--ld-semantic-color-separator)] flex-shrink-0" />
        <MetricCard label="Average CPC"            value={`$${metrics.averageCpc.toFixed(2)}`}            showClose={false} />
        <div className="w-px h-20 bg-[var(--ld-semantic-color-separator)] flex-shrink-0" />
        <MetricCard label="Impressions"            value={metrics.impressions.toLocaleString()}           showClose={false} />
      </div>

      {/* Legend */}
      <div className="px-6 pb-5">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#0053E2' }} />
            <span className="text-sm text-foreground">Total Attributed Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#993EF4' }} />
            <span className="text-sm text-foreground">ROAS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#4DBDF5' }} />
            <span className="text-sm text-foreground">Ad Spend</span>
          </div>
        </div>
      </div>

      {/* Chart Container — matches homepage layout */}
      <div className="px-6 pb-10 mb-2">
        <div className="relative h-[320px] pl-14 pr-16">

          {/* Left Y-axis labels (Sales / Ad Spend) */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-right text-xs text-foreground pr-2 pb-4 w-14">
            <span>$365K</span>
            <span>$355K</span>
            <span>$345K</span>
            <span>$335K</span>
            <span>$325K</span>
            <span>$315K</span>
            <span>$0.00</span>
          </div>

          {/* Right Y-axis labels (ROAS — purple) */}
          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-left text-xs text-[#993EF4] pb-4 w-16">
            <span>$15.00</span>
            <span>$14.50</span>
            <span>$14.00</span>
            <span>$13.50</span>
            <span>$13.00</span>
            <span>$12.50</span>
            <span>$0.00</span>
          </div>

          {/* Chart area */}
          <div className="relative h-full border-l border-b border-border">
            {/* X-axis labels */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-foreground px-1">
              {xLabels.map(label => (
                <span key={label}>{label}</span>
              ))}
            </div>

            {/* SVG — same approach as homepage, preserveAspectRatio="none" */}
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="kw_grad_sales" x1={VB_W / 2} y1="0" x2={VB_W / 2} y2={VB_H} gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0053E2" stopOpacity="0.12" />
                  <stop offset="1" stopColor="#0053E2" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="kw_grad_roas" x1={VB_W / 2} y1="0" x2={VB_W / 2} y2={VB_H} gradientUnits="userSpaceOnUse">
                  <stop stopColor="#993EF4" stopOpacity="0.12" />
                  <stop offset="1" stopColor="#993EF4" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="kw_grad_spend" x1={VB_W / 2} y1="0" x2={VB_W / 2} y2={VB_H} gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4DBDF5" stopOpacity="0.12" />
                  <stop offset="1" stopColor="#4DBDF5" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Area fills */}
              <path d={spendPaths.area}  fill="url(#kw_grad_spend)" />
              <path d={roasPaths.area}   fill="url(#kw_grad_roas)" />
              <path d={salesPaths.area}  fill="url(#kw_grad_sales)" />

              {/* Lines */}
              <path d={spendPaths.line}  stroke="#4DBDF5" strokeWidth="2" />
              <path d={roasPaths.line}   stroke="#993EF4" strokeWidth="2" />
              <path d={salesPaths.line}  stroke="#0053E2" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
