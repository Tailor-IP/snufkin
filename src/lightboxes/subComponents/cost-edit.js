import React, {useState, useRef, useEffect, forwardRef} from 'react';
import { InputNumber } from 'antd';
import {useEdit} from '../hooks';
import { selectedTaskState } from '../../store'
import { useRecoilState } from 'recoil';
import { formatFloat } from '../../utils';

const noop = () => {};

const CostEdit = forwardRef(({title, value = 0, onChange, className = ''}, ref) => {
    return <div className={`cost-edit ${className}`}>
            <span className='cost-edit-title'>{title}</span>
            <InputNumber
                  ref={ref}
                  min={0}
                  value={value ? value : ''}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={onChange}
                />
            </div>
})

const DisplayCost = ({value, title, showIfEmpty = false, className = '' }) => {
    return parseFloat(value) >= 0 || showIfEmpty ? (
     <div className={`cost-display ${className}`}>
        <span className='cost-edit-title'>{title}</span>
        <span className='display-cost'>{`$ ${formatFloat(value || 0)}`}</span>
     </div>)
     : null
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
        if (editing && inputRef.current) {
           inputRef.current.focus();
        }
    }, [editing, inputRef])

    useEffect(() => () => { // save on close
        if (editing) {
            onChange(cost);
        }
    }, [cost])

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

const Cost = ({value, title, onChange = noop, className = '', editable = false}) => {
    return editable ? <EditableCost value={value} title={title} onChange={onChange} className={className}/> : <DisplayCost value={value} title={title} className={className}/>
}

export default Cost