import React from 'react';
import { DatePicker, Button } from 'antd';
import { useRecoilState } from 'recoil';
import { undoStack, redoStack } from '../store';

const RootDate = ({}) => {
    const onChange = () => {};

    return <div>
                <DatePicker onChange={onChange} />
                <Button />
            </div>
}

export default RootDate;