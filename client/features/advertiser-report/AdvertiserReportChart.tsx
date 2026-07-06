import React from "react";
import styles from "./AdvertiserReportChart.module.css";

interface ChartDataPoint {
  date: string;
  impressions: number;
  clicks: number;
}

const chartData: ChartDataPoint[] = [
  { date: "Mar 2", impressions: 3500000, clicks: 0.36 },
  { date: "Mar 3", impressions: 2800000, clicks: 0.34 },
  { date: "Mar 4", impressions: 2200000, clicks: 0.32 },
  { date: "Mar 5", impressions: 1200000, clicks: 0.32 },
  { date: "Mar 6", impressions: 500000, clicks: 0.34 },
  { date: "Mar 7", impressions: 100000, clicks: 0.36 }
];

export default function AdvertiserReportChart() {
  const maxImpressions = 3500000;
  const maxClicks = 0.36;
  const chartWidth = 800;
  const chartHeight = 300;
  const padding = { top: 20, right: 60, bottom: 40, left: 80 };

  // Calculate positions for data points
  const getX = (index: number) => {
    const availableWidth = chartWidth - padding.left - padding.right;
    return padding.left + (index / (chartData.length - 1)) * availableWidth;
  };

  const getYImpressions = (value: number) => {
    const availableHeight = chartHeight - padding.top - padding.bottom;
    return padding.top + availableHeight - (value / maxImpressions) * availableHeight;
  };

  const getYClicks = (value: number) => {
    const availableHeight = chartHeight - padding.top - padding.bottom;
    return padding.top + availableHeight - (value / maxClicks) * availableHeight;
  };

  // Generate path for impressions area
  const impressionsPath = chartData.map((d, i) => {
    const x = getX(i);
    const y = getYImpressions(d.impressions);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(" ") + ` L ${getX(chartData.length - 1)} ${chartHeight - padding.bottom} L ${padding.left} ${chartHeight - padding.bottom} Z`;

  // Generate path for clicks area
  const clicksPath = chartData.map((d, i) => {
    const x = getX(i);
    const y = getYClicks(d.clicks);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(" ") + ` L ${getX(chartData.length - 1)} ${chartHeight - padding.bottom} L ${padding.left} ${chartHeight - padding.bottom} Z`;

  // Generate Y-axis labels for impressions (left axis)
  const impressionLabels = [0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000];
  
  // Generate Y-axis labels for clicks (right axis)
  const clickLabels = [0, 0.30, 0.32, 0.34, 0.36];

  return (
    <div className={styles.chartWrapper}>
      <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet">
        {/* Left Y-axis grid lines */}
        {impressionLabels.map((label, i) => {
          const y = getYImpressions(label);
          return (
            <g key={`grid-left-${i}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="var(--ld-semantic-color-separator)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </g>
          );
        })}

        {/* Impressions area (purple/pink) */}
        <path
          d={impressionsPath}
          fill="rgba(200, 180, 230, 0.4)"
          stroke="rgba(160, 140, 200, 0.8)"
          strokeWidth="2"
        />

        {/* Clicks area (green/teal) */}
        <path
          d={clicksPath}
          fill="rgba(180, 220, 200, 0.4)"
          stroke="rgba(120, 180, 150, 0.8)"
          strokeWidth="2"
        />

        {/* Left Y-axis labels (Impressions) */}
        {impressionLabels.map((label, i) => {
          const y = getYImpressions(label);
          return (
            <text
              key={`label-left-${i}`}
              x={padding.left - 10}
              y={y}
              textAnchor="end"
              alignmentBaseline="middle"
              className={styles.axisLabel}
            >
              {label >= 1000000 ? `${(label / 1000000).toFixed(1)}M` : label.toLocaleString()}
            </text>
          );
        })}

        {/* Right Y-axis labels (CTR) */}
        {clickLabels.map((label, i) => {
          const y = getYClicks(label);
          return (
            <text
              key={`label-right-${i}`}
              x={chartWidth - padding.right + 10}
              y={y}
              textAnchor="start"
              alignmentBaseline="middle"
              className={styles.axisLabel}
            >
              {label.toFixed(2)}
            </text>
          );
        })}

        {/* X-axis labels */}
        {chartData.map((d, i) => {
          const x = getX(i);
          return (
            <text
              key={`x-label-${i}`}
              x={x}
              y={chartHeight - padding.bottom + 20}
              textAnchor="middle"
              className={styles.axisLabel}
            >
              {d.date}
            </text>
          );
        })}

        {/* Data points for impressions */}
        {chartData.map((d, i) => {
          const x = getX(i);
          const y = getYImpressions(d.impressions);
          return (
            <circle
              key={`point-impressions-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="rgba(160, 140, 200, 1)"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* Data points for clicks */}
        {chartData.map((d, i) => {
          const x = getX(i);
          const y = getYClicks(d.clicks);
          return (
            <circle
              key={`point-clicks-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="rgba(120, 180, 150, 1)"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: "rgba(160, 140, 200, 1)" }} />
          <span>Impressions</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: "rgba(120, 180, 150, 1)" }} />
          <span>Total Product Detail Page Views</span>
        </div>
      </div>
    </div>
  );
}
