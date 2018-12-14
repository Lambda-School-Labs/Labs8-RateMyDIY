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
				<ProjectNameAndAuthorContainer>
					<ProjectName>{props.project.project_name}</ProjectName>
					<ProjectAuthor>by user ID {props.project.user_id}</ProjectAuthor>
				</ProjectNameAndAuthorContainer>
				<ProjectRatingContainer>
					{props.project.project_rating &&
						<ProjectRatingTool
							rating={Number(props.project.project_rating)}
							starRatedColor="black"
							starEmptyColor="grey"
							// changeRating={this.changeRating}
							starDimension="20px"
							starSpacing="5px"
							numberOfStars={5}
						/>}
				</ProjectRatingContainer>
			</ProjectHeader>
			<ImgContainer>
				<Img
					small={props.project.img_url}
					large={props.project.img_url}
					alt={props.project.project_name}
					src={props.project.img_url}
				/>
			</ImgContainer>
			<DescriptionContainer>
				{props.project.text}
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
			</DescriptionContainer>
		</ProjectContainer>
	);
};

export default Project;

// Styled-components
const ProjectContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	width: 100%;
	border: 1px solid lightgray;
	margin: 0 0 18px 0;
`;

const ProjectHeader = styled.div`
	display: flex;
	position: 50%;
	flex-direction: row;
	padding: 18px 20px 10px 20px;
	justify-content: space-between;
  align-items: center;
`;
const ProjectNameAndAuthorContainer = styled.div`
	display: flex;
	min-width: 70%;
	flex-direction: column;
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
	display: flex;
	align-self: flex-end;
	width: auto;
	padding: 0;
`;

const ProjectRatingTool = styled(StarRatings)`
`;

const ImgContainer = styled.div`
	display: flex;
	height: auto;
	margin: 0 auto;
	max-height: 600px !important;
	width: auto;
`;

const Img = styled(ModalImage)`
height: 100%;
width: 100%;
`;

const DescriptionContainer = styled.div`
	width: auto;
	margin: 18px 20px 10px 20px;
	line-height: 18px;
	text-align: justify;
`;

const OptionsContainer = styled.div`
	margin: 5px 0 0 0;
	font-size: 11px;
	color: rgb(42, 43, 45);
	width: auto;
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