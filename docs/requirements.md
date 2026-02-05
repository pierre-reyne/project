## Product Requirements Document (PRD): “How are you?” Demo App

### Summary
A single-page React app that asks a user “How are you?” and captures a lightweight check-in (mood + optional context). The demo showcases clean UX, validation, accessibility, and simple state management in JavaScript + React.

### Goals
- **Fast check-in**: user can complete in under 15 seconds.
- **Clear UX**: obvious prompt, minimal friction, strong success state.
- **Demo-quality engineering**: predictable state, input validation, accessible form controls.

### Non-goals
- Authentication, accounts, or multi-user experiences
- Complex journaling features (attachments, rich text, long-term history)
- Backend persistence (can be optional/replaceable, but not required for demo)

### Target users
- **Primary**: anyone opening the demo who wants to answer “How are you?” quickly.
- **Secondary**: reviewers evaluating React form patterns and UX quality.

### Core user journeys
- **Check in**: user selects a mood, optionally adds a note, submits, sees confirmation.
- **Edit before submit**: user changes mood/note, sees validation feedback if needed.
- **Try again**: user can reset the form and submit another check-in.

### User stories
- As a user, I want a simple question and a small set of choices so I can answer quickly.
- As a user, I want to add optional context so my answer feels expressive.
- As a user, I want a clear confirmation so I know my input was saved/recorded.
- As a keyboard-only user, I want to complete the form without a mouse.
- As a screen-reader user, I want all controls labeled and status messages announced.

## Functional requirements

### Screen layout (one page)
- **Header**: app title (e.g., “Daily Check-in”).
- **Prompt**: “How are you feeling today?”
- **Form**:
  - **Mood selector (required)**: choose exactly one mood.
  - **Optional note**: short text field to add context.
  - **Optional tags**: select from a small set (e.g., Work, Family, Health, Friends, Sleep).
  - **Submit button**: primary call-to-action.
  - **Reset/Clear button**: secondary action to clear current inputs.
- **Result area**:
  - Success message after submit.
  - Read-only summary of the submitted check-in.

### Mood selector (required)
- Provide 5 options (example labels):
  - Very bad
  - Bad
  - Okay
  - Good
  - Great
- Must be a standard accessible control (radio group or equivalent).
- Default state: nothing selected (forces explicit choice).

### Optional note
- Single textarea or input.
- Constraints:
  - Max length: **280 characters**
  - Trims leading/trailing whitespace on submit
- If user exceeds max length, show inline validation and disable submit until fixed.

### Optional tags
- Up to **3** tags selectable.
- If user selects more than 3, block selection and provide inline feedback.

### Submit behavior
- On submit (happy path):
  - Validate fields (mood required; note length; tags limit).
  - Record a check-in object (see Data Model).
  - Show a **success state** that confirms submission.
  - Show a **summary** of the submitted values.
  - Keep user on the same page (no navigation required).
- Submit should be disabled when:
  - Mood is not selected
  - Note exceeds max length
  - Tag selection exceeds limit (should be prevented, but still guard)

### Reset/Clear behavior
- Resets the form back to initial state.
- Clears validation messages.
- Does not remove the last submitted summary (unless explicitly designed to do so—see “Open questions”).

### Persistence (demo-friendly)
Choose one of the following approaches (default recommended: local only):
- **Option A (default)**: in-memory only; refreshing the page clears everything.
- **Option B (recommended for a nicer demo)**: persist last submission to `localStorage` and restore on reload.

If localStorage is used:
- Store only the last submitted check-in.
- Provide a “Clear saved check-in” action OR clear automatically when user clicks Reset (define explicitly in implementation).

### Error handling
- Validation errors are shown inline near the relevant control.
- If persistence fails (e.g., localStorage unavailable), show a non-blocking message:
  - “Couldn’t save locally. Your check-in is still shown here.”
- No unhandled exceptions should surface to the user.

## Data model

### CheckIn object
- **id**: string (unique; can be timestamp-based for demo)
- **createdAt**: ISO string (client-generated)
- **mood**: one of [`very_bad`, `bad`, `okay`, `good`, `great`]
- **note**: string (optional, trimmed; max 280)
- **tags**: string[] (optional; max 3)

## UX requirements
- The primary action (“Submit”) must be visually prominent.
- Provide microcopy for optional fields (e.g., “Add a note (optional)”).
- After submit, show a friendly confirmation and the summary in the same viewport.
- Preserve user input on validation errors (don’t wipe fields).
- Keep the layout responsive:
  - Mobile: single column, large tap targets.
  - Desktop: centered content, readable line length.

## Accessibility requirements
- All inputs must have visible labels (not placeholder-only).
- Mood selector implemented as an accessible radio group with:
  - Group label (fieldset/legend or ARIA equivalent)
  - Keyboard navigation (arrow keys)
- Validation errors must be:
  - Programmatically associated with the control (`aria-describedby`)
  - Announced to assistive tech (`role="alert"` or `aria-live`)
- Color contrast meets WCAG AA.
- Focus states are clearly visible.

## Technical requirements (JS + React)
- **Tech stack**: JavaScript + React (no TypeScript required).
- **Exports**: use named exports only.
- **State management**: React hooks (`useState`, optional `useEffect` for persistence).
- **No backend required**; persistence (if any) is local.
- **Component structure** (suggested):
  - `App` (page container)
  - `CheckInForm` (inputs + validation)
  - `CheckInSummary` (submitted display)
  - small UI components as needed (Button, Field, etc.)

## Telemetry (optional for demo)
- Track counts in-memory (or console) for:
  - page views
  - submits
  - validation errors encountered
- No third-party analytics required.

## Privacy & security
- If using localStorage, store only what the user entered and keep it local.
- Do not collect personal identifiers.
- Don’t send data to external services.

## Acceptance criteria
- User cannot submit without selecting a mood.
- Note enforces 280-char max with clear feedback.
- Tag selection is limited to 3 and clearly communicated.
- On successful submit:
  - confirmation is shown
  - summary reflects submitted values
- Keyboard-only completion is possible end-to-end.
- Screen-reader labels and error announcements work as expected.
- App works on modern mobile and desktop browsers.

## Edge cases to handle
- User submits with mood selected but note is whitespace-only → treat as empty.
- localStorage unavailable or throws → app still functions without crashing.
- Rapid double-click submit → should not create duplicate submissions (disable during submit, even if submit is synchronous).

## Open questions
- Should Reset clear the last submitted summary, or only the in-progress form?
- Do we want persistence (localStorage) enabled by default for the demo?
- Should “tags” be included, or is mood + optional note sufficient for the simplest version?


