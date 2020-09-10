import React, {useCallback} from 'react';
import { deleteTask } from '../../utils';
import {Button} from 'antd';

const DeleteButton = ({id}) => {
    const onClose = () => {
        window.gantt.hideLightbox();
        deleteTask(id);
    }
    return <Button onClick={onClose} className='delete-button button' type="primary" danger>Delete</Button>
}

export default DeleteButton;