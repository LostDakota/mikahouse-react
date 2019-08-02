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

    getFormatedToday = () => {
        var date = new Date();
        return  date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2);
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

    componentDidUpdate() {
        setTimeout(function(){
            window.resizeAllGridItems();
        }, 1000);
    }
    
    componentDidMount() {
        TitleService.SetTitle("Captured Events");
        this.setState({ loading: true });
        this.setState({ selected: `${this.getFormatedToday()}T04:00:00.000Z`})
        fetch(`${Config.Api}/security/days`)
            .then(data => {
                this.getVideos(this.selected);
                return data.json()
            })
            .then(data => {
                this.setState({ days: data });
            });
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