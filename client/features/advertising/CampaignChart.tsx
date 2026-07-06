interface CampaignChartProps {
  visibleSeries?: {
    impressions: boolean;
    clicks: boolean;
    cpc: boolean;
  };
  attribution?: string;
}

export default function CampaignChart({ visibleSeries = { impressions: true, clicks: true, cpc: true }, attribution = "14 days attribution" }: CampaignChartProps) {
  // Calculate attribution multiplier
  const attributionDays = parseInt(attribution.split(" ")[0]);
  const attributionMultiplier = {
    7: 0.85,   // 7 days - fewer conversions attributed
    14: 1.0,   // 14 days - baseline
    30: 1.18,  // 30 days - more conversions attributed
    60: 1.32,  // 60 days - even more conversions
    90: 1.45   // 90 days - most conversions attributed
  }[attributionDays] || 1.0;

  // Base data (14-day attribution)
  const baseChartData = [
    { date: 'Dec 30', impressions: 15234000, clicks: 121000, cpc: 1.42 },
    { date: 'Jan 6', impressions: 16123000, clicks: 127500, cpc: 1.39 },
    { date: 'Jan 13', impressions: 16234000, clicks: 129800, cpc: 1.38 },
    { date: 'Jan 20', impressions: 17456000, clicks: 135200, cpc: 1.41 },
    { date: 'Jan 27', impressions: 17823000, clicks: 138900, cpc: 1.37 },
    { date: 'Feb 3', impressions: 18234000, clicks: 142100, cpc: 1.36 },
    { date: 'Feb 10', impressions: 18456000, clicks: 143800, cpc: 1.35 },
    { date: 'Feb 17', impressions: 18567000, clicks: 145200, cpc: 1.34 },
    { date: 'Feb 24', impressions: 18689000, clicks: 146700, cpc: 1.35 },
    { date: 'Mar 3', impressions: 18734000, clicks: 147200, cpc: 1.36 },
    { date: 'Mar 10', impressions: 18689154, clicks: 148782, cpc: 1.36 },
    { date: 'Mar 17', impressions: 18712000, clicks: 148300, cpc: 1.37 },
    { date: 'Mar 24', impressions: 18745000, clicks: 148500, cpc: 1.36 },
    { date: 'Mar 31', impressions: 18689154, clicks: 148782, cpc: 1.36 }
  ];

  // Apply attribution multiplier to generate dynamic data
  const chartData = baseChartData.map(point => ({
    ...point,
    impressions: Math.round(point.impressions * attributionMultiplier),
    clicks: Math.round(point.clicks * attributionMultiplier),
    // CPC inversely affected by attribution (better attribution = lower CPC)
    cpc: parseFloat((point.cpc / Math.sqrt(attributionMultiplier)).toFixed(2))
  }));

  const xAxisLabels = [
    'Dec 30', 'Jan 6', 'Jan 13', '20', '27', 'Feb 3', '10',
    '17', '24', 'Mar 3', '10', '17', '24', '31'
  ];

  // Calculate normalized values for visualization
  const maxImpressions = Math.max(...chartData.map(d => d.impressions));
  const minImpressions = Math.min(...chartData.map(d => d.impressions));
  const maxClicks = Math.max(...chartData.map(d => d.clicks));
  const minClicks = Math.min(...chartData.map(d => d.clicks));
  const maxCpc = Math.max(...chartData.map(d => d.cpc));
  const minCpc = Math.min(...chartData.map(d => d.cpc));

  const chartHeight = 163;
  const chartWidth = 1167;
  const pointSpacing = chartWidth / (chartData.length - 1);

  const normalizeValue = (value: number, min: number, max: number, invert = true) => {
    const normalized = (value - min) / (max - min);
    return invert ? chartHeight - (normalized * chartHeight * 0.8) : normalized * chartHeight * 0.8;
  };

  const createPathData = (dataKey: 'impressions' | 'clicks' | 'cpc', min: number, max: number) => {
    return chartData.map((point, index) => {
      const x = index * pointSpacing;
      const y = normalizeValue(point[dataKey], min, max);
      return index === 0 ? `M${x} ${y}` : `L${x} ${y}`;
    }).join(' ');
  };

  const impressionsPath = createPathData('impressions', minImpressions, maxImpressions);
  const clicksPath = createPathData('clicks', minClicks, maxClicks);
  const cpcPath = createPathData('cpc', minCpc, maxCpc);

  // Y-axis labels for impressions
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    return num.toLocaleString();
  };

  const yAxisTicks = 5;
  const yAxisLabels = Array.from({ length: yAxisTicks }, (_, i) => {
    const value = minImpressions + ((maxImpressions - minImpressions) * i / (yAxisTicks - 1));
    return formatNumber(value);
  }).reverse();

  return (
    <div className="flex flex-col items-start w-full bg-background rounded-b-2xl">
      {/* Chart Container */}
      <div className="relative w-full h-[180px] bg-background pr-4 pl-16 pt-4 overflow-hidden">
        {/* Y-Axis Labels */}
        <div className="absolute left-4 top-4 h-[140px] flex flex-col justify-between py-1">
          {yAxisLabels.map((label, index) => (
            <div key={index} className="text-xs text-foreground text-right pr-2">
              {label}
            </div>
          ))}
        </div>

        {/* Grid Background */}
        <div className="absolute left-16 right-4 top-4 h-full">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="80" height="20" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 20" fill="none" stroke="#E3E4E5" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Chart SVG */}
        <svg
          className="absolute"
          style={{ left: '64px', top: '24px', height: '140px', right: '16px', width: 'calc(100% - 80px)' }}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Purple Line - Impressions */}
          {visibleSeries.impressions && (
            <path
              d={impressionsPath}
              stroke="#993EF4"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}

          {/* Cyan Line - Clicks */}
          {visibleSeries.clicks && (
            <path
              d={clicksPath}
              stroke="#4DBDF5"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}

          {/* Blue Line - Cost per click */}
          {visibleSeries.cpc && (
            <path
              d={cpcPath}
              stroke="#0053E2"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}
        </svg>
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between items-center w-full text-xs text-foreground text-center pl-16 pr-4 py-2 rounded-b-2xl">
        {xAxisLabels.map((label, index) => (
          <div key={index} className="flex-shrink-0 w-[72px]">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
