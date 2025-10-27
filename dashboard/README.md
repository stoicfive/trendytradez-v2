# TrendyTradez v2 - Dashboard

Modular project dashboard for tracking implementation progress.

## Structure

```
dashboard/
├── index.html              # Main dashboard HTML
├── assets/
│   ├── css/
│   │   └── styles.css      # All dashboard styles
│   └── js/
│       ├── navigation.js   # Navigation and collapsible logic
│       └── icons.js        # SVG icon definitions
└── README.md              # This file
```

## Features

- **Sidebar Navigation**: Fixed sidebar with icon-based navigation
- **Collapsible Sections**: Click epics and stories to collapse/expand
- **Quick Actions**: Expand/Collapse all sections at once
- **Modular Design**: Separate CSS and JS files for maintainability
- **Responsive**: Works on different screen sizes

## Usage

### Opening the Dashboard

```bash
open dashboard/index.html
```

Or from the project root:

```bash
open dashboard/index.html
```

### Updating Content

The dashboard content should be updated programmatically or manually in `index.html`.

### Adding New Sections

1. Add navigation link in sidebar
2. Add content section with matching ID
3. Update navigation.js if needed

## Customization

### Colors

Edit `assets/css/styles.css` to change the color scheme. Main colors:
- Background: `#0d1117`
- Sidebar: `#161b22`
- Primary: `#58a6ff`
- Success: `#3fb950`
- In Progress: `#1f6feb`

### Icons

SVG icons are defined in `assets/js/icons.js` for reusability.

## Maintenance

- Keep styles in `styles.css`
- Keep JavaScript logic in `navigation.js`
- Keep icons in `icons.js`
- Update `index.html` only for content changes

## Integration

The old `project-dashboard.html` in the root can be deprecated once content is migrated to this modular version.
