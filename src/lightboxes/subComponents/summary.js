import React from 'react';
import {formatDuration} from '../../utils';
import Parents from './parents';
import Title from './editable-title'

const Summary = ({task, selectTask}) => {
    return <div className='summary'>
                <Parents task={task} selectTask={selectTask} className='parents-component'/>
                <Title task={task}/>
                <div>Duration: <span className='summary-duration'>{formatDuration(task.duration)}</span></div>
           </div>
}

export default Summary;