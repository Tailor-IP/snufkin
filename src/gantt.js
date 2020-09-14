import React, { useEffect, useState } from 'react';
import {initConfig} from './gantt-config';
import {viewComponents} from './lightboxes';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedTaskState, editable } from './store';
import {Zoom} from './controllers';
import {showTask, updateBranch} from './utils';

let gantt;

export const Gantt = ({data, onSave}) => {
    const [selectedTask, setSelectedTask] = useRecoilState(selectedTaskState);
    const [initialized, setInitialized] = useState(false);
    const isEditable = useRecoilValue(editable);
    // used to avoid re-handling already displayed tasks
    const [lastShown, setLastShown] = useState(null);
    useEffect(() => {
        gantt = window.gantt;
        gantt.clearAll();
        initConfig(gantt, isEditable);
        gantt.ext.zoom.setLevel(0);
        gantt.config.date_format = "%Y-%m-%d";
        window.gantt.parse(data);
        Object.values(data.tasks).forEach(t => gantt.addTask(t, t.parent))
        gantt.attachEvent("onLightbox", function(id) {
               setSelectedTask(window.gantt.getTask(id));
            })
        gantt.attachEvent("onAfterLightbox", function(id) {
                setSelectedTask(null)
            })
        if (!initialized) setInitialized(true);
    }, [data, setSelectedTask, setInitialized, isEditable]);

    useEffect(() => {
            if (initialized) {
                if (selectedTask && selectedTask.index && (!lastShown || lastShown.index !== selectedTask.index)) {
                    gantt.hideLightbox();
                    setLastShown(selectedTask);
                    showTask(selectedTask.index);
                    gantt.$data.tasksStore.select(selectedTask.index);
                    updateBranch(selectedTask, (task) => {
                            if(task.isFolder) {
                                const newTask = {...task, $open: true};
                                window.gantt.updateTask(task.id, newTask);
                            }
                        })
                    window.gantt.showLightbox(selectedTask.id);
                }
            }
        }, [initialized, selectedTask, lastShown])

     return <>
        {selectedTask ? viewComponents.map((Component, idx)=> <Component task={selectedTask} key={selectedTask.id + idx.toString()} selectTask={setSelectedTask}/>) : null}
        <Zoom className='zoom-controller'/>
     </>
}

export default Gantt;