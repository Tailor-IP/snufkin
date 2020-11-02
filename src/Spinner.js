import React from 'react';
import { Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = ({className = '', size = 24 }) => {
    return <Spin indicator={<LoadingOutlined spin style={{ fontSize: size }} />} className={`spinner ${className}`}/>
}

export default Spinner;