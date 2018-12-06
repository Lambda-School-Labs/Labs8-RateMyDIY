// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsername } from '../../../actions/settingActions';

import { Nav, Twillio } from '../../../components';
//Styles
const SettingsContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 550px;
	width: 84%;
	background: #bbb;
`;

class UserSettingSettings extends Component {
	state = {
		username: ''
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.getUsername(this.state.username);
		this.setState({
			username: ''
		});
	};

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		return (
			<SettingsContainer>
				<Nav />
				<Twillio />
				<form onSubmit={this.submitHandler}>
					<input
						type="text"
						value={this.state.username}
						name="username"
						onChange={this.changeHandler}
					/>
					<input type="submit" value="Change Username" />
				</form>
				Current Username: {this.props.userInfo.username} {this.props.error ? this.props.error : null}
			</SettingsContainer>
		);
	}
}

const mapStateToProps = state => ({
	gettingUsername: state.settingsReducer.gettingUsername,
	username: state.settingsReducer.username,
	error: state.settingsReducer.error,
	userInfo: state.loggedInReducer.userInfo
});

export default connect(
	mapStateToProps,
	{ getUsername }
)(UserSettingSettings);
