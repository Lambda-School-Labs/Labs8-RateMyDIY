import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	display: flex;
	margin: 25px;
	margin-left: 33%;
`;

const SuggestedCategories = styled.a`
	font-size: 14px;
	color: white;
	margin: 0 5px;
	text-decoration: underline;
`;

const SuggestedSearch = props => {
	return (
		<Container>
			<span>Suggested:</span>{' '}
			{props.categories.map(category => (
				<SuggestedCategories href={`/search?query=${category}`}>
					{category + ', '}
				</SuggestedCategories>
			))}
		</Container>
	);
};

export default SuggestedSearch;
