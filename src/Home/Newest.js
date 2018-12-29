import React from "react";

import Config from "../Shared/Config";

const title = 'Latest Show';

const Newest = props => {
    if(props.newest) {
        return (
            <div className="col-12-xs col-6-sm col-6-md col-8-lg">
                <div className="row">
                    <div className="col-12">
                        <p className="t-center t-bold">{title}</p>
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <img alt={props.newest[0].showtitle} src={`${Config.Host}${props.newest[0].fanart}`} />
                            <p className="t-small t-muted t-right m-5-t">{`${props.newest[0].showtitle} -  ${props.newest[0].name}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return '';
}

export default Newest;