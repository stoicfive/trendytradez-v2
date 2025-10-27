# Dashboard Update Checklist

This checklist ensures the project dashboard stays current after each implementation step.

## Dashboard Location

The modular dashboard is located at `/dashboard/index.html` with:
- Styles: `/dashboard/assets/css/styles.css`
- JavaScript: `/dashboard/assets/js/navigation.js`
- Icons: `/dashboard/assets/js/icons.js`

The legacy `project-dashboard.html` in root is deprecated.

## After Completing a Sub-task

- [ ] Mark sub-task as complete in the dashboard
- [ ] Update sub-task badge from "Pending" to "Done"
- [ ] Add `complete` class to sub-task element
- [ ] Update "Next Actions" section with new current task

## After Completing a Story

- [ ] Update story status badge (Pending → In Progress → Complete)
- [ ] Update story border color (gray → blue → green)
- [ ] Update Epic progress counter (e.g., "1/2 Stories Complete" → "2/2 Stories Complete")
- [ ] Move to next story in Epic

## After Completing a Package

- [ ] Update package status in "Packages" section (Pending → Complete)
- [ ] Update "Packages Created" stat (e.g., "2/9" → "3/9")
- [ ] Update progress bar percentage
- [ ] Update "Current Status" section in Overview
- [ ] Update package description if it changed (e.g., "Shared UI" → "Tailwind + Tremor")
- [ ] Mark corresponding sub-task as complete in Implementation Plans

## After Completing an Epic

- [ ] Update Epic progress to show all stories complete
- [ ] Update "Plans Complete" stat
- [ ] Update overall progress bar
- [ ] Add completion note in "Blockers & Notes" if needed

## After Each Git Commit

- [ ] Add commit to "Recent Commits" section
- [ ] Include commit message, date, and short hash
- [ ] Keep only last 6-8 commits visible

## General Updates

- [ ] Update "Last Updated" timestamp in footer
- [ ] Update "Next Actions" section with current and upcoming tasks
- [ ] Add any blockers to "Blockers & Notes" section
- [ ] Update implementation summaries in `/implementation/summaries/`
- [ ] Update "Current Status" descriptions to reflect latest work
- [ ] Commit dashboard changes with descriptive message

## After Adding New Technology/Framework

- [ ] Update relevant package descriptions to mention the technology
- [ ] Update "Current Status" to highlight the new addition
- [ ] Add to "Next Actions" if it requires follow-up work (e.g., refactoring)
- [ ] Create memory for the new technology/framework decision

## Quick Reference: What to Update Where

### Overview Tab
- Progress statistics (Plans, Packages, Phase)
- Current Status section
- Next Actions section
- Blockers & Notes section

### Implementation Plans Tab
- Epic progress counters
- Story status badges
- Sub-task completion status
- Sub-task badges (Done/Pending)

### Packages Tab
- Package status badges
- Package completion state

### Recent Commits Tab
- Add new commits at the top
- Remove old commits (keep last 6-8)

### Footer
- Last Updated timestamp

---

## Example Update Flow

### Scenario: Just completed @trendytradez/ui package

1. **Overview Tab**:
   - Update "Packages Created" from "2/9" to "3/9"
   - Update progress bar from 22% to 33%
   - Update "Current Status" to show @trendytradez/ui complete
   - Update "Next Actions" current task to @trendytradez/theme

2. **Implementation Plans Tab**:
   - Mark "Create @trendytradez/ui package" sub-task as complete
   - Change badge from "Pending" to "Done"
   - Add `complete` class to sub-task

3. **Packages Tab**:
   - Change @trendytradez/ui badge from "Pending" to "Complete"

4. **Recent Commits Tab**:
   - Add new commit entry at top

5. **Footer**:
   - Update timestamp

6. **Commit**:
   ```bash
   git add project-dashboard.html
   git commit -m "docs: update dashboard with @trendytradez/ui completion"
   ```

---

**Remember**: The dashboard is our single source of truth for project status. Keep it updated!
