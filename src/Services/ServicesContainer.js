import React, { Component } from "react";

import Config from "../Shared/Config";
import TitleService from "../Shared/TitleService";
import { Loader } from "../Shared/Loader";

import ServerStats from "../Home/ServerStats";
import { Drives } from "./Drives";
import { Devices } from "./Devices";

class ServicesContainer extends Component {
    state = {};

    componentDidUpdate() {
        setTimeout(function(){
            window.resizeAllGridItems();
        }, 1000);
    }

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
                <>
                    <ServerStats stats={this.state.stats} />                    
                    
                    <div className="card">
                        <div className="content">
                            <p className="t-center t-bold title-item m-5-b">Storage</p>
                            <Drives drives={this.state.drives} />
                        </div>                        
                    </div>

                    <div className="card o-hidden">
                        <div className="content grid-three stats">
                            <span className="t-bold m-5-b">IP</span>
                            <span className="t-bold m-5-b">Name</span>
                            <span className="t-bold m-5-b">Last Connection</span>
                            <Devices devices={this.state.devices} />
                        </div>                        
                    </div>
                </>
            )
        }
        return (<Loader />);
    }
}

export default ServicesContainer;