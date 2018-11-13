import React, { Component } from "react";
import { connect } from "react-redux";
import { AccountSideBar } from "../../../components";
import "./Billing.css";

class Billing extends Component {
  render() {
    return (
      <div className="sideBar">
        <AccountSideBar />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(
  mapStateToProps,
  {}
)(Billing);
