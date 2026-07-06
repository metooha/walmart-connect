import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

interface Metric {
  id: string;
  label: string;
  category: 'all' | 'performance' | 'conversion';
}

const ALL_METRICS: Metric[] = [
  { id: 'impressions', label: 'Impressions', category: 'performance' },
  { id: 'clicks', label: 'Clicks', category: 'performance' },
  { id: 'units_sold', label: 'Units Sold', category: 'conversion' },
  { id: 'orders', label: 'Orders', category: 'conversion' },
  { id: 'average_cpc', label: 'Average CPC', category: 'performance' },
  { id: 'ctr', label: 'CTR', category: 'performance' },
  { id: 'total_pdp_views', label: 'Total Product Detail Page Views', category: 'performance' },
  { id: 'advertised_pdp_views', label: 'Advertised Product Detail Page Views', category: 'performance' },
  { id: 'other_pdp_views', label: 'Other Product Detail Page Views', category: 'performance' },
  { id: 'roas', label: 'ROAS', category: 'conversion' },
  { id: 'online_roas', label: 'Online ROAS', category: 'conversion' },
];

const DEFAULT_SELECTED_METRICS = ['impressions', 'clicks', 'average_cpc', 'ctr', 'total_pdp_views'];

interface EditMetricsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditMetricsModal({ open, onOpenChange }: EditMetricsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'performance' | 'conversion'>('all');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(DEFAULT_SELECTED_METRICS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMetrics = ALL_METRICS.filter(metric => {
    const matchesCategory = selectedCategory === 'all' || metric.category === selectedCategory;
    const matchesSearch = metric.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleSelectAll = () => {
    setSelectedMetrics(ALL_METRICS.map(m => m.id));
  };

  const handleReset = () => {
    setSelectedMetrics(DEFAULT_SELECTED_METRICS);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleCancel = () => {
    setSelectedMetrics(DEFAULT_SELECTED_METRICS);
    setSearchQuery('');
    onOpenChange(false);
  };

  const handleApply = () => {
    // TODO: Apply the selected metrics
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[752px] p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-[32px] font-bold text-foreground leading-10">
            Edit metrics
          </DialogTitle>
        </DialogHeader>

        {/* Main Content */}
        <div className="flex h-[500px]">
          {/* Left Sidebar */}
          <div className="w-[232px] border-r border-border bg-background">
            <nav className="flex flex-col">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex items-center justify-between px-6 py-3 text-left transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[var(--ld-semantic-color-fill-subtle,#F1F1F2)] font-bold'
                    : 'hover:bg-[var(--ld-semantic-color-fill-subtle,#F1F1F2)]'
                }`}
                style={{ color: 'var(--ld-semantic-color-text, #2E2F32)' }}
              >
                <span className="text-base leading-6">All</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => setSelectedCategory('performance')}
                className={`flex items-center justify-between px-6 py-3 text-left transition-colors ${
                  selectedCategory === 'performance'
                    ? 'bg-[var(--ld-semantic-color-fill-subtle,#F1F1F2)] font-bold'
                    : 'hover:bg-[var(--ld-semantic-color-fill-subtle,#F1F1F2)]'
                }`}
                style={{ color: 'var(--ld-semantic-color-text, #2E2F32)' }}
              >
                <span className="text-base leading-6">Performance</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => setSelectedCategory('conversion')}
                className={`flex items-center justify-between px-6 py-3 text-left transition-colors ${
                  selectedCategory === 'conversion'
                    ? 'bg-[var(--ld-semantic-color-fill-subtle,#F1F1F2)] font-bold'
                    : 'hover:bg-[var(--ld-semantic-color-fill-subtle,#F1F1F2)]'
                }`}
                style={{ color: 'var(--ld-semantic-color-text, #2E2F32)' }}
              >
                <span className="text-base leading-6">Conversion</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </nav>
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex flex-col bg-background">
            {/* Header with Select All */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-xl font-bold text-foreground leading-7">All Metrics</h3>
              <button
                onClick={handleSelectAll}
               
                className="text-sm font-bold leading-5 underline hover:no-underline"
              >
                Select all
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-4">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M14 14L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Metrics"
                  className="w-full h-10 pl-10 pr-3 rounded-lg border border-[var(--ld-semantic-color-border-strong,#909196)] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Metrics List */}
            <div className="flex-1 overflow-y-auto px-6">
              <div className="flex flex-col gap-3 pb-4">
                {filteredMetrics.map(metric => (
                  <Checkbox
                    key={metric.id}
                    label={metric.label}
                    checked={selectedMetrics.includes(metric.id)}
                    onCheckedChange={() => toggleMetric(metric.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-background">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-muted-foreground leading-5 hover:text-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C6.02411 14 4.29203 12.9762 3.28516 11.4141"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M2 11V7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Reset to default view
          </button>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="medium"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="medium"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
