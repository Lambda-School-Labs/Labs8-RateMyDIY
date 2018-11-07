// Import Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";

//Import components
import { ProjectTile } from "../../../components";

//Import Styling
import "./FeaturedProjects.css";
class FeaturedProjects extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="projects-container">
        <h1>Featured Projects</h1>
        <div className="projects">
          {this.props.featuredProjects.map(project => (
            <ProjectTile project={project} />
          ))}
        </div>
      </div>
    );
  }
}

export default FeaturedProjects;
