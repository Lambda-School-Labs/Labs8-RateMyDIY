import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { SearchBar, Nav } from '../index';

const HeaderContainer = styled.div`
	width: 100%;
	height: 76px;
	z-index: 999;
	position: fixed;
	background-color: #232a34;
`;

const HeaderContainerWraper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderSearchContainer = styled.div`
	width: 50%;
	margin: 0 20px;
`;

const Logo = styled.img`
	cursor: pointer;
`;

class Header extends Component {
	state = {};

	render() {
		return (
			<HeaderContainer>
				{this.state.redirect && <Redirect push to={this.state.redirect} />}
				<HeaderContainerWraper>
					<Logo
						style={{ width: '60px', height: '60px', margin: '0 20px' }}
						src="https://ratemydiy.s3.amazonaws.com/1543872216210"
						alt="LOGO"
						onClick={() => this.setState({ redirect: '/' })}
					/>

					<HeaderSearchContainer>
						<SearchBar
							handleChange={this.props.handleChange}
							handleSearch={this.props.handleSearch}
						/>
					</HeaderSearchContainer>
					<Nav />
				</HeaderContainerWraper>
			</HeaderContainer>
		);
	}
}

export default Header;
