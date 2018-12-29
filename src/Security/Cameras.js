import React from "react";

import Config from "../Shared/Config";

let cameraCards = props => {
    return props.cameras.map((cam, i) => {
        return (
            <div key={i} className="card">
                <img alt="Right Now" src={`${Config.Host}/${cam}`}></img>
            </div>
        );
    })
}

export const Cameras = props => {
    if (props.cameras) {
        return (
            cameraCards(props)
        );
    }
    return '';
}