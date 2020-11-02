import React, {useState} from 'react';
import {sendSaveGanttMessage} from '../utils';
import {Button} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Spinner'

const Save = () => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            await window.gantt.onSave();
        }
        catch (e) {
            console.warn(e);
        }
        setLoading(false);
    }

    if (loading) return <div className='tooltip-button-wrapper'><Spinner /></div>

    return <div className='tooltip-button-wrapper'>
                           <Button onClick={onClick} className='tooltip-button'>
                              <span className='tooltip-button-title'>Save</span>
                              <FontAwesomeIcon icon={faSave} className='expand'/>
                           </Button>
                      </div>
}

export default Save;