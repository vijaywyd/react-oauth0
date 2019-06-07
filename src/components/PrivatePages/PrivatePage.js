import React, { Component } from "react";

export default class PrivatePage extends Component {
    
    state = {
        message: "Loading ..."
    }

    componentDidMount() {
        fetch("/private", {
            headers: {
                Authorization: `Bearer ${this.props.auth.getAccessToken()}`
            }
        }).then(response => {
            if(response.ok)
                return response.json();
                throw new Error("Response was not ok.")
        }).then(response => {
                this.setState({
                    message: response.message
                });
        }).catch(error => {
            this.setState({
                message: error.message
            });
        });
    }
    
    render() {
        return(
            <div>
                <p>{this.state.message}</p>
            </div>
        );
    }
}