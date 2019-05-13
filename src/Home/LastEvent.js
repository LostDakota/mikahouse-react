import React from "react";
import moment from "moment";

import Config from "../Shared/Config";
import { ImageTransition } from "../Shared/ImageTransition";

const title = "Last Event";

const LastEvent = props => {
    if (props.event) {
        return (
            <div className="card">
                <div className="content">
                    <p className="t-center t-bold title-item-with-image">{title}</p>
                    <div className="blur-mask">
                        <img id="last-event" className="security-images blur" alt="" src={`${Config.Host}/images/security/last.jpg`} onLoad={ImageTransition('last-event', `${Config.Host}${props.event.image}`)} />
                    </div>
                    <p className="t-small t-muted t-right m-5-t">{moment(props.event.time).format('MMM Do YYYY h:mma')}</p>
                </div>
            </div>
        )
    }
    return '';
}

export default LastEvent;