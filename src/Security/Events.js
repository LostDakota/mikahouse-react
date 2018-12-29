import React from "react";
import { NavLink } from "react-router-dom";

export let Events = events => {
    return (
        <div className="col-6">
            <div className="card t-center">
                <NavLink to={"/security/events"} exact>
                    <i className="fa fa-film t-large c-lightgray"></i>
                    <p className="m-5-t t-small t-muted">{events.events} Events</p>
                </NavLink>
            </div>
        </div>
    )
}