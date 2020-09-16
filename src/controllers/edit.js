import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';

const canUndo = () => {
    var stack = gantt.getUndoStack();
    return (stack.length > 0)
}

const canRedo = () => {
    var stack = gantt.getRedoStack();
    return (stack.length > 0)
}

const UndoRedo = ({className = ''}) => {
    const [redoAvailable, setRedoAvailable] = useState(false);
    const [undoAvailable, setUndoAvailable] = useState(true);

    const undo = () => {
        window.gantt.ext.undo()
    }

    const redo = () => {
        window.gantt.ext.redo()
    }

    return <div className={className} >
                <Button type="primary" disabled={!redoAvailable} className='UndoRedo-button' onClick={re} icon={<FontAwesomeIcon icon={faPlus} className='redo'/>} />
                <Button type="primary" disabled={!undoAvailable} className='UndoRedo-button' onClick={undo} icon={<FontAwesomeIcon icon={faMinus} className='undo'/>} />
           </div>
}

export default UndoRedo;