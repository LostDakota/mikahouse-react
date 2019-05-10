import React from "react";
import Config from "../Shared/Config";

export const PopUp = props => {
    if(props.show){
        return (
            <>
                <div onClick={props.toggle} className={`shade ${props.display ? 'show' : ''}`}>
                    <div className="col-xs-12 offset-sm-3 col-md-6">
                        <div className='card'>
                            <img alt={props.show.name} src={`${Config.Host}${props.show.fanart}`} />
                            <p className='t-center m-5-b'>{props.show.showtitle} - {props.show.name}</p>
                            <p className="t-small">{props.show.description}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return '';
}