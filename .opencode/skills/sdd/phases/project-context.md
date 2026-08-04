# Project Context — Servoy Bootstrap Extra Components (Angular)

This project is the **Servoy Bootstrap Extra Components** package — a set of extra Bootstrap-based
Angular UI components for the Servoy NGClient runtime. It is built as an Angular library using
ng-packagr and deployed as a Servoy web package.

## Technology stack

| Aspect | Value |
|--------|-------|
| Angular version | 22.1.0 |
| TypeScript version | 6.0.3 |
| Build system | Angular CLI 22.1.2 + ng-packagr 22.1.1 |
| Test framework | Cypress 15.x (component testing) — **pending migration to Vitest** |
| Linting | ESLint 10.x with angular-eslint 22.x + typescript-eslint 8.x (legacy `.eslintrc.json` format) |
| Module system | ES modules (moduleResolution: "bundler") |
| Package name | @servoy/bootstrapextracomponents |
| Version | 2026.9.0 |
| CSS framework | Bootstrap (via @ng-bootstrap/ng-bootstrap 21.x) |

## Architecture: Dual-Layer Component Structure

Each component exists in **two layers**:

### Layer 1: Servoy Component Spec (`bootstrapextracomponents/<name>/`)
Top-level directories contain the **Servoy spec definition** and legacy assets:

| File | Purpose |
|------|---------|
| `<name>.spec` | Servoy component specification (JSON) — defines name, model properties, handlers, API methods, types |
| `<name>.js` | Legacy AngularJS client-side code |
| `<name>.html` | Legacy AngularJS template |
| `<name>.css` | Component styles |

### Layer 2: Angular Library (`bootstrapextracomponents/projects/bootstrapextracomponents/src/<name>/`)
The modern Angular implementations:

| File | Purpose |
|------|---------|
| `<name>.ts` | Angular component class |
| `<name>.html` | Angular template |
| `<name>.cy.ts` | Cypress component test (to be migrated to `<name>.spec.ts`) |

## Angular Component Pattern

Components follow these conventions:
- **Signal-based inputs** (`input<T>()`) and `output<T>()`
- **Additional signal APIs:** `viewChild()`, `contentChild()`, `linkedSignal()`, `computed()`, `signal()`
- **ChangeDetectionStrategy.OnPush**
- **Base class:** All components extend `ServoyBaseComponent<HTMLDivElement>` directly from
  `@servoy/public` — there is NO intermediate base class hierarchy (unlike bootstrapcomponents)
- `standalone: false` — declared in `ServoyBootstrapExtraComponentsModule`
- Selector prefix: `bootstrapextracomponents-` (kebab-case, enforced by ESLint)
- Directive selector prefix: `bootstrapextracomponents` (camelCase)

## Key project structure

```
bootstrapextracomponents/
├── bootstrapextracomponents/            # Main working directory
│   ├── angular.json                     # Angular workspace config
│   ├── package.json                     # Dependencies & scripts
│   ├── tsconfig.json                    # Root TypeScript config
│   ├── .eslintrc.json                   # ESLint config (legacy JSON format)
│   ├── cypress.config.ts                # Cypress config (pending removal)
│   ├── cypress/                         # Cypress support files (pending removal)
│   ├── projects/
│   │   ├── bootstrapextracomponents/    # Angular library project
│   │   │   ├── ng-package.json
│   │   │   ├── src/
│   │   │   │   ├── public-api.ts        # Library exports
│   │   │   │   ├── servoybootstrapextra.module.ts # NgModule declarations
│   │   │   │   ├── testingutils.ts      # Test utilities
│   │   │   │   └── <component>/         # Per-component directory
│   │   └── dummy/                       # Dummy app for dev/testing
│   ├── <component>/                     # Servoy spec + legacy files per component
│   ├── lib/                             # Shared JS libraries
│   ├── META-INF/                        # Java/Servoy metadata
│   └── scripts/build.js                 # Release packaging script
├── webpackage.json                      # Servoy package manifest
├── bootstrapExtraComponentsDemo/        # Example Servoy solution
└── README.md
```

## Components in this package

**Angular implementation layer (10 components):**
badge, breadcrumbs, buttonsgroup, carousel, dropdown, inputgroup, navbar,
progressbar, rating, switch

