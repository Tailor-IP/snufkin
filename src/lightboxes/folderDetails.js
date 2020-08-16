import React from 'react';
import {portal} from '../hocs';
import {Progress, Cost, Summary} from './subComponents';
import Buttons from './buttons';

const FolderDetails = ({task, selectTask}) => {
    if (!task) return null;

    return <div className='details-lightbox'>
            <div className='details-collection'>
                <Summary task={task} selectTask={selectTask}/>
                <Progress task={task} className='details-progress'/>
            </div>
            <Cost task={task} editable={false}/>

            <div className='view-buttons-section'>
                <Buttons.Close className='read-close'/>
            </div>
        </div>
}

export default portal(FolderDetails, 'folder-details')