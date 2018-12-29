import React, { Component } from "react";

import TitleService from "../Shared/TitleService";
import Config from "../Shared/Config";
import { Loader } from "../Shared/Loader";
import { EvaluateIcon, IconColor } from "../Home/Events";
import moment from "moment";

const buildCards = events => {
    if (events.length === 0) {
        return (
            <div className="col-12">
                <div className="card">
                    <h3 className="t-center">No Events Recorded Today</h3>
                </div>
            </div>
        )
    }
    return events.map((event, i) => {
        return (
            <div key={i} className="col-12">
                <div className="card">
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

    componentDidMount() {
        TitleService.SetTitle('Events');
        fetch(`${Config.Api}/events`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.loading = false;
                this.setState({ events: data });
            })
    }

    render() {
        if (!this.loading) {
            return (
                <>
                    {buildCards(this.state.events)}
                </>
            )
        } else {
            return (<Loader />);
        }
    }
}

export default EventsContainer;