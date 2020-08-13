import React from 'react';
import {Button} from 'antd';

const CloseButton = ({className = ''}) => {
    const onClose = () => {
        window.gantt.hideLightbox()
    }
    return <Button type='primary' className={`button close ${className}`} onClick={onClose}>Close</Button>
}

export default CloseButton;