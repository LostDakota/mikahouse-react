import React from "react";
import moment from "moment";

export const Devices = props => {
    if(props.devices) {
        let devices = props.devices.sort((a, b) => {
            let ipA = parseInt(a.ip.split('.')[3]);
            let ipB = parseInt(b.ip.split('.')[3])

            return ipA - ipB;
        });

        return devices.map((device, i) => {
            return (
                <div key={i} className="row">
                    <div className="col-2">
                        {device.ip.split('.')[3]}
                    </div>
                    <div className="col-5">
                        {device.name}
                    </div>
                    <div className="col-5">
                        {moment.unix(device.date).fromNow()}
                    </div>
                </div>
            )
        })
    }

    return '';
}