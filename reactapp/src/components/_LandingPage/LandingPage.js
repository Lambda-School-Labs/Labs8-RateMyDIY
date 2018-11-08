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
  PopularReviewers,
  SearchBar
} = require("../../components");

class LandingPage extends Component {
  constructor() {
    super();
    this.state = { input: "" };
  }
  componentDidMount() {
    console.log("component did mount!");
    this.props.getProjects();
    this.props.getMakers();
    this.props.getReviewers();
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ ...this.state, input: e.target.value });
  };

  handleSearch = e => {
    //HTTP request to server
    //Get search results from server
    //Save to Redux store
  };

  render() {
    console.log(SearchBar);
    return (
      <div className="container">
        <SearchBar handleChange={this.handleChange} />
        <div className="landing-page-container">
          <FeaturedProjects featuredProjects={this.props.featuredProjects} />
          <PopularMakers popularMakers={this.props.popularMakers} />
          <PopularReviewers reviewers={this.props.popularReviewers} />
        </div>
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
