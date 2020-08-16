import React, {useState, useRef, useEffect, forwardRef} from 'react';
import { InputNumber, Statistic } from 'antd';
import {useEdit} from '../hooks';
import { selectedTaskState } from '../../store'
import { useRecoilState } from 'recoil';

const noop = () => {};

const CostEdit = forwardRef(({title, value = 0, onChange, className = ''}, ref) => {
    return <div className={`cost-edit ${className}`}>
            <div className='cost-edit-title'>{title}</div>
            <InputNumber
                  ref={ref}
                  min={0}
                  value={value}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={onChange}
                />
            </div>
})

const DisplayCost = ({value, title, showIfEmpty = false }) => {
    return parseFloat(value) || showIfEmpty ? <Statistic title={title} value={value} precision={2} prefix={'$'} className='display-cost' /> : null
}

const EditableCost = ({value, title, onChange = noop, className = ''}) => {
    const [cost, setCost] = useState(value);
    const [selectedTask, selectTask] = useRecoilState(selectedTaskState);
    const [editing, EditSwitch] = useEdit(() => {
        onChange(cost);
        selectTask({...window.gantt.getTask(selectedTask.index)})
        });

    const inputRef = useRef();
    useEffect(() => {
        if  (editing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editing, inputRef])

    return editing ? (
    <div className='edit-cost'>
        <CostEdit value={cost} title={title} onChange={setCost} ref={inputRef}/>
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