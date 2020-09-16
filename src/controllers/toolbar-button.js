import React from 'react';
import { Switch } from 'antd';

const ToolbarButton = ({icon, onChange, title = ''}) => {
    return <div className='toolbar-button'>
                <Switch />
                <span>{title}</span>
            </div>
}

export default ToolbarButton;