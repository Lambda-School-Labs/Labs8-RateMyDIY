// Dependencies
import React, { Component } from 'react';
// import { Route } from "react-router-dom";
import { fetchSearchResults, fetchCategoryResults } from '../../actions';
import { connect } from 'react-redux';
import './SearchPage.css';

//Import components
import {
	SearchBar,
	ProjectTile,
	SearchPageSearchBar,
	Nav
} from '../../components';

class SearchPage extends Component {
	constructor() {
		super();
		this.state = { input: '' };
	} // useless constructor

	componentDidMount() {}

	handleChange = e => {
		this.setState({ ...this.state, input: e.target.value });
	};

	handleSearch = e => {
		e.preventDefault();
		const searchTerm = this.state.input;
		console.log(searchTerm);
		//call featch search results action
		this.props.fetchSearchResults(searchTerm);

		//push to search page
		this.props.history.push(`/search?query=${searchTerm}`);
	};

	handleFilterCategoryFood = e => {
		e.preventDefault();
		const searchTerm = 'food';
		console.log(searchTerm);
		//call featch search results action
		this.props.fetchCategoryResults(searchTerm);
		//push to search page
		this.props.history.push(`/search?query=${searchTerm}`);
	};

	handleFilterCategoryTech = e => {
		e.preventDefault();
		const searchTerm = 'tech';
		console.log(searchTerm);
		//call featch search results action
		this.props.fetchCategoryResults(searchTerm);
		//push to search page
		this.props.history.push(`/search?query=${searchTerm}`);
	};

	handleFilterCategoryHome = e => {
		e.preventDefault();
		const searchTerm = 'Home Improvement';
		console.log(searchTerm);
		//call featch search results action
		this.props.fetchCategoryResults(searchTerm);
		//push to search page
		this.props.history.push(`/search?query=${searchTerm}`);
	};

	render() {
		console.log(this.props.projects);
		return (
			<div className="search-page-container">
				<Nav />
				<SearchBar
					handleChange={this.handleChange}
					handleSearch={this.handleSearch}
				/>
				<div className="search-options" />
				<div className="search-results">
					<h1>Search results</h1>
					{this.props.projects.length === 0 ? <p>No projects found</p> : ''}
					<SearchPageSearchBar
						handleFilterCategoryFood={this.handleFilterCategoryFood}
						handleFilterCategoryTech={this.handleFilterCategoryTech}
						handleFilterCategoryHome={this.handleFilterCategoryHome}
						handleChange={this.handleChange}
					/>

					{this.props.projects.map(project => (
						<ProjectTile project={project} />
					))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		projects: state.searchReducer.projects
	};
};

export default connect(
	mapStateToProps,
	{ fetchSearchResults, fetchCategoryResults }
)(SearchPage);
