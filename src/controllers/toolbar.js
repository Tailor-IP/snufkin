import React from 'react';
import { editable } from '../store';
import { useRecoilValue } from 'recoil';
import Undo from './undo';

const _Toolbar = (props) => {
    const editAllowed = useRecoilValue(editable);
    return editAllowed ? <Toolbar className='toolbar' {...props}/> : null
}

const Toolbar = ({}) => {
    return <div><Undo /></div>
}

export default _Toolbar;