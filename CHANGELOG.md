# Changelog

All notable changes to TrendyTradez v2 will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Automated dashboard system with JSON-driven data
- Modern UI/UX design system with glassmorphism and animations
- Mobile responsive dashboard with hamburger menu
- CLI tools for dashboard updates (`pnpm dashboard:update`)
- Pre-commit validation hooks for dashboard data
- Portable project management system for reuse
- Working epic/story collapse functionality
- Design system CSS with comprehensive component library
- Dynamic data rendering with JavaScript
- Initial v2 project structure
- Monorepo setup with Turborepo + PNPM
- Implementation plans for all phases
- Project documentation

### Changed
- Migrated from single-package to monorepo architecture
- Improved TypeScript configuration
- Enhanced testing strategy
- Switched to inline onclick handlers for reliable toggles
- Updated dashboard to use display:none for collapse

### Fixed
- Epic and story toggle functionality
- Event bubbling issues in collapse handlers
- CSS transitions for collapsed content
- Mobile sidebar toggle behavior

### Removed
- Legacy v1 scaffolding code
- Unused dependencies

---

## [2.0.0-alpha] - 2025-10-27

### Added
- Project initialization
- Implementation planning phase
- Directory structure setup

---

## [1.0.0] - 2025-10-27 (v1 - Previous Version)

### Features
- Core dashboard with drag-and-drop widgets
- Theme system (dark/light mode)
- TradingView widget integration
- Floating toolbar
- Sidebar navigation
- Grid overlay and snap-to-grid
- Fullscreen mode
- Keyboard shortcuts
- Basic accessibility features

### Known Issues
- No unit tests
- No widget persistence
- No user authentication
- Limited widget types
- No mobile optimization
- 8 npm vulnerabilities

---

**Legend**:
- `Added` - New features
- `Changed` - Changes in existing functionality
- `Deprecated` - Soon-to-be removed features
- `Removed` - Removed features
- `Fixed` - Bug fixes
- `Security` - Security fixes
