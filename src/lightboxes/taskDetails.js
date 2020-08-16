import React from 'react';
import {portal} from '../hocs';
import {Progress, Cost, Summary} from './subComponents';
import Buttons from './buttons';

const TaskDetails = ({task}) => {
    if (!task) return null;

    return <div className='details-lightbox'>
            <div className='details-collection'>
                <Summary task={task} />
                <Progress task={task} className='details-progress'/>
            </div>
            <Cost task={task} />
            <div className='view-buttons-section'>
                <Buttons.Close className='read-close'/>
            </div>
        </div>
}

export default portal(TaskDetails, 'task-details')