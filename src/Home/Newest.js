import React from "react";

import Config from "../Shared/Config";

const title = 'Latest Show';

const Newest = props => {
    if(props.newest.length > 0) {
        return (
            <div className="card">
                <div className="content">
                    <p className="t-center t-bold title-item-with-image">{title}</p>
                    <img alt={props.newest[0].showtitle} src={`${Config.Host}${props.newest[0].fanart}`} />                    
                    <p className="t-small t-muted t-right m-5-t">{`${props.newest[0].showtitle} -  ${props.newest[0].name}`}</p>
                </div>
            </div>
        )
    }
    return '';
}

export default Newest;