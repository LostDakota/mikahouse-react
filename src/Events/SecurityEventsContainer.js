import React, { Component } from "react";

import Config from "../Shared/Config";
import { DatePicker } from "./DatePicker";
import TitleService from "../Shared/TitleService";
import { Video } from "./Video";
import { Loader } from "../Shared/Loader";

class SecurityEventsContainer extends Component {
    state = {}

    setDate = event => {
        this.getVideos(event.target.value);
        this.setState({ selected: event.target.value });
    }

    getVideos = date => {
        this.setState({ loading: true });
        fetch(`${Config.Api}/security/todaysevents/${date}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ events: data });
                this.setState({ loading: false });
            })
    }

    componentDidMount() {
        TitleService.SetTitle("Captured Events");
        this.setState({ loading: true });
        fetch(`${Config.Api}/security/days`)
            .then(data => {
                return data.json()
            })
            .then(data => {
                this.setState({ days: data });
            });


        this.getVideos(new Date());
    }

    render() {
        if(!this.state.loading){
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