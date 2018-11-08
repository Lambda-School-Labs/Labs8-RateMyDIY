// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./AccountSideBar.css";


class AccountSideBar extends Component {
  render() {
    return (
      <div className="accountSideBar">
          <Link to="/Search"><h1>Search</h1></Link>
          <Link to="/ProjectList"><h1>My Projects</h1></Link>
          <Link to="/ReviewList"><h1>My Reviews</h1></Link>
          <Link to="/Billing"><h1>Billing</h1></Link>
          <Link to="/Settings"><h1>Settings</h1></Link>
      </div>
    );
  }
}

export default AccountSideBar;
