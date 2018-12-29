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
            <div key={i} className="col-4">
                <div className="card sm-border t-center">
                    <i className={`fas ${EvaluateIcon(notification.notif)} server-icons m-5-y ${IconColor(notification.notif)}`}></i>
                    <p className="t-small t-muted t-center m-5-t">{notification.notif}</p>
                    <p className="t-small t-muted t-center m-5-b">{moment.unix(notification.date).fromNow()}</p>
                </div>
            </div>
        )
    })
}

const ServerStats = props => {
    if (props.events) {
        return (
            <div className="col-12-xs col-6-sm col-6-md col-4-lg">
                <div className="row">
                    <div className="col-12">
                        <p className="t-center t-bold">{title}</p>
                    </div>
                </div>
                <div className="row">
                    {buildStats(props.events)}
                </div>
            </div>
        )
    }
    return '';
}

export default ServerStats;