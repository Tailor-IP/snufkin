import React from 'react';
import { Progress } from 'antd';

const ProgressDetails = ({task, className = ''}) => {
    const progress = task.progress ? (task.progress * 100).toFixed(2) : 0;

    return <div className={className}>
                <Progress type="circle" percent={progress} width={80}/>
           </div>
}

export default ProgressDetails;