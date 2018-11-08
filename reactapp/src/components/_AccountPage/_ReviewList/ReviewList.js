import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyReviews } from "../../../actions";
import { AccountSideBar } from "../../../components";

import "./ReviewList.css";


class ReviewList extends Component {
  componentDidMount() {
    this.props.fetchMyReviews();
    console.log(this.props.myReviews);
  }

  render() {

  

    if (!this.props.myReviews || this.props.myReviews.length === 0) {
      return (
          <div className="reviewPage">   
        <div className="sideBar">
        <AccountSideBar />
      </div>
        <div className="addNewReview">
          <h2>Add a new review</h2>
          <Link to="">
            <img src="http://chittagongit.com//images/plus-button-icon/plus-button-icon-13.jpg" />
          </Link>
        </div>
         </div>
      );
      
    } else {
      return (
        <div className="reviewPage">
          <div className="sideBar">
          <AccountSideBar />
          </div>

          <div className="myReviewDisplay">
            {this.props.myReviews.map(myReviews => {
              return (
                <div className="myReviewsDisplay" key={myReviews.id}>
                  <h2>{myReviews.name}</h2>
                  <p>{myReviews.star_count}</p>
                  <p>{myReviews.photo_url}</p>
                </div>
              );
            })}
          </div>
        </div>
        
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    myReviews: state.myProjectReducer.myReviews
  };
};

export default connect(
  mapStateToProps,
  { fetchMyReviews }
)(ReviewList);
