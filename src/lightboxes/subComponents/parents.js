import React from 'react';
import {getParents, formatDuration, showTask} from '../../utils';
import { Breadcrumb, Button } from 'antd';

const Parents = ({task, selectTask, className = ''}) => {
    const parents = getParents(task);
    const onTaskClick = (task) => {
        showTask(task.index);
        selectTask(task);
    };

    return <Breadcrumb className={className}>
            {parents.map(task =>
                <Breadcrumb.Item key={task._id}>
                    <Button className='breadcrumb-button' key={task._id} type="link" onClick={onTaskClick.bind(null, task)}>
                        {task.title}
                    </Button>
                </Breadcrumb.Item>)
            }
           </Breadcrumb>
}

export default Parents;