import React, { useEffect, useState } from 'react';
import {initConfig} from './gantt-config';
import {viewComponents} from './lightboxes';

const API_URL = window.location.hostname === "www.tailor-ip.com" ? "https://www.tailor-ip.com/_functions" : "https://www.tailor-ip.com/_functions-dev";
let gantt;

export const Gantt = ({data, onSave}) => {
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        gantt = window.gantt;
        initConfig(gantt, false)
        window.gantt.parse(data);
        gantt.attachEvent("onLightbox", function(id) {
               setSelectedTask(gantt.getTask(id))
            })
        gantt.attachEvent("onAfterLightbox", function(id) {
                setSelectedTask(null)
            })
    }, [])

     return <>
        <div id="ganttDiv"></div>
        {selectedTask ? viewComponents.map((Component, idx)=> <Component task={selectedTask} key={idx.toString} selectTask={setSelectedTask}/>) : null}
     </>
}

export default Gantt;