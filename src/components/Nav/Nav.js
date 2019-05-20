import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const Nav = (props) => {
    const {isAuthenticated, login, logout} = props.auth || {};
    return (
        <ul className = "navBar">
            <li>
                <Link to = "/home">Home</Link>
            </li>
            <li>
                <Link to = "/profile">Profile</Link>
            </li>
            <li>
                <button onClick = {isAuthenticated() ? logout : login }>
                    {isAuthenticated() ? "Logout" : "Login"}
                </button>
            </li>
        </ul>
    )
}