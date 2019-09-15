import React from "react";

export const Garage = props => {
    let status;
    let statusText = 'Closed';

    if(props.status){
        status = <i className="fa fa-car garage-status"></i>;
        statusText = 'Open'
    }

    return (
        <div className="card t-center" onClick={props.toggle}>
            <div className="content">
                <i id="door-icon" className="fa fa-warehouse server-icons m-5-y c-lightgray">
                    {status}
                </i>                
                <p className="t-small t-muted">`Garage Door is {statusText}`</p>
            </div>            
        </div>
    )
}