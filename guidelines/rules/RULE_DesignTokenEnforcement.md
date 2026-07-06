# Design Token Enforcement Rule

## 🎯 Purpose

**MANDATORY**: All components, pages, and designs in this project MUST use Living Design 3.5 semantic tokens exclusively. Hard-coded colors, spacing, and typography values are **strictly prohibited**.

This rule ensures:
- ✅ Theme switching works correctly across all components
- ✅ Visual consistency across the application
- ✅ Easy maintenance and updates (change once, update everywhere)
- ✅ Accessibility compliance (proper contrast ratios maintained)
- ✅ Brand consistency across Walmart, Walmart Business, and future themes

---

## 🚨 Golden Rule

**NEVER hard-code visual properties. ALWAYS use semantic tokens.**

```tsx
// ❌ WRONG - Hard-coded values
<div style={{ 
  color: '#0053e2',
  backgroundColor: '#ffffff',
  padding: '16px',
  borderRadius: '8px',
  fontSize: '14px'
}}>

// ✅ CORRECT - Semantic tokens
<div style={{ 
  color: 'var(--ld-semantic-color-text-brand)',
  backgroundColor: 'var(--ld-semantic-color-surface)',
  padding: 'var(--ld-semantic-spacing-200)',
  borderRadius: 'var(--ld-semantic-border-radius-large)',
  fontSize: 'var(--ld-semantic-font-body-medium-size-b-s)'
}}>
```

---

## 📋 Token Usage by Category

### 1. Colors

**ALWAYS use semantic color tokens. NEVER use:**
- Hex codes (`#0053e2`, `#ffffff`)
- RGB values (`rgb(0, 83, 226)`)
- Color names (`blue`, `white`, `red`)
- Primitive tokens directly (use semantic instead)

#### Text Colors

```tsx
// ✅ CORRECT
color: 'var(--ld-semantic-color-text)'              // Primary text
color: 'var(--ld-semantic-color-text-brand)'        // Brand text
color: 'var(--ld-semantic-color-text-subtle)'       // Secondary text
color: 'var(--ld-semantic-color-text-link)'         // Links
color: 'var(--ld-semantic-color-text-negative)'     // Error text
color: 'var(--ld-semantic-color-text-positive)'     // Success text
color: 'var(--ld-semantic-color-text-disabled)'     // Disabled text

// ❌ WRONG
color: '#2e2f32'
color: '#0053e2'
color: 'black'
color: 'var(--ld-primitive-color-gray-160)'  // Don't use primitives directly
```

#### Background Colors

```tsx
// ✅ CORRECT
backgroundColor: 'var(--ld-semantic-color-surface)'           // Main surface
backgroundColor: 'var(--ld-semantic-color-background)'        // Page background
backgroundColor: 'var(--ld-semantic-color-background-subtle)' // Subtle background
backgroundColor: 'var(--ld-semantic-color-fill-info)'         // Info background
backgroundColor: 'var(--ld-semantic-color-fill-positive)'     // Success background
backgroundColor: 'var(--ld-semantic-color-fill-negative)'     // Error background

// ❌ WRONG
backgroundColor: '#ffffff'
backgroundColor: '#f8f8f8'
backgroundColor: 'white'
```

#### Border Colors

```tsx
// ✅ CORRECT
borderColor: 'var(--ld-semantic-color-border)'
borderColor: 'var(--ld-semantic-color-border-subtle)'
borderColor: 'var(--ld-semantic-color-border-brand)'
borderColor: 'var(--ld-semantic-color-border-activated)'

// ❌ WRONG
borderColor: '#e3e4e5'
borderColor: '#0053e2'
```

#### Button/Action Colors

**Use Button component instead of custom buttons:**

```tsx
// ✅ CORRECT - Use Button component
import { Button } from '@/components/ui/Button';
<Button variant="primary">Click Me</Button>
<Button variant="secondary">Cancel</Button>

// ❌ WRONG - Custom button with hard-coded colors
<button style={{ backgroundColor: '#0053e2', color: '#ffffff' }}>Click Me</button>

// ⚠️ ACCEPTABLE - If you must create custom interactive element
<div style={{
  backgroundColor: 'var(--ld-semantic-color-action-fill-primary)',
  color: 'var(--ld-semantic-color-action-text-on-fill-primary)'
}}>
```

---

### 2. Spacing

**ALWAYS use semantic spacing tokens. NEVER hard-code px/rem values.**

