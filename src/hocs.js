import ReactDOM from 'react-dom';
import React from 'react';

export const portal = (Component, elementId) => (props) => {
    const element = document.getElementById(elementId);
    return element ? ReactDOM.createPortal(<Component {...props}/>, element) : null;
}