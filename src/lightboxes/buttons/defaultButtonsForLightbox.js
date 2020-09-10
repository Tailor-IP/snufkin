import React from 'react';
import { editable } from '../../store';
import { useRecoilValue } from 'recoil';
import Close from './closeButton';
import Delete from './deleteButton';

const Default = ({id}) => {
    const editAllowed = useRecoilValue(editable);
    return editAllowed ? (
        <div className='editable-buttons'>
            <Delete id={id}/>
            <Close />
        </div>) : (
        <div className='buttons'> <Close/> </div>)

}

export default Default;