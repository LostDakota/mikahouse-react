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

    componentDidUpdate() {
        setTimeout(() => {
            window.resizeAllGridItems();
        }, 1000);
    }

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
                    <div className="card">
                        <div className="content">
                            <p className="t-center t-bold m-5-b">Plex</p>
                            <Plex plex={this.state.plex} />
                        </div>
                    </div>                    
                    
                    <div className="card">
                        <div className="content grid-three">
                            <p className="t-center t-bold title-item m-5-b">Newest Shows</p>
                            <Shows toggle={this.toggleModal} shows={this.state.newest} />
                        </div>                        
                    </div>
                    
                    <div className="card">
                        <div className="content grid-three">
                            <p className="t-center t-bold title-item m-5-b">Newest Movies</p>
                            <Movies movies={this.state.movies} />
                        </div>                        
                    </div>
                    
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