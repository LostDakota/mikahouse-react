import React, { Component } from "react";

import Thermostat from "./Thermostat";

import TitleService from "../Shared/TitleService";
import Config from "../Shared/Config";
import { Loader } from "../Shared/Loader";
import { Garage } from "./Garage";

const getThermostat = () => {
    return new Promise((resolve, reject) => {
        fetch(`${Config.Api}/control/thermostat`)
            .then(data => {
                resolve(data.json());
            })
    })
}

const doorIcons = (step) => {
    let baseClasses = ['fa', 'server-icons', 'm-5-y']
    let successIcons = ['fa-warehouse', 'c-blue'];
    let failureIcons = ['fa-sad-tear', 'c-orange'];
    let loadingIcons = ['fa-spin', 'fa-circle-notch', 'c-lightgray'];

    let garage = document.querySelector('#door-icon');
    garage.classList = '';

    if (step === 'loading') {
        baseClasses.concat(loadingIcons).forEach(icon => {
            garage.classList.add(icon);
        });
    } else if (step === 'success') {
        baseClasses.concat(successIcons).forEach(icon => {
            garage.classList.add(icon);
        })
    } else {
        baseClasses.concat(failureIcons).forEach(icon => {
            garage.classList.add(icon);
        })
    }
}

let controlTimeout = null;

class ControlsContainer extends Component {
    state = {
        thermostat: {
            target: 70,
            heater: false,
            current: 70
        },
        loading: true
    };
    mounted = true;

    componentDidUpdate() {
        setTimeout(() => {
            window.resizeAllGridItems();
        }, 1000);
    }

    componentDidMount() {
        TitleService.SetTitle('Controls');

        getThermostat()
            .then(data => {
                data['changeTemp'] = val => {
                    clearTimeout(controlTimeout);
                    let temp = this.state.thermostat;
                    temp.target = temp.target + val;
                    this.setState({thermostat: temp});
                    controlTimeout = setTimeout(() => {
                        this.setState({ loading: true })
                        fetch(`${Config.Api}/control/thermostat/${temp.target}`, { method: 'POST' })
                            .then(() => {
                                this.setState({ loading: false })
                                setTimeout(() => {getThermostat()}, 3000);
                            });
                    }, 2000)
                }
                this.setState({ loading: false });
                this.setState({ thermostat: data });
            })

        this.setState({
            toggleDoor: e => {
                doorIcons('loading')
                fetch(`${Config.Api}/control/garage`)
                    .then(data => {
                        doorIcons('success')
                    })
                    .catch(err => {
                        doorIcons('failure')
                    })
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (this.state.thermostat) {
            return (
                <>
                    <Thermostat stat={this.state.thermostat} loading={this.state.loading} />
                    <Garage toggle={this.state.toggleDoor} />     
                </>
            )
        }

        return (<Loader />)
    }
}

export default ControlsContainer;