import React from "react";
import moment from "moment";

const title = "Recent Activity";

export const EvaluateIcon = notification => {
    return notification.indexOf('left') > -1
        ? 'fa-sign-out-alt'
        : 'fa-sign-in-alt';
}

export const IconColor = (notification) => {
    if (notification.indexOf('left') === -1) {
        return 'c-blue';
    }
    return 'c-orange';
}

let buildStats = notifications => {
    return notifications.map((notification, i) => {
        return (
            <div key={i} className="t-center">
                <i className={`fas ${EvaluateIcon(notification.notif)} server-icons m-5-y ${IconColor(notification.notif)}`}></i>
                <p className="t-small t-muted t-center m-5-t">{notification.notif}</p>
                <p className="t-small t-muted t-center m-5-b">{moment.unix(notification.date).fromNow()}</p>
            </div>
        )
    })
}

const ServerStats = props => {
    if (props.events) {
        return (
            <div className="card">
                <div className="content grid-three">
                    <p className="t-center t-bold title-item">{title}</p>
                    {buildStats(props.events)}
                </div>
            </div>
        )
    }
    return '';
}

export default ServerStats;