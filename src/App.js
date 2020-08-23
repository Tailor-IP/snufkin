import React, { useState, useEffect } from 'react';
import Gantt from './gantt';
import {Zoom} from './controllers';
import {sendMsg} from './connection-utils';
import './App.css';
import { RecoilRoot } from 'recoil';
import {data3 as mock} from './mock-data';
import {getSnapshot} from './utils';
import {editable} from './store';
import {useSetRecoilState} from 'recoil';

const App = () => {
    const [data, setData] = useState(null);
    const setEditPermissions = useSetRecoilState(editable);
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
        setEditPermissions(false)
//        setData(mock);
    }, [setEditPermissions]);

     return (
     <>
        <div className='snufkin'>
            <div className="gantt-container">
                {data ? <Gantt data={data}/> : null}
            </div>
        </div>
        <Zoom className='zoom-controller'/>
    </>
     );
    }

export default () => <RecoilRoot><App/></RecoilRoot>
