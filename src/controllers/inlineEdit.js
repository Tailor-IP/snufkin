import React from 'react';
import { Switch } from 'antd';
import {defaultColumns, inlineEditColumns} from '../columns';
import {costUpdaters, onDurationChange, onTaskMove} from '../utils';

const handleInlineEditing = (diff) => {
    const task = window.gantt.getTask(diff.id);
    if (task.type === 'project') {
        return
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
        onTaskMove(task, diff.newValue);
        return
    }
}

const handleEditStart = (a,b,c,d) => {
    debugger;
}

const subscribeToInlineEditing = () => {
                    window.gantt.ext.inlineEditors.attachEvent("onBeforeSave", (diff) => {
                                                       handleInlineEditing(diff);
                                                       return true;
                                                   });
                    window.gantt.ext.inlineEditors.attachEvent('onBeforeEditStart', (diff) => {
                         const task = window.gantt.getTask(diff.id);
                         return task.type !== window.gantt.config.types.project;
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