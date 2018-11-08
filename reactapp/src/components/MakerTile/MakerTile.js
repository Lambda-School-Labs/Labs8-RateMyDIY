// Import Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MakerTile.css";

const MakerTile = props => {
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
      <p className="project-name">{props.maker.name}</p>
    </div>
  );
};

export default MakerTile;
