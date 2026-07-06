import React, { useState } from "react";
import { ChevronDown, Check } from "@/components/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Menu } from "@/components/ui/Menu";
import { MenuItem } from "@/components/ui/MenuItem";

interface AttributionFilterDropdownProps {
  value?: string;
  onApply: (value: string) => void;
}

export default function AttributionFilterDropdown({
  value: initialValue = "14 days attribution",
  onApply,
}: AttributionFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState(initialValue);
  const [committedValue, setCommittedValue] = useState(initialValue);

  const options = [
    "7 days attribution",
    "14 days attribution",
    "30 days attribution",
    "60 days attribution",
    "90 days attribution",
  ];

  const handleApply = () => {
    setCommittedValue(tempValue);
    onApply(tempValue);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempValue(committedValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="small" UNSAFE_className="gap-2">
          <span className="text-sm">{committedValue}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        {/* LD 3.5 Menu with MenuItems and footer buttons */}
        <Menu
          isOpen={true}
          onClose={() => setOpen(false)}
          footer={
            <ButtonGroup>
              <Button
                variant="secondary"
                size="small"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={handleApply}
              >
                Apply
              </Button>
            </ButtonGroup>
          }
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={tempValue === option}
              onClick={() => setTempValue(option)}
              leadingIcon={
                tempValue === option ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="w-4 h-4" />
                )
              }
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </PopoverContent>
    </Popover>
  );
}
