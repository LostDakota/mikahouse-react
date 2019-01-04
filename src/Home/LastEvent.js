import React from "react";
import moment from "moment";

import Config from "../Shared/Config";
import { ImageTransition } from "./ImageTransition";

const title = "Last Event";

const LastEvent = props => {
    if (props.event) {
        return (
            <div className="col-12-xs col-6-sm col-6-md col-6-lg">
                <p className="t-center t-bold">{title}</p>
                <div className="col-12">
                    <div className="card">
                        <div className="blur-mask">
                            <img id="last-event" className="blur security-images" alt="" src={`${Config.Host}/images/security/last.jpg`} />
                        </div>
                        <p className="t-small t-muted t-right m-5-t">{moment(props.event.time).format('MMM Do YYYY h:mma')}</p>
                    </div>
                </div>
            </div>
        )
    }
    return '';
}

export default LastEvent;