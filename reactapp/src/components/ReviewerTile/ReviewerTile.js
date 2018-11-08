// Import Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ReviewerTile.css";

const ReviewerTile = props => {
  return (
    <div className="project">
      <img className="project-image" src="${https://someAWS.S3.URL}" />
      <p className="project-name">{props.reviewer.name}</p>
    </div>
  );
};

export default ReviewerTile;
