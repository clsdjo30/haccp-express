# CLAUDE.md - AI Assistant Guide for HACCP Express

> Comprehensive codebase documentation for AI assistants working on the HACCP Express mobile application

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Project Structure](#project-structure)
- [Development Workflows](#development-workflows)
- [Code Conventions](#code-conventions)
- [Environment Management](#environment-management)
- [API & Data Fetching](#api--data-fetching)
- [Testing Strategy](#testing-strategy)
- [Git Workflow](#git-workflow)
- [Build & Deployment](#build--deployment)
- [Key Configuration Files](#key-configuration-files)
- [Common Tasks](#common-tasks)
- [AI Assistant Guidelines](#ai-assistant-guidelines)

---

## Project Overview

**HACCP Express** is a React Native mobile application designed to help restaurant owners and kitchen staff manage HACCP (Hazard Analysis Critical Control Points) compliance efficiently.

### Core Features

The application is structured around three main functional blocks:

1. **HACCP Checklists** - Quick temperature readings and compliance checks
2. **QR Code Scanning** - Equipment cleaning validation via QR codes
3. **Label Printing** - DLC (Date Limite de Consommation) label generation via Bluetooth

### Project Foundation

- Based on [Obytes Starter](https://starter.obytes.com) - a production-ready React Native starter
- Designed for iOS and Android platforms
- Offline-first architecture with local data persistence
- Simple UX with maximum 3-4 taps per workflow

---

## Architecture & Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.0.0 | UI library |
| **React Native** | 0.79.4 | Mobile framework |
| **Expo** | ~53.0.12 | Development platform |
| **TypeScript** | ^5.8.3 | Type safety |
| **Expo Router** | ~5.1.0 | File-based navigation |

### State Management & Data

| Library | Purpose |
|---------|---------|
| **Zustand** | Global state management |
| **React Query (TanStack Query)** | Server state & data fetching |
| **React Query Kit** | Query abstraction layer |
| **React Native MMKV** | Fast key-value storage |

### UI & Styling

| Library | Purpose |
|---------|---------|
| **NativeWind** | Tailwind CSS for React Native |
| **React Native Reanimated** | Animations |
| **React Native Gesture Handler** | Gesture support |
| **Moti** | Declarative animations |
| **React Native SVG** | SVG support |

### Forms & Validation

| Library | Purpose |
|---------|---------|
| **React Hook Form** | Form management |
| **Zod** | Schema validation |
| **@hookform/resolvers** | Form validation integration |

### Internationalization

| Library | Purpose |
|---------|---------|
| **i18next** | Translation framework |
| **react-i18next** | React bindings |
| **expo-localization** | Device locale detection |

### Development Tools

| Tool | Purpose |
|------|---------|
| **pnpm** | Package manager (required) |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Jest** | Unit testing |
| **Husky** | Git hooks |
| **Commitlint** | Commit message linting |
| **Maestro** | E2E testing |

---

## Project Structure

```
haccp-express/
├── src/
│   ├── api/                    # API layer (Axios + React Query)
│   │   ├── common/            # API client, provider, utilities
│   │   │   ├── client.tsx     # Axios instance configuration
│   │   │   ├── api-provider.tsx  # React Query provider
│   │   │   └── utils.tsx      # API helpers
│   │   ├── posts/             # Example API module
│   │   │   ├── use-posts.ts   # Query hooks
│   │   │   ├── use-post.ts
│   │   │   ├── use-add-post.ts
│   │   │   └── types.ts       # API types
│   │   └── index.tsx          # API exports
│   │
│   ├── app/                    # Expo Router (file-based routing)
│   │   ├── _layout.tsx        # Root layout
│   │   ├── +html.tsx          # HTML template (web)
│   │   ├── login.tsx          # Login screen
│   │   ├── onboarding.tsx     # Onboarding screen
│   │   ├── (app)/             # Protected routes (tab navigation)
│   │   │   ├── _layout.tsx    # Tab layout
│   │   │   ├── index.tsx      # Home screen
│   │   │   ├── settings.tsx   # Settings screen
│   │   │   └── style.tsx      # Style guide screen
│   │   ├── feed/              # Feed feature routes
│   │   │   ├── [id].tsx       # Dynamic route (post detail)
│   │   │   └── add-post.tsx   # Add post screen
│   │   └── [...missing].tsx   # 404 handler
│   │
│   ├── components/             # Reusable components
│   │   ├── ui/                # Core UI components (design system)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── text.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── list.tsx
│   │   │   ├── image.tsx
│   │   │   ├── progress-bar.tsx
│   │   │   ├── icons/         # SVG icon components
│   │   │   └── utils.tsx      # UI utilities
│   │   ├── settings/          # Settings-specific components
│   │   │   ├── item.tsx
│   │   │   ├── items-container.tsx
│   │   │   ├── language-item.tsx
│   │   │   └── theme-item.tsx
│   │   ├── card.tsx
│   │   ├── cover.tsx
│   │   ├── title.tsx
│   │   └── login-form.tsx
│   │
│   ├── lib/                    # Shared utilities & libraries
│   │   ├── auth/              # Authentication logic
│   │   │   ├── index.tsx
│   │   │   └── utils.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── use-selected-theme.tsx
│   │   │   ├── use-is-first-time.tsx
│   │   │   └── index.tsx
│   │   ├── i18n/              # Internationalization setup
│   │   │   ├── index.tsx
│   │   │   ├── resources.ts
│   │   │   ├── utils.tsx
│   │   │   └── types.ts
│   │   ├── env.js             # Environment variables (client)
│   │   ├── storage.tsx        # MMKV storage abstraction
│   │   ├── utils.ts           # Common utilities
│   │   ├── test-utils.tsx     # Testing utilities
│   │   └── use-theme-config.tsx
│   │
│   ├── translations/           # Translation files
│   │   ├── en.json            # English
│   │   └── ar.json            # Arabic
│   │
│   └── types/                  # Shared TypeScript types
│
├── assets/                     # Static assets (images, fonts)
│   ├── icon.png
│   └── images/
│
├── .github/                    # GitHub configuration
│   ├── workflows/             # CI/CD pipelines
│   │   ├── lint-ts.yml
│   │   ├── type-check.yml
│   │   ├── test.yml
│   │   ├── e2e-android.yml
│   │   ├── expo-doctor.yml
│   │   └── eas-build-*.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE.md
│
├── .maestro/                   # E2E test scenarios
│
├── prompts/                    # AI prompt templates
│   ├── image-to-components.md
│   ├── write-unit-tests.md
│   ├── expo-doctor.md
│   └── svg-icon.md
│
├── scripts/                    # Build & utility scripts
│   └── i18next-syntax-validation.js
│
├── __mocks__/                  # Jest mocks
│
├── .env.development            # Development environment
├── .env.staging                # Staging environment
├── .env.production             # Production environment
├── .cursorrules                # Cursor AI rules
├── app.config.ts               # Expo configuration
├── babel.config.js             # Babel configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest configuration
├── eslint.config.mjs           # ESLint configuration
├── eas.json                    # EAS Build configuration
├── package.json                # Dependencies & scripts
└── pnpm-lock.yaml              # Lock file (DO NOT modify manually)
```

### Feature-Based Organization (Planned)

For HACCP-specific features, follow this structure:

```
src/
├── features/                   # Feature modules (to be created)
│   ├── checklists/            # HACCP checklists feature
│   │   ├── components/
│   │   ├── screens/
│   │   ├── hooks/
│   │   └── types.ts
│   ├── cleaning/              # QR code cleaning validation
│   ├── labels/                # DLC label printing
│   └── settings/              # App settings
```

---

## Development Workflows

### Prerequisites

1. **Node.js** LTS release
2. **pnpm** (required - enforced via preinstall hook)
3. **Watchman** (macOS/Linux)
4. **React Native dev environment** ([Setup Guide](https://reactnative.dev/docs/environment-setup))
5. **Git**
6. **Cursor** or **VS Code** with recommended extensions

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd haccp-express

# Install dependencies (must use pnpm)
pnpm install
```

### Running the App

```bash
# Development
pnpm start                      # Start Expo dev server
pnpm android                    # Run on Android
pnpm ios                        # Run on iOS
pnpm web                        # Run on web
pnpm xcode                      # Open iOS project in Xcode

# Staging
pnpm start:staging
pnpm android:staging
pnpm ios:staging

# Production
pnpm start:production
pnpm android:production
pnpm ios:production
```

### Prebuild (Native Projects)

```bash
pnpm prebuild                   # Development
pnpm prebuild:staging
pnpm prebuild:production
```

### Code Quality

```bash
pnpm lint                       # Run ESLint
pnpm type-check                 # Run TypeScript compiler
pnpm lint:translations          # Validate translation files
pnpm test                       # Run Jest tests
pnpm test:watch                 # Run tests in watch mode
pnpm test:ci                    # Run tests with coverage
pnpm check-all                  # Run all quality checks
```

### E2E Testing

```bash
pnpm install-maestro            # Install Maestro (first time)
pnpm e2e-test                   # Run E2E tests
```

### EAS Build

```bash
# Development builds
pnpm build:development:ios
pnpm build:development:android

# Staging builds
pnpm build:staging:ios
pnpm build:staging:android

# Production builds
pnpm build:production:ios
pnpm build:production:android
```

### Version Management

```bash
pnpm app-release                # Trigger version bump (interactive)
```

---

## Code Conventions

### TypeScript Guidelines

#### Use Types Over Interfaces

```typescript
// ✅ Preferred
type User = {
  id: string;
  name: string;
};

// ❌ Avoid
interface User {
  id: string;
  name: string;
}
```

#### Avoid Enums, Use Const Objects

```typescript
// ✅ Preferred
const Status = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

type Status = (typeof Status)[keyof typeof Status];

// ❌ Avoid
enum Status {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}
```

#### Explicit Return Types

```typescript
// ✅ Always specify return types
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

#### Use Absolute Imports

```typescript
// ✅ Preferred
import { Button } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { Env } from '@env';

// ❌ Avoid
import { Button } from '../../../components/ui';
```

### Component Structure

#### Functional Components with Named Exports

```typescript
import * as React from 'react';
import { Text, View } from '@/components/ui';

// Define props type at the top
type TemperatureCardProps = {
  temperature: number;
  unit: 'celsius' | 'fahrenheit';
  onUpdate?: (value: number) => void;
};

// Use function keyword
export function TemperatureCard({
  temperature,
  unit,
  onUpdate,
}: TemperatureCardProps) {
  return (
    <View className="rounded-lg bg-white p-4 shadow-sm">
      <Text className="text-2xl font-bold">
        {temperature}°{unit === 'celsius' ? 'C' : 'F'}
      </Text>
    </View>
  );
}
```

#### Component Best Practices

- **Keep components under 80 lines** - Break down larger components
- **Single responsibility** - Each component should have one clear purpose
- **Named exports** - Always use named exports (not default)
- **Props definition first** - Define prop types before component
- **Functional programming** - Avoid classes, prefer pure functions
- **Memoization** - Use `React.memo`, `useMemo`, `useCallback` to prevent unnecessary re-renders

### File Naming

- **kebab-case** for all files and directories
- Pattern: `temperature-card.tsx`, `use-temperature.ts`

```
✅ temperature-card.tsx
✅ use-checklists.ts
✅ api-provider.tsx

❌ TemperatureCard.tsx
❌ useChecklists.ts
❌ APIProvider.tsx
```

### Styling with NativeWind

```typescript
import { View, Text } from '@/components/ui';

export function ExampleComponent() {
  return (
    <View className="flex-row items-center justify-between bg-primary-100 p-4">
      <Text className="text-lg font-semibold text-gray-900">Title</Text>
    </View>
  );
}
```

**Important**: Always use predefined colors and fonts from `tailwind.config.js`. Never use arbitrary values like `bg-[#ff0000]`.

### State Management Patterns

#### Zustand Store Example

```typescript
import { create } from 'zustand';

type ChecklistStore = {
  items: ChecklistItem[];
  addItem: (item: ChecklistItem) => void;
  removeItem: (id: string) => void;
};

export const useChecklistStore = create<ChecklistStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
}));
```

#### React Query Pattern

```typescript
import { createQuery } from 'react-query-kit';
import { client } from '@/api/common/client';

type Response = { data: Checklist[] };
type Variables = { date: string };

export const useChecklists = createQuery<Response, Variables>({
  queryKey: ['checklists'],
  fetcher: async (variables) => {
    const response = await client.get('/checklists', {
      params: variables,
    });
    return response.data;
  },
});
```

### Error Handling

- **Avoid try/catch blocks** unless translating errors or handling them specifically
- Let React Query and React Error Boundary handle errors
- Log errors appropriately for debugging

```typescript
// ❌ Avoid unnecessary try/catch
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error(error);
  throw error; // Just re-throwing adds no value
}

// ✅ Let errors propagate naturally
const data = await fetchData();
return data;
```

---

## Environment Management

### Environment Files

The project uses three environment configurations:

```
.env.development    # Local development
.env.staging        # Staging/QA environment
.env.production     # Production environment
```

### Environment Variables Structure

**Build-time variables** (in `env.js`):

```javascript
// Static configuration (not in .env files)
const BUNDLE_ID = 'com.haccp-express';
const PACKAGE = 'com.haccp-express';
const NAME = 'HACCP-Express';
const EXPO_ACCOUNT_OWNER = 'expo-owner';
const EAS_PROJECT_ID = 'c3e1075b-6fe7-4686-aa49-35b46a229044';
const SCHEME = 'HACCP-Express';
```

**Client variables** (accessed via `@env`):

```typescript
import { Env } from '@env';

// Example usage
const apiUrl = Env.API_URL;
```

### Environment Variable Validation

Environment variables are validated using Zod schemas in `env.js`. Always validate new environment variables to catch configuration errors early.

### Switching Environments

```bash
# Via APP_ENV variable
APP_ENV=staging pnpm start
APP_ENV=production pnpm android

# Or use convenience scripts
pnpm start:staging
pnpm ios:production
```

---

## API & Data Fetching

### Architecture

- **Axios** for HTTP client
- **React Query** for server state management
- **React Query Kit** for query abstraction

### API Client Setup

Located in `src/api/common/client.tsx`:

```typescript
import { Env } from '@env';
import axios from 'axios';

export const client = axios.create({
  baseURL: Env.API_URL,
});
```

### Creating API Modules

Each API resource should have its own directory:

```
src/api/checklists/
├── index.ts              # Exports
├── types.ts              # Type definitions
├── use-checklists.ts     # GET list query
├── use-checklist.ts      # GET single query
└── use-add-checklist.ts  # POST mutation
```

### Query Hook Pattern

```typescript
import { createQuery } from 'react-query-kit';
import { client } from '@/api/common/client';
import type { Checklist } from './types';

type Response = Checklist[];
type Variables = void; // No variables needed

export const useChecklists = createQuery<Response, Variables>({
  queryKey: ['checklists'],
  fetcher: async () => {
    const response = await client.get<Response>('/checklists');
    return response.data;
  },
});
```

### Mutation Hook Pattern

```typescript
import { createMutation } from 'react-query-kit';
import { client } from '@/api/common/client';
import type { Checklist } from './types';

type Variables = {
  temperature: number;
  equipmentId: string;
};

export const useAddChecklist = createMutation<Checklist, Variables>({
  mutationFn: async (variables) => {
    const response = await client.post<Checklist>('/checklists', variables);
    return response.data;
  },
});
```

### Usage in Components

```typescript
import { useChecklists, useAddChecklist } from '@/api/checklists';

export function ChecklistScreen() {
  const { data, isLoading, error } = useChecklists();
  const { mutate: addChecklist } = useAddChecklist();

  const handleSubmit = (values: FormValues) => {
    addChecklist(
      { temperature: values.temp, equipmentId: values.id },
      {
        onSuccess: () => {
          // Handle success
        },
        onError: (error) => {
          // Handle error
        },
      }
    );
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return <ChecklistList items={data} />;
}
```

---

## Testing Strategy

### Unit Testing

**Framework**: Jest + React Native Testing Library

**Location**: Co-located with source files (`.test.tsx` extension)

```
src/components/ui/
├── button.tsx
└── button.test.tsx
```

### Test File Naming

```
component-name.test.tsx
use-custom-hook.test.ts
utils.test.ts
```

### What to Test

✅ **Do test:**
- Complex components with logic
- Custom hooks
- Utility functions
- Form validation logic

❌ **Don't test:**
- Simple presentational components that only display data
- Third-party library internals

### Example Test

```typescript
import { render, screen, fireEvent } from '@/lib/test-utils';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  it('should submit form with valid credentials', async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getByLabelText('Email'), 'test@example.com');
    fireEvent.changeText(screen.getByLabelText('Password'), 'password123');
    fireEvent.press(screen.getByText('Login'));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### E2E Testing

**Framework**: Maestro

**Location**: `.maestro/` directory

Test critical user flows:
- Checklist completion
- QR code scanning
- Label printing

---

## Git Workflow

### Commit Message Convention

Following [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]
[optional footer]
```

#### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add temperature validation` |
| `fix` | Bug fix | `fix: resolve checklist date formatting` |
| `docs` | Documentation | `docs: update API documentation` |
| `style` | Formatting | `style: fix indentation in settings` |
| `refactor` | Code refactoring | `refactor: simplify auth logic` |
| `test` | Add/update tests | `test: add checklist form tests` |
| `chore` | Maintenance | `chore: update dependencies` |
| `perf` | Performance | `perf: optimize list rendering` |

#### Rules

- Use lowercase
- Keep summary under 100 characters
- Reference issue numbers when applicable: `fix: resolve login issue (#123)`
- Be descriptive but concise

#### Examples

```bash
feat: add QR code scanner for equipment validation

fix: correct temperature threshold calculation in alerts

docs: add CLAUDE.md with comprehensive codebase guide

refactor: extract checklist validation logic to separate hook

test: add unit tests for temperature conversion utility

chore: upgrade expo to version 53

perf: memoize checklist list items to prevent re-renders
```

### Commit Hooks

#### Pre-commit (via Husky + Lint-staged)

Automatically runs on staged files:

1. **ESLint** - Fixes linting issues
2. **Prettier** - Formats code
3. **Translation validation** - Checks JSON syntax

#### Commit-msg (via Commitlint)

Validates commit messages against conventional commits format.

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- Feature branches: `feat/feature-name`
- Bug fixes: `fix/bug-description`
- Releases: `release/v1.0.0`

---

## Build & Deployment

### EAS Build Configuration

Located in `eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "staging": {
      "distribution": "internal",
      "env": {
        "APP_ENV": "staging"
      }
    },
    "production": {
      "distribution": "store",
      "env": {
        "APP_ENV": "production"
      }
    }
  }
}
```

### Build Commands

```bash
# Development builds (for testing)
pnpm build:development:ios
pnpm build:development:android

# Staging builds (internal testing)
pnpm build:staging:ios
pnpm build:staging:android

# Production builds (App Store/Play Store)
pnpm build:production:ios
pnpm build:production:android
```

### CI/CD Pipelines

Located in `.github/workflows/`:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `lint-ts.yml` | Push/PR | ESLint validation |
| `type-check.yml` | Push/PR | TypeScript type checking |
| `test.yml` | Push/PR | Run Jest tests |
| `expo-doctor.yml` | Push/PR | Expo project validation |
| `e2e-android.yml` | Push/PR | E2E tests on Android |
| `eas-build-qa.yml` | Push to develop | Staging builds |
| `eas-build-prod.yml` | Push to main | Production builds |
| `new-app-version.yml` | Version tag | Publish new version |

### Release Process

```bash
# 1. Bump version (runs prebuild automatically)
pnpm app-release

# 2. Push tags
git push --tags

# 3. GitHub Actions will trigger production builds
```

---

## Key Configuration Files

### `package.json`

- Dependencies and versions
- Scripts for all workflows
- Package manager enforcement (`pnpm`)

### `tsconfig.json`

- TypeScript compiler options
- Path aliases (`@/*`, `@env`)
- Strict mode enabled

### `tailwind.config.js`

- Color palette
- Typography scale
- Custom theme configuration

### `eslint.config.mjs`

- Linting rules
- React Native specific rules
- TypeScript configuration
- Import ordering rules

### `babel.config.js`

- React Native preset
- NativeWind plugin
- Module resolver for path aliases

### `app.config.ts`

- Expo configuration
- Environment-specific settings
- App identifiers and metadata

### `eas.json`

- EAS Build profiles
- Environment variable injection
- Distribution settings

### `.cursorrules`

- AI assistant coding guidelines
- Project-specific conventions
- Tech stack reference

---

## Common Tasks

### Adding a New Screen

1. Create file in `src/app/` following Expo Router conventions
2. Use kebab-case naming: `temperature-reading.tsx`
3. Define route type in the screen

```typescript
// src/app/temperature-reading.tsx
import { View, Text } from '@/components/ui';

export default function TemperatureReadingScreen() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold">Temperature Reading</Text>
    </View>
  );
}
```

### Adding a New Component

1. Create in `src/components/` (or feature-specific folder)
2. Use named export
3. Co-locate tests if complex

```typescript
// src/components/temperature-input.tsx
import * as React from 'react';
import { Input } from '@/components/ui';

type TemperatureInputProps = {
  value: number;
  onChange: (value: number) => void;
  unit?: 'celsius' | 'fahrenheit';
};

export function TemperatureInput({
  value,
  onChange,
  unit = 'celsius',
}: TemperatureInputProps) {
  return (
    <Input
      value={value.toString()}
      onChangeText={(text) => onChange(parseFloat(text) || 0)}
      keyboardType="decimal-pad"
      placeholder={`Temperature (°${unit === 'celsius' ? 'C' : 'F'})`}
    />
  );
}
```

### Adding a New API Endpoint

1. Create module directory in `src/api/`
2. Define types
3. Create query/mutation hooks

```typescript
// src/api/temperatures/types.ts
export type Temperature = {
  id: string;
  value: number;
  equipmentId: string;
  timestamp: string;
};

// src/api/temperatures/use-add-temperature.ts
import { createMutation } from 'react-query-kit';
import { client } from '@/api/common/client';
import type { Temperature } from './types';

type Variables = {
  value: number;
  equipmentId: string;
};

export const useAddTemperature = createMutation<Temperature, Variables>({
  mutationFn: async (variables) => {
    const response = await client.post('/temperatures', variables);
    return response.data;
  },
});

// src/api/temperatures/index.ts
export * from './types';
export * from './use-add-temperature';
```

### Adding a New Translation

1. Add key to `src/translations/en.json`
2. Add corresponding translation to `src/translations/ar.json`
3. Use in component:

```typescript
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation();
  return <Text>{t('myKey')}</Text>;
}
```

### Adding a New Environment Variable

1. Add to all `.env.*` files:

```env
# .env.development
NEW_VARIABLE=dev-value

# .env.staging
NEW_VARIABLE=staging-value

# .env.production
NEW_VARIABLE=production-value
```

2. Add to validation schema in `env.js`:

```javascript
const client = z.object({
  API_URL: z.string(),
  NEW_VARIABLE: z.string(), // Add here
});
```

3. Use in code:

```typescript
import { Env } from '@env';

const newVariable = Env.NEW_VARIABLE;
```

### Installing New Packages

**Always use Expo's installation command**:

```bash
npx expo install <package-name>
```

This ensures compatibility with the current Expo version.

For dev dependencies:

```bash
pnpm add -D <package-name>
```

---

## AI Assistant Guidelines

### When Working on This Codebase

#### 1. **Always Read Before Modifying**

Never modify a file without reading it first. Use the Read tool to understand current implementation.

#### 2. **Follow Existing Patterns**

Look at similar implementations in the codebase:
- API hooks? Check `src/api/posts/`
- New screen? Check `src/app/`
- New component? Check `src/components/`

#### 3. **Use the Tech Stack**

Don't introduce new libraries without discussion. Use:
- NativeWind for styling (not inline styles)
- React Query for data fetching (not useEffect + fetch)
- Zustand for global state (not Context API for complex state)
- React Hook Form + Zod for forms (not uncontrolled inputs)

#### 4. **Respect Conventions**

- **File naming**: kebab-case
- **Exports**: Named exports (not default)
- **Types**: Types over interfaces
- **Imports**: Absolute paths with `@/`
- **Components**: Under 80 lines, single responsibility
- **Commit messages**: Conventional commits format

#### 5. **Code Quality Checks**

Before marking work complete, ensure:

```bash
✅ pnpm lint          # No linting errors
✅ pnpm type-check    # No type errors
✅ pnpm test          # Tests pass
```

#### 6. **Testing Requirements**

- Add tests for complex components and hooks
- Don't test simple presentational components
- Use `src/lib/test-utils.tsx` for test rendering

#### 7. **Documentation**

- Add JSDoc comments for complex functions
- Update this CLAUDE.md if adding new patterns
- Update README.md if changing setup/usage

#### 8. **Mobile-First Considerations**

- Test on both iOS and Android
- Consider offline scenarios (MMKV for persistence)
- Optimize for performance (memoization)
- Ensure accessibility (a11y props)
- Handle keyboard interactions properly

#### 9. **HACCP Domain Knowledge**

When working on HACCP features:

- **Temperature readings**: Critical for food safety (0-4°C for fridges)
- **Traceability**: Always capture timestamp + user
- **Compliance**: Data must be auditable
- **Simplicity**: Kitchen staff need fast, 3-tap workflows
- **Offline-first**: Restaurant kitchens may have poor connectivity

#### 10. **Common Pitfalls to Avoid**

❌ Don't use default exports
❌ Don't use try/catch unnecessarily
❌ Don't use interfaces (use types)
❌ Don't use enums (use const objects)
❌ Don't use relative imports (use @/ aliases)
❌ Don't modify `pnpm-lock.yaml` manually
❌ Don't skip pre-commit hooks
❌ Don't create files with PascalCase or camelCase names
❌ Don't use arbitrary Tailwind values (`bg-[#ff0000]`)
❌ Don't install packages with npm/yarn (use pnpm)

### Quick Reference Commands

```bash
# Development
pnpm start                 # Start dev server
pnpm android              # Run Android
pnpm ios                  # Run iOS

# Quality checks
pnpm check-all            # Run all checks
pnpm lint                 # Lint code
pnpm type-check           # Type check
pnpm test                 # Run tests

# Building
pnpm prebuild             # Generate native projects
pnpm build:staging:ios    # Build staging iOS

# Installation
npx expo install <pkg>    # Install Expo-compatible package
pnpm add -D <pkg>         # Install dev dependency
```

### File Path Quick Reference

```
Configuration:
  - TypeScript: tsconfig.json
  - ESLint: eslint.config.mjs
  - Tailwind: tailwind.config.js
  - Expo: app.config.ts
  - Jest: jest.config.js

Source Code:
  - Screens: src/app/
  - Components: src/components/
  - API: src/api/
  - Utils: src/lib/
  - Translations: src/translations/

Environment:
  - Client env: src/lib/env.js
  - Build env: env.js (root)
  - Env files: .env.{development,staging,production}
```

---

## Additional Resources

- **Obytes Starter Docs**: https://starter.obytes.com
- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **NativeWind Docs**: https://www.nativewind.dev
- **React Query Docs**: https://tanstack.com/query
- **Project Spec**: See `HACCP_EXPRESS.md` for detailed requirements

---

## Version History

- **v1.0.0** (2025-01-21) - Initial CLAUDE.md creation
  - Comprehensive codebase documentation
  - Architecture and tech stack overview
  - Development workflows and conventions
  - AI assistant guidelines

---

**Last Updated**: 2025-01-21
**Project Version**: 0.0.1
**Maintained By**: Development Team
