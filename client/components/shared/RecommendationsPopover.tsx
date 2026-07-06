import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger, PopoverArrow } from "@/components/ui/popover";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";

interface Alert {
  type: 'item-health-issues' | 'out-of-budget';
  message: string;
  targetColumn?: 'biddingStrategy' | 'totalBudget';
}

interface Recommendation {
  type: 'update-roas';
  message: string;
  suggestedValue: string;
  targetColumn?: 'biddingStrategy';
}

interface Campaign {
  id: string;
  name: string;
  alerts?: Alert[];
  recommendations?: Recommendation[];
}

interface RecommendationsPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignData: Campaign;
  onViewRecommendation: (type: string) => void;
  trigger?: React.ReactNode;
}

export default function RecommendationsPopover({
  open,
  onOpenChange,
  campaignData,
  onViewRecommendation,
  trigger
}: RecommendationsPopoverProps) {
  const alerts = campaignData.alerts || [];
  const recommendations = campaignData.recommendations || [];
  const allItems = [...alerts, ...recommendations];

  if (allItems.length === 0) return trigger || null;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {trigger && <PopoverTrigger asChild>{trigger}</PopoverTrigger>}
      <PopoverContent
        className="w-[447px] p-6 rounded border border-border shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-1px_4px_rgba(0,0,0,0.10)]"
        align="start"
        sideOffset={8}
      >
        <PopoverArrow
          className="fill-background"
          width={14}
          height={7}
        />

        {/* Header */}
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-[20px] font-bold text-foreground leading-7">
            Recommendations
          </h3>
          <p className="text-sm font-normal text-foreground leading-5">
            Click below or scroll to review and apply recommendations
          </p>
        </div>

        {/* Items List */}
        <div className="flex flex-col gap-4">
          {alerts.map((alert, idx) => (
            <React.Fragment key={`alert-${idx}`}>
              {idx > 0 && <Divider />}
              <div className="flex items-start gap-2">
                {/* Alert Icon */}
                <div
                  className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--ld-semantic-color-surface-negative-subtle, #F8D2D3)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.66634 3.24992C6.91487 3.24992 7.12105 3.43124 7.1598 3.66882L7.16634 3.74992V8.03383C7.16634 8.30998 6.94248 8.53383 6.66634 8.53383C6.41781 8.53383 6.21164 8.35251 6.17289 8.11494L6.16634 8.03383V3.74992C6.16634 3.47378 6.3902 3.24992 6.66634 3.24992Z"
                      fill="var(--ld-semantic-color-text-negative, #9B1419)"
                    />
                    <path
                      d="M6.66634 10.0846C6.94321 10.0846 7.16765 9.86012 7.16765 9.58325C7.16765 9.30639 6.94321 9.08194 6.66634 9.08194C6.38948 9.08194 6.16503 9.30639 6.16503 9.58325C6.16503 9.86012 6.38948 10.0846 6.66634 10.0846Z"
                      fill="var(--ld-semantic-color-text-negative, #9B1419)"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.4997 6.66658C12.4997 3.44492 9.888 0.833252 6.66634 0.833252C3.44468 0.833252 0.833008 3.44492 0.833008 6.66658C0.833008 9.88825 3.44468 12.4999 6.66634 12.4999C9.888 12.4999 12.4997 9.88825 12.4997 6.66658ZM1.83301 6.66658C1.83301 3.99721 3.99696 1.83325 6.66634 1.83325C9.33572 1.83325 11.4997 3.99721 11.4997 6.66658C11.4997 9.33596 9.33572 11.4999 6.66634 11.4999C3.99696 11.4999 1.83301 9.33596 1.83301 6.66658Z"
                      fill="var(--ld-semantic-color-text-negative, #9B1419)"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 flex items-start justify-between gap-1">
                  <div className="text-sm text-foreground leading-5">
                    <span className="font-extrabold">Alert: </span>
                    <span className="font-normal">{alert.message}</span>
                  </div>
                  <Button
                    variant="tertiary"
                    size="small"
                    onClick={() => onViewRecommendation(alert.type)}
                    UNSAFE_className="flex-shrink-0 p-0 h-auto min-h-0 text-sm leading-5"
                  >
                    View
                  </Button>
                </div>
              </div>
            </React.Fragment>
          ))}

          {recommendations.map((rec, idx) => (
            <React.Fragment key={`rec-${idx}`}>
              {(alerts.length > 0 || idx > 0) && <Divider />}
              <div className="flex items-start gap-2">
                {/* Recommendation Icon */}
                <div
                  className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#F5D5E9' }}
                >
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.79395 5.28247L6.71289 5.76782H10.9697L5.96582 11.5178L6.54102 8.05005L6.62109 7.56567H2.36328L7.36816 1.81372L6.79395 5.28247Z"
                      stroke="#661648"
                      strokeWidth="0.833333"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 flex items-start justify-between gap-1">
                  <div className="text-sm text-foreground leading-5">
                    <span className="font-extrabold">Recommendation: </span>
                    <span className="font-normal">{rec.message}</span>
                  </div>
                  <Button
                    variant="tertiary"
                    size="small"
                    onClick={() => onViewRecommendation(rec.type)}
                    UNSAFE_className="flex-shrink-0 p-0 h-auto min-h-0 text-sm leading-5"
                  >
                    View
                  </Button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
