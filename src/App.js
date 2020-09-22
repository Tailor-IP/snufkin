import React, { useState, useEffect } from 'react';
import Gantt from './gantt';
import {sendMsg} from './connection-utils';
import './App.scss';
import { RecoilRoot } from 'recoil';
//import {data as mock} from './mock-data';
import {sendSaveGanttMessage} from './utils';
import {editable, selectedTaskState} from './store';
import {useSetRecoilState} from 'recoil';

const clearEditHistory = () => {
    window.gantt.clearUndoStack();
    window.gantt.clearRedoStack();
}

const Snufkin = ({tasks, links, selectedTask}) => {
    const [data, setData] = useState({tasks: [], links: []});
    const setEditPermissions = useSetRecoilState(editable);
    const setSelectedTask = useSetRecoilState(selectedTaskState);

    useEffect(() => {
        window.onmessage = (event) => {
                let data = event.data;
                try {
                    data = JSON.parse(event.data);
                } catch(e) {
                    console.log("can't parse data: " + event.data);
                }
                if (data.type === 'data') {
                   console.log('got data');
                   setData(data.data);
                   setEditPermissions(data.editable || false)
                   clearEditHistory();
                   sendMsg('done')
                }
                if (data.type === 'getSnapshot') {
                    sendSaveGanttMessage();
                }
        }
//        if (window.location.pathname.split('/').includes('test')) {
//                setEditPermissions(true)
//                setData(mock);
//        }
    }, [setEditPermissions]);

    useEffect(() => {
        if (tasks && links) {
            setData({tasks, links})
        }
    }, [tasks, links])

    useEffect(() => {
        setSelectedTask(selectedTask);
    }, [selectedTask])

     return (
     <>
        <div className='snufkin' id='snufkin'>
            <div className="gantt-container">
                <Gantt data={data}/>
            </div>

        </div>
    </>
     );
    }

export default (props) => <RecoilRoot><Snufkin {...props} /></RecoilRoot>
