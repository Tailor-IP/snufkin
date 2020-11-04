import React from 'react';
import {Button} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';

const FullScreen = () => {
    const rootDiv = window.document.getElementById('snufkin');
    const onClick = () => {
        if (!window.screenTop && !window.screenY) document.exitFullscreen()
        else rootDiv.requestFullscreen()
    };

    return <div className='tooltip-button-wrapper'>
                <Button onClick={onClick} className='tooltip-button'>
                   <span className='tooltip-button-title'>Full Screen</span>
                   <FontAwesomeIcon icon={faExpandAlt} className='expand'/>
                </Button>
           </div>
}

export default FullScreen;