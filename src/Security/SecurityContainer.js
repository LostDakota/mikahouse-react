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

        let camera1 = fetch(`${Config.Api}/security/camera/1`)
            .then(response => {
                setTimeout(() => {
                    return response;
                }, 1000);                
            });

        let camera2 = fetch(`${Config.Api}/security/camera/2`)
            .then(response => {
                setTimeout(() => {
                    return response;
                }, 1000);
            });

        let cameras = [camera1, camera2];        

        Promise.all([status, eventCount, cameras, cameras])
            .then(data => {
                this.setState({ loading: false });
                this.setState(
                    { 
                        cameras: [
                            `/images/security/1.jpg?stamp=${new Date().getTime()}`,
                            `/images/security/2.jpg?stamp=${new Date().getTime()}`
                        ] 
                })
            })
    }

    render() {
        if (!this.state.loading) {
            return (
                <>
                    <div className="row">
                        <div className="col-12">
                            <p className="t-center t-bold">System Status</p>
                        </div>
                    </div>
                    <ServerStatus status={this.state.status} toggle={this.toggleSecurity} />
                    <Events events={this.state.eventCount} />
                    <div className="row">
                        <div className="col-12">
                            <p className="t-center t-bold">Current Views</p>
                        </div>
                    </div>
                    <Cameras cameras={this.state.cameras} />
                </>
            );
        }
        return (<Loader />);
    }
}

export default SecurityContainer;