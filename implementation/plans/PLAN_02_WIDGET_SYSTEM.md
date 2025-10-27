# Implementation Plan: Widget System

## Overview
Build a robust, extensible widget system that serves as the foundation for the TrendyTradez dashboard.

---

## Objectives
- ✅ Create `@trendytradez/widgets` package with widget registry
- ✅ Implement widget lifecycle management
- ✅ Build widget context and hooks
- ✅ Create base widget components (TradingView, Calculator, Chart, Table, Note)
- ✅ Implement widget drag-and-drop system
- ✅ Add widget persistence layer
- ✅ Ensure full accessibility support

---

## Success Criteria
- [ ] Widget registry supports dynamic widget registration
- [ ] All widget types render correctly
- [ ] Drag-and-drop works smoothly (60fps)
- [ ] Widget state persists across sessions
- [ ] Widget system is fully accessible (WCAG 2.1 AA)
- [ ] Test coverage >80%
- [ ] Comprehensive Storybook documentation

---

## Package Structure

```
packages/widgets/
├── src/
│   ├── core/
│   │   ├── WidgetRegistry.ts       # Widget type registry
│   │   ├── WidgetContext.tsx       # Widget context provider
│   │   ├── useWidget.ts            # Widget hook
│   │   ├── useWidgetDrag.ts        # Drag hook
│   │   └── WidgetManager.ts        # Widget lifecycle manager
│   ├── components/
│   │   ├── WidgetContainer.tsx     # Base widget wrapper
│   │   ├── WidgetHeader.tsx        # Widget header with controls
│   │   ├── WidgetBody.tsx          # Widget content area
│   │   ├── WidgetResizer.tsx       # Resize handles
│   │   └── WidgetContextMenu.tsx   # Right-click menu
│   ├── types/
│   │   ├── TradingViewWidget/
│   │   ├── CalculatorWidget/
│   │   ├── ChartWidget/
│   │   ├── TableWidget/
│   │   └── NoteWidget/
│   ├── utils/
│   │   ├── widgetFactory.ts        # Widget creation factory
│   │   ├── widgetValidator.ts      # Widget validation
│   │   └── widgetSerializer.ts     # Persistence helpers
│   └── index.ts
├── __tests__/
├── .storybook/
├── package.json
├── tsconfig.json
└── README.md
```

---

## Implementation Steps

### Step 1: Create Widget Core System
**Acceptance Criteria**: Widget registry and context work correctly

**Tasks**:
1. Create `WidgetRegistry.ts`:
   ```typescript
   export class WidgetRegistry {
     private widgets = new Map<string, WidgetDefinition>();
     
     register(definition: WidgetDefinition): void {
       this.widgets.set(definition.type, definition);
     }
     
     get(type: string): WidgetDefinition | undefined {
       return this.widgets.get(type);
     }
     
     getAll(): WidgetDefinition[] {
       return Array.from(this.widgets.values());
     }
   }
   
   export interface WidgetDefinition {
     type: string;
     label: string;
     icon: React.ComponentType;
     component: React.ComponentType<WidgetProps>;
     defaultSize: { width: number; height: number };
     minSize?: { width: number; height: number };
     maxSize?: { width: number; height: number };
     resizable?: boolean;
     configurable?: boolean;
   }
   ```

2. Create `WidgetContext.tsx`:
   ```typescript
   interface WidgetContextValue {
     widgets: Widget[];
     addWidget: (widget: Omit<Widget, 'id'>) => void;
     updateWidget: (id: string, updates: Partial<Widget>) => void;
     removeWidget: (id: string) => void;
     duplicateWidget: (id: string) => void;
     registry: WidgetRegistry;
   }
   
   export const WidgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const [widgets, setWidgets] = useState<Widget[]>([]);
     const registry = useMemo(() => new WidgetRegistry(), []);
     
     // Implementation...
     
     return (
       <WidgetContext.Provider value={value}>
         {children}
       </WidgetContext.Provider>
     );
   };
   ```

3. Create `useWidget.ts` hook
4. Add tests for registry and context

### Step 2: Build Widget Container Components
**Acceptance Criteria**: Widget container renders with header and controls

**Tasks**:
1. Create `WidgetContainer.tsx`:
   ```typescript
   export const WidgetContainer: React.FC<WidgetContainerProps> = ({
     widget,
     children,
     onMove,
     onResize,
     onRemove,
   }) => {
     const { isDragging, dragHandleProps } = useWidgetDrag(widget.id);
     
     return (
       <div
         className="widget-container"
         style={{
           transform: `translate(${widget.position.x}px, ${widget.position.y}px)`,
           width: widget.size.width,
           height: widget.size.height,
           zIndex: widget.position.z,
         }}
         data-widget-id={widget.id}
         role="region"
         aria-label={`${widget.type} widget`}
       >
         <WidgetHeader
           title={widget.config.title}
           dragHandleProps={dragHandleProps}
           onRemove={onRemove}
         />
         <WidgetBody>{children}</WidgetBody>
         {widget.config.resizable && <WidgetResizer onResize={onResize} />}
       </div>
     );
   };
   ```

2. Create `WidgetHeader.tsx` with drag handle and controls
3. Create `WidgetBody.tsx` with content area
4. Create `WidgetResizer.tsx` with resize handles
5. Add accessibility attributes (ARIA)
6. Add keyboard navigation support

