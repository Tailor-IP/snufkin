import React from 'react';
import {formatDuration} from '../../utils';
import { Timeline, Button } from 'antd';
import Parents from './parents';

const Summary = ({task, selectTask}) => {
    return <div className='summary'>
                <Parents task={task} selectTask={selectTask} className='parents-component'/>
                <div className='summary-title'>{task.title}</div>
                <div>Duration: <span className='summary-duration'>{formatDuration(task.duration)}</span></div>
           </div>
}

export default Summary;