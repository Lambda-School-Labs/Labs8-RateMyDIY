import React from 'react';
// import { Link } from "react-router-dom";
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown
} from 'reactstrap';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import { sortProjects } from '../../actions/index';

import { SortDropDown } from '../index';

//Apply styles
const SearchWrapper = styled.div`
	width: 35%;
	height: 25px;
	margin: 15px auto;
	display: flex;
	flex-direction: column;
	margin-left: 55%;

	border: 1px solid yellow;
`;

const SelectWrapper = styled.div`
	display: flex;
	justify-content: space-around;
`;

const SelectStyle = styled.div`
	height: 24px;
	width: 20%;
	transform: 1s;
	/* border-radius: 5px; */
`;

const SearchOptionsLabel = styled.p`
	font-size: 14px;
	text-transform: uppercase;
`;
class SearchPageSearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false
		};
	}

	handleSort = sortBy => {
		console.log('lets sort these projectsssss');
		this.props.sortProjects(sortBy);
	};

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}
	//

	render() {
		return (
			<SearchWrapper>
				<SelectWrapper>
					<h1>Filter by</h1>
					<SelectStyle name="Category" id="category">
						<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
							<DropdownToggle caret>Categories</DropdownToggle>
							<DropdownMenu>
								<DropdownItem
									onClick={e => this.props.handleFilterCategoryTech(e)}
								>
									Tech
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem
									onClick={e => this.props.handleFilterCategoryFood(e)}
								>
									Food
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem
									onClick={e => this.props.handleFilterCategoryHome(e)}
								>
									Home
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</SelectStyle>
					<SearchOptionsLabel>sort</SearchOptionsLabel>
					<SortDropDown
						handleSort={this.handleSort}
						options={['Rating', 'New', 'Reviews']}
					/>
					{/* <SelectStyle name="Stars" id="stars">
						<UncontrolledDropdown>
							<DropdownToggle caret>Sort By</DropdownToggle>
							<DropdownMenu>
								<DropdownItem>Rating Up</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Rating Down</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Date of Review</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</SelectStyle> */}
				</SelectWrapper>
			</SearchWrapper>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		// projects: state.searchReducer.projects,
		// gettingSearchResults: state.searchReducer.gettingSearchResults
	};
};

export default connect(
	mapStateToProps,
	{ sortProjects }
)(SearchPageSearchBar);
