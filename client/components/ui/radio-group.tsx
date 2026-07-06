import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

/**
 * LD 3.5 RadioGroup container.
 *
 * Uses Radix RadioGroupPrimitive.Root which provides:
 *  - Arrow key navigation between radios
 *  - Roving tabindex focus management
 *  - Proper ARIA roles (role="radiogroup")
 *
 * Use together with the `<Radio>` component from `@/components/ui/Radio`.
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-[var(--ld-primitive-scale-space-150,12px)]', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export { RadioGroup };

// Re-export the LD 3.5 Radio item component for convenience
export { Radio } from './Radio';
export type { RadioProps } from './Radio';
