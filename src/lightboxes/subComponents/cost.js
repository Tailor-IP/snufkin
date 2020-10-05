import React from 'react';
import {avg, updateBranch, aggregateTaskCostFields, costUpdaters} from '../../utils';
import Cost from './cost-edit';
import { useRecoilValue } from 'recoil';
import { editable } from '../../store'

const onOfficialFeeUpdate = (initialTask, updatedCost) => {
    const diff = updatedCost - initialTask.officialFee;
    updateBranch(initialTask, (task) => {
        const updatedCost = parseFloat(task.officialFee) + parseFloat(diff);
        const newTask = {...task,
            officialFee: updatedCost,
            official_fee: updatedCost,
        }
        window.gantt.updateTask(task.id, newTask);
    });
}

const onAttorneyFeeUpdate = (initialTask, updatedCost) => {
    const diff = updatedCost - avg(initialTask.minCost, initialTask.maxCost);
    updateBranch(initialTask, (task) => {
        const updatedMinCost = parseFloat(task.minCost) + parseFloat(diff);
        const updatedMaxCost = parseFloat(task.maxCost) + parseFloat(diff);

        const newTask = {...task,
            minCost: updatedMinCost,
            min_attorney_fee: updatedMinCost,
            maxCost: updatedMaxCost,
            max_attorney_fee: updatedMaxCost
        }
        window.gantt.updateTask(task.id, newTask);
    });
}

const getFieldUpdater = (field) => (initialTask, updatedCost) => {
    const initialCost = initialTask[field] || 0;
    const diff = updatedCost - initialCost;
        updateBranch(initialTask, (task) => {
            const initialTaskCost = task[field] || 0;
            const updatedCost = parseFloat(initialTaskCost) + parseFloat(diff);
            const newTask = {...task,
                [field]: updatedCost,
            }
            window.gantt.updateTask(task.id, newTask);
        });
    }

const CostsTitle = ({editable}) => {
    return <div className={'cost-titles ' + (editable ? 'editable-cost-titles' : '')}>
        <span className='cost-category'>Estimated</span>
        <span className='cost-category'>Actual</span>
        <span className='cost-category'>Difference</span>
    </div>
}

const costFields = {
    attorneyFee: 0,
    officialFee: 0,
    associateFee: 0,
    unidentifiedFee: 0,
    brokerageFee: 0,
}

const CostComponent = ({task, className = ''}) => {
    const attorneyFee = avg(task.minCost || 0, task.maxCost || 0) || 0;
    const officialFee = task.officialFee;
    const total = parseFloat(attorneyFee) + parseFloat(aggregateTaskCostFields(task));
    const isEditable = useRecoilValue(editable) && !task.isFolder;
    const actualCost = task.actualCost ? {...costFields, ...task.actualCost} : {};
    const actualSum = task.actualCost ? Object.values(actualCost).reduce((sum, cost) => sum + cost, 0) : null;
    return <div className={`price-details ${className}`}>
                {task.actualCost ? <CostsTitle editable={isEditable} /> : null}
               <Cost title="Attorney Fee" value={attorneyFee} actualCost={actualCost.attorneyFee} editable={isEditable} onChange={costUpdaters.attorneyFee.bind(null, task)}/>
               <Cost title="Official Fee" value={officialFee} actualCost={actualCost.officialFee} onChange={costUpdaters.officialFee.bind(null, task)} editable={isEditable}/>
               <Cost title="Associate Fee" value={task.associateFee} actualCost={actualCost.associateFee} onChange={costUpdaters.associateFee.bind(null, task)} editable={isEditable}/>
               <Cost title="Unidentified Fee" value={task.unidentifiedFee} actualCost={actualCost.unidentifiedFee} onChange={costUpdaters.unidentifiedFee.bind(null, task)} editable={isEditable}/>
               <Cost title="Brokerage Fee" value={task.brokerageFee} actualCost={actualCost.brokerageFee} onChange={costUpdaters.brokerageFee.bind(null, task)} editable={isEditable}/>
               <Cost title="Total" value={total} actualCost={actualSum} editable={false} className={'total-cost ' + (isEditable && task.actualCost ? 'edit' : '')}/>
           </div>
}

export default CostComponent;