# Panel Component Guidelines

## Animation Rule (CRITICAL)

**RULE**: All Panel/drawer components MUST animate using LD semantic animation tokens. NEVER use hard-coded duration or easing values.

### Required Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ld-semantic-duration-panel-open` | `0.30s` | Panel slide-in duration |
| `--ld-semantic-duration-panel-close` | `0.20s` | Panel slide-out duration |
| `--ld-semantic-timing-panel` | `cubic-bezier(0.165, 0.84, 0.44, 1)` | Panel easing (ease-out) |
| `--ld-semantic-duration-scrim-open` | `0.30s` | Scrim fade-in duration |
| `--ld-semantic-duration-scrim-close` | `0.20s` | Scrim fade-out duration |
| `--ld-semantic-timing-scrim` | `cubic-bezier(0.77, 0, 0.175, 1)` | Scrim easing (ease-in-out) |

### Animation Behavior

- **Open**: Panel slides from right-to-left (position: right) using `translateX(100%)` to `translateX(0)` with `--ld-semantic-duration-panel-open` and `--ld-semantic-timing-panel`
- **Close**: Panel slides left-to-right back off-screen using `--ld-semantic-duration-panel-close` (faster than open for snappy feel)
- **Scrim**: Fades in/out in sync with panel using its own duration tokens
- **Reduced motion**: Respect `prefers-reduced-motion` media query — disable transitions when the user prefers reduced motion

### Correct Usage

```css
/* CORRECT - Uses animation tokens */
.panel {
  transition: transform var(--ld-semantic-duration-panel-open, 0.30s) var(--ld-semantic-timing-panel, cubic-bezier(0.165, 0.84, 0.44, 1));
}

.panel--closing {
  transition: transform var(--ld-semantic-duration-panel-close, 0.20s) var(--ld-semantic-timing-panel, cubic-bezier(0.165, 0.84, 0.44, 1));
}

.scrim {
  transition: opacity var(--ld-semantic-duration-scrim-open, 0.30s) var(--ld-semantic-timing-scrim, cubic-bezier(0.77, 0, 0.175, 1));
}
```

### Violation Examples (NEVER DO THIS)

```css
/* WRONG - Hard-coded duration and easing */
.panel {
  transition: transform 300ms ease-in-out;
}

/* WRONG - No token reference */
.panel {
  transition: transform 0.3s ease;
}

/* WRONG - Using generic CSS keyword instead of token */
.scrim {
  transition: opacity 300ms ease-in-out;
}
```

## Resizable Panel Rule

**RULE**: All panel/drawer components MUST be resizable with min/max width constraints.

### Requirements

- **Min width**: 420px
- **Max width**: 800px
- **Resize handle**: Visible on left edge (for right-positioned panels) with a subtle indicator on hover
- **Persistence**: Store user-preferred width in `localStorage` (`panel-resize-width` key)
- **Responsive**: Disable resize on mobile (`<900px`), use full viewport width minus 24px
- **Prop**: Pass `resizable` boolean prop to enable

### Reference Implementation

`client/components/ui/Panel.tsx` and `client/components/ui/Panel.module.css`

### Exceptions

Only non-resizable panels are:
- Full-screen modals
- Tooltips or popovers with documented UX reasons

## Summary

1. Always use `--ld-semantic-duration-panel-*` and `--ld-semantic-timing-panel` tokens for panel animations
2. Always use `--ld-semantic-duration-scrim-*` and `--ld-semantic-timing-scrim` tokens for scrim animations
3. Close animation should be faster than open animation for a snappy feel
4. All panels should be resizable unless there is a documented exception
5. Persist user resize preference in localStorage
