import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyProjects } from "../../../actions";
import { AccountSideBar } from "../../../components";
import "./ProjectList.css";


class ProjectList extends Component {
  componentDidMount() {
    this.props.fetchMyProjects();
    console.log(this.props.myProjects);
  }

  render() {
    return (
      <div className="projectPage">
        <div className="sideBar">
        <AccountSideBar />
        </div>

        <div className="myProjectDisplay">
          {this.props.myProjects.map(myProjects => {
            return (
              <div className="myProjectsDisplay" key={myProjects.id}>
                <h2>{myProjects.name}</h2>
                <p>{myProjects.star_count}</p>
                <p>{myProjects.photo_url}</p>
              </div>
            );
          })}
          <div className="addNew">
            <h2>New Project</h2>
            <Link to="">
              <img src="http://chittagongit.com//images/plus-button-icon/plus-button-icon-13.jpg" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myProjects: state.myProjectReducer.myProjects
  };
};

export default connect(
  mapStateToProps,
  { fetchMyProjects }
)(ProjectList);
