---
trigger: always_on
---

# TT Widget Dashboard Rules

## General Principles

- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Structure files: exported component, subcomponents, helpers, static content, types
- Follow Expo's official documentation for setting up and configuring projects
- Write clean, maintainable code that follows SOLID principles
- Favor composition over inheritance
- Keep functions small and focused on a single responsibility
- Use early returns to reduce nesting and improve readability

### Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Favor named exports for components to improve refactoring and discoverability
- Use PascalCase for component names and interfaces
- Use camelCase for functions, variables, and file names (non-component files)
- Prefix boolean variables with is, has, should, or can
- Use descriptive names that convey intent rather than implementation

### Syntax & Formatting

- Use the function keyword for pure functions to clearly distinguish them
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements
- Use declarative JSX that clearly expresses UI intent
- Use Prettier for consistent code formatting across the entire codebase
- Configure Prettier to run on save in your editor
- Limit line length to 100 characters for better readability
- Use trailing commas in multi-line objects and arrays
- Prefer const over let; avoid var completely

## Testing

- Write unit tests for all components, utilities, and business logic
- Use Jest as the primary testing framework
- Implement integration tests for critical user flows
- Use React Native Testing Library for component testing
- Aim for meaningful test coverage (>80%) rather than 100% coverage
- Write tests that validate behavior, not implementation details
- Always verify test installations and run tests before committing
- Mock external dependencies and API calls in unit tests
- Use descriptive test names that explain the expected behavior

## Performance

- Use React.memo() for components that render frequently with the same props
- Use useMemo for expensive computations and complex object/array creations
- Use useCallback for functions passed as props to memoized components
- Implement lazy loading for heavy components and screens
- Optimize images using Expo's Image component with appropriate sizing
- Use FlatList or FlashList for rendering large lists efficiently
- Profile performance using React DevTools and Expo's performance monitoring
- Avoid inline function definitions in render methods
- Implement code splitting where appropriate

## Documentation

- Document all API interactions, data flows, and state management patterns
- Use JSDoc comments for all exported functions and components
- Include prop types documentation with examples
- Document complex business logic and algorithms
- Maintain inline comments for non-obvious code sections
- Keep README files updated with setup instructions and architecture decisions
- Document breaking changes and migration paths

## Security

- Implement proper authentication using secure token storage (SecureStore)
- Use HTTPS for all network communications
- Sanitize and validate all user input to prevent XSS and injection attacks
- Never store sensitive data in AsyncStorage; use SecureStore instead
- Implement proper authorization checks on both client and server
- Use environment variables for sensitive configuration (never commit secrets)
- Implement rate limiting for API requests
- Keep dependencies updated to patch security vulnerabilities
- Follow OWASP Mobile Security guidelines

## Accessibility

- Follow WCAG 2.1 Level AA guidelines as minimum standard
- Use ARIA roles and attributes appropriately (aria-label, aria-describedby, etc.)
- Provide keyboard navigation support for all interactive elements
- Ensure sufficient color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Implement screen reader support using accessibilityLabel and accessibilityHint
- Test with actual screen readers (TalkBack on Android, VoiceOver on iOS)
- Provide alternative text for images and icons
- Ensure touch targets are at least 44x44 points
- Support dynamic text sizing

## Error Handling

- Implement comprehensive error handling using try-catch blocks
- Use error boundaries to catch and handle React component errors gracefully
- Log errors to monitoring services (e.g., Sentry) for production debugging
- Provide user-friendly, actionable error messages
- Implement retry logic for transient network failures
- Display loading states during asynchronous operations
- Handle offline scenarios gracefully with appropriate messaging
- Validate data at boundaries (API responses, user input)
- Create custom error classes for different error types

## Internationalization

- Implement i18next for internationalization and localization
- Structure translation files by feature/screen for better organization
- Support RTL (right-to-left) languages properly
- Provide language selection in user settings
- Use ICU message format for complex pluralization and formatting
- Externalize all user-facing strings (no hardcoded text)
- Test UI with different languages to ensure layout compatibility
- Format dates, numbers, and currencies according to locale

## Styling & UI

- Use Tailwind CSS (via NativeWind) as the primary styling solution
- Leverage Expo's built-in components for common UI patterns
- Implement responsive design using Flexbox and useWindowDimensions hook
- Support dark mode using Expo's useColorScheme hook
- Create reusable styled components for consistent design system
- Use react-native-reanimated for performant animations (60 FPS target)
- Implement gestures using react-native-gesture-handler
- Ensure high accessibility standards with proper ARIA roles and native props
- Follow platform-specific design guidelines (Material Design for Android, iOS HIG for iOS)
- Maintain consistent spacing, typography, and color scales
- Use safe area insets for proper layout on devices with notches/dynamic islands

