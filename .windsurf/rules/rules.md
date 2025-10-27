---
trigger: always_on
---

## Summaries

- Keep summaries concise and to the point in chat. Do not write comprehensive, detailed summaries after each implementation. If you must, create a new .md summary in the /implementation/summaries/ folder. the document should also include the folder/directory and file that was worked on so the user can reference it or find it later. Do not use technical language in the .md. write it in plain english. these summaries should be no longer that 75 lines and less than 3000 characters.

## Documentation

- Always update the README.md at the root directory after each implementation has been tested and the user confirms that features are working as expected.

## Git

- Always update each branch. After each implementation even if the implementation has not been tested or confirmed to be working as expected.

## Commands

- Create a .md file for all commands used in the project (if this file does not exist, create it). The file should be named COMMANDS.md and should be placed in the root directory of the project. Always update this file with new commands as they are used or added.

## Implementation Plans

- Create a detailed implementation plan in Markdown format before starting any significant feature or refactoring
- Store implementation plans in `/implementation/plans/` directory with descriptive names (e.g., `PLAN_USER_AUTHENTICATION.md`, `PLAN_PERFORMANCE_OPTIMIZATION.md`)
- Each implementation plan should include:
  - Clear objectives and success criteria
  - List of files to be created, modified, or deleted
  - Step-by-step implementation tasks with acceptance criteria
  - Dependencies and prerequisites
  - Estimated timeline and effort
  - Potential risks and mitigation strategies
  - Testing requirements and validation steps
- Break down large implementations into phases with clear milestones
- Update implementation plans as work progresses to reflect actual changes and discoveries
- Mark completed tasks with checkboxes for easy progress tracking
- Reference the implementation plan in related commits and pull requests
- Archive completed plans in `/implementation/plans/completed/` directory
- Use consistent formatting and structure across all implementation plans for easy reference