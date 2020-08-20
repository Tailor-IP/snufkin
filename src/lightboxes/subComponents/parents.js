import React from 'react';
import {getParents, showTask} from '../../utils';
import { Breadcrumb, Button } from 'antd';
import { useRecoilState } from 'recoil';
import { selectedTaskState } from '../../store'

const Parents = ({className = ''}) => {
    const [selectedTask, selectTask] = useRecoilState(selectedTaskState)
    const parents = getParents(selectedTask);
    const onTaskClick = (task) => {
        window.gantt.hideLightbox();
        showTask(task.index);
        window.gantt.showLightbox(task.id);
        selectTask(task);
    };

    return <Breadcrumb className={className}>
            {parents.map((task) =>
                <Breadcrumb.Item key={task.index.toString()}>
                    <Button className='breadcrumb-button' key={task.index.toString()} type="link" onClick={onTaskClick.bind(null, task)}>
                        {task.title}
                    </Button>
                </Breadcrumb.Item>)
            }
           </Breadcrumb>
}

export default Parents;