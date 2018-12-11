// Dependencies
import React from 'react';
import ModalImage from 'react-modal-image';
// import { Button } from 'reactstrap';
// Components
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';

const Project = props => {
	return (
		<ProjectContainer>
			<ProjectHeader>
				<ProjectName>{props.project.project_name}</ProjectName>
				<ProjectAuthor>by user ID {props.project.user_id}</ProjectAuthor>
				{props.project.project_rating &&
					<ProjectRatingContainer>
						< StarRatings
							rating={Number(props.project.project_rating)}
							starRatedColor="black"
							starEmptyColor="grey"
							// changeRating={this.changeRating}
							starDimension="20px"
							starSpacing="5px"
							numberOfStars={5}
						/>
					</ProjectRatingContainer>}
			</ProjectHeader>
			<ImgContainer>
				<Img
					small={props.project.img_url}
					large={props.project.img_url}
					alt={props.project.project_name}
					src={props.project.img_url}
				/>
			</ImgContainer>
			<DescriptionContainer>{props.project.text}</DescriptionContainer>
			{props.owner && (
				<OptionsContainer>
					<ReviewsLink disabled={props.disabled}>reviews</ReviewsLink>
					<EditLink
						onClick={() => props.willUpdateProject(true)}
						disabled={props.disabled}
					>
						edit
						</EditLink>
					<DeleteButton
						color="danger"
						onClick={props.deleteHandler}
						disabled={props.disabled}
					>
						delete
						</DeleteButton>
				</OptionsContainer>
			)}
		</ProjectContainer>
	);
};

export default Project;

// Styled-components
const ProjectContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: #e9ded8;
	width: 100%;
	margin: 0 0 24px 0;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ProjectHeader = styled.div`
	display: flex;
	position: 50%;
	flex-direction: column;
	background: #e9ded8;
	padding: 24px 24px 12px 24px;
`;

const ProjectName = styled.h2`
	display: flex;
	font-size: 32px;
	font-weight: bold;
	margin: 0 0 0 -2px;
`;

const ProjectAuthor = styled.div`
`;

const ProjectRatingContainer = styled.div`
	
`;

const ImgContainer = styled.div`
	height: auto;
  margin: 0 auto;
`;

const Img = styled(ModalImage)`
	width: auto;
	max-height: 600px !important;
`;

const DescriptionContainer = styled.div`
	width: auto;
	padding: 24px 24px 12px 24px;
`;

const Description = styled.p`
	width: 100%;
	font-size: 16px;
`;

const OptionsContainer = styled.div`
	display: flex;
	margin: 8px 0 0 auto;
	font-size: 11px;
	color: rgb(42, 43, 45);
`;

const ReviewsLink = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	margin-right: 8px;
`;

const EditLink = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	margin-right: 8px;
`;

const DeleteButton = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
`;