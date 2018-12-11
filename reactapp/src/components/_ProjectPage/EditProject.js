// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import UploadProjectPictureIcon from './circleplus.png';
// Components
import { StarCount, ConfirmModal } from '../../components';
import StarRatings from 'react-star-ratings';
// Actions
import { updateProject } from '../../actions';

// Styles
import styled from 'styled-components';

class EditProject extends Component {
	state = {
		project_name: '',
		img_url: null,
		text: '',
		categories: [],
		selectedFile: null
	};

	singleFileChangedHandler = event => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	singleFileUploadHandler = event => {
		event.preventDefault();
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
		console.log("this.props " + this.props);
	};

	// Submit changes
	submitProjectChanges = event => {
		event.preventDefault();
		this.props.updateProject(
			this.props.project.project_id,
			{
				user_id: this.props.user_id,
				project_name: this.state.project_name,
				img_url: this.state.img_url,
				text: this.state.text,
				categories: this.state.categories
			},
			() => this.props.willUpdateProject(false)
		);
	};

	// Discard changes (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();

		if (
			this.state.project_name === this.props.project.project_name &&
			this.state.img_url === this.props.project.img_url &&
			this.state.text === this.props.project.text
		) {
			this.props.willUpdateProject(false);
		} else {
			this.setState({
				confirm: {
					text: ['Do you want to discard these changes?'],
					cancel: event => {
						event.preventDefault();
						this.setState({ confirm: undefined });
					},
					submit: event => {
						event.preventDefault();
						this.props.willUpdateProject(false);
					}
				}
			});
		}
	};

	componentDidMount() {
		this.setState({
			project_name: this.props.project.project_name,
			img_url: this.props.project.img_url,
			text: this.props.project.text,
			project_rating: this.props.project.project_rating
		});
	}

	render() {
		return (
			<EditProjectFormContainer onSubmit={this.submitProjectChanges}>
				<ProjectHeader>
					<ProjectName>
						<ProjectNameInput
							name="project_name_input"
							type="text"
							placeholder="Project Title"
							value={this.state.project_name}
							onChange={this.changeHandler}
							required
						/>
					</ProjectName>
					<ProjectAuthor>by user ID {this.props.project.user_id}</ProjectAuthor>
					{this.props.project.project_rating &&
						<ProjectRatingContainer>
							< StarRatings
								rating={Number(this.props.project.project_rating)}
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
					<LabelProfilePictureInput htmlFor="file"
						onClick={() => this.fileInput}
						disabled={this.props.updatingProject || this.props.gettingProject}
					>
						<UploadProjectPictureIconStyle className="upload-icon" src={UploadProjectPictureIcon} />
					</LabelProfilePictureInput>
					<ProjectImage
						src={this.props.project.img_url}
						alt={this.props.project.img_url || 'project image'}
					/>
				</ImgContainer>
				{/* HiddenProfilePictureInput is hidden */}
				<HiddenProfilePictureInput
					type="file"
					name="file"
					id="file"
					ref={fileInput => (this.fileInput = fileInput)}
				/>
				<div className="mt-5">
					<button
						className="btn btn-info"
						onClick={this.singleFileUploadHandler}
						disabled={this.props.updatingProject || this.props.gettingProject}
					>
						Upload!
						</button>
				</div>
				<DescriptionContainer>
					<DescriptionInput
						name="text"
						type="text"
						placeholder="project description"
						value={this.state.text}
						onChange={this.changeHandler}
						required
					/>
				</DescriptionContainer>
				<EditProjectOptionsContainer>
					<CancelLink
						onClick={this.cancelHandler}
						disabled={this.props.updatingProject || this.props.gettingProject}
					>
						Cancel
					</CancelLink>
					<SubmitLink
						type="submit"
						value="Submit Changes"
						disabled={this.props.updatingProject || this.props.gettingProject}
					>tesatsatast
					</SubmitLink>
				</EditProjectOptionsContainer>

				{(this.props.updatingProject || this.props.gettingProject) && (
					<StatusMessage small>Updating project...</StatusMessage>
				)}
				{this.props.updatingProjectError && (
					<StatusMessage small error>
						{this.props.updatingProjectError}
					</StatusMessage>
				)}

				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
			</EditProjectFormContainer>
		);
	};
};

const mapStateToProps = state => {
	return {
		gettingProject: state.projectReducer.gettingProject,
		updatingProject: state.projectReducer.updatingProject,
		updatingProjectError: state.projectReducer.updatingProjectError
	};
};

export default connect(
	mapStateToProps,
	{
		updateProject
	}
)(EditProject);


// Styled-components
const EditProjectFormContainer = styled.form`
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

const ProjectRatingContainer = styled.div`
	
`;

const ProjectNameInput = styled.input`
	background-color: #e9ded8;
	font-size: 32px;
	font-weight: bold;
	border: none;
	margin: 0;
	padding: 0;
	width:100%;
`;

const ProjectAuthor = styled.div`
	
`;

const ImgContainer = styled.div`
	position: relative;
	display: block;
	height: auto;
	margin: 0 auto;
	transition: .5s ease;
	:hover {
		opacity: 0.5;
	}
	&.image-icon {
    display: none;
  }
`;

const LabelProfilePictureInput = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
	text-align: center;
`;

const UploadProjectPictureIconStyle = styled.img`
	width: 35%;
	height: 35%;
	opacity: .4;
	transition: .5s ease;
`;

const ProjectImage = styled.img`
	width: auto;
	max-height: 600px !important;
`;

const HiddenProfilePictureInput = styled.input`
	display: none;
`;

const DescriptionContainer = styled.div``;
const DescriptionInput = styled.input``;

const CancelLink = styled.a``;

const SubmitLink = styled.button``;

const ReviewsButton = styled.button``;



const EditProjectOptionsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -12px;
	margin-bottom: 20px;
`;

const StatusMessage = styled.p``;