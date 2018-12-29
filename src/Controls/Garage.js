import React from "react";

export const Garage = props => {
    return (
        <div className="col-12">
            <p className="t-center t-bold">Garage</p>
            <div className="card t-center" onClick={props.toggle}>
                <i id="door-icon" className="fa fa-warehouse server-icons m-5-y c-lightgray"></i>
                <p className="t-small t-muted">Toggle Garage Door</p>
            </div>
        </div>
    )
}