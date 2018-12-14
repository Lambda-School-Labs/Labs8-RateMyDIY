import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyReviews, fetchSearchResults, loggedIn, getFeaturedProjects } from '../../../actions';
import { AccountSideBar } from '../../../components';
import { Header } from '../../../components';
import styled from 'styled-components';
import './ReviewList.css';
// import styled from 'styled-components';
import { ReviewCard } from '../../../components';
import { ProjectTile } from '../../../components';
import { EmptyCard }from '../../../components';
// const CardLink = styled.a`
//   text-decoration: none;
//   color:black &:hover {
//     text-decoration: none;
//     color: black;
//   }
// `;

const SelectHeader = styled.h1`
	color: ${props => props.theme.mui.palette.primary.dark};
	font-weight: bold;
`;

const FeaturedProjectListTiles = styled.div`
	display: flex;
	flex-direction: column
	/* justify-content: space-between; */

	@media (max-width: 500px) {
		width: 100%;
		// align-self: center;
	}
`;

class ReviewList extends Component {
	constructor() {
		super();
		this.state = { input: '' };
	}

	componentDidMount() {
		this.props.loggedIn(fetchMyReviews);
		this.props.getFeaturedProjects();
	}

	handleChange = e => {
		this.setState({ ...this.state, input: e.target.value });
	};

	handleSearch = e => {
		e.preventDefault();
		const searchTerm = this.state.input;
		console.log(searchTerm);
		//call featch search results action
		//push to search page
		this.props.fetchSearchResults(searchTerm);
		this.props.history.push(`/search?query=${searchTerm}`);
	};

	render() {
		console.log('REVIEWS', this.props.myReviews)
		if (!this.props.myReviews || this.props.myReviews.length === 0) {
			return (
				<div className='reviewPage'>
					<Header
						handleChange={this.handleChange}
						handleSearch={this.handleSearch}
					/>
					{window.innerWidth <= 500 ? null : <AccountSideBar />}
					{window.innerWidth <= 500 ? 
					<SelectHeader className='selectHeader'>Select a project to review</SelectHeader>
					:
					null}
					<FeaturedProjectListTiles>
						{this.props.featuredProjects.map(project => (
							<ProjectTile
								history={this.props.history}
								project={project}
								key={project.project_id}
							/>
						))}
					</FeaturedProjectListTiles>
				</div>
			);
		} else {
			return (
				<div className='reviewPage'>
					<Header
						handleChange={this.handleChange}
						handleSearch={this.handleSearch}
					/>
					<div className='reviewContainer'>
					{window.innerWidth <= 500 ? null : <AccountSideBar />}
					{window.innerWidth <= 500 ? 
					<SelectHeader className='selectHeader'>Your Reviews</SelectHeader>
					:
					null}

					<div className="myReviewDisplay">
						{this.props.myReviews.map((myReviews, index) => {
							if (index === 0) {
								return (
								<Fragment>
									<EmptyCard addNew style={{ margin: '3%' }} />
									<ReviewCard
										review={myReviews}
										key={myReviews.review_id}
										showReviewModal={value =>
											this.setState({ reviewModal: value })
										}
									/>
								</Fragment>
								)
							} else {
								return <ReviewCard
									review={myReviews}
									key={myReviews.review_id}
									showReviewModal={value =>
										this.setState({ reviewModal: value })
									}
								/>
							}
						})}
					</div>
				</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		myReviews: state.myProjectReducer.myReviews,
		featuredProjects: state.landingPageReducer.featuredProjects,
		userInfo: state.loggedInReducer.userInfo
	};
};

export default connect(
	mapStateToProps,
	{ fetchMyReviews, fetchSearchResults, loggedIn, getFeaturedProjects }
)(ReviewList);
