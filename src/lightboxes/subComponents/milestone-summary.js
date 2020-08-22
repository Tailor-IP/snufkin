import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import Title from './editable-title'

const MilestoneSummary = ({task, className = '', editable}) => {
    const startDate = task.start_date.toUTCString().split(' ').splice(0,4).join(' ');
    return <div className={className}>
                <div className='title-line'>
                    <FontAwesomeIcon icon={faFlagCheckered} className='milestone-icon'/>
                    <Title className='milestone-title' task={task} />
                </div>
                <div className='milestone-date'>{startDate}</div>
           </div>
}

export default MilestoneSummary;