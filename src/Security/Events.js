import React from "react";
import { NavLink } from "react-router-dom";

export let Events = events => {
    return (
        <NavLink to={"/security/events"} exact className="t-center">
            <i className="fa fa-film t-large c-lightgray"></i>
            <p className="m-5-t t-small t-muted">{events.events} Events</p>
        </NavLink>
    )
}