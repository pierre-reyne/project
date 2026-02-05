## Implementation Todo List: “How are you?” Demo App

Small, sequential steps designed for AI-assisted coding. Check items off as you go.

### Setup
- [x] Initialize React app skeleton (JS + React) with a single-page `App` render target
- [x] Add basic project scripts (dev/build/test if applicable) and ensure the app starts locally

### Base layout + wiring
- [ ] Create `App` page layout: title, prompt, main container, placeholder sections for form + summary
- [ ] Create `CheckInForm` component with empty form and named export; wire into `App`
- [ ] Create `CheckInSummary` component that can render a provided check-in object (read-only)
- [ ] Add React state in `App` for `lastSubmittedCheckIn` (`null` by default) and pass to `CheckInSummary`

### Form: mood (required)
- [ ] In `CheckInForm`, add mood radio group UI (5 options) with proper labels/fieldset/legend
- [ ] Add `mood` state + onChange handlers; ensure no default selection

### Form: note (optional) + validation
- [ ] Add optional note textarea with label + helper text; add `note` state + onChange
- [ ] Implement note trimming on submit (treat whitespace-only as empty)
- [ ] Add note max length (280) validation logic and inline error message rendering
- [ ] Wire validation message to note field via `aria-describedby`; ensure error uses `role="alert"` or `aria-live`

### Form: tags (optional) + validation
- [ ] Add optional tags UI (checkbox list of 5 tags) with label and helper text
- [ ] Add `tags` state as array; implement select/deselect handlers
- [ ] Enforce tags max selection (3): prevent selecting a 4th and show inline feedback

### Submit gating + submit flow
- [ ] Implement overall `canSubmit` derived state: mood required, note <= 280, tags <= 3
- [ ] Add Submit button (primary) disabled when `canSubmit` is false
- [ ] On submit, build `CheckIn` object (id, createdAt ISO, mood, note, tags)
- [ ] Prevent rapid double-submit by disabling submit during handler execution (even if synchronous)
- [ ] Call parent callback `onSubmit(checkIn)` from `CheckInForm` and clear any submit-time errors

### Success state + summary
- [ ] In `App`, on submit: set `lastSubmittedCheckIn`, show success message near summary area
- [ ] Add summary rendering details (friendly labels, formatted date/time, hide empty fields)

### Reset / clear
- [ ] Add Reset/Clear button to `CheckInForm` that resets mood/note/tags + clears validation messages
- [ ] Decide reset behavior re: summary (keep by default per PRD) and implement accordingly

### Persistence (optional)
- [ ] Add optional localStorage persistence for last submitted check-in (save on submit)
- [ ] On app load, restore last submitted check-in from localStorage (guard parse errors)
- [ ] Handle localStorage failures gracefully with a non-blocking message

### Accessibility pass
- [ ] Ensure mood radio group is keyboard-navigable and has a clear group label
- [ ] Ensure all controls have visible labels and focus styles are clearly visible

### UX / styling
- [ ] Add responsive styling for mobile/desktop (centered layout, readable width, large tap targets)

### Optional telemetry
- [ ] Add small telemetry (optional): console counters for page view and submit events

### QA checklist
- [ ] Keyboard-only flow works end-to-end
- [ ] Validation states are clear and don’t wipe user input
- [ ] Submit + success + summary are correct
- [ ] Reset clears in-progress inputs and validation messages
- [ ] Persistence works on reload (if enabled) and fails gracefully when unavailable


