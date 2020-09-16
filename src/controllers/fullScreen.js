import React from 'react';
import {Button} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';

const FullScreen = () => {
    const onClick = () => window.gantt.ext.fullscreen.expand();
    return <Button onClick={onClick}>
                <div className='fullscreen-button'>
                   <span className='fullscreen-button-title'>Full Screen</span>
                   <FontAwesomeIcon icon={faExpandAlt} className='expand'/>
               </div>
            </Button>
}

export default FullScreen;