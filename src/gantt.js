import React, { useEffect, useState } from 'react';
import {initConfig} from './gantt-config';
import {viewComponents} from './lightboxes';
import { useRecoilState } from 'recoil';
import { selectedTaskState } from './store';
import {Zoom} from './controllers';
import {showTask, updateBranch} from './utils';

let gantt;

export const Gantt = ({data, onSave}) => {
    const [selectedTask, setSelectedTask] = useRecoilState(selectedTaskState);
    const [initialized, setInitialized] = useState(false);
    // used to avoid re-handling already displayed tasks
    const [lastShown, setLastShown] = useState(null);
    useEffect(() => {
        gantt = window.gantt;
        gantt.clearAll();
        initConfig(gantt, false);
        gantt.ext.zoom.setLevel(0);
        window.gantt.parse(data);
        gantt.attachEvent("onLightbox", function(id) {
               setSelectedTask(window.gantt.getTask(id));
            })
        gantt.attachEvent("onAfterLightbox", function(id) {
                setSelectedTask(null)
            })
        if (!initialized) setInitialized(true);
    }, [data, setSelectedTask, setInitialized]);

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