import React, {useCallback} from 'react';
import { deleteTask } from '../../utils';
import {Button} from 'antd';

const DeleteButton = ({id}) => {
    const onDelete = () => {
        window.gantt.confirm({
            text: "Are you sure?",
            ok:"Delete",
            cancel:"Cancel",
            callback: (confirmed) => {
                if (confirmed) {
                    window.gantt.hideLightbox();
                    const task = window.gantt.getTask(id);
                    deleteTask(id);
                    window.gantt.message(`Task \"${task.title}\" deleted`);
                }
            }
        });

    }
    return <Button onClick={onDelete} className='delete-button button' type="primary" danger>Delete</Button>
}

export default DeleteButton;