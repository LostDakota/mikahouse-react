import React from "react";

let statusIcon = status => {
    if (status.loading) {
        return 'fa-circle-notch fa-spin'
    }
    if (status.result === 0) {
        return 'fa-ban';
    }

    return 'fa-video';
}

const baseClasses = [
    'fa',
    't-large',
    'c-lightgray'
]

const buildClasses = status => baseClasses.concat(statusIcon(status)).join(' ');
const statusText = status => status === 0 ? 'System is Disabled' : 'System is Active';

export let ServerStatus = props => {
    if (props.status) {
        return (
            <span className="t-center" onClick={props.toggle}>
                <i className={buildClasses(props.status)}></i>
                <p className="m-5-t t-small t-muted">{statusText(props.status.result)}</p>
            </span>
        )
    }
    return '';
}