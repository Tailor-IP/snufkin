import React, {useState, useRef, useEffect} from 'react';
import {useEdit} from '../hooks';
import { Input } from 'antd';
import { selectedTaskState } from '../../store'
import { useSetRecoilState } from 'recoil';

const DisplayTitle = ({title}) => <div className='summary-title'>{title}</div>

const EditableTitle = ({task, className = ''}) => {
    const selectTask = useSetRecoilState(selectedTaskState);
    const inputRef = useRef();
    const [value, setValue] = useState(task.title);
    const onChange = ({target}) => setValue(target.value);
    const onSave = () => {
        const newTask = {...task, title: value, text: value};
        window.gantt.updateTask(task.id, newTask);
        selectTask(newTask)
    }

    const [editing, Switch] = useEdit(onSave);

    useEffect(() => {
        if  (editing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editing, inputRef])

    return !editing ? (
        <div className={`title-edit ${className}`}>
            <DisplayTitle title={task.title} />
            <Switch />
        </div>) : (
        <div className={`title-edit ${className}`}>
            <Input defaultValue={task.title} onChange={onChange} onPressEnter={()=>{}} className='title-input' ref={inputRef}/>
            <Switch />
        </div>)
}


export default EditableTitle;