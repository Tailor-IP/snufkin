import React from 'react';
import { editable } from '../store';
import { useRecoilValue } from 'recoil';
import Undo from './undo';
import InlineEdit from './inlineEdit';
import FullScreen from './fullScreen';
import Save from './save';
import RootDate from './rootDate';

const _Toolbar = (props) => {
    const editAllowed = useRecoilValue(editable);
    return editAllowed ? <Toolbar className='toolbar' {...props}/> : null
}

const Toolbar = () => {
    return <div className='toolbar'>
        <Undo />
        <InlineEdit />
        <FullScreen />
        <Save />
    </div>
}

export default _Toolbar;