// Import Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";

//Import components
import { MakerTile } from "../../../components";

//Import Styling

class PopularMakers extends Component {
  constructor() {
    super();
  }
  componentDidMount() {}
  render() {
    return (
      <div className="projects-container">
        <h1>Popular Makers</h1>
        <div className="projects">
          {this.props.popularMakers.map(maker => (
            <MakerTile maker={maker} />
          ))}
        </div>
      </div>
    );
  }
}

export default PopularMakers;
