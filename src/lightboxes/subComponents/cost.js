import React from 'react';
import {avg, updateBranch} from '../../utils';
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

const CostComponent = ({task, className = ''}) => {
    const attorneyFee = avg(task.minCost, task.maxCost) || 0;
    const officialFee = task.officialFee;
    const total = parseFloat(attorneyFee) + parseFloat(officialFee);
    const isEditable = useRecoilValue(editable)
    return <div className={`price-details ${className}`}>
               <Cost title="Attorney Fee" value={attorneyFee} editable={isEditable} onChange={onAttorneyFeeUpdate.bind(null, task)}/>
               <Cost title="Official Fee" value={officialFee} onChange={onOfficialFeeUpdate.bind(null, task)} editable={isEditable}/>
               <Cost title="Total" value={total} editable={false}/>
           </div>
}

export default CostComponent;