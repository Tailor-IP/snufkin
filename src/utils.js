export function formatNumber(num) {
    const factor = num > 1000 ? 100 : 10;
    return Math.round((parseInt(num, 10)/factor) * factor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatFloat(num) {
    const splitNum = parseFloat(num).toFixed(2).toString().split('.');
    return [splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), splitNum[1]].join('.');
}

export function formatDuration(duration) {
    const daysInMonth = 30.4368499; // according to google
    const daysInYear = daysInMonth * 12;

    function formatString(years, months, days) {
        return ((years ? years  + " years" : '') + (months ? ' ' + months + ' months' : '') + (days ? ' ' +days + ' days' : '')).trim();
    }

    if (duration > 36 * daysInMonth) {
        const years = Math.floor(duration / daysInYear);
        const months = Math.floor((duration - (years * daysInYear)) / daysInMonth);
        const days = Math.round(duration - (years * daysInYear) - (months * daysInMonth));
        return formatString(years, months, days);
    }

    if (duration > 61) {
        const months = Math.floor(duration / daysInMonth);
        const days = Math.round(duration - months * daysInMonth);
        return formatString(0, months, days);
    }

    return formatString(0,0,duration);
}

export function getCostString(minCost, maxCost, officialFee) {
    return "~ " + formatNumber((parseFloat(minCost) + parseFloat(maxCost))/2 + parseFloat(officialFee)) + '$';
}

export const avg = (n1, n2) => ((parseFloat(n1) + parseFloat(n2)) / 2).toFixed(2);

export const getParents = (task) => {
    const parents = [];
    let parentId = task.parent;
    let item;
    while (parentId) {
        item = window.gantt.getTask(parentId);
        parents.unshift(item);
        parentId = item.parent;
    }
    return parents;
}

export const showTask = (id) => {
    window.gantt.showTask(id);
}

export const updateBranch = (task, callback) => {
    const branch = [task].concat(getParents(task))
    branch.forEach(callback);
}

export const getSnapshot = () => {
            const tasks = Object.values(window.gantt.$data.tasksStore.pull);
            const links = window.gantt.getLinks();
            return {tasks, links}
}

const fieldsToAggregate = [
    'officialFee',
    'associateFee',
    'unidentifiedFee',
    'brokerageFee',
]

export const aggregateTaskCostFields = (task) => {
    return fieldsToAggregate.reduce((sum, field) => parseFloat(sum) + parseFloat(task[field] || 0) , 0);
}

export const findChildren = (id) => Object.values(window.gantt.$data.tasksStore.pull).filter(task => task.parent === id);

export const deleteTask = (id) => {
    const task = window.gantt.getTask(id);
    if (!task) return

    const children = findChildren(id);
    const parent = task.parent;

    children.forEach(task => {
        window.gantt.updateTask(task.id, {...task, parent})
    });

    if(!task.isFolder) {
        reductTaskCostFromParents(task);
    }

    window.gantt.deleteTask(id);
}

const reductTaskCostFromParents = (task) => {
    const parents = getParents(task);
    const costEntries = Object.entries(task).filter(([key, value]) => (key.toLowerCase().includes('fee') || key.includes('Cost')) && value);

    console.log(costEntries, parents);

    parents.forEach(parent => {
        const updated = {...parent};
        costEntries.forEach(([key, value]) => {
            updated[key] = updated[key] - value;
        });
        window.gantt.updateTask(parent.id, updated)
    })
}
