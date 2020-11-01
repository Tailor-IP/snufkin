import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { useRecoilState } from 'recoil';
import { undoStack, redoStack } from '../store';

const canUndo = () => {
    var stack = window.gantt.getUndoStack();
    return (stack.length > 0)
}

const canRedo = () => {
    var stack = window.gantt.getRedoStack();
    return (stack.length > 0)
}

const UndoRedo = ({className = ''}) => {
    const [undoStackLength, setUndo] = useRecoilState(undoStack);
    const [redoStackLength, setRedo]= useRecoilState(redoStack);

    const undo = () => {
        window.gantt.undo();
        if(window.gantt.onUndo) window.gantt.onUndo();
        setUndo(window.gantt.getUndoStack().length);
        setRedo(window.gantt.getRedoStack().length);
   }

    const redo = () => {
        window.gantt.redo();
        if(window.gantt.onUndo) window.gantt.onUndo();
        setRedo(window.gantt.getRedoStack().length);
        setUndo(window.gantt.getUndoStack().length);
  }

    return <div className='undo-redo-button' >
                <Button type="primary" disabled={!undoStackLength} className='undo-redo-button' onClick={undo} icon={<FontAwesomeIcon icon={faUndo} className='undo'/>} />
                <Button type="primary" disabled={!redoStackLength} className='undo-redo-button' onClick={redo} icon={<FontAwesomeIcon icon={faRedo} className='redo'/>} />
           </div>
}

export default UndoRedo;