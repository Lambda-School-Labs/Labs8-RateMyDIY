// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';

//Styles
const EducationContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 550px;
  width: 84%;
  background: #BBB;
`;

const TempDiv = styled.div`
  font-size: 50px;
`;

class UserSettingEducation extends Component {
  render() {
    return (
      <EducationContainer>
        <TempDiv>in progress (education)</TempDiv>
      </EducationContainer>
    );
  }
}

export default UserSettingEducation;
