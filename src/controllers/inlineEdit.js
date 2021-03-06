import React from 'react';
import { Switch } from 'antd';
import {defaultColumns, inlineEditColumns} from '../columns';
import {costUpdaters, onDurationChange, onTaskMove} from '../utils';

let editing = false;

const handleInlineEditing = (diff) => {
    const task = {...window.gantt.getTask(diff.id), [diff.columnName]: diff.oldValue};
    if (task.type === 'project') {
        return
    }

    if (diff.columnName === 'text') {
        const newTask = {
            ...task,
            title: diff.newValue, // backward compatibility
            text: diff.newValue   // value gantt uses
        }
        window.gantt.updateTask(task.id, newTask);
    }

    if (costUpdaters[diff.columnName]) {
        const updater = costUpdaters[diff.columnName];
        const newValue = parseFloat(diff.newValue || 0);
        updater(task, newValue);
        return;
    }

    if (diff.columnName === 'duration') {
        onDurationChange(task, parseFloat(diff.newValue || 0));
        return;
    }

    if (diff.columnName === 'start_date') {
       onTaskMove(task, diff.newValue)
    }
}

const subscribeToInlineEditing = () => {
                    window.gantt.ext.inlineEditors.attachEvent("onSave", (diff) => {
                                                      editing = false;
                                                      handleInlineEditing(diff);
                                                       return true;
                                                   });

                   window.gantt.ext.inlineEditors.attachEvent("onEditEnd", function(state){

                        editing = false;
                        return true;
                    })

                    window.gantt.ext.inlineEditors.attachEvent('onBeforeEditStart', (diff) => {
                      const task = window.gantt.getTask(diff.id);
                       if (editing) return false;
                        else if (task.type === window.gantt.config.types.project && (diff.columnName !== 'text')) return false;
                        editing = true;
                        return true;
                    })
                }

const InlineEdit = () => {
    const onChange = (checked) => {
        if (checked) {
            window.gantt.config.columns = inlineEditColumns;
            setTimeout(subscribeToInlineEditing, 0);
        }
        else {
            window.gantt.config.columns = defaultColumns;
            window.gantt.ext.inlineEditors.detachAllEvents()
        }

        window.gantt.config.keyboard_navigation = checked;
        window.gantt.config.keyboard_navigation_cells = checked;
        window.gantt.resetLayout();
    }

    return <div className='toolbar-button'>
                <div className='toolbar-button-title'>Inline Edit</div>
                <Switch checkedChildren='On' unCheckedChildren='Off' onChange={onChange}/>
            </div>
}

export default InlineEdit;