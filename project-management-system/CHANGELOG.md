# Changelog

## [1.2.0] - 2025-10-27

### Added
- Comprehensive WORKFLOW_CHECKLIST.md for maintaining dashboard
- Auto-update git commits in dashboard from git log
- Epic and story status handling in CLI tool
- Better error messages and warnings in update script
- Documentation of manual vs automated steps

### Fixed
- Dashboard update workflow - now properly handles epic completion
- CLI tool now supports --epic and --story flags
- Auto-syncs recent commits from git
- Clear documentation of what requires manual updates

### Changed
- Enhanced update-dashboard.js with better automation
- Improved feedback messages in CLI tool
- Better documentation of workflow gaps

## [1.1.0] - 2025-10-27

### Added
- Modern UI/UX design system with animations and visual effects
- Glassmorphism effects with backdrop blur
- Enhanced badge styles with gradient backgrounds
- Micro-interactions and hover effects
- Mobile responsive design with hamburger menu
- Working toggle functionality for epics and stories
- Design system CSS with comprehensive component library

### Fixed
- Epic and story collapse/expand functionality
- Event bubbling issues in toggle handlers
- CSS transitions for collapsed content
- Mobile sidebar toggle behavior

### Changed
- Switched from event listeners to inline onclick handlers for reliability
- Improved visual hierarchy with shadows and depth
- Enhanced accessibility with better focus states

## [1.0.0] - 2025-10-27

### Added
- Initial release of portable project management system
- JSON-driven dashboard with dynamic rendering
- CLI tools for dashboard updates
- Pre-commit validation hooks
- Automated workflow with scripts
- Complete documentation (SETUP.md, USAGE.md, CASCADE_WORKFLOW.md)
- Template files for easy project setup
- Interactive setup script
