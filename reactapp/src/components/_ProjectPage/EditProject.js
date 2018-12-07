// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TextareaAutosize from 'react-autosize-textarea';
import addImageImg from './circleplus.png';
// Components
import { StarCount, ConfirmModal } from '../../components';

// Actions
import { updateProject } from '../../actions';

// Styles
import styled from 'styled-components';

const EditProjectWrapper = styled.div`
	margin: 0 0 24px 0;
	background: #E9DED8;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const ProjectTitleDescriptionForm = styled.form`
`;

const ProjectAuthor = styled.div`
	margin: 0 0 0 2px;
`;

const ProjectImageForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const ImgContainer = styled.div`
	position: relative;
  margin: auto;
	height: auto;
	max-width: 700px;
`;

const Img = styled.img`
  margin: 0 auto;
	background: white;
  width: 100%;
  height: auto;
`;

const ImgOverlay = styled.img`
	position: absolute;
	opacity: 0.7;
	top: 35%;
	left: 50%;
	width: 20%;
	height: auto;
	max-width: 120px;
	max-height: 120px;
	transform: translateX(-50%);
	:hover {
		opacity: 0.9;
	}
`;

const HiddenInputFileForm = styled.input`
	display: none;
`;
let isFirefox = typeof InstallTrigger !== 'undefined';
const TextInputContainer = styled.div`
	font-size: 16px;
	margin: ${isFirefox === true ? '10px 10px 1px 10px' : '10px 10px -1px 10px'};
`;

/*  */
const TextInput = styled(TextareaAutosize)`
	border: 0;
	font-size: 16px;
	padding: 6px 6px 6px 6px;
	background-color: white;
	width: 100%;
`;

const ProjectHeader = styled.div`
	display: flex;
	position: 50%;
	flex-direction: column;
	background: #E9DED8;
	padding: 24px 24px 12px 24px;
`;

// check if browser is firefox
const OptionsContainer = styled.div`
	padding: 0 0 8px 16px;
	margin: 0 auto 0 0;
	font-size: 11px;
	color: rgb(42, 43, 45);
`;

const LeftOptionsContainer = styled.div`
	
`;

const RightOptionContainer = styled.div`
	
`;
const CancelLink = styled.a`
	margin-right: 8px;
`;

const SubmitButton = styled.button`
	margin-right: 8px;
	border: 0;
	padding: 0;
	cursor: pointer;
	text-decoration: none;
	background-color: transparent;
	:hover {
		background-color: #add8e6;
	}
`;

const UploadLink = styled.a`
`;

const ProjectNameInput = styled.input`
	height: 32px;
	font-size: 32px;
	font-weight: bold;
	border: 0;
	background-color: #E9DED8;