## Workflow & Tools

- Use Jest for unit and integration testing
- Use ESLint with TypeScript support for code quality enforcement
- Use Prettier for automatic code formatting
- Configure pre-commit hooks with Husky to run linting and formatting
- Use TypeScript for type safety across the entire codebase
- Always verify installations of new packages
- Always verify and audit dependencies for security vulnerabilities
- Use Expo CLI for development and building
- Implement CI/CD pipelines for automated testing and deployment
- Use Git hooks to prevent commits with failing tests or linting errors
- Document all custom scripts in package.json with clear descriptions

## Quality Checks

- Run type checking, linting, and tests before committing any code
- If a file reports errors during checks, fix them immediately and rerun until it passes with zero errors
- Address lint warnings when they indicate potential bugs or code quality issues
- Use `--fix` flags for auto-fixable linting issues (e.g., `eslint --fix`, `prettier --write`)
- Ensure all tests pass locally before pushing changes
- Configure pre-commit hooks to automatically run quality checks
- Maintain 100% passing rate for type checking and critical lint rules
- Document any intentional rule exceptions with inline comments explaining why

## Summaries

- Create a new SUMMARY\_{IMPLEMENTATION}.md file (replace {IMPLEMENTATION} with the implementation name) for every new implementation in the /implementation/summaries/ folder (create folder if it doesn't exist). Include the following in each summary:
  - Implementation name and purpose
  - Directories and files modified or created
  - Key changes and features added
  - Any dependencies or configurations updated
- Do not use technical language in the SUMMARY\_{IMPLEMENTATION}.md. Write it in plain English. These summaries should be no longer than 75 lines and less than 3000 characters.

## Commands

- Maintain a COMMANDS.md file in the root directory documenting all project commands
- Create COMMANDS.md if it doesn't exist, organizing commands by category (setup, development, testing, deployment, etc.)
- Include command syntax, description, when to use it, and expected output for each entry
- Update COMMANDS.md immediately when introducing new commands or scripts
- Document command prerequisites, required environment variables, and potential issues
- Add examples of common command combinations and workflows
- Keep commands organized alphabetically within each category for easy reference

## Documentation

- Maintain up-to-date README.md in the root directory after each significant implementation
- Update documentation when changes are merged to the main branch
- Include setup instructions, project structure, and usage examples
- Document breaking changes and migration guides
- Keep API documentation synchronized with code changes

## Git Workflow

- Commit frequently with clear, descriptive commit messages following conventional commits format
- Use meaningful branch names that reflect the feature or fix (e.g., feature/user-auth, fix/navigation-bug)
- Create pull requests for all changes with detailed descriptions
- Never commit directly to main branch; always use feature branches
- Keep branches up-to-date by regularly syncing with main
- Delete branches after successful merge to keep repository clean
- Use semantic versioning for releases (MAJOR.MINOR.PATCH)
- Write informative commit messages that explain why, not just what
- Squash commits when merging to maintain clean history
- Tag releases with version numbers and release notes

## Icons & Visual Elements

- Always use SVG icons in frontend code for scalability and performance
- Never use emoji in frontend code; they render inconsistently across platforms
- Prefer icon libraries like react-native-vector-icons or @expo/vector-icons for consistency
- Ensure all icons have appropriate accessibility labels (accessibilityLabel prop)
- Use consistent icon sizing across the application (e.g., 16px, 24px, 32px)
- Optimize SVG files by removing unnecessary metadata and simplifying paths
- Support theme-aware icons that adapt to light/dark mode
- Maintain an icon design system with standardized colors and styles

## File Organization & Size

- Keep files under 500 lines for maintainability and readability
- Split large files into smaller, focused modules when approaching the limit
- Extract reusable logic into separate utility files
- Separate concerns: split components, hooks, types, and constants into dedicated files
- Use index files (index.ts/index.tsx) to re-export related modules for cleaner imports
- Group related files in feature-based directories (e.g., features/auth/, features/profile/)
- Prefer multiple small, focused files over one large monolithic file
- Follow the single responsibility principle: each file should have one clear purpose
- If a file exceeds 500 lines, refactor by:
  - Extracting helper functions into a separate utils file
  - Moving type definitions to a dedicated types file
  - Splitting complex components into smaller sub-components
  - Creating custom hooks for stateful logic
  - Moving constants and configuration to separate files
- Name files descriptively to reflect their content and purpose
- Avoid deeply nested directory structures (maximum 3-4 levels deep)
- Use barrel exports (index files) sparingly to avoid circular dependencies
- Keep related test files adjacent to source files (e.g., Button.tsx and Button.test.tsx)