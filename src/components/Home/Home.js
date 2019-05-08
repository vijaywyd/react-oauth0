import React from "react";
import { Link } from "react-router-dom";

export const Home = (props) => {

    const {isAuthenticated, login} = props.auth;
    return (
        <div>
            <h1>Home</h1>

            {
                isAuthenticated() ? <Link to = "/profile"> View profile </Link> : <button onClick = {login}>Log In</button>
            }
        </div>
    );
}