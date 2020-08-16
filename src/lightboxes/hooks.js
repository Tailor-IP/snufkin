import React, {useState, useCallback} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';

export const useEdit = (onSave) => {
    const editIcon = <FontAwesomeIcon icon={faPen} className='edit-icon'/>
    const saveIcon = <FontAwesomeIcon icon={faCheck} className='edit-icon'/>
    const [editing, setEditing] = useState(false);
    const [icon, setIcon] = useState(editIcon);

    const onClick = useCallback(() => {
        if (editing && onSave) {
            onSave();
        }

        setEditing(!editing);
        setIcon(editing ? editIcon : saveIcon)
    }, [editing, onSave]);

        const enterKeyHandle = useCallback((e) => {
             if (e.key === 'Enter') {
                onClick()
                e.preventDefault();
                e.stopPropagation();

                document.removeEventListener('keypress', enterKeyHandle);
             }
        }, [setEditing, setIcon, editIcon, onClick]);

    const getElement = ({className = ''}) => <Button className={`edit-button ${className}`} size='small' onClick={onClick}>{icon}</Button>
    return [editing, getElement];
    }