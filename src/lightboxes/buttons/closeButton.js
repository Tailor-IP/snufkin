import React from 'react';
import {Button} from 'antd';
import {selectedTaskState} from '../../store';
import {useRecoilState} from 'recoil';

const CloseButton = ({className = ''}) => {
    const [selected, setSelectedTask] = useRecoilState(selectedTaskState)
    const onClose = () => {
        const updated =  {...window.gantt.getTask(selected.id)};
        updated.$source = [].concat(updated.$source);
        updated.$target = [].concat(updated.$target);
        window.gantt.updateTask(selected.id, updated);
        window.gantt.hideLightbox();
        setSelectedTask(null);
    }
    return <Button type='primary' className={`button close ${className}`} onClick={onClose}>Close</Button>
}

export default CloseButton;