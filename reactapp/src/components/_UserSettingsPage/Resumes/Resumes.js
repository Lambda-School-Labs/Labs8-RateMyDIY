// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';

//Styles
const ResumesContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 550px;
  width: 84%;
  background: #BBB;
`;

const TempDiv = styled.div`
  font-size: 50px;
`;

class UserSettingResumes extends Component {
  render() {
    return (
      <ResumesContainer>
        <TempDiv>in progress (resumes)</TempDiv>
      </ResumesContainer>
    );
  }
}

export default UserSettingResumes;
