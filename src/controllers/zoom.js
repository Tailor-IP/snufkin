import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';

const canZoomOut = () => {
    const levelsCount = window.gantt.ext.zoom._levels.length;
    const currentLevel = window.gantt.ext.zoom.getCurrentLevel();
    return currentLevel + 1 < levelsCount
}

const canZoomIn = () => {
    return window.gantt.ext.zoom.getCurrentLevel() > 0;
}

const Zoom = ({className = ''}) => {
    const [zoomInAvailable, setZoomInAvailable] = useState(false);
    const [zoomOutAvailable, setZoomOutAvailable] = useState(true);

    const zoomIn = () => {
        window.gantt.ext.zoom.zoomIn();
        setZoomOutAvailable(canZoomOut());
        setZoomInAvailable(canZoomIn());
    }

    const zoomOut = () => {
        window.gantt.ext.zoom.zoomOut();
        setZoomOutAvailable(canZoomOut());
        setZoomInAvailable(canZoomIn());
    }

    return <div className={className} >
                <Button type="primary" disabled={!zoomInAvailable} className='zoom-button' onClick={zoomIn} icon={<FontAwesomeIcon icon={faPlus} className='zoom-in'/>} />
                <Button type="primary" disabled={!zoomOutAvailable} className='zoom-button' onClick={zoomOut} icon={<FontAwesomeIcon icon={faMinus} className='zoom-out'/>} />
           </div>
}

export default Zoom;