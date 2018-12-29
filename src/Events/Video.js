import React from "react";
import moment from "moment";

import Config from "../Shared/Config";

export const Video = props => {
    if (props.events) {
        if (props.events.length > 0) {
            return (
                props.events.map((event, i) => {
                    return (
                        <div key={i} className="card">
                            <video style={{ 'maxWidth': '100%' }} preload={'none'} controls poster={`${Config.Host}${event.poster}`}>
                            <source src={`${Config.Host}${event.video}`} type={'video/mp4'}></source>
                            </video>
                            <p className="t-small t-muted t-right">{moment(event.time).format('MMM Do YYYY h:mma')}</p>
                        </div>
                    )
                })
            )
        }
        return (
            <div className="card">
                No events for the day
            </div>
        )
    }
    return '';
}