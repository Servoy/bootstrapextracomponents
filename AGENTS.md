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
| Test framework | Cypress 15.x (component testing) — **pending migration to Vitest** |
| Linting | ESLint 10.x (@angular-eslint 22.x + @typescript-eslint 8.x) |
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

**Current state:** Tests use **Cypress component testing** (`.cy.ts` files). Migration to
Vitest is planned — use the `test-migration` skill when ready.

| Command | Purpose |
|---------|---------|
| `npm run cy:open` | Open Cypress interactive runner |
| `npm run cy:run` | Run all Cypress component tests (headless Chrome) |

### Test conventions (Cypress — current)
- Framework: Cypress component testing with `@cypress/webpack-dev-server`
- Config: `cypress.config.ts`
- Pattern: `**/*.cy.ts`
- Each component has a test file alongside its implementation
- Tests use a WrapperComponent pattern with signal-based inputs

### Test conventions (Vitest — after migration)
- Framework: Vitest (via `@angular/build:unit-test`)
- Pattern: `**/*.spec.ts`
- Tests use direct `TestBed.createComponent(TheComponent)` pattern
- Use `fixture.componentRef.setInput('name', value)` for signal inputs
- Use `NO_ERRORS_SCHEMA` to suppress unknown directive warnings
- Import `ServoyPublicTestingModule` from `@servoy/public`
- DO NOT import `ServoyBootstrapExtraComponentsModule` in tests

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
- `<name>.cy.ts` — Cypress component test (to be migrated to `<name>.spec.ts`)

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
- **Standalone:** `false` — all components declared in `ServoyBootstrapExtraComponentsModule`
- **Selector prefix:** `bootstrapextracomponents-` (kebab-case, enforced by ESLint)
- **Directive selector prefix:** `bootstrapextracomponents` (camelCase)
- **Handlers as inputs:** `readonly onAction = input<(e: Event) => void>(undefined)`
- **Custom types:** Use `BaseCustomObject` from `@servoy/public` for model classes (MenuItem, Slide, AddOn, etc.)

### Module registration

When adding a new component:
1. Declare in `servoybootstrapextra.module.ts`
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
│   ├── .eslintrc.json                   # ESLint config (legacy JSON format)
│   ├── cypress.config.ts                # Cypress config (pending removal)
│   ├── cypress/                         # Cypress support files (pending removal)
│   ├── scripts/build.js                 # Release packaging (creates .zip)
│   ├── projects/
│   │   ├── bootstrapextracomponents/    # Angular library
│   │   │   ├── ng-package.json          # ng-packagr config
│   │   │   ├── tsconfig.lib.json        # Library TS config
│   │   │   ├── tsconfig.lib.prod.json   # Production TS config
│   │   │   ├── tsconfig.spec.json       # Test TS config
│   │   │   └── src/
│   │   │       ├── public-api.ts        # Library exports
│   │   │       ├── servoybootstrapextra.module.ts # NgModule declarations
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
    ├── skills/test-migration/           # Cypress → Vitest migration
    └── plugins/commit-lint.ts           # Commit message validation
```

## Workflow

### Post-edit checklist

After making code changes, always verify:
1. `npm run build` — must compile without errors
2. `npx ng lint` — check for lint warnings
3. Run relevant tests: `npm run cy:run` (or after Vitest migration: `npm run test`)

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
3. Register in `servoybootstrapextra.module.ts` (declarations + exports)
4. Export in `public-api.ts`
5. Create test file: `<name>.cy.ts` (or `<name>.spec.ts` after Vitest migration)
6. Build and verify: `npm run build`

### Modifying a component

When changing component properties, handlers, or API:
1. Update the `.spec` file (JSON contract) in `bootstrapextracomponents/<name>/`
2. Update the Angular component in `projects/bootstrapextracomponents/src/<name>/`
3. Both layers must stay in sync

## Gotchas

- **`.spec` files are NOT tests.** They're Servoy component specification JSON files.
- **Signal inputs, not decorators.** Use `input<T>()` / `output<T>()`, not `@Input()` / `@Output()`.
- **OnPush everywhere.** All components use `ChangeDetectionStrategy.OnPush`.
- **@servoy/public version coupling.** Must match the target Servoy runtime version.
- **Legacy files still active.** The AngularJS files in top-level dirs are still used by
  older Servoy runtimes. Don't delete them.
- **No standalone components.** All are `standalone: false`, declared in the shared module.
- **Angular 22.** This project is on Angular 22.1.x with TypeScript 6.0.
- **No base class hierarchy.** Unlike `bootstrapcomponents`, all components here extend
  `ServoyBaseComponent<HTMLDivElement>` directly — there are no intermediate base classes.
- **Cypress testing (pending migration).** Tests currently use Cypress component testing
  (`.cy.ts` files). Vitest migration is planned but not yet done.
- **ESLint legacy config.** Uses `.eslintrc.json` (not flat `eslint.config.js`).
- **Selector prefix is `bootstrapextracomponents-`.** Not `bootstrapcomponents-`.
- **Module name is `ServoyBootstrapExtraComponentsModule`.** Not `ServoyBootstrapComponentsModule`.
