import React from "react";

let calcWidth = used => {
    return `${(used / 100).toString().split('.')[1]}%`
}

export const Drives = props => {
    if (props.drives) {
        return props.drives.map((drive, i) => {
            let perc = calcWidth(drive.used);
            return (
                <div key={i} className="bar">
                    <div className="used" style={{ width: perc }}>
                        <div className="drive-letter">{drive.letter.toUpperCase()}:</div>
                    </div>
                    <div className="drive-percentage">{perc}</div>
                </div>
            )
        })
    }

    return '';
}