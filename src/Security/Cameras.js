import React from "react";

import Config from "../Shared/Config";
import { ImageTransition } from "../Shared/ImageTransition";

let cameraCards = props => {
    return props.cameras.map((cam, i) => {
        return (
            <div key={i} className="card">
                <div className="blur-mask">
                    <img id={`camera-${i}`} className={'security-images blur'} alt="Right Now" src={`/images/fallback${i}.jpg`} onLoad={ImageTransition(`camera-${i}`, `${Config.Host}${cam}`)} />
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