export function formatNumber(num) {
    const factor = num > 1000 ? 100 : 10;
    return (Math.round(parseInt(num, 10)/factor) * factor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatFloat(num) {
    const splitNum = num.toString().split('.');
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

export const avg = (n1, n2) =>(parseFloat(n1) + parseFloat(n2)) / 2

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