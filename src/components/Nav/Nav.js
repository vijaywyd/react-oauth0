import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const Nav = () => {
    return (
        <ul className = "navBar">
            <li>
                <Link to = "/home">Home</Link>
            </li>
            <li>
                <Link to = "/profile">Profile</Link>
            </li>
        </ul>
    )
}