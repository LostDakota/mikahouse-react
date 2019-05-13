import React from "react";

import Config from "../Shared/Config";

export const Movies = props => {
    if (props.movies) {
        return props.movies.map((movie, i) => {
            return (
                <div key={i}>
                    <img alt={movie.title} src={`${Config.Host}${movie.thumb}`} />
                </div>
            )
        })
    }

    return '';
}