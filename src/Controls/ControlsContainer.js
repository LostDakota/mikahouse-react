import React, { Component } from "react";

import TitleService from "../Shared/TitleService";
import Config from "../Shared/Config";
import { Loader } from "../Shared/Loader";
import { Garage } from "./Garage";

const getGarageStatus = () => {
    return new Promise((resolve, reject) => {
        fetch(`${Config.Api}/control/garage/status`)
            .then(data => {
                resolve(data.json());
            });
    });
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

class ControlsContainer extends Component {
    state = {
        loading: true,
        garageStatus: false
    };

    componentDidUpdate() {
        setTimeout(() => {
            window.resizeAllGridItems();
        }, 1000);
    }

    componentDidMount() {
        TitleService.SetTitle('Controls');

        getGarageStatus()
            .then(data => {
                if(data.status){
                    this.setState({garageStatus: true});
                    this.setState({ loading: false });
                }
            });

        this.setState({
            toggleDoor: () => {
                doorIcons('loading')
                fetch(`${Config.Api}/control/garage`)
                    .then(() => {
                        doorIcons('success')
                    })
                    .catch(() => {
                        doorIcons('failure')
                    })
            }
        });
    }

    render() {
        if (!this.state.loading) {
            return (
                <>
                    <Garage status={this.state.garageStatus} toggle={this.state.toggleDoor} />     
                </>
            )
        }

        return (<Loader />)
    }
}

export default ControlsContainer;