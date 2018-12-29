import React, { Component } from "react";

import { Plex } from "./Plex";
import { Shows } from "./Shows";
import { Movies } from "./Movies";

import TitleService from "../Shared/TitleService";
import { Loader } from "../Shared/Loader";
import Config from "../Shared/Config";
import { PopUp } from "./PopUp";

class MediaContainer extends Component {
    state = {};

    componentDidMount() {

        TitleService.SetTitle('Media');
        this.setState({ showModal: false });
        this.setState({ loading: true });

        let nowPlaying = fetch(`${Config.Api}/media/nowplaying`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({ plex: data.MediaContainer });
            })

        let newest = fetch(`${Config.Api}/media/newest`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({ newest: data });
                this.setState({ show: data[0] });
            })

        let movies = fetch(`${Config.Api}/media/movies`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({ movies: data });
            })

        Promise.all([nowPlaying, newest, movies])
            .then(() => {
                this.setState({ loading: false });
            })
    }

    toggleModal = index => {
        this.setState({ showModal: !this.state.showModal });
        if (Number.isInteger(index)) {
            this.setState({ show: this.state.newest[index] });
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <>
                    <div className="row">
                        <div className="col-12">
                            <p className="t-center t-bold">Plex</p>
                        </div>
                    </div>
                    <Plex plex={this.state.plex} />
                    <div className="row">
                        <div className="col-12">
                            <p className="t-center t-bold">Newest Shows</p>
                        </div>
                    </div>
                    <Shows toggle={this.toggleModal} shows={this.state.newest} />
                    <div className="row">
                        <div className="col-12">
                            <p className="t-center t-bold">Newest Movies</p>
                        </div>
                    </div>
                    <Movies movies={this.state.movies} />
                    <PopUp toggle={this.toggleModal} display={this.state.showModal} show={this.state.show} />
                </>
            )
        }
        return (
            <Loader />
        );
    }
}

export default MediaContainer;