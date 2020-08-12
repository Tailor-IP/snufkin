import React, { useState, useEffect } from 'react';
import Gantt from './gantt';
import {Zoom} from './controllers';
import {sendMsg} from './connection-utils';
import './App.css';

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
//                if(data && data.type) {
//                    if (data.type === 'fetch') {
//                        fetchData(data.id);
//                    }
                    if (data.type === 'data') {
                       setData(data.data);
                    }
//                    if (data.type === 'update') {
//                        updateGantt().then(function() {
//                        sendMsg('saved');
//                        });
//                    }
        }
    }, []);

     return (
        <div className='snufkin'>
            <Zoom className='zoom-controller'/>
            <div className="gantt-container">
                {data ? <Gantt data={data}/> : null}
            </div>
        </div>
     );
    }

export default App;