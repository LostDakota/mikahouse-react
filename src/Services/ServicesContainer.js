import React, { Component } from "react";

import Config from "../Shared/Config";
import TitleService from "../Shared/TitleService";
import { Loader } from "../Shared/Loader";

import ServerStats from "../Home/ServerStats";
import { Drives } from "./Drives";
import { Devices } from "./Devices";

class ServicesContainer extends Component {
    state = {};

    componentDidMount() {
        TitleService.SetTitle('Services');
        this.setState({loading: true})

        let server = fetch(`${Config.Api}/server`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({ stats: data });
                return true;
            });

        let drives = fetch(`${Config.Api}/server/drives`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({ drives: data });
                return true;
            });

        let network = fetch(`${Config.Api}/server/network`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({devices: data});
                return true;
            });

        Promise.all([server, drives, network])
            .then(data => {
                this.setState({loading: false});
            })
    }

    render() {
        if (!this.state.loading) {
            return (
                <div class="row">
                    <ServerStats stats={this.state.stats} />                    
                    
                    <div className="col-12-xs col-6-sm col-6-md col-6-lg">
                        <p className="t-center t-bold">Disk Usage</p>
                        <div className="card">
                            <Drives drives={this.state.drives} />
                        </div>
                    </div>

                    <div className="col-12-xs col-6-sm col-6-md col-6-lg">
                        <p className="t-center t-bold">Connected Devices</p>
                        <div className="card">
                            <div className="row">
                                <div className="col-2 t-bold">IP</div>
                                <div className="col-5 t-bold">Name</div>
                                <div className="col-5 t-bold">Last Connection</div>
                                <hr />
                            </div>
                            <Devices devices={this.state.devices} />
                        </div>
                    </div>
                </div>
            )
        }
        return (<Loader />);
    }
}

export default ServicesContainer;