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
                            <div className="content">
                                <video style={{ 'maxWidth': '100%' }} preload={'none'} controls>
                                <source src={`${Config.Images}${event.movie}`} type={'video/mp4'} poster={`${Config.Images}${event.poster}`}></source>
                                </video>
                                <p className="t-small t-muted t-right">{moment(event.stamp).format('MMM Do YYYY h:mma')}</p>
                            </div>                            
                        </div>
                    )
                })
            )
        }
        return (
            <div className="card">
                <div className="content">
                No events for the day
                </div>                
            </div>
        )
    }
    return '';
}