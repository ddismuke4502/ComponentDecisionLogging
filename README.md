# Component Decision Log

[![CI](https://github.com/ddismuke4502/ComponentDecisionLogging/actions/workflows/ci.yml/badge.svg)](https://github.com/ddismuke4502/ComponentDecisionLogging/actions/workflows/ci.yml)

## Live Demo

**Production:** [component-decision-logging.vercel.app](https://component-decision-logging.vercel.app)

Component Decision Log is deployed on Vercel from the `main` branch. The production deployment currently runs in safe preview mode without Firebase environment variables, which allows reviewers to explore the registry, component detail pages, protected form shell, validation flow, and local mock-backed data architecture without private credentials.


## Portfolio Case Study

Component Decision Log is a frontend architecture portfolio project designed to show how reusable UI components can be documented, governed, reviewed, and evolved across engineering teams.

The project demonstrates:

* Typed domain modeling for component records, props, state, API contracts, accessibility notes, and architecture decisions
* Searchable and filterable component registry
* Component detail routes with decision history and contract documentation
* Multi-step component creation form
* React Hook Form and Zod validation
* TanStack Query query and mutation architecture
* Mock-to-Firestore data bridge
* Firebase Auth gate shell with safe local preview behavior
* Firestore seed script structure
* Jest and React Testing Library coverage
* GitHub Actions CI for linting, typechecking, testing, and production builds
* GSAP reveal animations with reduced-motion support
* Mobile-first responsive layouts and accessibility-focused UI primitives

The goal is to present the kind of frontend engineering maturity expected in production design-system, platform, and mobile/web architecture work.


## Production Status

| Area                                | Status             |
| ----------------------------------- | ------------------ |
| Vercel production deployment        | Complete           |
| GitHub Actions CI                   | Complete           |
| Mock-backed component registry      | Complete           |
| Component detail routes             | Complete           |
| Multi-step component form           | Complete           |
| React Query data layer              | Complete           |
| Firebase client setup               | Complete           |
| Firebase Auth shell                 | Complete           |
| Firestore bridge                    | Complete           |
| Firestore seed script               | Complete           |
| GSAP animation layer                | Complete           |
| Mobile/accessibility pass           | Complete           |
| Live Firebase project configuration | Deferred           |
| Edit existing component workflow    | Future enhancement |
| Component analytics dashboard       | Future enhancement |

The current production deployment intentionally uses mock-backed data so the application remains reviewable without exposing private Firebase credentials. Firebase and Firestore integration points are already structured and can be enabled by adding the appropriate environment variables.


## Project Purpose

Modern engineering teams often make important component-level decisions in scattered places: pull requests, Slack threads, design docs, Jira tickets, and tribal knowledge. This project centralizes those decisions into a searchable, structured decision log.

The goal is to demonstrate production-minded frontend engineering through:

* Strong TypeScript modeling
* Accessible UI patterns
* Search and filtering
* Data fetching architecture
* Firebase-backed persistence
* Auth-gated workflows
* Form validation
* Skeleton loading states
* Responsive layouts
* Automated testing
* GitHub Actions CI
* Professional documentation


## Screenshots

> Screenshots will be added after the final production visual pass.

Planned screenshots:

| View | Purpose |
| --- | --- |
| Command Center | Shows the project concept and visual direction |
| Component Registry | Shows search, filtering, status, and component governance |
| Component Detail Page | Shows props, state, API contracts, decisions, and accessibility notes |
| New Component Form | Shows the multi-step creation and validation workflow |
| Local Preview Auth Gate | Shows safe Firebase fallback behavior |


## Core Features

### MVP Features

* Dashboard overview
* Searchable component registry
* Component status, category, owner, and platform metadata
* Component detail pages
* Props and state documentation
* API contract documentation
* Decision log timeline
* Related components panel
* Accessibility notes section
* Add/edit component form
* Zod validation
* Responsive design
* Skeleton loading states

### Planned Production Features

* Firebase Authentication
* Firestore-backed component records
* TanStack Query data fetching and cache invalidation
* Settings/export view
* GitHub Actions CI workflow
* Jest unit tests
* React Testing Library component tests
* GSAP animation polish
* Vercel deployment

## Tech Stack

| Technology            | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| Next.js App Router    | Application routing and page structure          |
| TypeScript            | Strict type safety and domain modeling          |
| TailwindCSS           | Responsive styling and design system            |
| Firebase Auth         | Authentication gate                             |
| Firestore             | Component decision data persistence             |
| TanStack Query        | Data fetching, caching, and mutation management |
| React Hook Form       | Form state management                           |
| Zod                   | Runtime validation and typed schemas            |
| Jest                  | Unit testing                                    |
| React Testing Library | Component behavior testing                      |
| GitHub Actions        | CI pipeline                                     |
| GSAP                  | Professional animation polish                   |
| Vercel                | Deployment                                      |


## Quality Gates

This project is intentionally built with quality gates that mirror production frontend workflows.

| Quality Gate               | Status      |
| -------------------------- | ----------- |
| TypeScript strict modeling | In progress |
| Accessible UI primitives   | In progress |
| Form validation with Zod   | Added       |
| Unit tests                 | Added       |
| Component rendering tests  | Added       |
| GitHub Actions CI          | Added       |
| Responsive layouts         | In progress |
| Skeleton and empty states  | Added       |
| Firebase Auth              | Planned     |
| Firestore persistence      | Planned     |
| TanStack Query data layer  | Planned     |
| Vercel deployment          | Planned     |


## Design Direction

Component Decision Log uses a Purple / Black / Turquoise visual system.

The UI should feel:

* Premium
* Architect-level
* Enterprise-product ready
* Smooth but not overanimated
* Distinct from previous Orange / Black / Gold portfolio projects

## Architecture Goals

This project is intentionally structured to show frontend engineering discipline.

### Main principles

* Keep UI primitives separate from feature-specific components
* Keep data access isolated from page components
* Use typed domain models before introducing Firestore
* Prefer semantic HTML and accessible interactions
* Validate form data with schemas
* Use testable utility functions for filtering/search behavior
* Treat the README as a living architecture document

## Technical Highlights

### Data Architecture

The registry reads through TanStack Query hooks rather than importing data directly into UI components. This keeps the rendering layer decoupled from the persistence layer.

```txt
Registry UI
→ TanStack Query
→ Component query hooks
→ Firestore when configured
→ Mock data fallback when not configured

## Planned Folder Structure

```txt
src
  app
    /(auth)
    /(dashboard)
    layout.tsx
    page.tsx
    globals.css

  components
    layout
    ui
    component-log
    forms

  features
    auth
    components

  lib
    firebase
    query
    utils

  data
    mock-components.ts

  tests
    setup.ts
```

## Data Model Overview

The main domain object is a `ComponentRecord`.

Each component record will include:

* Name
* Slug
* Summary
* Category
* Status
* Owner
* Platform
* Tags
* Props
* State
* API contract
* Decision history
* Related components
* Accessibility notes
* Created and updated timestamps

## Accessibility Strategy

Accessibility is a core requirement, not an afterthought.

This project will include:

* Semantic page landmarks
* Skip link
* Proper heading hierarchy
* Visible focus states
* Keyboard-accessible navigation
* Labeled form controls
* Accessible validation errors
* Status labels that do not rely on color alone
* Reduced motion support
* Screen-reader-friendly loading and empty states


## Firebase, Auth, and Firestore Architecture

Component Decision Log is structured to support Firebase Auth and Firestore persistence while still allowing the project to run safely in local development, CI, and portfolio review environments without private Firebase credentials.

The app uses Firebase for:

| Area                  | Purpose                                       |
| --------------------- | --------------------------------------------- |
| Firebase Auth         | Protecting create/edit workflows              |
| Firestore             | Persisting component records                  |
| Firebase Admin SDK    | Optional seed script for populating Firestore |
| Environment variables | Keeping credentials out of source control     |

The Firebase client is initialized lazily so the app does not crash during CI or local preview when Firebase environment variables are missing.

### Local Preview Mode

When Firebase environment variables are not configured, protected routes remain visible in a safe preview mode.

For example:

```txt
/components/new
```

will show a local-preview notice and still render the form. This allows reviewers to inspect the full form experience without needing access to private Firebase credentials.

When Firebase is configured, the same route becomes auth-gated and requires Google sign-in before users can manage component records.


## Environment Variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Then add your Firebase web app values:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

These values are intentionally prefixed with `NEXT_PUBLIC_` because they are used by the browser-side Firebase client.

Private environment files are ignored by Git:

```txt
.env.local
.env.seed.local
```

The repository only commits safe templates:

```txt
.env.example
.env.seed.example
```

### Firestore Seed Environment

To seed Firestore with the included mock component records, create:

```bash
cp .env.seed.example .env.seed.local
```

Then configure:

```bash
FIREBASE_PROJECT_ID=
FIREBASE_SERVICE_ACCOUNT_BASE64=
COMPONENT_SEED_COLLECTION=components
```

`FIREBASE_SERVICE_ACCOUNT_BASE64` should contain a base64-encoded Firebase service account JSON file. The raw service account file should never be committed.


## Data Flow

Component records currently move through a mock-to-Firestore bridge.

```txt
Component Registry UI
→ TanStack Query
→ Component query hooks
→ Firestore when configured
→ Mock data fallback when not configured
```

Form submission follows the same pattern:

```txt
Component Form
→ React Hook Form
→ Zod validation
→ ComponentRecord creation
→ TanStack Query mutation
→ Firestore save when configured
→ Local preview success when not configured
→ Query cache update
```

This keeps UI components decoupled from the persistence layer. The registry and form do not need to know whether records are coming from mock data or Firestore.

### Firestore Collection

The primary Firestore collection is:

```txt
components
```

Each document stores a `ComponentRecord` with fields such as:

```txt
id
name
slug
summary
status
category
platform
owner
props
state
apiContract
decisions
relatedComponentIds
accessibilityNotes
createdAt
updatedAt
```

### Seeding Firestore

After Firebase Admin credentials are configured, seed Firestore with:

```bash
npm run seed:components
```

The seed script writes the current mock component records into the configured Firestore collection using merge behavior, so existing documents with the same IDs can be updated safely.


## Testing Strategy

This project includes a growing automated test suite focused on business logic, validation behavior, and user-visible component rendering.

Current test coverage includes:

* Component search and filtering utilities
* Component status, category, and platform formatting
* Component slug lookup
* Zod schema validation
* Form helper utilities
* Conversion between form values and component records
* Component status badge rendering
* Component card rendering
* Accessible text, links, headings, and status labels

Testing tools:

| Tool                  | Purpose                         |
| --------------------- | ------------------------------- |
| Jest                  | Unit and component test runner  |
| React Testing Library | User-centered component testing |
| jest-dom              | DOM-specific assertions         |

Run tests:

```bash
npm run test
```

Run coverage:

```bash
npm run test:coverage
```


## CI/CD

This project uses GitHub Actions to run an automated quality pipeline on pushes and pull requests targeting `main`.

The CI workflow runs:

```bash
npm ci
npm run lint
npm run typecheck
npm run test -- --runInBand
npm run build
```

The goal is to ensure that every change passes linting, TypeScript validation, automated tests, and a production build before being considered stable.

CI workflow file:

```txt
.github/workflows/ci.yml
```


## Local Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```txt
http://localhost:3000
```

## Build Roadmap

### Phase 1: Foundation

* Scaffold Next.js project
* Establish README
* Configure strict TypeScript expectations
* Create theme foundation
* Build app shell

### Phase 2: Static Product UI

* Dashboard view
* Component list view
* Component detail view
* Settings/export view
* Skeleton and empty states

### Phase 3: Domain Modeling

* Component types
* Mock data
* Search utilities
* Filter utilities

### Phase 4: Forms

* Multi-step add/edit form
* React Hook Form setup
* Zod schema validation
* Accessible error states

### Phase 5: Data Layer

* TanStack Query provider
* Firebase setup
* Firestore reads
* Firestore mutations
* Cache invalidation

### Phase 6: Auth

* Firebase Auth
* Login view
* Auth guard
* Protected dashboard routes

### Phase 7: Quality Layer

* Jest setup
* React Testing Library setup
* Unit tests
* Component tests
* GitHub Actions CI

### Phase 8: Polish and Deploy

* GSAP motion polish
* Reduced motion handling
* README screenshots
* Vercel deployment
* Final lessons learned section

## Lessons Learned

This section will be completed as the project evolves.

Planned reflection topics:

* Modeling frontend architecture decisions as data
* Designing accessible internal tools
* Managing form complexity with schemas
* Integrating Firestore with React Query
* Balancing animation polish with usability
* Building a CI-backed portfolio project

## Project Status

Current status: Initial setup in progress.
