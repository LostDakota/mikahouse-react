import React from "react";

import Config from "../Shared/Config";

export const Shows = props => {
    if (props.shows) {
        return props.shows.map((show, i) => {
            return (
                <img key={i} onClick={() => { props.toggle(i) }} alt={show.name} src={`${Config.Host}${show.fanart}`} />
            )
        })
    }

    return ''
}