// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';

//Styles
const SkillsContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 550px;
  width: 84%;
  background: #BBB;
`;

const TempDiv = styled.div`
  font-size: 50px;
`;

class UserSettingSkills extends Component {
  render() {
    return (
      <SkillsContainer>
        <TempDiv>in progress (skills)</TempDiv>
      </SkillsContainer>
    );
  }
}

export default UserSettingSkills;