### Step 3: Implement Drag-and-Drop System
**Acceptance Criteria**: Widgets drag smoothly with proper constraints

**Tasks**:
1. Install and configure `@dnd-kit/core`
2. Create `useWidgetDrag.ts`:
   ```typescript
   export function useWidgetDrag(widgetId: string) {
     const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
       id: widgetId,
     });
     
     return {
       isDragging,
       dragHandleProps: { ...attributes, ...listeners, ref: setNodeRef },
       transform,
     };
   }
   ```
3. Implement drag constraints (canvas bounds)
4. Add snap-to-grid functionality
5. Implement collision detection (optional)
6. Add visual feedback (glow, shadow)
7. Ensure 60fps performance

### Step 4: Create Widget Types
**Acceptance Criteria**: All 5 widget types render and function correctly

**Tasks**:
1. **TradingViewWidget**:
   - Embed TradingView chart
   - Support symbol configuration
   - Add interval selection
   - Implement chart type options

2. **CalculatorWidget**:
   - Build basic calculator UI
   - Implement calculator logic
   - Add keyboard support
   - Support copy/paste

3. **ChartWidget**:
   - Integrate Recharts
   - Support multiple chart types (line, bar, area)
   - Add data configuration
   - Implement responsive sizing

4. **TableWidget**:
   - Create data table component
   - Add sorting functionality
   - Implement filtering
   - Support pagination

5. **NoteWidget**:
   - Build rich text editor (or simple textarea)
   - Add markdown support (optional)
   - Implement auto-save
   - Support formatting

### Step 5: Implement Widget Persistence
**Acceptance Criteria**: Widget state persists across page reloads

**Tasks**:
1. Create `widgetSerializer.ts`:
   ```typescript
   export function serializeWidgets(widgets: Widget[]): string {
     return JSON.stringify(widgets);
   }
   
   export function deserializeWidgets(data: string): Widget[] {
     return JSON.parse(data);
   }
   ```
2. Implement localStorage persistence
3. Add versioning for backward compatibility
4. Handle migration for schema changes
5. Add error handling for corrupted data

### Step 6: Build Widget Context Menu
**Acceptance Criteria**: Right-click menu works with keyboard support

**Tasks**:
1. Create `WidgetContextMenu.tsx`
2. Add menu items:
   - Duplicate
   - Delete
   - Settings
   - Bring to Front
   - Send to Back
3. Implement keyboard shortcuts
4. Add accessibility (ARIA menu role)
5. Style with theme system

### Step 7: Create Widget Picker/Modal
**Acceptance Criteria**: Users can add widgets via modal

**Tasks**:
1. Create `WidgetPickerModal.tsx`
2. Display available widget types
3. Show widget previews
4. Add search/filter functionality
5. Implement keyboard navigation
6. Add focus trap for accessibility

### Step 8: Add Tests and Documentation
**Acceptance Criteria**: >80% test coverage, complete Storybook docs

**Tasks**:
1. Write unit tests for all utilities
2. Write component tests for all widgets
3. Write integration tests for drag-and-drop
4. Create Storybook stories for each widget type
5. Document widget API
6. Create usage examples

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/modifiers": "^9.0.0",
    "@trendytradez/types": "workspace:*",
    "@trendytradez/ui": "workspace:*",
    "@trendytradez/utils": "workspace:*",
    "@trendytradez/theme": "workspace:*",
    "uuid": "^11.0.0",
    "recharts": "^2.15.0"
  },
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@storybook/react": "^8.0.0",
    "vitest": "^3.0.0"
  }
}
```

---

## Testing Requirements

### Unit Tests
- [ ] Widget registry add/remove/get
- [ ] Widget factory creates valid widgets
- [ ] Widget serialization/deserialization
- [ ] Widget validation logic

### Component Tests
- [ ] Widget container renders correctly
- [ ] Widget header shows controls
- [ ] Widget resizer handles resize events
- [ ] Context menu opens on right-click

### Integration Tests
- [ ] Drag-and-drop updates widget position
- [ ] Widget persistence saves/loads correctly
- [ ] Widget context manages state correctly
- [ ] Multiple widgets interact properly

### Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Screen reader announces widget actions
- [ ] Focus management is correct
- [ ] ARIA attributes are present

---

## Potential Risks

### Risk 1: Drag Performance Issues
**Mitigation**: Use CSS transforms, optimize re-renders with React.memo, profile with React DevTools

### Risk 2: Widget State Complexity
**Mitigation**: Use reducer pattern for complex state, consider Zustand for global state if needed

### Risk 3: Accessibility Challenges
**Mitigation**: Test with screen readers early, follow ARIA Authoring Practices Guide

---

## Timeline
- **Estimated Effort**: 5-7 days
- **Phase**: Core Features (Week 2-3)

---

## Related Plans
- PLAN_01_SHARED_PACKAGES.md (prerequisite)
- PLAN_03_DASHBOARD_CORE.md (depends on this)
- PLAN_04_TRADING_TOOLS.md (uses this)

---

## Notes
- Prioritize performance for drag-and-drop (60fps target)
- Keep widget types decoupled from widget system
- Design for extensibility (easy to add new widget types)
- Consider lazy loading for widget components

---

**Status**: Pending  
**Priority**: High  
**Assignee**: TBD  
**Created**: October 27, 2025