## Key dependencies

| Package | Purpose |
|---------|---------|
| `@servoy/public` | Servoy framework base classes and utilities |
| `@ng-bootstrap/ng-bootstrap` | Bootstrap widgets for Angular (modals, tooltips, tabs, etc.) |
| `@servoy/jw-bootstrap-switch-ng2` | Bootstrap switch toggle component |
| `@popperjs/core` | Tooltip/popover positioning |

## Build commands

| Command | Action |
|---------|--------|
| `npm run build` | Production build of the library |
| `npm run build_debug` | Build with watch mode |
| `npm run make_release` | Build + package into bootstrapextracomponents.zip |

## Testing

- **Framework:** Cypress 15.x (component testing) — **pending migration to Vitest**
- **Commands:** `npm run cy:open` (interactive) / `npm run cy:run` (headless)
- **Pattern:** Each component has a `<name>.cy.ts` file alongside its implementation
- **After Vitest migration:** `npm run test` (jsdom)
- Tests currently use WrapperComponent pattern with signal-based inputs (Cypress)
- After migration: direct `TestBed.createComponent(TheComponent)` pattern with `fixture.componentRef.setInput()`
- DO NOT import `ServoyBootstrapExtraComponentsModule` in tests
- Use `NO_ERRORS_SCHEMA` to suppress unknown directive warnings
- Import `ServoyPublicTestingModule` from `@servoy/public`

## Linting

- ESLint legacy config (`.eslintrc.json`) with `angular-eslint`, `typescript-eslint`, `@stylistic/eslint-plugin`
- All rules emit warnings (uses `eslint-plugin-only-warn`)
- Single quotes, max 200 char lines, 1TBS brace style
- Run: `npx ng lint` from the `bootstrapextracomponents/` directory

## TypeScript strictness

- `strictInjectionParameters: true`
- `strictInputAccessModifiers: true`
- `strictTemplates: true` (Angular)
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`

## Code conventions

- Follow existing patterns in neighboring components — consistency over personal preference
- Use the `@servoy/public` base classes and utilities — never reinvent what's already provided
- Component selectors must use the `bootstrapextracomponents-` prefix
- No console.log in production code
- Prefer existing utility functions from `@servoy/public`
- Always update `public-api.ts` when adding new exports
- Always update `servoybootstrapextra.module.ts` when adding new components/directives

## Gotchas

- **The .spec file is NOT a test file.** It's the Servoy component specification (JSON)
  that defines the component's contract — model properties, handlers, API methods, types.
  Changes to the component contract REQUIRE updating this file.

- **Dual-layer sync:** When changing component properties or API, both the `.spec` file
  (Layer 1) and the Angular component (Layer 2) must be updated in sync.

- **ng-packagr secondary entry points:** The library is built with ng-packagr. If adding
  a new component, it must be declared in `servoybootstrapextra.module.ts` and exported in
  `public-api.ts`.

- **@servoy/public version coupling:** This package is tightly coupled to a specific
  Servoy platform version. The `@servoy/public` version must match the target Servoy
  runtime version.

- **Legacy AngularJS files still exist:** The `.js` and `.html` files in the top-level
  component directories are legacy AngularJS implementations kept for older Servoy
  runtime compatibility. New features should focus on the Angular implementation in
  `projects/bootstrapextracomponents/src/`.

- **Signal-based inputs:** Components use Angular's signal-based input/output API
  (`input<T>()`, `output<T>()`, `viewChild()`, `linkedSignal()`, `computed()`).
  Do NOT use the legacy `@Input()` / `@Output()` decorators.

- **OnPush change detection:** All components use `ChangeDetectionStrategy.OnPush`.
  Ensure proper change detection triggering when modifying state.

- **No base class hierarchy.** Unlike `bootstrapcomponents`, all components here extend
  `ServoyBaseComponent<HTMLDivElement>` directly from `@servoy/public`. There are NO
  intermediate base classes like `bts_basecomp.ts`, `bts_baselabel.ts`, etc.

- **Angular 22 with TypeScript 6.** The project uses strict mode and strictTemplates.

- **Custom types use BaseCustomObject.** Model classes like MenuItem, Slide, AddOn use
  `BaseCustomObject` from `@servoy/public`.
