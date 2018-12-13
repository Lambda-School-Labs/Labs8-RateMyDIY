// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import { ConfirmModal } from '../../components';
import StarRatings from 'react-star-ratings';
import UploadProjectPictureIcon from './circleplus.png';
// Actions
import { updateProject, updateProjectImage } from '../../actions';

// Styles
import styled from 'styled-components';

class EditProject extends Component {
	state = {
		project_name: '',
		img_url: '',
		text: '',
		categories: [],
		selectedFile: null,
		// file: null
	};

	// This stores the project image file recieved in the ReactFileReader form data  
	projectImageSelector = (event) => {
		const file = URL.createObjectURL(event.target.files[0])
		this.setState(() => ({ img_url: file }))
	};

	projectImageUploader = event => {
		event.preventDefault();

		// If file selected
		if (this.state.selectedFile) {

			const data = new FormData();

			const headerData = {
				headers: {
					accept: 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${data._boundary}`
				}
			}

			console.log("FILE SELECTED " + this.state.selectedFile);

			data.append(
				'image',
				this.state.selectedFile,
				this.state.selectedFile.name
			);

			this.props.updateProjectImage(data, headerData, value => this.setState({ img_url: value }))
		}
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
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
			this.setState(prevState => ({ toggle: !prevState.toggle }));
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
	escCancelHandler = (event) => {
		if (event.keyCode === 27) {
			this.cancelHandler(event);
		}
	}
	componentDidMount() {
		this.setState({
			project_name: this.props.project.project_name,
			img_url: this.props.project.img_url,
			text: this.props.project.text,
			project_rating: this.props.project.project_rating
		});
		document.addEventListener("keydown", this.escCancelHandler, false);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.escCancelHandler, false);
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
					<ProjectPictureHiddenInput
						type="file"
						id="project_picture_input"
						onChange={this.projectImageSelector}
					/>
					<ProjectPictureUploadLabel
						htmlFor="project_picture_input"
						disabled={this.props.updatingProject || this.props.gettingProject}
					>
						<UploadProjectPictureIconStyle
							className="upload-icon"
							src={UploadProjectPictureIcon} />
					</ProjectPictureUploadLabel>
					<ProjectImage
						src={this.state.img_url}
						alt={this.state.img_url || 'project image'}
					/>
				</ImgContainer>
				{/* HiddenProfilePictureInput is hidden */}
				<div className="mt-5">
					<button
						className="btn btn-info"
						onClick={this.projectImageUploader}
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
						onKeyDown={this.escCancelHandler}
						tabIndex="0"
					>
						Cancel
					</CancelLink>
					<SubmitLink
						type="submit"
						value="Submit Changes"
						disabled={this.props.updatingProject || this.props.gettingProject}
					>Submit Link
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
		updateProject, updateProjectImage
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

const ProjectPictureHiddenInput = styled.input`
	opacity: 0;
  position: absolute;
  pointer-events: none;
  // alternative to pointer-events, compatible with all browsers, just make it impossible to find
  width: 1px;
  height: 1px;
`;

const ProjectPictureUploadLabel = styled.label`
	text-align: center;
`;

const ImgContainer = styled.div`
	position: relative;
	margin: 0 auto;
	max-height: 600px !important;
	height: auto;
	width: auto;
	height: auto;
	margin: 0 auto;
	transition: .5s ease;
	:hover {
		opacity: .9;
	}
`;

const UploadProjectPictureIconStyle = styled.img`
	position: absolute;
  top: 50%;
  left: 50%;
	width: 35%;
	height: 35%;
	opacity: .4;
  transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	margin: auto;
	padding: auto;
	transition: .5s ease;
	:hover {
		opacity: .9;
	}
	z-index: 2;
`;

const ProjectImage = styled.img`
	position: relative;
	width: 100%;
	max-height: 600px !important;
	transition: .5s ease;
`;

const DescriptionContainer = styled.div``;
const DescriptionInput = styled.input``;

const CancelLink = styled.a``;

const SubmitLink = styled.button``;

// const ReviewsButton = styled.button``;



const EditProjectOptionsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -12px;
	margin-bottom: 20px;
`;

const StatusMessage = styled.p``;