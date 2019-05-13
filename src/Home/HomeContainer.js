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
    state = {
        users: [],
        lastevent: {
            image: '/images/security/last.jpg',
            time: 'Loading...'
        },
        stats: [],
        newest: [],
        events: []
    };

    componentDidUpdate() {
        setTimeout(function(){
            window.resizeAllGridItems();
        }, 1000);
    }

    componentDidMount() {
        TitleService.SetTitle('Home');

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
                localStorage.setItem('authenticated', true);
                this.setState({ loading: false });
            })
            .catch(err => {
                localStorage.setItem('authenticated', false);
                window.location.href = '/login';
            });
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