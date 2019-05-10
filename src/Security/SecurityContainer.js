import React, { Component } from "react";

import TitleService from "../Shared/TitleService";
import Config from "../Shared/Config";
import { Loader } from "../Shared/Loader";

import { ServerStatus } from "./Status";
import { Cameras } from "./Cameras";
import { Events } from "./Events";

class SecurityContainer extends Component {
    state = {};

    toggleSecurity = () => {
        let temp = this.state.status;
        temp.loading = true;
        this.setState({ status: temp })
        fetch(`${Config.Api}/security/state`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                temp.loading = false;
                temp.result = temp.result === 0 ? 1 : 0;
                this.setState({ status : temp });
            })
    }

    componentDidMount() {
        TitleService.SetTitle('Security');
        this.setState({ loading: true });

        let status = fetch(`${Config.Api}/security/status`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                data['loading'] = false;
                this.setState({ status: data });
                return true;
            });

        let eventCount = fetch(`${Config.Api}/security/todayseventcount`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({ eventCount: data });
                return true;
            });

        let cameras = fetch(`${Config.Api}/security/cameras`)
            .then(response => {
                return response.json();              
            })
            .then(data => {
                this.setState({ cameras: data });
                return true;
            })

        Promise.all([status, eventCount, cameras])
            .then(data => {
                this.setState({ loading: false });
            })
    }

    render() {
        if (!this.state.loading) {
            return (
                <div class="row">
                    <div className="col-12-xs col-6-sm col-6-md col-6-lg">
                        <p className="t-center t-bold">System Status</p>
                        <div class="row">
                            <ServerStatus status={this.state.status} toggle={this.toggleSecurity} />
                            <Events events={this.state.eventCount} />
                        </div>                        
                    </div>

                    <div className="col-12-xs col-6-sm col-6-md col-6-lg">
                        <p className="t-center t-bold">Current Views</p>
                        <Cameras cameras={this.state.cameras} />
                    </div>
                    
                </div>
            );
        }
        return (<Loader />);
    }
}

export default SecurityContainer;