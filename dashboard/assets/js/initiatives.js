/**
 * Initiatives rendering - dynamically generate from JSON
 */

function renderInitiatives(initiatives) {
    const container = document.getElementById('initiatives-container');
    if (!container) return;

    container.innerHTML = initiatives.map(initiative => `
        <div class="initiative ${initiative.status}" id="${initiative.id}">
            <div class="initiative-header" onclick="toggleInitiative('${initiative.id}')">
                <div class="initiative-title">
                    <span class="collapse-icon">▼</span>
                    ${initiative.name}
                </div>
                <div class="initiative-meta">
                    <span class="badge ${initiative.status}">${initiative.status}</span>
                    ${initiative.startDate ? `<span class="date">Started: ${initiative.startDate}</span>` : ''}
                </div>
            </div>
            <div class="initiative-description">${initiative.description}</div>
            <div class="initiative-content">
                ${renderEpics(initiative.epics)}
            </div>
        </div>
    `).join('');
}

function renderEpics(epics) {
    return epics.map(epic => `
        <div class="epic ${epic.status}" id="${epic.id}">
            <div class="epic-header" onclick="toggleEpic(event, '${epic.id}')">
                <div class="epic-title">
                    <span class="collapse-icon">▼</span>
                    ${epic.name}
                </div>
                <div class="epic-meta">
                    <span class="badge ${epic.status}">${epic.status}</span>
                    <span class="story-count">${epic.stories.length} stories</span>
                </div>
            </div>
            <div class="epic-description">${epic.description}</div>
            <div class="epic-content">
                ${renderStories(epic.stories)}
            </div>
        </div>
    `).join('');
}

function renderStories(stories) {
    if (!stories.length) return '<div class="no-stories">No stories yet</div>';
    
    return stories.map(story => `
        <div class="story ${story.status}" id="${story.id}">
            <div class="story-header" onclick="toggleStory(event, '${story.id}')">
                <div class="story-title">
                    <span class="collapse-icon">▼</span>
                    ${story.name}
                </div>
                <span class="badge ${story.status}">${story.status}</span>
            </div>
            <div class="story-content">
                ${renderSubtasks(story.subtasks)}
            </div>
        </div>
    `).join('');
}

function renderSubtasks(subtasks) {
    if (!subtasks || !subtasks.length) return '';
    
    return subtasks.map(subtask => `
        <div class="subtask complete">
            <span>${subtask}</span>
            <span class="badge complete">Done</span>
        </div>
    `).join('');
}

// Toggle functions
window.toggleInitiative = function(initiativeId) {
    const initiative = document.getElementById(initiativeId);
    if (initiative) {
        initiative.classList.toggle('collapsed');
    }
}

window.toggleEpic = function(event, epicId) {
    event.stopPropagation();
    const epic = document.getElementById(epicId);
    if (epic) {
        epic.classList.toggle('collapsed');
    }
}

window.toggleStory = function(event, storyId) {
    event.stopPropagation();
    const story = document.getElementById(storyId);
    if (story) {
        story.classList.toggle('collapsed');
    }
}

// Initialize when data is loaded
window.addEventListener('dashboardDataLoaded', (event) => {
    if (event.detail.initiatives) {
        renderInitiatives(event.detail.initiatives);
    }
});
