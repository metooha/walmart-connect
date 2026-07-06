import * as React from "react";
import { Modal, ModalContent, ModalTitle, ModalDescription, ModalClose } from "@/components/ui/Modal";
import { X } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Divider } from "@/components/ui/Divider";
import { Checkbox } from "@/components/ui/Checkbox";

interface BudgetCampaign {
  id: string;
  name: string;
  capOutTime: string;
  currentDailyBudget: string;
  estMissedSales: string;
  suggDailyBudget: string;
}

const CAMPAIGNS: BudgetCampaign[] = [
  { id: "1", name: "Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747", capOutTime: "2:00pm", currentDailyBudget: "$100", estMissedSales: "$10-12k", suggDailyBudget: "$200" },
  { id: "2", name: "Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747", capOutTime: "2:00pm", currentDailyBudget: "$100", estMissedSales: "$10-12k", suggDailyBudget: "$564" },
  { id: "3", name: "Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747", capOutTime: "2:00pm", currentDailyBudget: "$100", estMissedSales: "$10-12k", suggDailyBudget: "$180" },
  { id: "4", name: "Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747", capOutTime: "2:00pm", currentDailyBudget: "$100", estMissedSales: "$10-12k", suggDailyBudget: "$200" },
  { id: "5", name: "Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747", capOutTime: "2:00pm", currentDailyBudget: "$100", estMissedSales: "$10-12k", suggDailyBudget: "$200" },
  { id: "6", name: "Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747", capOutTime: "2:00pm", currentDailyBudget: "$100", estMissedSales: "$10-12k", suggDailyBudget: "$149" },
  { id: "7", name: "Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747", capOutTime: "2:00pm", currentDailyBudget: "$100", estMissedSales: "$10-12k", suggDailyBudget: "$180" },
  { id: "8", name: "Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747", capOutTime: "2:00pm", currentDailyBudget: "$100", estMissedSales: "$10-12k", suggDailyBudget: "$200" },
  { id: "9", name: "Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747", capOutTime: "2:00pm", currentDailyBudget: "$100", estMissedSales: "$10-12k", suggDailyBudget: "$200" },
];

const TOTAL = 24;
const PAGE_SIZE = 10;

interface DailyBudgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DailyBudgetModal({ open, onOpenChange }: DailyBudgetModalProps) {
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(TOTAL / PAGE_SIZE);

  const startItem = (page - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(page * PAGE_SIZE, TOTAL);

  const handleClose = () => onOpenChange(false);
  const handleDone = () => onOpenChange(false);
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());

