import React from "react";

import Config from "../Shared/Config";

export const Plex = props => {
    if (props.plex && props.plex.size > 0) {
        return (
            <>
                <img alt={props.plex.Metadata[0].title} src={`${Config.Host}${props.plex.Metadata[0].art}`} />
                <div className="t-right t-small t-muted m-5-t">{props.plex.Metadata[0].title}</div>
            </>
        )
    } else {
        return (
            <>
                <img alt='Plex' src="/images/plex.jpg" />
                <p className="t-right t-small t-muted m-5-t">Not Playing</p>
            </>
        )
    }
}