import React, { Component } from "react";

import TitleService from "../Shared/TitleService";
import Config from "../Shared/Config";
import { Loader } from "../Shared/Loader";

import People from "./People";
import LastEvent from "./LastEvent";
import ServerStats from "./ServerStats";
import Newest from "./Newest";
import Events from "./Events";

class HomeContainer extends Component {
    state = {};

    componentDidMount() {
        TitleService.SetTitle('Home');
        this.setState({ loadin: true });

        let users = fetch(`${Config.Api}/users/list`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({ users: data });
                return true;
            });

        let event = fetch(`${Config.Api}/security/lastevent`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({ lastevent: data });
                return true;
            });

        let stats = fetch(`${Config.Api}/server`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({ stats: data });
                return true;
            });

        let newest = fetch(`${Config.Api}/media/newest`)
            .then(data => {
                return data.json()
            })
            .then(data => {
                this.setState({ newest: data });
                return true;
            });

        let events = fetch(`${Config.Api}/events/3`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({ events: data });
                return true;
            });

        Promise.all([users, event, stats, newest, events])
            .then(data => {
                this.setState({ loading: false });
            })
            .catch(err => {
                window.location.href = '/login';
            })

    }

    render() {
        if (this.state.loading === false) {
            return (
                <>
                    <People people={this.state.users} />
                    <LastEvent event={this.state.lastevent} />
                    <ServerStats stats={this.state.stats} />
                    <Newest newest={this.state.newest} />
                    <Events events={this.state.events} />
                </>
            )
        }
        return (<Loader />);
    }
}

export default HomeContainer;