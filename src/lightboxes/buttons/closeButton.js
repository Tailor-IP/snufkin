import React from 'react';
import {Button} from 'antd';
import {selectedTaskState} from '../../store';
import {useSetRecoilState} from 'recoil';

const CloseButton = ({className = ''}) => {
    const setSelectedTask = useSetRecoilState(selectedTaskState)
    const onClose = () => {
        window.gantt.hideLightbox();
        setSelectedTask(null);
    }
    return <Button type='primary' className={`button close ${className}`} onClick={onClose}>Close</Button>
}

export default CloseButton;