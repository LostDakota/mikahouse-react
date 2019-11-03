import React, { Component } from "react";

import TitleService from "../Shared/TitleService";
import Config from "../Shared/Config";
import { Loader } from "../Shared/Loader";
import { EvaluateIcon, IconColor } from "../Home/Events";
import moment from "moment";
import { DatePicker } from "./DatePicker";

const buildCards = events => {
    if (events.length === 0) {
        return (
            <div className="card">
                <div className="content">
                    <h3 className="t-center">No Events Recorded Today</h3>
                </div>                
            </div>
        )
    }
    return events.map((event, i) => {
        return (
            <div key={i} className="card">
                <div className="content">
                    <i className={`fa ${EvaluateIcon(event.notif)} right ${IconColor(event.notif)} t-large`}></i>
                    <img className="avatar-sm left m-5-r" alt={event.image} src={`${Config.Images}/${event.image}.webp`} />
                    <div className="short-text">
                        <h3>{event.notif}</h3>
                        <span className="t-small t-muted">{moment.unix(event.date).format('MMM Do YYYY h:mma')}</span>
                    </div>
                </div>                
            </div>
        )
    })
}

class EventsContainer extends Component {
    state = {};
    loading = true;    

    setDate = event => {
        this.setState({selected: event.target.value});
        fetch(`${Config.Api}/events/day/${event.target.value}`)
            .then(response => response.json())
            .then(json => this.setState({events: json}));
    }

    componentDidUpdate() {
        setTimeout(function(){
            window.resizeAllGridItems();
        }, 1000);
    }

    componentDidMount() {
        TitleService.SetTitle('Events');
        fetch(`${Config.Api}/events`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.loading = false;
                this.setState({ events: data });
            });

        fetch(`${Config.Api}/security/days`)
            .then(data => data.json())
            .then(data => this.setState({days: data}));
    }

    render() {
        if (!this.loading) {
            return (
                <>
                    <DatePicker days={this.state.days} switch={this.setDate} selected={this.state.selected} />
                    {buildCards(this.state.events)}
                </>
            )
        } else {
            return (<Loader />);
        }
    }
}

export default EventsContainer;