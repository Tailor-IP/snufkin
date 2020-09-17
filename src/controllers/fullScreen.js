import React from 'react';
import {Button} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';

const FullScreen = () => {
    const onClick = () => window.gantt.ext.fullscreen.expand();
    return <div className='fullscreen-button-wrapper'>
                <Button onClick={onClick} className='fullscreen-button'>
                   <span className='fullscreen-button-title'>Full Screen</span>
                   <FontAwesomeIcon icon={faExpandAlt} className='expand'/>
                </Button>
           </div>
}

export default FullScreen;