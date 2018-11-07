// Import Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";

//Import components
import { ReviewerTile } from "../../../components";

//Import Styling

class Reviewers extends Component {
  constructor() {
    super();
  }
  componentDidMount() {}
  render() {
    return (
      <div className="projects-container">
        <h1>Popular Reviewers</h1>
        <div className="projects">
          {this.props.reviewers.map(reviewer => (
            <ReviewerTile reviewer={reviewer} />
          ))}
        </div>
      </div>
    );
  }
}

export default Reviewers;
