import React, { Fragment } from 'react';
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';
import { DataTableCellStatus } from '@/components/ui/DataTableCellStatus';
import { DataTableCellSelect, DataTableHeaderSelect } from '@/components/ui/DataTableCellSelect';
import { DataTableCellActions } from '@/components/ui/DataTableCellActions';
import { DataTableBulkActions } from '@/components/ui/DataTableBulkActions';
import { IconButton } from '@/components/ui/IconButton';
import { Button } from '@/components/ui/Button';
import { FilterChip } from '@/components/ui/FilterChip';
import { Tag } from '@/components/ui/Tag';
import {
  Search, X, ChevronDown, ChevronUp, ChevronRight, ChevronLeft,
  MoreHorizontal, Sliders, Download,
} from '@/components/icons';

/* ================================================================
   DATA
   ================================================================ */

interface Campaign {
  id: string;
  name: string;
  type: 'campaign' | 'adgroup' | 'creative';
  status: 'Live' | 'Scheduled' | 'Paused' | 'Completed';
  recommendations: number;
  totalBudget?: string;
  targetingStrategy?: string;
  impressions?: string;
  pacing?: { value: string; trend: 'positive' | 'warning' };
  children?: Campaign[];
}

const CAMPAIGNS: Campaign[] = [
  {
    id: '10001',
    name: 'Walmart|Display|Auction|Cross Device|Brand Awareness Campaign_FY27',
    type: 'campaign',
    status: 'Live',
    recommendations: 1,
    totalBudget: '$200,553.22',
    targetingStrategy: 'Contextual targeting',
    impressions: '1,223,112',
    pacing: { value: '113%', trend: 'positive' },
    children: [
      { id: 'ag-1', name: 'Young Adults 18-24', type: 'adgroup', status: 'Live', recommendations: 0 },
      { id: 'cr-1', name: 'Banner Ad - Homepage Hero', type: 'creative', status: 'Live', recommendations: 0 },
    ],
  },
  {
    id: '10002',
    name: 'H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_50839',
    type: 'campaign',
    status: 'Scheduled',
    recommendations: 2,
    totalBudget: '$213,443.33',
    targetingStrategy: 'Behavioral targeting',
    impressions: '3,200,332',
    pacing: { value: '123%', trend: 'warning' },
    children: [
      { id: 'ag-2', name: 'North Atlantic Region - Adults 25-44', type: 'adgroup', status: 'Scheduled', recommendations: 1 },
      { id: 'cr-2', name: 'Blackstone Griddle - Banner 728x90', type: 'creative', status: 'Scheduled', recommendations: 0 },
      { id: 'cr-3', name: 'Blackstone Griddle - Skyscraper 160x600', type: 'creative', status: 'Scheduled', recommendations: 0 },
    ],
  },
  {
    id: '10003',
    name: 'Spring Sale 2024 Campaign',
    type: 'campaign',
    status: 'Live',
    recommendations: 0,
    totalBudget: '$150,000.00',
    targetingStrategy: 'Contextual targeting',
    impressions: '2,500,000',
    pacing: { value: '105%', trend: 'positive' },
  },
  {
    id: '10004',
    name: 'Holiday Promotions Q4',
    type: 'campaign',
    status: 'Scheduled',
    recommendations: 3,
    totalBudget: '$300,000.00',
    targetingStrategy: 'Behavioral targeting',
    impressions: '5,000,000',
    pacing: { value: '98%', trend: 'positive' },
    children: [
      { id: 'ag-4', name: 'Holiday Gift Guide - Parents', type: 'adgroup', status: 'Scheduled', recommendations: 2 },
      { id: 'ag-5', name: 'Holiday Gift Guide - Kids', type: 'adgroup', status: 'Scheduled', recommendations: 0 },
      { id: 'cr-4', name: 'Holiday Hero Banner - 970x250', type: 'creative', status: 'Scheduled', recommendations: 1 },
    ],
  },
  {
    id: '10005',
    name: 'Campaign 100',
    type: 'campaign',
    status: 'Paused',
    recommendations: 0,
    totalBudget: '$9,009.24',
    targetingStrategy: 'Run of site',
    impressions: '2,334,221',
    pacing: { value: '102%', trend: 'positive' },
  },
  {
    id: '10006',
    name: 'Summer Electronics Flash Sale',
    type: 'campaign',
    status: 'Live',
    recommendations: 2,
    totalBudget: '$220,000.00',
    targetingStrategy: 'Contextual targeting',
    impressions: '4,200,000',
    pacing: { value: '108%', trend: 'positive' },
    children: [
      { id: 'ag-6', name: 'Electronics - TVs & Home Theater', type: 'adgroup', status: 'Live', recommendations: 1 },
      { id: 'ag-7', name: 'Electronics - Laptops & Tablets', type: 'adgroup', status: 'Live', recommendations: 0 },
      { id: 'cr-5', name: 'Flash Sale Hero - 970x250', type: 'creative', status: 'Live', recommendations: 0 },
    ],
  },
  {
    id: '10007',
    name: 'Fashion Week Exclusive Deals',
    type: 'campaign',
    status: 'Completed',
    recommendations: 0,
    totalBudget: '$50,000.00',
    targetingStrategy: 'Run of site',
    impressions: '900,000',
    pacing: { value: '85%', trend: 'warning' },
    children: [
      { id: 'ag-8', name: 'Fashion - Women Apparel', type: 'adgroup', status: 'Completed', recommendations: 0 },
      { id: 'cr-6', name: 'Fashion Week Banner - 300x250', type: 'creative', status: 'Completed', recommendations: 0 },
    ],
  },
  {
    id: '10008',
    name: 'Back to School 2024',
    type: 'campaign',
    status: 'Live',
    recommendations: 1,
    totalBudget: '$75,500.00',
    targetingStrategy: 'Run of site',
    impressions: '1,800,000',
    pacing: { value: '110%', trend: 'positive' },
    children: [
      { id: 'ag-9', name: 'School Supplies - K-12', type: 'adgroup', status: 'Live', recommendations: 0 },
      { id: 'cr-7', name: 'Back to School - Homepage Carousel', type: 'creative', status: 'Live', recommendations: 1 },
    ],
  },
];

