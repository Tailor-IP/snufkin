import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

const MilestoneSummary = ({task, className = ''}) => {
    const startDate = task.start_date.toUTCString().split(' ').splice(0,4).join(' ');
    return <div className={className}>
                <div className='title-line'>
                    <FontAwesomeIcon icon={faFlagCheckered} className='milestone-icon'/>
                    <span className className='milestone-title'>{task.title}</span>
                </div>
                <div className='milestone-date'>{startDate}</div>
           </div>
}

export default MilestoneSummary;