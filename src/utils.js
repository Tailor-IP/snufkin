import groupBy from 'lodash/groupBy';
import {sendMsg} from './connection-utils';

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
            const tasksMap = window.gantt.$data.tasksStore.pull;
            const tasksOrder = window.gantt.$data.tasksStore.fullOrder.flat();
            const tasks = tasksOrder.map(id => tasksMap[id]);
            const links = window.gantt.getLinks();
            return {tasks, links}
}

export const sendSaveGanttMessage = () => {
    sendMsg(JSON.stringify({type: 'snapshot', snapshot: getSnapshot()}));
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

export const findChildren = (id) => Object.values(window.gantt.$data.tasksStore.pull).filter(task => task.parentIndex === id);

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

    parents.forEach(parent => {
        const updated = {...parent};
        costEntries.forEach(([key, value]) => {
            updated[key] = updated[key] - value;
        });
        window.gantt.updateTask(parent.id, updated)
    })
}

export const updateChildren = (id, callback) => {
    const childrenMap = groupBy(window.gantt.getLinks(), 'source');
    const _update = (_id) => {
        const links = childrenMap[_id];
        if (!links) {
            return
        }

        const childrenIds = links.map(link => link.target);
        delete childrenMap[_id]; // to avoid infinite loop on circular links
        childrenIds.forEach(childId => {
            const task = window.gantt.getTask(childId)
            callback(task);
            _update(childId);
        })
    }
    _update(id);
}

export const onTaskMove = (initial, updatedStartDate) => {
    const diff = updatedStartDate - initial.start_date;
    updateChildren(initial.id, (task) => {
        task.start_date = new Date(task.start_date.valueOf() + diff);
        task.end_date = new Date(task.end_date.valueOf() + diff);
        window.gantt.updateTask(task.id, task);
    });
}

export const getFieldUpdater = (field) => (initialTask, updatedCost) => {
    const initialCost = initialTask[field] || 0;
    const diff = parseFloat(updatedCost) - parseFloat(initialCost);
        updateBranch(initialTask, (task) => {
            const initialTaskCost = task[field] || 0;
            let updatedCost = parseFloat(initialTaskCost) + parseFloat(diff);
            if (isNaN(updatedCost)) {
                window.gantt.message(`Failed to parse, resetting cost`);
                updatedCost = 0;
            }

            const newTask = {...task,
                [field]: updatedCost,
            }
            window.gantt.updateTask(task.id, newTask);
        });
    }

export const onOfficialFeeUpdate = (initialTask, updatedCost) => {
    const diff = (updatedCost || 0) - (initialTask.officialFee || 0);
    updateBranch(initialTask, (task) => {
        let updatedCost = parseFloat(task.officialFee) + parseFloat(diff);

        if (isNaN(updatedCost)) {
            window.gantt.message(`Failed to parse, resetting cost`);
            updatedCost = 0;
        }

        const newTask = {...task,
            officialFee: updatedCost,
            official_fee: updatedCost,
        }
        window.gantt.updateTask(task.id, newTask);
    });
}

export const onAttorneyFeeUpdate = (initialTask, updatedCost) => {
    const diff = updatedCost - avg(initialTask.minCost, initialTask.maxCost);
    updateBranch(initialTask, (task) => {
        let updatedMinCost = parseFloat(task.minCost) + parseFloat(diff);
        let updatedMaxCost = parseFloat(task.maxCost) + parseFloat(diff);

        if (isNaN(updatedMinCost) || isNaN(updatedMaxCost)) {
            window.gantt.message(`Failed to parse, resetting cost`);
            updatedMinCost = 0;
            updatedMaxCost = 0;
        }

        const newTask = {...task,
            minCost: updatedMinCost,
            min_attorney_fee: updatedMinCost,
            maxCost: updatedMaxCost,
            max_attorney_fee: updatedMaxCost
        }
        window.gantt.updateTask(task.id, newTask);
    });
}

export const costUpdaters = {
    associateFee: getFieldUpdater('associateFee'),
    unidentifiedFee: getFieldUpdater('unidentifiedFee'),
    brokerageFee: getFieldUpdater('brokerageFee'),
    officialFee: onOfficialFeeUpdate,
    attorneyFee: onAttorneyFeeUpdate,
}

export const onDurationChange = (initialTask, updatedDuration) => {
    if (updatedDuration === 0) {
        initialTask.type = window.gantt.config.types.milestone;
    } else {
        initialTask.type = window.gantt.config.types.task;
    }
    window.gantt.updateTask(initialTask.id, initialTask);
}

export const dateToString = (date) => {
    const [year, month, day] = date.toISOString().slice(0, 10).split('-');
    return `${day}/${month}/${year}`;
}

const extractCosts = (assignment) => {
    const feeKeys = Object.keys(assignment).filter(key => key.endsWith('Fee'));
    return feeKeys.map(key => ({key, value: assignment[key]}));
}

export const updateTaskCostsFromReceipts = (receipts) => {
    if (!receipts || !receipts.assignments) return;
    const assignments = receipts.assignments
    const tasks = Object.values(window.gantt.$data.tasksStore.pull);
    const actualCostsMap = groupBy(assignments, 'taskId');
    tasks.forEach(task => {
        if (task.actualCost) {
            const {actualCost, ...newTask} = task;
            window.gantt.updateTask(task.id, newTask)
        }

        if (actualCostsMap[task.id]) {
            const extractedCosts = actualCostsMap[task.id].map(extractCosts);
            const costsSum = extractedCosts.flat().reduce((sum, cost) => {
                sum[cost.key] = (sum[cost.key] || 0) + cost.value;
                return sum
            }, {})

            const updatedTask = {...task, actualCost: costsSum};
            window.gantt.updateTask(task.id, updatedTask)
        }
    })
}