const STATUS_TAG: Record<string, { color: 'positive' | 'negative' | 'warning' | 'info'; label: string }> = {
  Live: { color: 'positive', label: 'Live' },
  Scheduled: { color: 'info', label: 'Scheduled' },
  Paused: { color: 'warning', label: 'Paused' },
  Completed: { color: 'info', label: 'Completed' },
};

type SortField = 'name' | 'status' | 'totalBudget' | 'impressions' | 'pacing';
type SortDir = 'ascending' | 'descending' | 'none';

const RESULTS_PER_PAGE = 5;

/* ================================================================
   MAIN EXAMPLE
   ================================================================ */

export default function DataTableExample() {
  /* ── Search ── */
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchScope, setSearchScope] = React.useState<'Campaign name' | 'ID'>('Campaign name');
  const [showScopeDropdown, setShowScopeDropdown] = React.useState(false);

  /* ── Filters ── */
  const [statusFilters, setStatusFilters] = React.useState<Set<string>>(new Set());

  /* ── Sort ── */
  const [sortField, setSortField] = React.useState<SortField | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>('none');

  /* ── Selection ── */
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  /* ── Expand / collapse ── */
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());

  /* ── Pagination ── */
  const [currentPage, setCurrentPage] = React.useState(1);

  /* ────────────────────────────────────────────
     Derived data: filter → search → sort → paginate
     ──────────────────────────────────────────── */

  const filteredData = React.useMemo(() => {
    let data = CAMPAIGNS;

    // Status filter
    if (statusFilters.size > 0) {
      data = data.filter((c) => statusFilters.has(c.status));
    }

    // Search
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      data = data.filter((c) =>
        searchScope === 'Campaign name'
          ? c.name.toLowerCase().includes(q)
          : c.id.toLowerCase().includes(q),
      );
    }

    return data;
  }, [searchQuery, searchScope, statusFilters]);

  const sortedData = React.useMemo(() => {
    if (!sortField || sortDir === 'none') return filteredData;
    return [...filteredData].sort((a, b) => {
      const factor = sortDir === 'ascending' ? 1 : -1;
      switch (sortField) {
        case 'name':
          return a.name.localeCompare(b.name) * factor;
        case 'status':
          return a.status.localeCompare(b.status) * factor;
        case 'totalBudget': {
          const av = parseFloat((a.totalBudget ?? '0').replace(/[$,]/g, ''));
          const bv = parseFloat((b.totalBudget ?? '0').replace(/[$,]/g, ''));
          return (av - bv) * factor;
        }
        case 'impressions': {
          const av = parseFloat((a.impressions ?? '0').replace(/,/g, ''));
          const bv = parseFloat((b.impressions ?? '0').replace(/,/g, ''));
          return (av - bv) * factor;
        }
        case 'pacing': {
          const av = parseFloat((a.pacing?.value ?? '0').replace('%', ''));
          const bv = parseFloat((b.pacing?.value ?? '0').replace('%', ''));
          return (av - bv) * factor;
        }
        default:
          return 0;
      }
    });
  }, [filteredData, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / RESULTS_PER_PAGE));
  const paginatedData = sortedData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  );

  // Reset page when filters/search change
  React.useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilters]);

  /* ── Handlers ── */

  const handleSort = (field: SortField) => () => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'ascending' ? 'descending' : 'ascending'));
    } else {
      setSortField(field);
      setSortDir('ascending');
    }
  };

  const sortFor = (field: SortField): SortDir =>
    sortField === field ? sortDir : 'none';

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilters((prev) => {
      const next = new Set(prev);
      next.has(status) ? next.delete(status) : next.add(status);
      return next;
    });
  };

  const allPageIds = paginatedData.map((c) => c.id);
  const allSelected = allPageIds.length > 0 && allPageIds.every((id) => selectedIds.has(id));
  const someSelected = allPageIds.some((id) => selectedIds.has(id)) && !allSelected;

  const toggleAll = () => {
    if (allSelected || someSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        allPageIds.forEach((id) => next.delete(id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        allPageIds.forEach((id) => next.add(id));
        return next;
      });
    }
  };

  const styles = INLINE_STYLES;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {/* ── Bulk Actions Bar ── */}
      {selectedIds.size > 0 && (
        <DataTableBulkActions
          count={selectedIds.size}
          onSelectAll={() => setSelectedIds(new Set(sortedData.map((c) => c.id)))}
          onClearSelected={() => setSelectedIds(new Set())}
          actionContent={
            <Button variant="secondary" size="small">
              Archive Selected
            </Button>
          }
        />
      )}

      {/* ── Toolbar: Search + Filters + Actions ── */}
      <div style={styles.toolbar}>
        {/* Search */}
        <div style={styles.searchBar}>
          <Search style={{ width: 16, height: 16, flexShrink: 0, color: 'var(--ld-semantic-color-text, #2E2F32)' }} />
          <span style={styles.searchLabel}>Search by</span>
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              style={styles.scopeButton}
              onClick={() => setShowScopeDropdown((p) => !p)}
            >
              {searchScope}
              {showScopeDropdown
                ? <ChevronUp style={{ width: 16, height: 16 }} />
                : <ChevronDown style={{ width: 16, height: 16 }} />
              }
            </button>
            {showScopeDropdown && (
              <div style={styles.scopeDropdown}>
                {(['Campaign name', 'ID'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    style={styles.scopeOption}
                    onClick={() => { setSearchScope(s); setShowScopeDropdown(false); }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
            placeholder=""
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} style={styles.clearButton} aria-label="Clear search">
              <X style={{ width: 14, height: 14 }} />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          {(['Live', 'Scheduled', 'Paused', 'Completed'] as const).map((s) => (
            <FilterChip
              key={s}
              selected={statusFilters.has(s)}
              onSelectedChange={() => toggleStatusFilter(s)}
            >
              {s}
            </FilterChip>
          ))}
        </div>

        {/* Action icons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: 'auto' }}>
          <IconButton aria-label="Table settings" variant="secondary">
            <Sliders />
          </IconButton>
          <IconButton aria-label="Download" variant="secondary">
            <Download />
          </IconButton>
        </div>
      </div>

      {/* ── Table ── */}
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeaderSelect
              checked={allSelected}
              indeterminate={someSelected}
              onChange={toggleAll}
            />
            <DataTableHeader onSort={handleSort('name')} sort={sortFor('name')}>
              Campaign / Ad group / Creative
            </DataTableHeader>
            <DataTableHeader onSort={handleSort('status')} sort={sortFor('status')}>
              Status
            </DataTableHeader>
            <DataTableHeader>
              Recommendations
            </DataTableHeader>
            <DataTableHeader alignment="right" onSort={handleSort('totalBudget')} sort={sortFor('totalBudget')}>
              Total budget
            </DataTableHeader>
            <DataTableHeader>
              Targeting Strategy
            </DataTableHeader>
            <DataTableHeader alignment="right" onSort={handleSort('impressions')} sort={sortFor('impressions')}>
              Impressions
            </DataTableHeader>
            <DataTableHeader alignment="right" onSort={handleSort('pacing')} sort={sortFor('pacing')}>
              Pacing
            </DataTableHeader>
            <DataTableHeader alignment="right">
              Actions
            </DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {paginatedData.length === 0 && (
            <DataTableRow>
              <DataTableCell UNSAFE_style={{ textAlign: 'center', padding: '32px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} colSpan={9}>
                No campaigns match your search or filters.
              </DataTableCell>
            </DataTableRow>
          )}
          {paginatedData.map((campaign) => (
            <Fragment key={campaign.id}>
              {/* ── Parent row ── */}
              <DataTableRow selected={selectedIds.has(campaign.id)}>
                <DataTableCellSelect
                  a11yLabelledBy={`name-${campaign.id}`}
                  checked={selectedIds.has(campaign.id)}
                  onChange={() => toggleRow(campaign.id)}
                />
                <DataTableCell id={`name-${campaign.id}`}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                    {campaign.children && campaign.children.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => toggleExpand(campaign.id)}
                        style={styles.expandButton}
                        aria-label={expandedIds.has(campaign.id) ? 'Collapse' : 'Expand'}
                      >
                        {expandedIds.has(campaign.id)
                          ? <ChevronDown style={{ width: 20, height: 20 }} />
                          : <ChevronRight style={{ width: 20, height: 20 }} />
                        }
                      </button>
                    ) : (
                      <span style={{ width: '24px', flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <span style={styles.campaignLink}>{campaign.name}</span>
                      <div style={styles.campaignId}>ID: {campaign.id}</div>
                    </div>
                  </div>
                </DataTableCell>
                <DataTableCellStatus>
                  <Tag variant="tertiary" color={STATUS_TAG[campaign.status].color}>
                    {STATUS_TAG[campaign.status].label}
                  </Tag>
                </DataTableCellStatus>
                <DataTableCell>
                  {campaign.recommendations > 0 ? (
                    <span style={styles.recBadge}>
                      {campaign.recommendations} recommendation{campaign.recommendations !== 1 ? 's' : ''}
                    </span>
                  ) : (
                    '-'
                  )}
                </DataTableCell>
                <DataTableCell variant="numeric">{campaign.totalBudget ?? '-'}</DataTableCell>
                <DataTableCell>{campaign.targetingStrategy ?? '-'}</DataTableCell>
                <DataTableCell variant="numeric">{campaign.impressions ?? '-'}</DataTableCell>
                <DataTableCell variant="numeric">
                  {campaign.pacing ? (
                    <span style={{
                      fontWeight: 600,
                      color: campaign.pacing.trend === 'positive'
                        ? 'var(--ld-semantic-color-text-positive, #2A8703)'
                        : 'var(--ld-semantic-color-text-warning, #995213)',
                    }}>
                      {campaign.pacing.value}
                    </span>
                  ) : '-'}
                </DataTableCell>
                <DataTableCellActions>
                  <IconButton aria-label={`Actions for ${campaign.name}`} variant="ghost">
                    <MoreHorizontal />
                  </IconButton>
                </DataTableCellActions>
              </DataTableRow>

              {/* ── Child rows (expanded) ── */}
              {expandedIds.has(campaign.id) && campaign.children?.map((child) => (
                <DataTableRow key={child.id}>
                  <DataTableCell>{'\u00A0'}</DataTableCell>
                  <DataTableCell>
                    <div style={{ paddingLeft: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.5px',
                        color: 'var(--ld-semantic-color-text-subtle, #74767C)',
                        flexShrink: 0,
                      }}>
                        {child.type === 'adgroup' ? 'AG' : 'CR'}
                      </span>
                      <span style={styles.campaignLink}>{child.name}</span>
                    </div>
                  </DataTableCell>
                  <DataTableCellStatus>
                    <Tag variant="tertiary" color={STATUS_TAG[child.status].color}>
                      {STATUS_TAG[child.status].label}
                    </Tag>
                  </DataTableCellStatus>
                  <DataTableCell>
                    {child.recommendations > 0 ? (
                      <span style={styles.recBadge}>{child.recommendations}</span>
                    ) : '-'}
                  </DataTableCell>
                  <DataTableCell variant="numeric">-</DataTableCell>
                  <DataTableCell>-</DataTableCell>
                  <DataTableCell variant="numeric">-</DataTableCell>
                  <DataTableCell variant="numeric">-</DataTableCell>
                  <DataTableCellActions>
                    <IconButton aria-label={`Actions for ${child.name}`} variant="ghost">
                      <MoreHorizontal />
                    </IconButton>
                  </DataTableCellActions>
                </DataTableRow>
              ))}
            </Fragment>
          ))}
        </DataTableBody>
      </DataTable>

      {/* ── Pagination ── */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={sortedData.length}
        resultsPerPage={RESULTS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

/* ================================================================
   PAGINATION SUBCOMPONENT
   ================================================================ */

function Pagination({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  const styles = INLINE_STYLES;

  return (
    <div style={styles.paginationBar}>
      <span style={styles.paginationInfo}>
        Results per page: {resultsPerPage} &middot; {totalResults} total
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button
          type="button"
          style={styles.paginationButton}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
          aria-label="First page"
        >
          <ChevronLeft style={{ width: 16, height: 16 }} />
          <ChevronLeft style={{ width: 16, height: 16, marginLeft: -10 }} />
        </button>
        <button
          type="button"
          style={styles.paginationButton}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft style={{ width: 16, height: 16 }} />
        </button>

        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text, #2E2F32)', padding: '0 4px' }}>
          Page
        </span>
        <span style={styles.pageIndicator}>{currentPage}</span>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text, #2E2F32)', padding: '0 4px' }}>
          of {totalPages}
        </span>

        <button
          type="button"
          style={styles.paginationButton}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight style={{ width: 16, height: 16 }} />
        </button>
        <button
          type="button"
          style={styles.paginationButton}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(totalPages)}
          aria-label="Last page"
        >
          <ChevronRight style={{ width: 16, height: 16 }} />
          <ChevronRight style={{ width: 16, height: 16, marginLeft: -10 }} />
        </button>
      </div>
    </div>
  );
}

/* ================================================================
   INLINE STYLES (using LD tokens)
   ================================================================ */

const INLINE_STYLES = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
    background: 'var(--ld-semantic-color-surface-primary, #fff)',
    flexWrap: 'wrap' as const,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flex: '1 1 300px',
    minWidth: '260px',
    maxWidth: '460px',
    height: '32px',
    padding: '0 12px',
    border: '1px solid var(--ld-semantic-color-border-strong, #2E2F32)',
    borderRadius: '9999px',
    background: 'var(--ld-semantic-color-surface-primary, #fff)',
    fontSize: '14px',
  },
  searchLabel: {
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text-subtle, #74767C)',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  },
  scopeButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px 4px',
    borderRadius: '4px',
    whiteSpace: 'nowrap' as const,
  },
  scopeDropdown: {
    position: 'absolute' as const,
    left: 0,
    top: '100%',
    marginTop: '4px',
    width: '160px',
    background: 'var(--ld-semantic-color-surface-primary, #fff)',
    border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    zIndex: 50,
    padding: '4px 0',
  },
  scopeOption: {
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    padding: '8px 12px',
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  searchInput: {
    flex: 1,
    fontSize: '14px',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    minWidth: '40px',
  },
  clearButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    flexShrink: 0,
  },
  expandButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    flexShrink: 0,
    marginTop: '-2px',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
  },
  campaignLink: {
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
  },
  campaignId: {
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text-subtle, #74767C)',
    marginTop: '2px',
  },
  recBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    background: 'var(--ld-semantic-color-fill-negative-subtle, #FDE7F3)',
    color: '#8C1E64',
    cursor: 'pointer',
  },
  paginationBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderTop: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
    background: 'var(--ld-semantic-color-surface-primary, #fff)',
  },
  paginationInfo: {
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
  },
  paginationButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
  },
  pageIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '28px',
    height: '24px',
    border: '1px solid var(--ld-semantic-color-border-strong, #74767C)',
    borderRadius: '4px',
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    padding: '0 4px',
  },
} as const;
