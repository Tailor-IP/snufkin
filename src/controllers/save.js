import React from 'react';
import {sendSaveGanttMessage} from '../utils';
import {Button} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const Save = () => {
    return <div className='tooltip-button-wrapper'>
                           <Button onClick={sendSaveGanttMessage} className='tooltip-button'>
                              <span className='tooltip-button-title'>Save</span>
                              <FontAwesomeIcon icon={faSave} className='expand'/>
                           </Button>
                      </div>
}

export default Save;