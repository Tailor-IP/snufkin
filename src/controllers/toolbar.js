import React from 'react';
import { editable } from '../store';
import { useRecoilValue } from 'recoil';

const _Toolbar = (props) => {
    const editAllowed = useRecoilValue(editable);
    return editable ? <Toolbar className='toolbar' {...props}/> : null
}

const Toolbar = ({}) => {
    return <div>toolbar</div>
}

export default _Toolbar;