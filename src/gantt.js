import React, { useEffect } from 'react';
import {initConfig} from './gantt-config';
import {viewComponents} from './lightboxes';
import { useRecoilState } from 'recoil';
import { selectedTaskState } from './store'
const API_URL = window.location.hostname === "www.tailor-ip.com" ? "https://www.tailor-ip.com/_functions" : "https://www.tailor-ip.com/_functions-dev";
let gantt;

export const Gantt = ({data, onSave}) => {
    const [selectedTask, setSelectedTask] = useRecoilState(selectedTaskState);

    useEffect(() => {
        gantt = window.gantt;
        initConfig(gantt, false)
        window.gantt.parse(data);
        gantt.attachEvent("onLightbox", function(id) {
               setSelectedTask({...window.gantt.getTask(id)});
            })
        gantt.attachEvent("onAfterLightbox", function(id) {
                setSelectedTask(null)
            })
    }, [data, setSelectedTask]);

     return <>
        <div id="ganttDiv"></div>
        {selectedTask ? viewComponents.map((Component, idx)=> <Component task={selectedTask} key={selectedTask.id + idx.toString()} selectTask={setSelectedTask}/>) : null}
     </>
}

export default Gantt;