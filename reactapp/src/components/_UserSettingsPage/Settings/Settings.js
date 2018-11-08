// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';

//Styles
const SettingsContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 550px;
  width: 84%;
  background: #BBB;
`;

const TempDiv = styled.div`
  font-size: 50px;
`;

class UserSettingSettings extends Component {
  render() {
    return (
      <SettingsContainer>
        <TempDiv>in progress (settings)</TempDiv>
      </SettingsContainer>
    );
  }
}

export default UserSettingSettings;
