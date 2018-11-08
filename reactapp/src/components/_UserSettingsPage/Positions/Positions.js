// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';

//Styles
const PositionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 550px;
  width: 84%;
  background: #BBB;
`;

const TempDiv = styled.div`
  font-size: 50px;
`;

class UserSettingPositions extends Component {
  render() {
    return (
      <PositionsContainer>
        <TempDiv>in progress (posistions)</TempDiv>
      </PositionsContainer>
    );
  }
}

export default UserSettingPositions;
