import React, { useState, useEffect } from 'react';
import Gantt from './gantt';
import {sendMsg} from './connection-utils';
import './App.scss';
import { RecoilRoot } from 'recoil';
import {data3 as mock} from './mock-data';
import {getSnapshot} from './utils';
import {editable, selectedTaskState} from './store';
import {useSetRecoilState} from 'recoil';

const Snufkin = ({tasks, links, selectedTask}) => {
    const [data, setData] = useState(null);
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
                   sendMsg('done')
                }
                if (data.type === 'getSnapshot') {
                    sendMsg(JSON.stringify({type: 'snapshot', snapshot: getSnapshot()}));
                }
        }
//        setEditPermissions(true)
//        setData(mock);
    }, [setEditPermissions]);

    useEffect(() => {
        console.log('tasks', tasks);
        console.log('links', links);

        if (tasks && links) {
            setData({data: tasks, links})
        }
    }, [tasks, links])

    useEffect(() => {
        setSelectedTask(selectedTask);
    }, [selectedTask])

     return (
     <>
        <div className='snufkin'>
            <div id="ganttDiv"></div>
            <div className="gantt-container">
                {data ? <Gantt data={data}/> : null}
            </div>
        </div>
    </>
     );
    }

export default (props) => <RecoilRoot><Snufkin {...props} /></RecoilRoot>
