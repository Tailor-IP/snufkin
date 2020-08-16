import React, {useState} from 'react';
import {useEdit} from '../hooks';
import { Input } from 'antd';
import { selectedTaskState } from '../../store'
import { useSetRecoilState } from 'recoil';

const DisplayTitle = ({title}) => <div className='summary-title'>{title}</div>

const EditableTitle = ({task, className = ''}) => {
    const selectTask = useSetRecoilState(selectedTaskState);
    const [value, setValue] = useState(task.title);
    const onChange = ({target}) => setValue(target.value);
    const onSave = () => {
        const newTask = {...task, title: value, text: value};
        window.gantt.updateTask(task.id, newTask);
        selectTask(newTask)
    }

    const [editing, Switch] = useEdit(onSave);

    return !editing ? (
        <div className={`title-edit ${className}`}>
            <DisplayTitle title={task.title} />
            <Switch />
        </div>) : (
        <div className={`title-edit ${className}`}>
            <Input defaultValue={task.title} onChange={onChange} className='title-input'/>
            <Switch />
        </div>)
}


export default EditableTitle;