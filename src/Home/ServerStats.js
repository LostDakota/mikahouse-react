import React, { Component } from "react";

const title = 'Server Stats';

class ServerStats extends Component {
    render() {
        if (this.props.stats) {
            return (
                <div className="col-12-xs col-6-sm col-6-md col-6-lg">
                    <p className="t-center t-bold">{title}</p>
                    {buildStats(this.props.stats)}
                </div>
            )
        }
        return '';
    }
}

let icons = {
    Ping: 'fa-wifi',
    Load: 'fa-balance-scale',
    Uptime: 'fa-desktop'
}

let buildStats = stats => {
    return stats.map((stat, i) => {
        return (
            <div key={i} className="col-4">
                <div className="card sm-border t-center">
                    <i className={`fas ${icons[stat.name]} server-icons m-5-y c-lightgray`}></i>
                    <p className="t-small t-muted t-center m-5-t">{stat.name}</p>
                    <p className="t-small t-muted t-center m-5-b">{stat.value}</p>
                </div>
            </div>
        )
    })
}

// const ServerStats = props => {
//     return (
//         <div className="col-12-xs col-6-sm col-6-md col-4-lg">
//             <div className="row">
//                 <div className="col-12">
//                     <p className="t-center t-bold">{title}</p>
//                 </div>
//             </div>
//             <div className="row">
//                 {buildStats(props.stats)}
//             </div>
//         </div>
//     )
// }

export default ServerStats;