import React from 'react';
import { Statistic} from 'antd';
import {avg} from '../../utils';

const Cost = ({task, className = ''}) => {
    const attorneyFee = avg(task.minCost, task.maxCost) || 0;
    const officialFee = task.officialFee;
    const total = parseFloat(attorneyFee) + parseFloat(officialFee);
    return <div className={`price-details ${className}`}>
           {parseFloat(attorneyFee) ? <Statistic title="Average Attorney Fee" value={attorneyFee} precision={2} prefix={'$ ~'} /> : null}
           {parseFloat(officialFee) ? <Statistic title="Official Fee" value={officialFee} precision={2} prefix={'$'} /> : null}
           {parseFloat(total) ? <Statistic title="Total" value={total} precision={2} prefix={'$'} /> : null}
           </div>
}

export default Cost;