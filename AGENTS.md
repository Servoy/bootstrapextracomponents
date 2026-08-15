# AGENTS.md — Servoy Bootstrap Extra Components

## Project overview

This repository contains the **Servoy Bootstrap Extra Components** package — a set of extra
Bootstrap-based Angular UI components for the Servoy NGClient runtime. Components are built as an
Angular library and deployed as a Servoy web package (`.zip`).

**Repository:** https://github.com/Servoy/bootstrapextracomponents
**Package name:** `@servoy/bootstrapextracomponents`
**Current version:** 2026.9.0

## Technology stack

| Aspect | Value |
|--------|-------|
| Angular | 22.1.0 |
| TypeScript | 6.0.3 |
| Build system | Angular CLI 22.1.2 + ng-packagr 22.1.1 |
| Test framework | Vitest (via `@angular/build:unit-test`) |
| Linting | ESLint 10.x (@angular-eslint 22.x + @typescript-eslint 8.x, flat config) |
| Node package manager | npm |
| Servoy framework | @servoy/public 2026.9.0 |
| CSS framework | Bootstrap (via @ng-bootstrap/ng-bootstrap 21.x) |

## Working directory

All npm/ng commands must be run from the `bootstrapextracomponents/` directory:
```
cd bootstrapextracomponents
```

## Build commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build (`ng build @servoy/bootstrapextracomponents --configuration production`) |
| `npm run build_debug` | Build with file watching |
| `npm run make_release` | Production build + package into `bootstrapextracomponents.zip` |

## Lint & typecheck

```bash
npx ng lint
```

This runs ESLint with the Angular and TypeScript plugins. All rules emit warnings
(via `eslint-plugin-only-warn`), but warnings should still be addressed.

The build (`npm run build`) performs full TypeScript type checking via ng-packagr.
A successful build confirms type correctness.

## Testing

**Framework:** Vitest (via `@angular/build:unit-test`)

