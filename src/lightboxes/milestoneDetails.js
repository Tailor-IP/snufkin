import React from 'react';
import {portal} from '../hocs';
import {Cost, MilestoneSummary} from './subComponents';
import Buttons from './buttons';

const TaskDetails = ({task = {}, selectTask}) => {
    if (!task) return null;

    return <div className='milestone-details-lightbox'>
            <div className='details-collection'>
                <MilestoneSummary task={task} className='milestone-summary'/>
            </div>
            <Cost task={task} />

            <div className='view-buttons-section'>
                <Buttons.Close className='read-close'/>
            </div>
        </div>
}

export default portal(TaskDetails, 'milestone-details')