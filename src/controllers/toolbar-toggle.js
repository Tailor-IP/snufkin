import React from 'react';
import { Switch } from 'antd';

const ToolbarToggle = ({icon, onChange, title = ''}) => {
    return <div className='toolbar-button'>
                <Switch />
                <span>{title}</span>
            </div>
}

export default ToolbarToggle;