| Command | Purpose |
|---------|---------|
| `npm run test` | Run all Vitest component tests (jsdom, headless) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ui` | Run tests with Vitest UI |

### Test conventions
- Framework: Vitest via `@angular/build:unit-test` builder
- Config: `angular.json` test target + `vitest-base.config.ts`
- Pattern: `**/*.spec.ts`
- Each component has a test file alongside its implementation
- Tests use direct `TestBed.createComponent(TheComponent)` pattern
- Use `fixture.componentRef.setInput('name', value)` for signal inputs
- Use `NO_ERRORS_SCHEMA` to suppress unknown directive warnings
- Import `ServoyPublicTestingModule` from `@servoy/public`
- Components are standalone: put them in `imports`, NOT `declarations`
- DO NOT import `ServoyBootstrapExtraComponentsModule` in tests

### Critical: Global Mocking Rules

- **NEVER** use `vi.stubGlobal('document', ...)` or `vi.stubGlobal('window', ...)` — this replaces the entire jsdom DOM and breaks ALL subsequent tests in the same fork/thread. The error manifests as `this.doc.querySelector is not a function` in Angular's renderer.
- Instead, mock individual methods and restore them:
  ```typescript
  let originalMethod: typeof document.elementFromPoint;
  beforeEach(() => {
    originalMethod = document.elementFromPoint;
    document.elementFromPoint = vi.fn() as any;
  });
  afterEach(() => {
    document.elementFromPoint = originalMethod;
  });
  ```
- Similarly, never replace `window.location`, `window.navigator` etc. via `stubGlobal` — use `vi.spyOn` or direct property assignment with restore.

### Debugging: Log First, Fix Later

When facing unclear test failures (locally or on CI), **do NOT spend multiple rounds guessing root causes**. Instead:

1. **Add diagnostic logging immediately** — log the state of the failing object (e.g. `typeof`, `constructor.name`, `Object.keys()`, `JSON.stringify`) at the point of failure
2. **Run (or push and let CI run)** — get real data from the actual environment
3. **Fix based on evidence** — one log statement that shows actual state is worth more than three speculative fixes

## Architecture

### Dual-layer component structure

Each component exists in **two layers** that must stay in sync:

**Layer 1 — Servoy Spec** (`bootstrapextracomponents/<name>/`):
- `<name>.spec` — JSON file defining the Servoy component contract (model properties,
  handlers, API methods, custom types). This is NOT a test file.
- `<name>.js` / `<name>.html` / `<name>.css` — Legacy AngularJS implementation
- Icons (`.png`, `@2x.png` variants)

**Layer 2 — Angular Implementation** (`bootstrapextracomponents/projects/bootstrapextracomponents/src/<name>/`):
- `<name>.ts` — Angular component class
- `<name>.html` — Angular template
- `<name>.spec.ts` — Vitest component test

### Components (10)

**Both layers (Servoy Spec + Angular implementation):**
badge, breadcrumbs, buttonsgroup, carousel, dropdown, inputgroup, navbar,
progressbar, rating, switch

### Angular component conventions

- **Signal-based inputs:** `readonly myProp = input<string>(undefined)` — NOT `@Input()`
- **Signal-based outputs:** `readonly myPropChange = output<string>()` — NOT `@Output()`
- **Additional signal APIs:** `viewChild()`, `contentChild()`, `linkedSignal()`, `computed()`, `signal()`
- **Change detection:** `ChangeDetectionStrategy.OnPush` on every component
- **Base class:** All components extend `ServoyBaseComponent<HTMLDivElement>` directly from `@servoy/public`
  (no intermediate base class hierarchy — unlike bootstrapcomponents)
- **Standalone:** `true` — all components are standalone with their own `imports` array
- **Selector prefix:** `bootstrapextracomponents-` (kebab-case, enforced by ESLint)
- **Directive selector prefix:** `bootstrapextracomponents` (camelCase)
- **Handlers as inputs:** `readonly onAction = input<(e: Event) => void>(undefined)`
- **Custom types:** Use `BaseCustomObject` from `@servoy/public` for model classes (MenuItem, Slide, AddOn, etc.)

### Module registration

When adding a new component:
1. Import and export in `servoybootstrapextra.module.ts`
2. Export in `public-api.ts`
3. Create Servoy `.spec` file in `bootstrapextracomponents/<name>/`

## Code style

- Single quotes (enforced by `@stylistic/ts/quotes`)
- Max line length: 200 characters
- Brace style: 1TBS (`if (x) {`)
- Static readonly properties: UPPER_CASE
- No component class suffix required (`@angular-eslint/component-class-suffix: off`)
- No console.log in production code
- Use `@servoy/public` utilities — don't reinvent

## Key dependencies

| Package | Purpose |
|---------|---------|
| `@servoy/public` | Servoy framework base classes, utilities, API types |
| `@ng-bootstrap/ng-bootstrap` | Bootstrap widgets for Angular (modals, tooltips, tabs, etc.) |
| `@servoy/jw-bootstrap-switch-ng2` | Bootstrap switch toggle component |
| `@popperjs/core` | Tooltip/popover positioning |

## Project structure

```
bootstrapextracomponents/
├── AGENTS.md                            # This file
├── README.md                            # Basic setup instructions
├── JIRA.md                              # Jira API instructions
├── opencode.json                        # opencode configuration
├── webpackage.json                      # Servoy package manifest & release history
├── bootstrapextracomponents/            # Main working directory
│   ├── angular.json                     # Angular workspace config
│   ├── package.json                     # npm dependencies & scripts
│   ├── tsconfig.json                    # Root TypeScript config (strict)
│   ├── eslint.config.js                 # ESLint flat config
│   ├── vitest-base.config.ts             # Vitest runner configuration
│   ├── scripts/build.js                 # Release packaging (creates .zip)
│   ├── projects/
│   │   ├── bootstrapextracomponents/    # Angular library
│   │   │   ├── ng-package.json          # ng-packagr config
│   │   │   ├── tsconfig.lib.json        # Library TS config
│   │   │   ├── tsconfig.lib.prod.json   # Production TS config
│   │   │   ├── tsconfig.spec.json       # Test TS config
│   │   │   └── src/
│   │   │       ├── public-api.ts        # Library exports
│   │   │       ├── servoybootstrapextra.module.ts # NgModule re-exports (barrel)
│   │   │       ├── testingutils.ts      # Test utilities
│   │   │       └── <component>/         # Angular component implementation
│   │   └── dummy/                       # Dummy app (dev/testing scaffold)
│   ├── <component>/                     # Servoy spec + legacy files (per component)
│   ├── lib/                             # Shared JS libraries
│   ├── META-INF/                        # Java/Servoy metadata
│   ├── dist/                            # Build output (gitignored)
│   └── node_modules/                    # Dependencies (gitignored)
├── bootstrapExtraComponentsDemo/        # Example Servoy solution
└── .opencode/                           # opencode skills & plugins
    ├── skills/sdd/                      # Spec-Driven Development pipeline
    ├── skills/migration/                # Angular modernization helper
    ├── skills/spec-sync/                # Spec sync checker
    ├── skills/test-migration/           # Cypress → Vitest migration (reference)
    └── plugins/commit-lint.ts           # Commit message validation
```

## Workflow

### Post-edit checklist

After making code changes, always verify:
1. `npm run build` — must compile without errors
2. `npx ng lint` — check for lint warnings
3. `npm run test` — run Vitest component tests

### Commit message format

```
<JIRA_KEY> <short description> [ai]

- bullet points summarising changes

Co-Authored-By: opencode <noreply@opencode.ai>
```

Example: `SVY-21080 add navbar responsive collapse support [ai]`

### Adding a new component

1. Create the Servoy spec directory: `bootstrapextracomponents/<name>/`
   - `<name>.spec` (JSON component contract)
   - `<name>.js`, `<name>.html`, `<name>.css` (legacy implementation)
   - Icon files (`.png`, `@2x.png`)
2. Create Angular implementation: `bootstrapextracomponents/projects/bootstrapextracomponents/src/<name>/`
   - `<name>.ts` (component class)
   - `<name>.html` (template)
3. Register in `servoybootstrapextra.module.ts` (imports + exports)
4. Export in `public-api.ts`
5. Create test file: `<name>.spec.ts`
6. Build and verify: `npm run build`

### Modifying a component

When changing component properties, handlers, or API:
1. Update the `.spec` file (JSON contract) in `bootstrapextracomponents/<name>/`
2. Update the Angular component in `projects/bootstrapextracomponents/src/<name>/`
3. Both layers must stay in sync

### Spec property tags: `serveronly`

- If a spec property is handled **only on the server** (not sent to the client, no `@Input` in Angular), add `"tags": { "serveronly": true }` to its definition.
- The `serveronly` tag prevents the property from being generated in the Angular template AND from being sent over the websocket.
- **Every spec model property MUST have a corresponding `@Input` (signal input) in the Angular component, unless it is tagged `serveronly`.**
- When adding or modifying spec properties, always verify this alignment.

## Gotchas

- **`.spec` files are NOT tests.** They're Servoy component specification JSON files.
- **Signal inputs, not decorators.** Use `input<T>()` / `output<T>()`, not `@Input()` / `@Output()`.
- **Signal inputs with defaults:** Servoy form templates bind ALL model properties (`[prop]="model.prop"`). If the server never sends a value, the expression evaluates to `undefined`, overriding `input(30)`. Use a transform to preserve defaults:
  ```typescript
  readonly pane1MinSize = input(30, { transform: (v: any) => v ?? 30 });
  ```
- **OnPush everywhere.** All components use `ChangeDetectionStrategy.OnPush`.
- **@servoy/public version coupling.** Must match the target Servoy runtime version.
- **Legacy files still active.** The AngularJS files in top-level dirs are still used by
  older Servoy runtimes. Don't delete them.
- **Standalone components.** All are `standalone: true`, each with their own `imports`.
  The shared NgModule (`ServoyBootstrapExtraComponentsModule`) re-exports them for backward compatibility.
- **Angular 22.** This project is on Angular 22.1.x with TypeScript 6.0.
- **No base class hierarchy.** Unlike `bootstrapcomponents`, all components here extend
  `ServoyBaseComponent<HTMLDivElement>` directly — there are no intermediate base classes.
- **ESLint flat config.** Uses `eslint.config.js` (flat config for ESLint 10).
- **Selector prefix is `bootstrapextracomponents-`.** Not `bootstrapcomponents-`.
- **Module name is `ServoyBootstrapExtraComponentsModule`.** Not `ServoyBootstrapComponentsModule`.

## Cross-Session Knowledge

At the start of a new session, list stored memory keys (`memory_listMemories`) to discover reusable migration patterns, conventions, and lessons learned from previous sessions on Servoy Angular projects.
