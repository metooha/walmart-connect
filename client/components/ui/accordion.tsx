import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "@/components/icons";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(className)}
    style={{
      borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
    }}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between transition-all [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      style={{
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        fontWeight: 'var(--ld-semantic-font-body-medium-weight-bold, 700)' as any,
        fontSize: 'var(--ld-semantic-font-body-medium-size, 1rem)',
        lineHeight: 'var(--ld-semantic-font-body-medium-lineheight, 1.5)',
        color: 'var(--ld-semantic-color-text, #2E2F32)',
        padding: 'var(--ld-primitive-scale-space-200, 1rem) 0',
      }}
      {...props}
    >
      {children}
      <ChevronDown
        className="shrink-0 transition-transform duration-200"
        style={{
          width: 'var(--ld-semantic-scale-icon-small, 1rem)',
          height: 'var(--ld-semantic-scale-icon-small, 1rem)',
          color: 'var(--ld-semantic-color-text-subtle, #74767C)',
        }}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(className)}
      style={{
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
        lineHeight: 'var(--ld-semantic-font-body-small-lineheight, 1.25rem)',
        color: 'var(--ld-semantic-color-text, #2E2F32)',
        paddingBottom: 'var(--ld-primitive-scale-space-200, 1rem)',
      }}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