`;

const StatusMessage = styled.p``;

class EditProject extends Component {
	state = {
		project_name: '',
		img_url: null,
		text: '',
		selectedFile: null,
		selectedFilePreview: null,
		categories: []

	};

	singleFileChangedHandler = event => {
		if (this.fileInput) {
			this.setState({
				selectedFile: event.target.files[0],
				selectedFilePreview: URL.createObjectURL(event.target.files[0])
			});

			console.log('Selected file!', this)
		}
	};

	singleFileUploadHandler = event => {
		event.preventDefault();
		const data = new FormData();
		// If file selected
		if (this.state.selectedFile) {
			data.append(
				'image',
				this.state.selectedFile,
				this.state.selectedFile.name
			);
			axios
				.post(
					process.env.REACT_APP_BACKEND ||
					'http://localhost:5000/api/projects/image-upload',
					data, {
						onUploadProgress: progressEvent => {
							// display progress percentage in console 
							console.log('Upload Progress: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
						}
					},
					{
						headers: {
							accept: 'application/json',
							'Accept-Language': 'en-US,en;q=0.8',
							'Content-Type': `multipart/form-data; boundary=${data._boundary}`
						}
					}
				)
				.then(response => {
					if (200 === response.status) {
						// If file size is larger than expected.
						if (response.data.error) {
							if ('LIMIT_FILE_SIZE' === response.data.error.code) {
								// this.ocShowAlert("Max size: 2MB", "red");
							} else {
								// console.log(response.data.location);
								// If not the given file type
								// this.ocShowAlert(response.data.error, "red");
							}
						} else {
							// Success
							let fileName = response.data;

							let photo = response.data.location;
							this.setState({
								img_url: photo
							});
							// console.log('filedata', fileName);

							// console.log('photo', photo);

							//   this.ocShowAlert("File Uploaded", "#3089cf");
						}
					} else {
						// console.log('error');
					}
				})
				.catch(error => {
					// If another error
					// console.log('error');
				});
		}
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Submit changes
	submitHandler = event => {
		event.preventDefault();
		this.props.updateProject(
			this.props.project.project_id, {
				user_id: this.props.user_id,
				project_name: this.state.project_name,
				img_url: this.state.img_url,
				text: this.state.text,
				categories: this.state.categories
			});
	};

	// Discard changes (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();
		if (
			this.state.project_name === this.props.project.project_name &&
			this.state.img_url === this.props.project.img_url &&
			this.state.text === this.props.project.text &&
			this.state.selectedFile === null
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
			text: this.props.project.text
		});
	}

	render() {
		return (
			<EditProjectWrapper>
				<ProjectTitleDescriptionForm onSubmit={this.submitHandler}>
					<ProjectHeader>
						<ProjectNameInput
							name="project_name"
							type="textbody"
							placeholder="project title"
							value={this.state.project_name}
							onChange={this.changeHandler}
							required
						/>
						<StarCount rating={this.props.project.rating} />
						<ProjectAuthor>by user ID {this.props.project.user_id}</ProjectAuthor>
					</ProjectHeader>
					<ImgContainer>
						<ImgOverlay src={addImageImg} onClick={() => this.fileInput.click()} />
						{this.state.selectedFile ?
							<Img
								alt={this.props.project.project_name}
								src={this.state.selectedFilePreview}
							/> :
							<Img
								alt={this.props.project.project_name}
								src={this.props.project.img_url}
							/>
						}
					</ImgContainer>
					<TextInputContainer>
						<TextInput
							name="text"
							type="text"
							placeholder="project description"
							value={this.state.text}
							onChange={this.changeHandler}
							required
						/>
					</TextInputContainer>
				</ProjectTitleDescriptionForm>
				<ProjectImageForm onSubmit={this.submitHandler}>
					{/* HiddenInputFileForm is hidden */}
					<HiddenInputFileForm
						type="file"
						name="file"
						onChange={this.singleFileChangedHandler}
						ref={fileInput => this.fileInput = fileInput} />
					<OptionsContainer>
						<SubmitButton type="submit" value="Submit Changes">
							submit
						</SubmitButton>
						<CancelLink onClick={this.cancelHandler}>
							cancel
						</CancelLink>
						<UploadLink onClick={this.singleFileUploadHandler}>
							upload image
						</UploadLink>
					</OptionsContainer>
				</ProjectImageForm>
				{this.props.updatingProject && (
					<StatusMessage small>Updating project...</StatusMessage>
				)}
				{this.props.gettingProject && (
					<StatusMessage small>Success!</StatusMessage>
				)}
				{this.props.updatingProjectError && (
					<StatusMessage small error>
						{this.props.updatingProjectError}
					</StatusMessage>
				)}

				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
			</EditProjectWrapper>
		);
	}
}

const mapStateToProps = state => {
	return {
		updatingProject: state.projectReducer.updatingProject,
		updatingProjectError: state.projectReducer.updatingProjectError,

		gettingProject: state.projectReducer.gettingProject
	};
};

export default connect(
	mapStateToProps,
	{
		updateProject
	}
)(EditProject);
