import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./SearchBar.css";

//Apply styles
// const SearchBar = styled.div`
//   width: 400px;
//   height: 35px;
//   font-size: 14px;
// `;

const SearchBar = props => {
  return (
    <div className="search-bar">
      <input
        onChange={e => props.handleChange(e)}
        placeholder="Find a DIY project"
      />
      <button class="search-button">Search</button>
    </div>
  );
};

export default SearchBar;