```tsx
// ✅ CORRECT
padding: 'var(--ld-semantic-spacing-200)'           // 16px
margin: 'var(--ld-semantic-spacing-300)'            // 24px
gap: 'var(--ld-semantic-spacing-150)'               // 12px
paddingTop: 'var(--ld-semantic-spacing-400)'        // 32px

// Component-specific spacing
padding: 'var(--ld-semantic-spacing-component-padding-medium)'
gap: 'var(--ld-semantic-spacing-component-gap-large)'

// ❌ WRONG
padding: '16px'
margin: '24px'
gap: '12px'
padding: '1rem'
```

#### Spacing Scale Reference

| Token | Value | Use Case |
|-------|-------|----------|
| `--ld-semantic-spacing-50` | 4px | Tight spacing |
| `--ld-semantic-spacing-100` | 8px | Small spacing |
| `--ld-semantic-spacing-150` | 12px | Default gap |
| `--ld-semantic-spacing-200` | 16px | Standard padding |
| `--ld-semantic-spacing-300` | 24px | Section spacing |
| `--ld-semantic-spacing-400` | 32px | Large section spacing |
| `--ld-semantic-spacing-600` | 48px | Page section spacing |

---

### 3. Typography

**ALWAYS use semantic font tokens.**

```tsx
// ✅ CORRECT
fontFamily: 'var(--ld-semantic-font-family-sans)'
fontSize: 'var(--ld-semantic-font-body-medium-size-b-s)'
fontWeight: '700'  // Numeric values are OK
lineHeight: 'var(--ld-semantic-font-body-medium-line-height-b-s)'

// ❌ WRONG
fontFamily: 'Arial, sans-serif'
fontFamily: 'Everyday Sans UI'  // Use token instead
fontSize: '14px'
fontSize: '1rem'
```

#### Typography Tokens Reference

```tsx
// Body text
fontSize: 'var(--ld-semantic-font-body-small-size-b-s)'   // 12px
fontSize: 'var(--ld-semantic-font-body-medium-size-b-s)'  // 14px
fontSize: 'var(--ld-semantic-font-body-large-size-b-s)'   // 16px

// Headings
fontSize: 'var(--ld-semantic-font-heading-small-size-b-s)'   // 18px
fontSize: 'var(--ld-semantic-font-heading-medium-size-b-s)'  // 20px
fontSize: 'var(--ld-semantic-font-heading-large-size-b-s)'   // 24px

// Line heights
lineHeight: 'var(--ld-semantic-font-body-medium-line-height-b-s)'
lineHeight: 'var(--ld-semantic-font-heading-large-line-height-b-s)'

// Font family
fontFamily: 'var(--ld-semantic-font-family-sans)'  // Everyday Sans UI
fontFamily: 'var(--ld-semantic-font-family-mono)'  // Everyday Sans Mono
```

---

### 4. Border Radius

```tsx
// ✅ CORRECT
borderRadius: 'var(--ld-semantic-border-radius-small)'    // 2px
borderRadius: 'var(--ld-semantic-border-radius-medium)'   // 4px
borderRadius: 'var(--ld-semantic-border-radius-large)'    // 8px
borderRadius: 'var(--ld-semantic-border-radius-button)'   // Full round (pill)
borderRadius: 'var(--ld-semantic-border-radius-card)'     // 8px

// ❌ WRONG
borderRadius: '4px'
borderRadius: '8px'
borderRadius: '9999px'
borderRadius: '0.5rem'
```

---

### 5. Shadows & Elevation

```tsx
// ✅ CORRECT
boxShadow: 'var(--ld-semantic-elevation-100)'  // Subtle shadow
boxShadow: 'var(--ld-semantic-elevation-200)'  // Medium shadow
boxShadow: 'var(--ld-semantic-elevation-300)'  // Strong shadow

// ❌ WRONG
boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
```

---

### 6. Opacity

```tsx
// ✅ CORRECT
opacity: 'var(--ld-semantic-opacity-disabled)'     // 0.4
opacity: 'var(--ld-semantic-opacity-hover-overlay)' // 0.08
opacity: 'var(--ld-semantic-opacity-backdrop)'     // 0.4

// ⚠️ ACCEPTABLE - Numeric opacity values are OK for specific cases
opacity: 0.5
opacity: 1

// ❌ WRONG for common states
opacity: 0.4  // Use var(--ld-semantic-opacity-disabled) instead
```

---

## 🎨 Using Existing Components

**ALWAYS prefer existing LD 3.5 components over creating custom elements.**

### Button

```tsx
// ✅ CORRECT - Use Button component
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="medium">Save</Button>
<Button variant="secondary" size="medium">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button variant="tertiary" fullWidth>Full Width</Button>

// ❌ WRONG - Custom button
<button className="bg-blue-500 px-4 py-2 rounded-full">Save</button>
<div style={{ backgroundColor: '#0053e2', padding: '12px 24px' }}>Save</div>
```

