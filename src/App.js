import React, { useState, useEffect } from 'react';
import Gantt from './gantt';
import {Zoom} from './controllers';
import {sendMsg} from './connection-utils';
import './App.css';
import { RecoilRoot } from 'recoil';

import {data as mock} from './mock-data';

const App = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        window.onmessage = (event) => {
                let data = event.data;
                try {
                    data = JSON.parse(event.data);
                } catch(e) {
                    console.log("can't parse data: " + event.data);
                }
                if (data.type === 'data') {
                   sendMsg('data', data)
                   console.log('data', data)
                   setData(data.data);
                   sendMsg('done')
                }
//                    if (data.type === 'update') {
//                        updateGantt().then(function() {
//                        sendMsg('saved');
//                        });
//                    }
        }
        sendMsg('ready');
        console.log('sent ready')
        setData(mock);
    }, []);

     return (
     <RecoilRoot>
        <div className='snufkin'>
            <div className="gantt-container">
                {data ? <Gantt data={data}/> : null}
            </div>
        </div>
        <Zoom className='zoom-controller'/>
    </RecoilRoot>
     );
    }

export default App;