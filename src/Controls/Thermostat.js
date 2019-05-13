import React from "react";

let colorEvaluator = heater => {
    return heater ? 'c-orange-bg' : 'c-blackish-bg';
}

let ticksArray = [];

let buildTicks = () => {
    for (var i = 0; i < 359; i++) {
        if (i % 3 === 0) {
            let rotation = `rotate(${i}deg)`;
            ticksArray.push(<div key={i} className="ticks" style={{ transform: rotation }}></div>);
        }
    }
    return ticksArray;
}

let pin = (temp, type) => {
    let top = 90;
    let stasis = 70;
    let comparer = (temp - stasis) * 5;

    return (
        <div id="type" className={`${type}`} style={{ transform: `rotate(${top + comparer}deg)` }}></div>
    )
}

buildTicks();

const Thermostat = props => {
    return (
        <div className="card">
            <div className="content">
                <p className="t-center t-bold m-5-b">Thermostat</p>
                <div className="card-buffer">
                    <div className="shadow"></div>
                    <div className={`dial ${colorEvaluator(props.stat.heater)}`}>
                        {ticksArray}
                        <div className={`control-mask ${colorEvaluator(props.stat.heater)}`}>
                            <i className={`fa fa-chevron-down control ${props.loading ? 'disabled' : ''}`} onClick={() => { props.stat.changeTemp(-1) }}></i>
                            <i className={`fa fa-chevron-up control ${props.loading ? 'disabled' : ''}`} onClick={() => { props.stat.changeTemp(1) }}></i>
                            <div className="divider"></div>
                        </div>

                        {pin(props.stat.current, 'pin')}
                        <div className={`mask ${colorEvaluator(props.stat.heater)}`}></div>
                        {pin(props.stat.target, 'peg')}
                        <div className={`mask-2 ${colorEvaluator(props.stat.heater)}`}></div>

                        <div className="current-temperature c-white">{props.stat.current}&deg;</div>
                        <p className="target-temperature t-bold c-white">
                            {props.loading ? 'Loading...' : `Heat set to ${props.stat.target}`}<br />
                            <i className={`fa therm-icon ${props.stat.away ? 'fa-running' : 'fa-home'}`} style={{'marginTop': '20px', 'fontSize': '1.5rem'}}></i>
                        </p>
                    </div>
                </div>
            </div>                
        </div>
    )
}

export default Thermostat;