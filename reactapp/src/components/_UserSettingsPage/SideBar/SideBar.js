// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Styles
const UserSettingSideBarContainer = styled.nav`
	display: flex;
	flex-direction: column;
	width: 150px;
  min-height: 20%;
  background: #FFF;
	border: 3px solid black;
	border-radius: 4px;
`;

const UserSettingLink = styled(NavLink)`
	display: flex;
  justify-content: center;
  flex-direction: column;
	height: 24px;
	padding: 0px 6px;
  font-size: 18px;
  color: black;
  text-decoration: none;
  /* onHover Attributes */
  &:hover { background: lightblue;
    transition-duration: .1s;
    cursor: pointer;
  }
`

class UserSettingSideBar extends Component {
  // State management to supply link names/addresses to the sidebar.
  state = {
    userSettingSidebarLinks: ['summaries', 'positions', 'education', 'skills', 'resumes', 'billing', 'settings']
  };
  // Takes a string and converts the first character to uppercase.
  firstLetterUppercase = (navLinkTitle) => {
    return navLinkTitle.charAt(0).toUpperCase() + navLinkTitle.slice(1);
  }

  render() {
    return (
      <UserSettingSideBarContainer>
        {/* Maps through this.state.userSettingSidebarLinks and generates sidebar links from the array. */}
        {this.state.userSettingSidebarLinks.map(link => (
          <UserSettingLink
            to={'/settings/' + link}
            activeClassName="selected"
            activeStyle={{
              fontWeight: "bold",
              background: "lightgrey"
            }}
            key={link}
          >
            {this.firstLetterUppercase(link)}
          </UserSettingLink>
        ))}
      </UserSettingSideBarContainer>
    );
  }
}

export default UserSettingSideBar;