### ButtonGroup

```tsx
// ✅ CORRECT
import { ButtonGroup } from '@/components/ui/ButtonGroup';

<ButtonGroup>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save</Button>
</ButtonGroup>

// ❌ WRONG
<div style={{ display: 'flex', gap: '12px' }}>
  <button>Cancel</button>
  <button>Save</button>
</div>
```

### Tag / Badge

```tsx
// ✅ CORRECT
import { Tag } from '@/components/ui/tag';
import { OLQTag } from '@/components/ui/olq-tag';

<Tag variant="success">Active</Tag>
<OLQTag value="85%" size="md" />

// ❌ WRONG
<span style={{ 
  backgroundColor: '#eaf3e6', 
  color: '#2a8703',
  padding: '4px 8px',
  borderRadius: '4px'
}}>
  Active
</span>
```

---

## 🔍 Code Review Checklist

Before submitting code, verify:

### ✅ DO:
- [ ] All colors use `var(--ld-semantic-color-*)`
- [ ] All spacing uses `var(--ld-semantic-spacing-*)`
- [ ] All typography uses `var(--ld-semantic-font-*)`
- [ ] All border radius uses `var(--ld-semantic-border-radius-*)`
- [ ] Existing LD 3.5 components used where possible
- [ ] Theme switching tested and works correctly
- [ ] No hard-coded hex codes, RGB values, or color names

### ❌ DON'T:
- [ ] No hard-coded colors (`#0053e2`, `rgb(...)`, `blue`)
- [ ] No hard-coded spacing (`16px`, `1rem`)
- [ ] No hard-coded font sizes (`14px`, `1rem`)
- [ ] No primitive tokens used directly (`--ld-primitive-color-blue-100`)
- [ ] No custom buttons when Button component exists
- [ ] No custom tags when Tag component exists

---

## 🛠️ Migration Guide for Existing Code

If you find code with hard-coded values, migrate it:

### Example 1: Hard-coded Button

**Before:**
```tsx
<button style={{
  backgroundColor: '#0053e2',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '9999px',
  fontSize: '14px',
  fontWeight: 700,
  border: 'none'
}}>
  Click Me
</button>
```

**After:**
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="medium">
  Click Me
</Button>
```

### Example 2: Hard-coded Card

**Before:**
```tsx
<div style={{
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  marginBottom: '24px'
}}>
  <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#2e2f32' }}>
    Title
  </h2>
  <p style={{ fontSize: '14px', color: '#74767c' }}>
    Description
  </p>
</div>
```

**After:**
```tsx
<div style={{
  backgroundColor: 'var(--ld-semantic-color-surface)',
  padding: 'var(--ld-semantic-spacing-400)',
  borderRadius: 'var(--ld-semantic-border-radius-card)',
  boxShadow: 'var(--ld-semantic-elevation-100)',
  marginBottom: 'var(--ld-semantic-spacing-300)'
}}>
  <h2 style={{
    fontSize: 'var(--ld-semantic-font-heading-large-size-b-s)',
    fontWeight: 700,
    color: 'var(--ld-semantic-color-text)',
    fontFamily: 'var(--ld-semantic-font-family-sans)'
  }}>
    Title
  </h2>
  <p style={{
    fontSize: 'var(--ld-semantic-font-body-medium-size-b-s)',
    color: 'var(--ld-semantic-color-text-subtle)',
    fontFamily: 'var(--ld-semantic-font-family-sans)'
  }}>
    Description
  </p>
</div>
```

### Example 3: Hard-coded Status Badge

**Before:**
```tsx
<span style={{
  backgroundColor: '#eaf3e6',
  color: '#2a8703',
  padding: '4px 12px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 600
}}>
  Active
</span>
```

**After:**
```tsx
import { Tag } from '@/components/ui/tag';

<Tag variant="success" size="sm">Active</Tag>
```

---

## 📚 Token Reference Quick Guide

### Common Color Tokens

```css
/* Text */
--ld-semantic-color-text                    /* Primary text */
--ld-semantic-color-text-brand              /* Brand blue */
--ld-semantic-color-text-subtle             /* Secondary text */
--ld-semantic-color-text-link               /* Link text */
--ld-semantic-color-text-negative           /* Error text */
--ld-semantic-color-text-positive           /* Success text */

/* Backgrounds */
--ld-semantic-color-surface                 /* White surface */
--ld-semantic-color-background              /* Page background */
--ld-semantic-color-background-subtle       /* Subtle gray bg */

