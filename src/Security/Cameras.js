import React from "react";

import Config from "../Shared/Config";
import { ImageTransition } from "../Shared/ImageTransition";

let cameraCards = props => {
    return props.cameras.map((cam, i) => {
        return (
            <div key={i} className="card">
                <div className="content">
                    <p className="t-center t-bold title-item m-5-b">{cam.name}</p>
                    <div className="blur-mask">
                        <img onClick={props.live} id={`camera-${i}`} className={'security-images blur'} alt="Right Now" src={`/images/fallback${i}.jpg`} onLoad={ImageTransition(`camera-${i}`, `${Config.Host}${cam.image}`)} />
                        <i className={'fa fa-pause live-controls'} id={`live-controls-${i}`}></i>
                    </div>
                </div>                
            </div>
        );
    });
}

export const Cameras = props => {
    if (props.cameras) {
        return (
            cameraCards(props)
        );
    }
    return '';
}