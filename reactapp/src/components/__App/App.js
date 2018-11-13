// Dependencies
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import styled from "styled-components";
import Auth from '../../components/Auth/Auth';

// Components
import {
  ExampleComponent,
  ReviewList,
  LandingPage,
  ProjectList,
  CreateEditPage, 
  Billing,
  UserSettingsSideBar,
  UserSettingsSummaries,
  UserSettingBilling,
  UserSettingEducation,
  UserSettingPositions,
  UserSettingSkills,
  UserSettingResumes,
  UserSettingSettings,
 SearchBar,
  SearchPage,

} from "../../components";

//Styles
const AppContainer = styled.div`
  display: flex;
  max-width: 1280px;
  width: 880px;
  height: 100vh;
  background: #c7e8f1;
  margin: 0 auto;
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <h1>Navigation</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ReviewList">Review List</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/search">Search Page</Link>
          </li>
          <li>
            <Link to="/signin">Sign Up or Sign In</Link>
          </li>
        </ul>
        {/* <Navbar /> */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/settings" component={UserSettingsSideBar} />
        <Route path="/settings/summaries" component={UserSettingsSummaries} />
        <Route exact path="/ReviewList" component={ReviewList} />
        <Route exact path="/ProjectList" component={ProjectList} />
        <Route exact path="/Billing" component={Billing} />
        <Route exact path="/CreateEditPage" component={CreateEditPage} />
        <Route path="/settings/positions" component={UserSettingEducation} />
        <Route path="/settings/education" component={UserSettingPositions} />
        <Route path="/settings/skills" component={UserSettingSkills} />
        <Route path="/settings/resumes" component={UserSettingResumes} />
        <Route path="/settings/billing" component={UserSettingBilling} />
        <Route path="/settings/settings" component={UserSettingSettings} />
        <Route path="/search" component={SearchPage} />
        <Route path="/signin" component={Auth} />
      </AppContainer>
    );
  }
}

export default App;
