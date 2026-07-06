import { useState } from "react";
import { MastHead } from "../components/ui/MastHead";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import { Button } from "../components/ui/Button";
import { Select, SelectItem } from "../components/ui/Select";
import { DataTable, DataTableHead, DataTableBody } from "../components/ui/DataTable";
import { DataTableRow } from "../components/ui/DataTableRow";
import { DataTableHeader } from "../components/ui/DataTableHeader";
import { Link } from "../components/ui/Link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "../components/ui/Modal";
import { Alert } from "../components/ui/Alert";

const REPORT_TYPES = [
  { value: "keyword-performance", label: "Keyword Performance" },
  { value: "placement-performance", label: "Placement Performance" },
  { value: "item-keyword-performance", label: "Item Keyword Performance" },
  { value: "item-performance", label: "Item Performance" },
  { value: "history-log", label: "History Log" },
  { value: "campaign-snapshot", label: "Campaign Snapshot" },
  { value: "item-recommendations", label: "Item Recommendations" },
  { value: "keyword-recommendations", label: "Keyword Recommendations" },
  { value: "sponsored-videos-campaigns-performance", label: "Sponsored Videos Campaigns performance" },
];

const ATTRIBUTION_WINDOWS = [
  { value: "1-day", label: "1 Day" },
  { value: "7-day", label: "7 Days" },
  { value: "14-day", label: "14 Days" },
  { value: "30-day", label: "30 Days" },
];

const GROUP_BY_OPTIONS = [
  { value: "cumulative", label: "Cumulative" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
];

const KEYWORD_ONLY_TYPES = new Set(["keyword-performance", "item-keyword-performance", "keyword-recommendations"]);

export default function OnDemandReports() {
  const [mediaSolutionsOpen, setMediaSolutionsOpen] = useState(false);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState("Sponsored Search");
  const [statusFilter, setStatusFilter] = useState("pending-generated");
  const [reportTypeFilter, setReportTypeFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  // Modal form state
  const [reportType, setReportType] = useState("keyword-performance");
  const [attributionWindow, setAttributionWindow] = useState("");
  const [groupBy, setGroupBy] = useState("cumulative");

  const showKeywordWarning = KEYWORD_ONLY_TYPES.has(reportType);

  // Default request period: last 7 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);
  const formatPeriodDate = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const requestPeriod = `${formatPeriodDate(startDate)} - ${formatPeriodDate(endDate)}`;

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const formattedTime = now
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .toLowerCase();

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
            <div className="flex items-start justify-between mb-1">
              <h1 className="text-2xl font-bold text-[var(--ld-semantic-color-text)]">
                On-demand Reports
              </h1>
              <Button variant="primary" size="medium" onClick={() => setModalOpen(true)}>
                Request Report
              </Button>
            </div>

            <p className="text-sm text-[var(--ld-semantic-color-text-subtle)] mb-5">
              Last updated at: {formattedDate} - {formattedTime}{" "}
              <Link href="#" onClick={(e) => e.preventDefault()}>
                Refresh
              </Link>
            </p>

            {/* Filters */}
            <div className="flex gap-3 items-end mb-4">
              <div style={{ minWidth: "200px" }}>
                <Select
                  label=""
                  size="small"
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                  placeholder="Status"
                >
                  <SelectItem value="pending-generated">Pending,Generated</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="generated">Generated</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </Select>
              </div>

              <div style={{ minWidth: "220px" }}>
                <Select
                  label=""
                  size="small"
                  value={reportTypeFilter}
                  onValueChange={setReportTypeFilter}
                  placeholder="Report type"
                >
                  <SelectItem value="all">All Report Types (23)</SelectItem>
                  <SelectItem value="campaign">Campaign</SelectItem>
                  <SelectItem value="keyword">Keyword</SelectItem>
                  <SelectItem value="item">Item</SelectItem>
                  <SelectItem value="placement">Placement</SelectItem>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-background rounded-lg border border-[var(--ld-semantic-color-separator)] overflow-x-auto">
              <DataTable>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeader width="220px">Report Name</DataTableHeader>
                    <DataTableHeader width="160px">Attribution Window</DataTableHeader>
                    <DataTableHeader width="140px">Group By</DataTableHeader>
                    <DataTableHeader width="160px">Report Start Date</DataTableHeader>
                    <DataTableHeader width="160px">Report End Date</DataTableHeader>
                    <DataTableHeader
                      width="160px"
                      sort="descending"
                      onSort={() => {}}
                    >
                      Requested On
                    </DataTableHeader>
                    <DataTableHeader width="140px">Report Expires</DataTableHeader>
                    <DataTableHeader width="100px">Status</DataTableHeader>
                    <DataTableHeader width="100px">Download</DataTableHeader>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                </DataTableBody>
              </DataTable>

              <div className="flex items-center justify-center py-10">
                <p className="text-sm text-[var(--ld-semantic-color-text-subtle)]">
                  There are no reports available for selected filters.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Request Report Modal */}
      <Modal open={modalOpen} onOpenChange={setModalOpen}>
        <ModalContent maxWidth="480px">
          <ModalHeader>
            <ModalTitle>Request Report</ModalTitle>
          </ModalHeader>

          <div className="flex flex-col gap-5 px-6 pb-6">
            {/* Report Type */}
            <div>
              <Select
                label="Report Type"
                value={reportType}
                onValueChange={setReportType}
                placeholder="Select..."
              >
                {REPORT_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </Select>

              {showKeywordWarning && (
                <div className="mt-2">
                  <Alert variant="warning">
                    Only for keyword bidding campaign.
                  </Alert>
                </div>
              )}
            </div>

            {/* Attribution Window */}
            <Select
              label="Attribution Window"
              value={attributionWindow}
              onValueChange={setAttributionWindow}
              placeholder="Select..."
            >
              {ATTRIBUTION_WINDOWS.map((w) => (
                <SelectItem key={w.value} value={w.value}>
                  {w.label}
                </SelectItem>
              ))}
            </Select>

            {/* Group By */}
            <Select
              label="Group By"
              value={groupBy}
              onValueChange={setGroupBy}
              placeholder="Select..."
            >
              {GROUP_BY_OPTIONS.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </Select>

            {/* Request Period */}
            <div>
              <p className="text-sm font-bold text-[var(--ld-semantic-color-text)] mb-2">
                Request Period
              </p>
              <div className="flex items-center gap-2 px-3 py-2 border border-[var(--ld-semantic-color-separator)] rounded text-sm text-[var(--ld-semantic-color-text)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 2H11V1H10V2H6V1H5V2H3.5C2.67 2 2 2.67 2 3.5V13.5C2 14.33 2.67 15 3.5 15H12.5C13.33 15 14 14.33 14 13.5V3.5C14 2.67 13.33 2 12.5 2ZM13 13.5C13 13.78 12.78 14 12.5 14H3.5C3.22 14 3 13.78 3 13.5V6H13V13.5ZM13 5H3V3.5C3 3.22 3.22 3 3.5 3H5V4H6V3H10V4H11V3H12.5C12.78 3 13 3.22 13 3.5V5Z" fill="currentColor"/>
                </svg>
                <span>{requestPeriod}</span>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <Button
                variant="primary"
                size="medium"
                onClick={() => setModalOpen(false)}
              >
                Request Report
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
