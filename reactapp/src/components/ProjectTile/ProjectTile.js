// Import Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ProjectTile.css";

const ProjectTile = props => {
  return (
    <div className="project">
      <img className="project-image" src="${https://someAWS.S3.URL}" />
      <div className="star-rating">
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
      </div>
      <p className="project-name">{props.project.name}</p>
      <Link to="/:author">{props.project.author}</Link>
    </div>
  );
};

export default ProjectTile;
