import React, { Component } from "react";

import Config from "../Shared/Config";
import { DatePicker } from "./DatePicker";
import TitleService from "../Shared/TitleService";
import { Video } from "./Video";
import { Loader } from "../Shared/Loader";

class SecurityEventsContainer extends Component {
    state = {
        events: [],
        pageIndex: 0,
        hasMore: true,
        fetching: false
    }

    setDate = event => {
        this.setState({ loading: true });
        this.setState({ pageIndex: 0 });
        this.setState({ selected: event.target.value }, () => this.getVideos(true));
    }

    getFormatedToday = () => {
        var date = new Date();
        return date.getUTCFullYear() + '-' +
                ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
                ('00' + date.getUTCDate()).slice(-2);
    }

    getVideos = newDay => {        
        this.setState({ fetching: true });
        if(newDay) this.setState({ events: [] });
        fetch(`${Config.Api}/security/todaysevents/${this.state.selected}/${this.state.pageIndex}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ events: this.state.events.concat(data) });
                this.setState({ fetching: false });
                if (this.state.events.length === this.state.count) {
                    this.setState({ hasMore: false });
                } else {
                    this.setState({ hasMore: true });
                }

                if(this.state.pageIndex === 0) {
                    this.setState({ loading: false });
                }
            });
    }

    componentDidMount() {
        TitleService.SetTitle("Captured Events");
        this.setState({ loading: true });
        this.setState({ selected: new Date().toISOString() });
        fetch(`${Config.Api}/security/days`)
            .then(data => {
                this.getVideos();
                return data.json()
            })
            .then(data => {
                this.setState({ days: data });
            });

        window.onscroll = () => {
            if(!this.state.hasMore || this.state.fetching) return;
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
                this.setState({ pageIndex: this.state.pageIndex + 1}, () => {
                    this.getVideos();
                });
            }
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <>
                    <DatePicker days={this.state.days} switch={this.setDate} selected={this.state.selected} />
                    <Video events={this.state.events} />
                </>
            );
        }
        return (<Loader />);
    }
}

export default SecurityEventsContainer;