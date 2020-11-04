import React, { useState, useEffect } from 'react';
import Gantt from './gantt';
import {sendMsg} from './connection-utils';
import './App.scss';
import { RecoilRoot } from 'recoil';
import {data as mock, receipts as receiptsMock} from './mock-data';
import {sendSaveGanttMessage, updateTaskCostsFromReceipts} from './utils';
import {editable as _editable, selectedTaskState} from './store';
import {useSetRecoilState} from 'recoil';

const clearEditHistory = () => {
    window.gantt.clearUndoStack();
    window.gantt.clearRedoStack();
}

const noop = () => {};

const Snufkin = ({tasks, links, selectedTask, receipts, editable = false, onSave = noop, onUndo = noop, onRedo = noop}) => {
    const [data, setData] = useState({tasks: [], links: []});
    const [receiptAssignments, setAssignments] = useState({});

    const setEditPermissions = useSetRecoilState(_editable);
    const setSelectedTask = useSetRecoilState(selectedTaskState);

    useEffect(() => {
        if (!tasks) { // not controlled version
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

                    if (data.type === 'receipts') {
                        const assignments = data.payload.assignments;
                        setAssignments(assignments)
                    }

                    if (data.type === 'getSnapshot') {
                        sendSaveGanttMessage();
                    }
            }
        }
//        if (window.location.pathname.split('/').includes('test')) {
//                setEditPermissions(true)
//                setData(mock);
//                setAssignments(receiptsMock.assignments);
//        }
    console.log('ver 0.0.6');
    }, [setEditPermissions]);

    useEffect(() => {
        if (tasks && links) {
            setData({tasks, links})
        }
    }, [tasks, links])

    useEffect(() => {
        setSelectedTask(selectedTask);
    }, [selectedTask])

    useEffect(() => {
        updateTaskCostsFromReceipts(receiptAssignments);
    }, [receiptAssignments, tasks, data])

    useEffect(() => {
        if (receipts && receipts.assignments) setAssignments(receipts.assignments)
    }, [receipts])

    useEffect(() => {
        if (tasks) {
            setEditPermissions(editable);
            window.gantt.onSave = onSave;
            window.gantt.onUndo = onUndo;
            window.gantt.onRedo = onRedo;
        }
    }, [editable, tasks, onSave])


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