  const allSelected = selectedRows.size === CAMPAIGNS.length;
  const someSelected = selectedRows.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(CAMPAIGNS.map(c => c.id)));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        size="large"
        maxWidth="1350px"
        hideClose={true}
        className="p-0 gap-0 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 flex-wrap">
                <ModalTitle className="text-xl font-bold text-[var(--ld-semantic-color-text)]">
                  Update your daily budget
                </ModalTitle>
                <span className="text-sm text-[var(--ld-semantic-color-text-subtle)]">
                  Updated Jun 28, 2024
                </span>
              </div>
              <ModalDescription className="text-sm text-[var(--ld-semantic-color-text)] leading-5 max-w-[700px]">
                The following campaigns have run out of daily budget. Applying our recommendations
                could help keep your ads running all day.{" "}
                <Link href="#" variant="default">
                  Learn more
                </Link>
              </ModalDescription>
            </div>
            <button
              onClick={handleClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded hover:bg-[var(--ld-semantic-color-action-fill-secondary-hovered)] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-[var(--ld-semantic-color-text)]" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto min-h-0">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-t border-b border-[var(--ld-semantic-color-separator)] bg-[var(--ld-semantic-color-surface)]">
                <th className="px-4 py-3 w-10">
                  <Checkbox
                    checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                    onCheckedChange={toggleAll}
                    aria-label="Select all campaigns"
                  />
                </th>
                <th className="text-left px-4 py-3 font-semibold text-[var(--ld-semantic-color-text)] whitespace-nowrap w-[45%]">
                  Campaign name
                </th>
                <th className="text-center px-4 py-3 font-semibold text-[var(--ld-semantic-color-text)] whitespace-nowrap">
                  Cap out time
                </th>
                <th className="text-center px-4 py-3 font-semibold text-[var(--ld-semantic-color-text)] whitespace-nowrap">
                  Current<br />daily budget
                </th>
                <th className="text-center px-4 py-3 font-semibold text-[var(--ld-semantic-color-text)] whitespace-nowrap border-l border-[var(--ld-semantic-color-separator)]">
                  Est. missed<br />sales
                </th>
                <th className="text-center px-4 py-3 font-semibold text-[var(--ld-semantic-color-text)] whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="p-1 rounded-full bg-[#FBD0CC] flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3.9C8.29823 3.9 8.54565 4.11759 8.59215 4.40268L8.6 4.5V9.6407C8.6 9.97207 8.33137 10.2407 8 10.2407C7.70177 10.2407 7.45435 10.0231 7.40785 9.73802L7.4 9.6407V4.5C7.4 4.16863 7.66863 3.9 8 3.9Z" fill="#EA1100"/>
                        <path d="M8 12.1016C8.33224 12.1016 8.60157 11.8322 8.60157 11.5C8.60157 11.1678 8.33224 10.8984 8 10.8984C7.66776 10.8984 7.39843 11.1678 7.39843 11.5C7.39843 11.8322 7.66776 12.1016 8 12.1016Z" fill="#EA1100"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8ZM2.2 8C2.2 4.79675 4.79675 2.2 8 2.2C11.2033 2.2 13.8 4.79675 13.8 8C13.8 11.2033 11.2033 13.8 8 13.8C4.79675 13.8 2.2 11.2033 2.2 8Z" fill="#EA1100"/>
                      </svg>
                    </div>
                    <span>Sugg. daily<br />budget</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map((campaign, index) => (
                <tr
                  key={campaign.id}
                  className="border-b border-[var(--ld-semantic-color-separator)] hover:bg-[var(--ld-semantic-color-action-fill-secondary-hovered)] transition-colors"
                >
                  <td className="px-4 py-4">
                    <Checkbox
                      checked={selectedRows.has(campaign.id)}
                      onCheckedChange={() => toggleRow(campaign.id)}
                      aria-label={`Select ${campaign.name}`}
                    />
                  </td>
                  <td className="px-4 py-4 text-[var(--ld-semantic-color-text)]">
                    <Link href="#" variant="default">
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-center text-[var(--ld-semantic-color-text)]">
                    {campaign.capOutTime}
                  </td>
                  <td className="px-4 py-4 text-center text-[var(--ld-semantic-color-text)]">
                    {campaign.currentDailyBudget}
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-[var(--ld-semantic-color-text-negative,#C00)] border-l border-[var(--ld-semantic-color-separator)]">
                    {campaign.estMissedSales}
                  </td>
                  <td className="px-4 py-4 text-center text-[var(--ld-semantic-color-text)]">
                    {campaign.suggDailyBudget}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 py-3 border-t border-[var(--ld-semantic-color-separator)] flex-shrink-0">
          <span className="text-sm text-[var(--ld-semantic-color-text)]">
            {startItem}-{endItem} of {TOTAL}
          </span>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--ld-semantic-color-action-fill-secondary-hovered)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--ld-semantic-color-action-fill-secondary-hovered)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Footer */}
        <Divider />
        <div className="px-6 py-4 flex items-center justify-end gap-3 flex-shrink-0">
          <Button variant="secondary" size="medium" onClick={handleDone}>
            Done
          </Button>
          <Button variant="primary" size="medium" onClick={handleClose}>
            Apply selected
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
