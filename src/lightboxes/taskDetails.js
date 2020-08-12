import React from 'react';
import {portal} from '../hocs';
import {Progress, Cost, Summary} from './subComponents';

const TaskDetails = ({task, selectTask}) => {
    if (!task) return null;

    return <div className='details-lightbox'>
            <div className='details-collection'>
                <Summary task={task} selectTask={selectTask}/>
                <Progress task={task} className='details-progress'/>
            </div>
            <Cost task={task} />
        </div>
}

export default portal(TaskDetails, 'task-details')