// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';

//Styles
const UserSettingSideBarContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 16%;
  min-height: 20%;
  background: #FFF;
	border: 3px solid black;
	border-radius: 4px;
`;

const UserSettingSideBarItem = styled.div`
font-size: 18px;
	display: flex;
  justify-content: center;
  flex-direction: column;
	height: 24px;
	padding: 0px 6px;
  &:hover { background: lightblue;
    transition-duration: .1s;
    cursor: pointer;
  }
`;

class UserSettingSideBar extends Component {
  render() {
    return (
      <UserSettingSideBarContainer>
        <UserSettingSideBarItem
          onMouseDown={() => {
            this.props.history.push('/settings/summaries')
          }}>
          Summaries
				</UserSettingSideBarItem>

        <UserSettingSideBarItem
          onMouseDown={() => {
            this.props.history.push('/settings/positions')
          }}>
          Positions
				</UserSettingSideBarItem>

        <UserSettingSideBarItem
          onMouseDown={() => {
            this.props.history.push('/settings/education')
          }}>
          Education
				</UserSettingSideBarItem>

        <UserSettingSideBarItem
          onMouseDown={() => {
            this.props.history.push('/settings/skills')
          }}>
          Skills
				</UserSettingSideBarItem>

        <UserSettingSideBarItem
          onMouseDown={() => {
            this.props.history.push('/settings/resumes')
          }}>
          Resumes
				</UserSettingSideBarItem>

        <UserSettingSideBarItem
          onMouseDown={() => {
            this.props.history.push('/settings/billing')
          }}>
          Billing
				</UserSettingSideBarItem>

        <UserSettingSideBarItem
          onMouseDown={() => {
            this.props.history.push('/settings/settings')
          }}>
          Settings
				</UserSettingSideBarItem>

      </UserSettingSideBarContainer>
    );
  }
}

export default UserSettingSideBar;
