import React from 'react';
import {avg, updateBranch, aggregateTaskCostFields} from '../../utils';
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
    console.log('costs', initialCost, diff, updatedCost)
        updateBranch(initialTask, (task) => {
            const initialTaskCost = task[field] || 0;
            const updatedCost = parseFloat(initialTaskCost) + parseFloat(diff);
            const newTask = {...task,
                [field]: updatedCost,
            }
            window.gantt.updateTask(task.id, newTask);
        });
    }

const CostComponent = ({task, className = ''}) => {
    const attorneyFee = avg(task.minCost || 0, task.maxCost || 0) || 0;
    const officialFee = task.officialFee;
    const total = parseFloat(attorneyFee) + parseFloat(aggregateTaskCostFields(task));
    const isEditable = useRecoilValue(editable) && !task.isFolder;
    return <div className={`price-details ${className}`}>
               <Cost title="Attorney Fee" value={attorneyFee} editable={isEditable} onChange={onAttorneyFeeUpdate.bind(null, task)}/>
               <Cost title="Official Fee" value={officialFee} onChange={onOfficialFeeUpdate.bind(null, task)} editable={isEditable}/>
               <Cost title="Associate Fee" value={task.associateFee} onChange={getFieldUpdater('associateFee').bind(null, task)} editable={isEditable}/>
               <Cost title="Unidentified Fee" value={task.unidentifiedFee} onChange={getFieldUpdater('unidentifiedFee').bind(null, task)} editable={isEditable}/>
               <Cost title="Brokerage Fee" value={task.brokerageFee} onChange={getFieldUpdater('brokerageFee').bind(null, task)} editable={isEditable}/>
               <Cost title="Total" value={total} editable={false} className='total-cost'/>
           </div>
}

export default CostComponent;