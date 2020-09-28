import React, {useState, useRef, useEffect, forwardRef} from 'react';
import { InputNumber } from 'antd';
import {useEdit} from '../hooks';
import { selectedTaskState } from '../../store'
import { useRecoilState } from 'recoil';
import { formatFloat } from '../../utils';

const noop = () => {};
const DIFF_PERCENT_THRESHOLD = 15;

const CostEdit = forwardRef(({title, value = 0, onChange, className = ''}, ref) => {
    return <div className={`cost-edit ${className}`}>
            <span className='cost-edit-title'>{title}</span>
            <InputNumber
                  ref={ref}
                  min={0}
                  value={parseFloat(value) ? value : ''}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={onChange}
                />
            </div>
})

const DisplayCost = ({value = 0, actualCost, title, showIfEmpty = false, className = '' }) => {

    if (typeof actualCost === 'number') {
        const diff = parseFloat(actualCost) - parseFloat(value);
        const percentage = parseFloat(value) === 0 || parseFloat(actualCost) === 0 || !parseFloat(diff) ? 0 : ((parseFloat(diff) / parseFloat(value)) * 100).toFixed(2);
        let deviation = Math.abs(percentage) > DIFF_PERCENT_THRESHOLD ? (diff < 0 ? 'positive' : 'negative') : 'neutral';

        if (parseFloat(value) === 0 && parseFloat(actualCost) !== 0) {
            deviation = 'negative';
        }

        if (parseFloat(actualCost) === 0 && parseFloat(value) !== 0) {
                    deviation = 'positive';
                }

        const sign = diff >= 0 ? '+' : '-';

        return (
             <div className={`cost-display ${className}`}>
                <span className='cost-edit-title'>{title}</span>
                <span className='display-cost'>
                    <span className='cost-compare'>{`$ ${formatFloat(value || 0)}`}</span>
                    <span className={'cost-compare ' + deviation}>{`$ ${formatFloat(actualCost || 0)}`}</span>
                    <span className={'percentage ' + deviation}>{`${parseFloat(percentage) ? sign + Math.abs(percentage) + '%' : ''}`}</span>
                </span>
             </div>)
    }
     return (
     <div className={`cost-display ${className}`}>
        <span className='cost-edit-title'>{title}</span>
        <span className='display-cost'>{`$ ${formatFloat(value || 0)}`}</span>
     </div>)
}

const EditableCost = ({value, title, onChange = noop, actualCost, className = ''}) => {
    const [cost, setCost] = useState(value);
    const [selectedTask, selectTask] = useRecoilState(selectedTaskState);
    const [editing, EditSwitch] = useEdit(() => {
        onChange(cost);
        selectTask({...window.gantt.getTask(selectedTask.index)})
        });

    const inputRef = useRef();
    useEffect(() => { // focus input on editing
        if (editing && inputRef.current) {
           inputRef.current.focus();
        }
    }, [editing, inputRef])

    useEffect(() => () => { // save on close
        if (editing && !selectedTask) {
            console.log('inputref', inputRef)
            onChange(cost);
        }
    }, [cost, editing, onChange, selectedTask])

    return editing ? (
    <div className='edit-cost'>
        <CostEdit value={cost} title={title} onChange={setCost} ref={inputRef}/>
        <EditSwitch className='cost-edit-switch'/>
    </div>) :
    (<div className='edit-cost'>
        <DisplayCost value={value} title={title} showIfEmpty actualCost={actualCost}/>
        <EditSwitch className='cost-edit-switch' />
        </div>)
}

const Cost = ({value, title, onChange = noop, className = '', editable = false, actualCost}) => {
    return editable ? <EditableCost value={value} actualCost={actualCost} title={title} onChange={onChange} className={className}/> : <DisplayCost value={value} title={title} className={className} actualCost={actualCost}/>
}

export default Cost