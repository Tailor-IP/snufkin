import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import Title from './editable-title'
import Date from './date';

const MilestoneSummary = ({task, className = '', editable}) => {
    const startDate = task && task.start_date && task.start_date.toUTCString ? task.start_date.toUTCString().split(' ').splice(0,4).join(' ') : null;
    return <div className={className}>
                <div className='title-line'>
                    <FontAwesomeIcon icon={faFlagCheckered} className='milestone-icon'/>
                    <Title className='milestone-title' task={task} />
                </div>
                <div className='milestone-date'><Date startDate={startDate}/></div>
           </div>
}

export default MilestoneSummary;