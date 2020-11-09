import React from 'react';
import {Button} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';

const FullScreen = () => {
    const onClick = async () => {
        const rootDiv = window.document.getElementById('snufkin');
        console.log(rootDiv)

        if (rootDiv.clientHeight >= window.innerHeight) {
            try {
                 await document.exitFullscreen()
            } catch (e) {
                rootDiv.requestFullscreen()
            }
        } else rootDiv.requestFullscreen()
    };

    return <div className='tooltip-button-wrapper'>
                <Button onClick={onClick} className='tooltip-button'>
                   <span className='tooltip-button-title'>Full Screen</span>
                   <FontAwesomeIcon icon={faExpandAlt} className='expand'/>
                </Button>
           </div>
}

export default FullScreen;