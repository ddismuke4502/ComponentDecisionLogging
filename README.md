# Component Decision Log

[![CI](https://github.com/ddismuke4502/ComponentDecisionLogging/actions/workflows/ci.yml/badge.svg)](https://github.com/ddismuke4502/ComponentDecisionLogging/actions/workflows/ci.yml)

A portfolio-grade frontend engineering project for documenting reusable UI component decisions across frontend and mobile engineering teams.

Component Decision Log helps teams track component metadata, ownership, status, props, state, API contracts, related components, accessibility notes, and the reasoning behind component-level decisions.

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
