import React from "react";

import Config from "../Shared/Config";

export const Shows = props => {
    if (props.shows) {
        return props.shows.map((show, i) => {
            return (
                <div key={i} className="col-4">
                    <div className="card">
                        <img onClick={() => { props.toggle(i) }} alt={show.name} src={`${Config.Host}${show.fanart}`} />
                    </div>
                </div>
            )
        })
    }

    return ''
}