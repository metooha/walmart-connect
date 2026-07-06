import * as React from "react";
import { Modal, ModalContent, ModalTitle, ModalDescription, ModalClose } from "@/components/ui/Modal";
import { Check, X } from "@/components/icons";
import { Divider } from "@/components/ui/Divider";
import { RadioGroup } from "@/components/ui/radio-group";
import { Radio } from "@/components/ui/Radio";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";

interface Campaign {
  id: string;
  name: string;
  biddingStrategy: string;
  biddingTarget: string;
}

interface BiddingStrategyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignData: Campaign;
  recommendedValue?: string;
  onSave: (newValue: string) => void;
}

export default function BiddingStrategyModal({
  open,
  onOpenChange,
  campaignData,
  recommendedValue,
  onSave,
}: BiddingStrategyModalProps) {
  const [selectedStrategy, setSelectedStrategy] = React.useState("target-roas");
  const [roasValue, setRoasValue] = React.useState("");
  const [recApplied, setRecApplied] = React.useState(false);

  // Extract current ROAS value from biddingTarget like "(set at 4.10)"
  const extractRoasValue = (target: string): string => {
    const match = target.match(/\(set at ([\d.]+)\)/);
    return match ? match[1] : "4.10";
  };

  // Initialize values when modal opens
  React.useEffect(() => {
    if (open) {
      const currentValue = extractRoasValue(campaignData.biddingTarget);
      setRoasValue(currentValue);
      setRecApplied(false);
      setSelectedStrategy("target-roas");
    }
  }, [open, campaignData.biddingTarget]);

  const handleApplyRecommendation = () => {
    if (recommendedValue) {
      setRoasValue(recommendedValue);
      setRecApplied(true);
    }
  };

  const handleReset = () => {
    const currentValue = extractRoasValue(campaignData.biddingTarget);
    setRoasValue(currentValue);
    setRecApplied(false);
  };

  const handleSave = () => {
    onSave(roasValue);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const betaBadge = (
    <span className="px-2 py-1 text-xs leading-4 text-[var(--ld-semantic-color-text-caution,#AF2F00)] border border-[var(--ld-semantic-color-text-caution,#AF2F00)] rounded-sm bg-background">
      Beta
    </span>
  );

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        size="medium"
        maxWidth="640px"
        hideClose={true}
        className="p-0 gap-0"
      >
        {/* Header */}
        <div className="px-4 pt-6 pb-0">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <ModalTitle className="text-[20px] font-bold text-foreground leading-7">
                Bidding strategy
              </ModalTitle>
              <ModalClose className="rounded-sm opacity-70 hover:opacity-100 transition-opacity absolute right-4 top-6 w-auto h-auto">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </ModalClose>
            </div>
            <ModalDescription className="text-sm text-foreground leading-5">
              Choose the strategy that best suits your business goals.{" "}
              <span className="underline cursor-pointer hover:no-underline">
                Learn more
              </span>
            </ModalDescription>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 flex flex-col gap-6">
          <RadioGroup
            value={selectedStrategy}
            onValueChange={setSelectedStrategy}
            className="flex flex-col gap-6"
          >
            {/* Dynamic bidding */}
            <div className="flex items-center gap-1">
              <Radio
                value="dynamic"
                label={
                  <span className="flex items-center gap-1.5">
                    Dynamic bidding
                    {betaBadge}
                  </span>
                }
              />
            </div>

            {/* Target ROAS */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Radio
                  value="target-roas"
                  label={
                    <span className="flex items-center gap-1.5">
                      Target ROAS
                      {betaBadge}
                    </span>
                  }
                />
              </div>

              {/* ROAS Input Section — only shown when target-roas selected */}
              {selectedStrategy === "target-roas" && (
                <div className="ml-8 flex flex-col gap-3 mt-2">
                  <TextField
                    label="ROAS target"
                    value={roasValue}
                    onChange={(e) => setRoasValue(e.target.value)}
                    size="small"
                    helperText="Example: Enter 3.00 to target a $3 return for every $1 you spend"
                  />

                  {/* Recommendation Banner */}
                  {recommendedValue && !recApplied && (
                    <div className="flex items-start gap-2 p-4 rounded-lg bg-[#FCF4F9]">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F5D5E9] flex-shrink-0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z"
                            stroke="#661648"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <p className="text-xs text-foreground leading-4">
                          <span className="font-bold">Recommendation:</span> Set your ROAS
                          target to {recommendedValue} and your daily budget to $250 to{" "}
                          <span className="font-bold">
                            potentially increase your sales up to $12k-15k/week.
                          </span>{" "}
                          <span className="underline cursor-pointer hover:no-underline">
                            Learn more
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground leading-4">Updated 07/28/2024</p>
                      </div>
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={handleApplyRecommendation}
                      >
                        Apply
                      </Button>
                    </div>
                  )}

                  {/* Success State */}
                  {recApplied && (
                    <div className="flex items-center gap-1 flex-wrap">
                      <Check className="w-4 h-4 text-[var(--ld-semantic-color-text-positive,#1D5F02)]" strokeWidth={2.5} />
                      <span className="text-xs text-[var(--ld-semantic-color-text-positive,#1D5F02)] leading-4">
                        Recommended ROAS target and budget applied —
                      </span>
                      <Button
                        variant="tertiary"
                        size="small"
                        onClick={handleReset}
                        UNSAFE_className="text-xs underline p-0 h-auto min-h-0 leading-4"
                      >
                        Reset
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Fixed bidding */}
            <Radio
              value="fixed"
              label="Fixed bidding"
            />
          </RadioGroup>
        </div>

        {/* Divider */}
        <Divider UNSAFE_className="mx-4" />

        {/* Footer */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-end gap-4">
            <Button variant="tertiary" size="small" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" size="small" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
