import React, { Component } from "react";

import TitleService from "../Shared/TitleService";
import Config from "../Shared/Config";
import { Loader } from "../Shared/Loader";

import { ServerStatus } from "./Status";
import { Cameras } from "./Cameras";
import { Events } from "./Events";

class SecurityContainer extends Component {
    state = {};

    refreshImage = (id, element) => {
        return new Promise((resolve, reject) => {
            fetch(`${Config.Api}/security/camera/${id + 1}`)
                .then(response => {
                    return response.text();
                })
                .then(url => {
                    element.setAttribute('src', `${Config.Host}${url}`);
                });
        });        
    }

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

    componentDidUpdate() {
        setTimeout(() => {
            window.resizeAllGridItems();
        }, 1000);
    }

    componentDidMount() {
        TitleService.SetTitle('Security');
        this.setState({ loading: true });
        this.setState({isLive: false});
        this.setState({
            liveAction: e => {
                const element = e.target;
                const id = parseInt(e.target.id.replace('camera-', ''));
                if(e && !this.state.isLive){
                    this.setState({isLive: true});
                    document.getElementById(`live-controls-${id}`).classList.add('show');
                    // this.interval = setInterval(() => {
                    //     this.refreshImage(id, element);
                    // }, 1000);
                } else {
                    clearInterval(this.interval);
                    this.setState({isLive: false});
                    document.querySelector('.live-controls.show').classList.remove('show');
                }
            }
        });

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
                <>
                    <div className="card">
                        <div className="content grid-two">
                            <p className="t-center t-bold title-item">System Status</p>
                            <ServerStatus status={this.state.status} toggle={this.toggleSecurity} />
                            <Events events={this.state.eventCount} />
                        </div>
                                                
                    </div>

                    <Cameras cameras={this.state.cameras} live={this.state.liveAction} />                    
                </>
            );
        }
        return (<Loader />);
    }
}

export default SecurityContainer;