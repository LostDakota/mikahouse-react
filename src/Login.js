import React, { Component } from "react";
import Config from "./Shared/Config";

class Login extends Component {
    state = {}

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        fetch(`${Config.Host}/login`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(this.state)
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.username} onChange={this.handleChange} name="username" type="text" />
                    <input value={this.state.password} onChange={this.handleChange} name="password" type="password" />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Login;