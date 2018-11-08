// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';

//Styles
const BillingContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 550px;
  width: 84%;
  background: #BBB;
`;

const TempDiv = styled.div`
  font-size: 50px;
`;

class UserSettingBilling extends Component {
  render() {
    return (
      <BillingContainer>
        <TempDiv>in progress (billing)</TempDiv>
      </BillingContainer>
    );
  }
}

export default UserSettingBilling;
