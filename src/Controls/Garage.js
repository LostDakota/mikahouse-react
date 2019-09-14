import React from "react";

export const Garage = props => {
    let status;

    if(props.status){
        status = <i className="fa fa-car garage-status"></i>;
    }

    return (
        <div className="card t-center" onClick={props.toggle}>
            <div className="content">
                <i id="door-icon" className="fa fa-warehouse server-icons m-5-y c-lightgray">
                    {status}
                </i>                
                <p className="t-small t-muted">Toggle Garage Door</p>
            </div>            
        </div>
    )
}