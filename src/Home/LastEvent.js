import React from "react";
import moment from "moment";

import Config from "../Shared/Config";
import { ImageTransition } from "../Shared/ImageTransition";

const title = "Last Event";

const LastEvent = props => {
    if (props.event) {
        let formattedTime = moment(props.event.time).format('MMM Do YYYY h:mma');
        let isToday = moment(props.event.time).isSame(new Date(), 'day');
        console.log(isToday);
        return (
            <div className="card">
                <div className="content">
                    <p className="t-center t-bold title-item-with-image">{title}</p>
                    <div className="blur-mask">
                        <img onClick={props.lastVid} id="last-event" className="security-images blur" alt="" src={`${Config.Host}/images/security/last.jpg`} onLoad={ImageTransition('last-event', `${Config.Host}${props.event.image}`)} />
                    </div>
                    <p className="t-small t-muted t-right m-5-t">{isToday ? '(Today)': ''} {formattedTime}</p>
                </div>
            </div>
        )
    }
    return '';
}

export default LastEvent;