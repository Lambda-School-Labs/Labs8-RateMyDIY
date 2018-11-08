// Import Dependencies
import React, { Component } from "react";
import { NavLink, Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects, getMakers, getReviewers } from "../../actions";
import "./LandingPage.css";

//Import component
const {
  FeaturedProjects,
  PopularMakers,
  PopularReviewers
} = require("../../components");

class LandingPage extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log("component did mount!");
    this.props.getProjects();
    this.props.getMakers();
    this.props.getReviewers();
  }

  render() {
    return (
      <div className="landing-page-container">
        <FeaturedProjects featuredProjects={this.props.featuredProjects} />
        <PopularMakers popularMakers={this.props.popularMakers} />
        <PopularReviewers reviewers={this.props.popularReviewers} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    featuredProjects: state.landingPageReducer.featuredProjects,
    popularMakers: state.landingPageReducer.popularMakers,
    popularReviewers: state.landingPageReducer.popularReviewers
  };
};

export default connect(
  mapStateToProps,
  { getProjects, getMakers, getReviewers }
)(LandingPage);
