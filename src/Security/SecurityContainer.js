import React, { Component } from "react";

import TitleService from "../Shared/TitleService";
import Config from "../Shared/Config";
import { Loader } from "../Shared/Loader";

import { ServerStatus } from "./Status";
import { Cameras } from "./Cameras";
import { Events } from "./Events";

class SecurityContainer extends Component {
    state = {};

    localDateString = () => {
        let d = new Date();
        d.setHours((d.getTimezoneOffset() / 60) * -1);
        return d.toISOString();
    }

    refreshImage = (id, element) => {
        var src = element.attributes.src.value.split('?')[0];
        element.setAttribute('src', `${src}?ts=${new Date()}`);
    }

    toggleSecurity = () => {
        this.setState({ status: { loading: true } });
        fetch(`${Config.Api}/security/state`)
            .then(response => {
                return response.json();
            })
            .then(json => {                
                this.setState({ status: json.result, loading: false });
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
        this.setState({ isLive: false });
        this.setState({
            liveAction: e => {
                const element = e.target;
                const id = parseInt(e.target.id.replace('camera-', ''));
                if(e && !this.state.isLive){
                    this.setState({isLive: true});
                    document.getElementById(`live-controls-${id}`).classList.add('show');
                    this.interval = setInterval(() => {
                        this.refreshImage(id, element);
                    }, 1000);
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
                this.setState({ loading: false });
                this.setState({ status: data });
                return true;
            });

        let eventCount = fetch(`${Config.Api}/security/todayseventcount/${this.localDateString()}`)
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