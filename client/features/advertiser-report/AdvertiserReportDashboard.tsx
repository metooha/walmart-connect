import React, { useState } from "react";
import { Select, SelectItem } from "@/components/ui/Select";
import { Calendar } from "@/components/icons";
import AdvertiserReportChart from "./AdvertiserReportChart";
import styles from "./AdvertiserReportDashboard.module.css";

export default function AdvertiserReportDashboard() {
  const [dateRange, setDateRange] = useState("Mar 2 2026 - Mar 9 2026");
  const [reportType, setReportType] = useState("Daily performance");
  const [attribution, setAttribution] = useState("14 days attribution");

  // Performance metrics
  const metrics = {
    impressions: 5894877,
    clicks: 19911,
    avgCpc: 1.74,
    ctr: 0.34,
    totalPdpViews: 24592
  };

  // Sample data for the table
  const reportData = [
    {
      date: "Mar 07 2026",
      impressions: 153832,
      clicks: 345,
      avgCpc: 9.04,
      ctr: 0.20,
      totalPdpViews: 390,
      totalAddToCart: 0,
      adSpend: 3158.65,
      totalSalesRevenue: 64588.99,
      roas: 50.80,
      inStoreAttributedSales: 50.00
    },
    {
      date: "Mar 06, 2026",
      impressions: 191494,
      clicks: 339,
      avgCpc: 9.01,
      ctr: 0.25,
      totalPdpViews: 543,
      totalAddToCart: 6,
      adSpend: 3162.01,
      totalSalesRevenue: 66394.99,
      roas: 37.04,
      inStoreAttributedSales: 5298.00
    },
    {
      date: "Mar 05, 2026",
      impressions: 870079,
      clicks: 1407,
      avgCpc: 9.02,
      ctr: 0.24,
      totalPdpViews: 1342,
      totalAddToCart: 4,
      adSpend: 5443.44,
      totalSalesRevenue: 54928.49,
      roas: 50.01,
      inStoreAttributedSales: 24251.00
    },
    {
      date: "Mar 04, 2026",
      impressions: 548669,
      clicks: 1824,
      avgCpc: 9.27,
      ctr: 0.33,
      totalPdpViews: 2767,
      totalAddToCart: 45,
      adSpend: 52.37967,
      totalSalesRevenue: 529260.20,
      roas: 50.62,
      inStoreAttributedSales: 52303.00
    },
    {
      date: "Mar 03, 2026",
      impressions: 1578231,
      clicks: 3666,
      avgCpc: 9.95,
      ctr: 0.66,
      totalPdpViews: 7435,
      totalAddToCart: 157,
      adSpend: 371002.35,
      totalSalesRevenue: 684868.26,
      roas: 9.73,
      inStoreAttributedSales: 101536.88
    }
  ];

  return (
    <div className={styles.dashboard}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>GOOGLE INC TV</h1>
        
        <div className={styles.filters}>
          <button className={styles.dateButton}>
            <Calendar />
            <span>{dateRange}</span>
          </button>
          
          <Select
            size="small"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <SelectItem value="Daily performance">Report type: Daily performance</SelectItem>
            <SelectItem value="Weekly performance">Report type: Weekly performance</SelectItem>
            <SelectItem value="Monthly performance">Report type: Monthly performance</SelectItem>
          </Select>
          
          <Select
            size="small"
            value={attribution}
            onChange={(e) => setAttribution(e.target.value)}
          >
            <SelectItem value="14 days attribution">Attribution: 14 days attribution</SelectItem>
            <SelectItem value="7 days attribution">Attribution: 7 days attribution</SelectItem>
            <SelectItem value="30 days attribution">Attribution: 30 days attribution</SelectItem>
          </Select>
        </div>
      </div>

      {/* Performance Summary Section */}
      <div className={styles.performanceSummary}>
        <div className={styles.summaryHeader}>
          <h2>Performance Summary</h2>
          <div className={styles.summaryActions}>
            <button className={styles.iconButton}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8.95337 1C9.41275 1 9.80761 1.3118 9.921 1.74723L9.94335 1.85855L10.1514 3.323L10.436 3.46465C10.5557 3.5292 10.6728 3.59848 10.7891 3.67395L10.9634 3.792L12.3383 3.24127C12.7232 3.08679 13.1539 3.18773 13.4308 3.47508L13.5091 3.5668L13.5769 3.6693L14.5362 5.3307C14.7643 5.72576 14.6942 6.21946 14.3795 6.53562L14.2877 6.61723L13.1215 7.532L13.1381 7.74424L13.1443 8L13.1428 8.12808L13.1381 8.25576L13.1215 8.467L14.2876 9.38269C14.6138 9.63875 14.7417 10.0622 14.6313 10.4457L14.591 10.5593L14.5362 10.6693L13.5769 12.3307C13.3488 12.7258 12.8862 12.912 12.4551 12.7975L12.3385 12.7588L10.9634 12.207L10.7008 12.3822C10.5852 12.4537 10.4667 12.5207 10.3458 12.5829L10.1514 12.676L9.94336 14.1414C9.8941 14.4862 9.67129 14.7728 9.34194 14.9144L9.21357 14.9605L9.09015 14.9896L8.95337 15H7.03487C6.64308 15 6.29308 14.7721 6.12077 14.3934L6.07454 14.2754L6.04491 14.1416L5.83525 12.677L5.55155 12.535C5.43185 12.4704 5.31478 12.4011 5.20059 12.3272L5.02321 12.207L3.6499 12.7587C3.32994 12.8872 2.97427 12.8398 2.68841 12.6308L2.58469 12.5449L2.48875 12.4439L2.41133 12.3307L1.45208 10.6693C1.25815 10.3334 1.2781 9.92132 1.51317 9.58459L1.5995 9.47534L1.70057 9.38277L2.86513 8.468L2.85017 8.25576L2.84392 8L2.84548 7.87192L2.85017 7.74424L2.86513 7.531L1.70067 6.61731C1.42946 6.40444 1.29267 6.07274 1.33074 5.72069L1.35329 5.5879L1.39271 5.45437L1.45208 5.3307L2.41133 3.6693C2.60722 3.33001 2.97956 3.14084 3.39371 3.18098L3.51908 3.19999L3.64998 3.2413L5.02321 3.792L5.28677 3.61822C5.40238 3.54666 5.52082 3.47968 5.64181 3.41746L5.83525 3.322L6.04488 1.85858C6.10444 1.44172 6.4157 1.11559 6.81156 1.02511L6.9215 1.00639L7.03487 1H8.95337ZM8.95337 2L7.03485 2.00018L6.78523 3.74294C6.75975 3.92083 6.64076 4.07137 6.47355 4.13724C6.09025 4.28826 5.73184 4.49592 5.40974 4.75262C5.29245 4.8461 5.14082 4.88103 4.99688 4.85127L4.91177 4.82559L3.3204 4.18433L3.27715 4.169L2.3391 5.79024L2.31788 5.83099L3.70335 6.91853C3.84457 7.02943 3.91548 7.20753 3.88913 7.38514C3.85913 7.58732 3.84396 7.79262 3.84396 8C3.84396 8.20738 3.85913 8.41268 3.88913 8.61486C3.91109 8.76287 3.8655 8.91121 3.76798 9.02073L3.70335 9.08146L2.35266 10.1396L2.31788 10.1695L3.25283 11.7923L3.27756 11.831L4.91177 11.1744C5.0788 11.1073 5.26899 11.1352 5.40974 11.2474C5.73184 11.5041 6.09025 11.7117 6.47355 11.8628C6.61289 11.9177 6.71875 12.0313 6.76491 12.1707L6.78523 12.2571L7.02638 13.9552L7.03492 14.0003L8.90785 14.0021L8.9537 14L9.20241 12.2574C9.22785 12.0795 9.34689 11.9288 9.51418 11.863C9.89744 11.712 10.2558 11.5044 10.5779 11.2479C10.6952 11.1544 10.8467 11.1195 10.9905 11.1492L11.0756 11.1749L12.7109 11.8307L13.6701 10.1693L12.2849 9.08146C12.1437 8.97057 12.0728 8.79247 12.0991 8.61486C12.1291 8.41268 12.1443 8.20738 12.1443 8C12.1443 7.79262 12.1291 7.58732 12.0991 7.38514C12.0772 7.23713 12.1227 7.08879 12.2203 6.97927L12.2849 6.91853L13.6701 5.8307L12.7109 4.1693L11.0756 4.82515C10.9087 4.89211 10.7186 4.86423 10.5779 4.75215C10.2558 4.49555 9.89744 4.28798 9.51418 4.13704C9.37477 4.08214 9.26887 3.96839 9.22272 3.82901L9.20241 3.74256L8.95337 2ZM7.99412 5.5C9.37489 5.5 10.4942 6.61929 10.4942 8C10.4942 9.38071 9.37489 10.5 7.99412 10.5C6.61335 10.5 5.49402 9.38071 5.49402 8C5.49402 6.61929 6.61335 5.5 7.99412 5.5ZM7.99412 6.5C7.16566 6.5 6.49406 7.17157 6.49406 8C6.49406 8.82843 7.16566 9.5 7.99412 9.5C8.82258 9.5 9.49418 8.82843 9.49418 8C9.49418 7.17157 8.82258 6.5 7.99412 6.5Z" fill="currentColor"/>
              </svg>
            </button>
            <button className={styles.iconButton}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2.5H14V3.5H2V2.5Z" fill="currentColor"/>
                <path d="M2 7.5H14V8.5H2V7.5Z" fill="currentColor"/>
                <path d="M14 12.5H2V13.5H14V12.5Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Impressions</span>
              <div className={styles.metricActions}>
                <button className={styles.closeButton}>×</button>
              </div>
            </div>
            <div className={styles.metricValue}>{metrics.impressions.toLocaleString()}</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Clicks</span>
              <div className={styles.metricActions}>
                <button className={styles.closeButton}>×</button>
              </div>
            </div>
            <div className={styles.metricValue}>{metrics.clicks.toLocaleString()}</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Average CPC</span>
              <div className={styles.metricActions}>
                <button className={styles.closeButton}>×</button>
              </div>
            </div>
            <div className={styles.metricValue}>${metrics.avgCpc.toFixed(2)}</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>CTR</span>
              <div className={styles.metricActions}>
                <button className={styles.closeButton}>×</button>
              </div>
            </div>
            <div className={styles.metricValue}>{metrics.ctr.toFixed(2)}%</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Total Product Detail Page Views</span>
              <div className={styles.metricActions}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7.5" stroke="currentColor"/>
                </svg>
                <button className={styles.closeButton}>×</button>
              </div>
            </div>
            <div className={styles.metricValue}>{metrics.totalPdpViews.toLocaleString()}</div>
          </div>

          <button className={styles.scrollButton}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Performance Chart */}
      <div className={styles.chartContainer}>
        <AdvertiserReportChart />
      </div>

      {/* Data Table */}
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>Average CPC</th>
              <th>CTR</th>
              <th>Total Product Detail Page Views</th>
              <th>Total Add to Cart</th>
              <th>Ad Spend</th>
              <th>Total Attrib. Sales Revenue</th>
              <th>ROAS</th>
              <th>In-store Attributed Sales (Beta)</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.impressions.toLocaleString()}</td>
                <td>{row.clicks.toLocaleString()}</td>
                <td>${row.avgCpc.toFixed(2)}</td>
                <td>{row.ctr.toFixed(2)}%</td>
                <td>{row.totalPdpViews.toLocaleString()}</td>
                <td>{row.totalAddToCart}</td>
                <td>${row.adSpend.toLocaleString()}</td>
                <td>${row.totalSalesRevenue.toLocaleString()}</td>
                <td>${row.roas.toFixed(2)}</td>
                <td>${row.inStoreAttributedSales.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