/* Borders */
--ld-semantic-color-border                  /* Standard border */
--ld-semantic-color-border-subtle           /* Light border */
--ld-semantic-color-border-brand            /* Brand border */

/* Actions (Buttons) */
--ld-semantic-color-action-fill-primary                /* Primary button bg */
--ld-semantic-color-action-fill-primary-hovered        /* Hover state */
--ld-semantic-color-action-fill-secondary              /* Secondary button bg */
--ld-semantic-color-action-text-on-fill-primary        /* Text on primary button */
--ld-semantic-color-action-focus-outline               /* Focus ring */

/* Status/Fills */
--ld-semantic-color-fill-info               /* Info background */
--ld-semantic-color-fill-positive           /* Success background */
--ld-semantic-color-fill-negative           /* Error background */
--ld-semantic-color-fill-warning            /* Warning background */
```

### Common Spacing Tokens

```css
--ld-semantic-spacing-50      /* 4px   - Tight */
--ld-semantic-spacing-100     /* 8px   - Small */
--ld-semantic-spacing-150     /* 12px  - Default gap */
--ld-semantic-spacing-200     /* 16px  - Standard padding */
--ld-semantic-spacing-300     /* 24px  - Section spacing */
--ld-semantic-spacing-400     /* 32px  - Large section */
--ld-semantic-spacing-600     /* 48px  - Page section */
```

---

## 🎯 Why This Matters

### Theme Switching

When users switch from "Walmart" to "Walmart Business" theme:
- ✅ **Tokenized code**: All colors update automatically
- ❌ **Hard-coded colors**: Buttons stay blue, breaking the theme

**Example:**

```tsx
// ✅ Updates automatically when theme switches
<Button variant="primary">Save</Button>
// Walmart theme: #0053e2 (standard blue)
// B2B theme: #002e99 (darker navy)

// ❌ Always stays #0053e2, breaking B2B theme
<button style={{ backgroundColor: '#0053e2' }}>Save</button>
```

### Brand Consistency

Tokens ensure:
- All primary buttons use the same blue
- All headings use the same font size/weight
- All spacing is consistent
- Easy global updates (change token once, updates everywhere)

### Accessibility

Semantic tokens maintain:
- Proper contrast ratios in all themes
- Consistent focus indicators
- Readable text on all backgrounds
- WCAG AA compliance

---

## 🚫 Common Violations & Fixes

### Violation 1: Hard-coded Brand Color

```tsx
// ❌ WRONG
<h1 style={{ color: '#0053e2' }}>Walmart Connect</h1>

// ✅ CORRECT
<h1 style={{ color: 'var(--ld-semantic-color-text-brand)' }}>Walmart Connect</h1>
```

### Violation 2: Inline Padding

```tsx
// ❌ WRONG
<div style={{ padding: '16px' }}>Content</div>

// ✅ CORRECT
<div style={{ padding: 'var(--ld-semantic-spacing-200)' }}>Content</div>
```

### Violation 3: Custom Button

```tsx
// ❌ WRONG
<div 
  onClick={handleClick}
  style={{ 
    backgroundColor: '#0053e2',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '9999px',
    cursor: 'pointer'
  }}
>
  Click Me
</div>

// ✅ CORRECT
import { Button } from '@/components/ui/Button';
<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>
```

### Violation 4: Font Size

```tsx
// ❌ WRONG
<p style={{ fontSize: '14px' }}>Text</p>

// ✅ CORRECT
<p style={{ fontSize: 'var(--ld-semantic-font-body-medium-size-b-s)' }}>Text</p>
```

---

## 📖 Additional Resources

- **Token Reference**: See `client/styles/themes/base/semantic.css` for all available tokens
- **Primitive Tokens**: See `client/styles/themes/base/primitive.css` (use semantic instead)
- **Component Library**: Visit `/component-library` to see all components and tokens in action
- **Theme Switching Guide**: See `guidelines/RULE_ThemeSwitcher.md`
- **Component Inventory**: See custom rules in codebase for available LD 3.5 components

---

## 🎓 Summary

**Three Rules to Remember:**

1. **NEVER hard-code colors** - Always use `var(--ld-semantic-color-*)`
2. **ALWAYS use existing components** - Button, Tag, ButtonGroup, etc.
3. **TEST theme switching** - Verify your code works in all themes

By following this rule, you ensure:
- ✅ Theme switching works perfectly
- ✅ Visual consistency across the app
- ✅ Easy maintenance and updates
- ✅ Accessibility compliance
- ✅ Brand consistency

**Remember: If you're typing a hex code, you're doing it wrong!** 🎨
