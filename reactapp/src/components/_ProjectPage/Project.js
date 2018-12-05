// Dependencies
import React from 'react';
import ModalImage from 'react-modal-image'
import { Button } from 'reactstrap';
// Components
import { StarCount } from '../../components';

// Styles
import styled from 'styled-components';

const ProjectWrapper = styled.div`
	display: flex;
`;

const ProjectContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const ProjectHeader = styled.div`
	display: flex;
	position: 50%;
	margin-bottom: 20px;
	flex-direction: column;
`;

const ProjectName = styled.h2`
	display: flex;
	font-size: 32px;
	font-weight: bold;
	width: auto;
	padding: 10px 10px;
	margin: 0 auto 24px auto;
	text-align: center;
`;

// const Img = styled(ModalImage)`
// 	display: flex;
// 	max-height: 600px;
// 	max-width: 100%;
// 	height: auto;
// 	width: auto;
// 	background: #cceeee;
// 	margin: 0 0 12px 0;
// 	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
// `;

const Img = styled.img`
	display: flex;
	max-height: 600px;
	max-width: 100%;
	height: auto;
	width: auto;
	background: #cceeee;
	margin: 0 0 12px 0;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const Text = styled.p`
	width: 600px;
	background: #E9DED8;
	padding: 16px 16px 8px 16px;
	margin: 0 0 24px 0;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const ProjectButtonContainer = styled.div`
	width: 36%;
	display: flex;
	margin: 8px 0 0 auto;
	justify-content: space-between;
`;

const ReviewsButton = styled(Button)`
	display: flex;
`;

const EditButton = styled(Button)`
	display: flex;
`;

const DeleteButton = styled(Button)`
	display: flex;
`;

const Project = props => {
	return (
		<ProjectWrapper>
			<ProjectContainer>
				<ProjectHeader>
					<ProjectName>{props.project.project_name}</ProjectName>
					<StarCount rating={props.project.project_rating} />
				</ProjectHeader>

				<Img
					small={props.project.img_url}
					large={props.project.img_url}
					alt={props.project.project_name}
					src={props.project.img_url}
				/>
				<Text>{props.project.text}
					{props.owner && (
						<ProjectButtonContainer>
							<ReviewsButton disabled={props.disabled}>View Reviews</ReviewsButton>
							<EditButton
								onClick={() => props.willUpdateProject(true)}
								disabled={props.disabled}
							>
								Edit
						</EditButton>
							<DeleteButton color="danger" onClick={props.deleteHandler} disabled={props.disabled}>
								Delete Project
					</DeleteButton>
						</ProjectButtonContainer>
					)}
				</Text>
			</ProjectContainer>
		</ProjectWrapper>
	);
};

export default Project;
