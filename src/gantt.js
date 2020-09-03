import React, { useEffect } from 'react';
import {initConfig} from './gantt-config';
import {viewComponents} from './lightboxes';
import { useRecoilState } from 'recoil';
import { selectedTaskState } from './store';
import {Zoom} from './controllers';

let gantt;

export const Gantt = ({data, onSave}) => {
    const [selectedTask, setSelectedTask] = useRecoilState(selectedTaskState);

    useEffect(() => {
        gantt = window.gantt;
        gantt.clearAll();
        initConfig(gantt, false);
        gantt.ext.zoom.setLevel(0);
        window.gantt.parse(data);
        gantt.attachEvent("onLightbox", function(id) {
               setSelectedTask({...window.gantt.getTask(id)});
            })
        gantt.attachEvent("onAfterLightbox", function(id) {
                setSelectedTask(null)
            })
    }, [data, setSelectedTask]);
     return <>
        {selectedTask ? viewComponents.map((Component, idx)=> <Component task={selectedTask} key={selectedTask.id + idx.toString()} selectTask={setSelectedTask}/>) : null}
        <Zoom className='zoom-controller'/>
     </>
}

export default Gantt;