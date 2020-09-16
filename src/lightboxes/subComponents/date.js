import React, {useState} from 'react';
import {useEdit} from '../hooks';
import { DatePicker, Switch } from 'antd';

const DisplayDate = ({startDate, end}) => {
    return <div className='date-display'>
                <span>{startDate}</span>
                {end ? <span> - {end}</span> : null}
            </div>
}

const taskTypes = {
    milestone: "milestone",
    project: "project",
   }

const EditDate = ({startDate, duration, onChange}) => {
    const [start, setStart] = useState(startDate);
    const [_duration, setDuration] = useState(duration);
    const [taskType, setType] = useState(duration ? taskTypes.project : taskTypes.milestone);
    const toggleType = () => {
        taskType === taskTypes.milestone ? setType(taskTypes.project) : setType(taskTypes.milestone);
    }
    return <span>
                  <Switch checkedChildren="Task" unCheckedChildren="Milestone" />
           </span>
}

const EditableDate = ({startDate, endDate, onChange = () => {}, duration }) => {
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(endDate);
    const [_duration, setDuration] = useState(duration);

    const [editing, EditSwitch] = useEdit(() => {
        onChange();
        });

    return <div className='date-edit'>
                <span className='value'>
                { editing ? <EditDate startDate={startDate} duration={duration} onChange={onChange}/> : <DisplayDate startDate={start} endDate={end} />}
                </span>
                <EditSwitch />
            </div>
}

const Date = ({editable = true, ...props}) => {
    return editable ? <EditableDate {...props} /> : <DisplayDate {...props} />
}

export default Date;