import React from 'react';
import { DatePicker, Button } from 'antd';
import { useRecoilState } from 'recoil';
import { undoStack, redoStack } from '../store';

const GetRootDateButton = () => {
    const onClick = () => {}
}

const RootDate = ({}) => {

    const get = () => {};

    return <div className='tooltip-button-wrapper'>
                <DatePicker format='DD/MM/YYYY' onChange={() => {}} renderExtraFooter={() => <div>footer</div>} />
                <Button />
            </div>
}

export default RootDate;