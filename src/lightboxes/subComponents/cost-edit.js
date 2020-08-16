import React, {useState} from 'react';
import { InputNumber, Statistic } from 'antd';
import {useEdit} from '../hooks';
import { selectedTaskState } from '../../store'
import { useRecoilState } from 'recoil';

const noop = () => {};

const CostEdit = ({title, value = 0, onChange, className = ''}) => {
    return <div className={`cost-edit ${className}`}>
            <div className='cost-edit-title'>{title}</div>
            <InputNumber
                  value={value}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={onChange}
                />
            </div>
}

const DisplayCost = ({value, title, showIfEmpty = false }) => {
    return parseFloat(value) || showIfEmpty ? <Statistic title={title} value={value} precision={2} prefix={'$'} className='display-cost' /> : null
}

const EditableCost = ({value, title, onChange = noop, className = ''}) => {
    const [cost, setCost] = useState(value);
    const [selectedTask, selectTask] = useRecoilState(selectedTaskState);
    const [editing, EditSwitch] = useEdit(() => {
        onChange(cost)
        selectTask({...window.gantt.getTask(selectedTask.index)})
        });

    return editing ? (
    <div className='edit-cost'>
        <CostEdit value={cost} title={title} onChange={setCost}/>
        <EditSwitch className='cost-edit-switch'/>
    </div>) :
    (<div className='edit-cost'>
        <DisplayCost value={value} title={title} showIfEmpty/>
        <EditSwitch className='cost-edit-switch' />
        </div>)
}

const Cost = ({value, title, onChange = noop, className = '', editable = true}) => {
    return editable ? <EditableCost value={value} title={title} onChange={onChange} /> : <DisplayCost value={value} title={title}/>
}

export default Cost