// Dependencies
import React, { Component } from 'react';
import { getProject } from '../../actions';
import { connect } from 'react-redux';

// Components
import { Post, ConfirmModal, StarCount } from '../../components';

// Styles
import styled from 'styled-components';

class ProjectPage extends Component {
	state = {};

	// Add editProject, newText, newImage, editPost, deleteProject, deletePost, or cancel to the state. This has various effects on what gets rendered below.
	clickHandler = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: true
		});

		// If we're editing the project, add it to the state.
		if (this.state.editProject) {
			this.setState({
				project_name: this.props.project.project_name,
				text: this.props.project.text,
				img_url: this.props.project.img_url
			});
		}
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	disabled = () =>
		!this.state.editProject ||
		!this.state.editPost ||
		!this.state.newText ||
		!this.state.newImage;

	// If this is a new project, set up the state with empty form data.
	// If the user is the project's author, add 'owner' to the state.
	componentDidMount() {
		if (this.props.match.params.id === 'new') {
			this.setState({
				newProject: true,
				project_name: '',
				text: '',
				img_url: ''
			});
		} else {
			if (this.props.match.params.username === this.props.username) {
				this.setState({
					owner: true
				});
				this.props.getProject(this.props.match.params.id);
			}
		}
	}

	render() {
		return (
			<ProjectPageContainer>
				{this.state.newProject ? (
					<ProjectForm>
						<ProjectHeader>
							<ProjectNameInput
								name="project_name"
								type="text"
								placeholder="project title"
								value={this.state.project_name}
								onChange={this.changeHandler}
								required
							/>
						</ProjectHeader>
						<ImgUrlInput
							// allow uploads to aws later
							name="img_url"
							type="text"
							placeholder="image url for finished project"
							value={this.state.img_url}
							onChange={this.changeHandler}
							required
						/>
						<TextInput
							name="text"
							type="text"
							placeholder="project description"
							value={this.state.text}
							onChange={this.changeHandler}
							required
						/>
						<CancelButton
							name="cancel"
							value="Cancel"
							onClick={this.clickHandler()}
						/>
						<SubmitInput type="submit" value="Add New Project" />
					</ProjectForm>
				) : !this.state.editProject ? (
					<ProjectForm>
						<ProjectHeader>
							<ProjectNameInput
								name="project_name"
								type="text"
								placeholder="project title"
								value={this.state.project_name}
								onChange={this.changeHandler}
								required
							/>
							<StarCount rating={this.props.project.rating} />
							<ReviewsButton disabled />
						</ProjectHeader>
						<ImgUrlInput
							// allow uploads to aws later
							name="img_url"
							type="text"
							placeholder="image url for finished project"
							value={this.state.img_url}
							onChange={this.changeHandler}
							required
						/>
						<TextInput
							name="text"
							type="text"
							placeholder="project description"
							value={this.state.text}
							onChange={this.changeHandler}
							required
						/>
						<CancelButton
							name="cancel"
							value="Cancel"
							onClick={this.clickHandler()}
						/>
						<SubmitInput type="submit" value="Update Project" />
					</ProjectForm>
				) : (
					<Project>
						{this.props.gettingNote ? (
							<React.Fragment>
								<StatusMessage>Loading project...</StatusMessage>
							</React.Fragment>
						) : this.props.updatingNote ? (
							<React.Fragment>
								<StatusMessage>Updating project...</StatusMessage>
							</React.Fragment>
						) : this.props.error ? (
							<React.Fragment>
								<StatusMessage>Failed to load project</StatusMessage>
								<StatusMessage error>{this.props.error}</StatusMessage>
							</React.Fragment>
						) : (
							<React.Fragment>
								<ProjectHeader>
									<ProjectName>{this.props.project.project_name}</ProjectName>
									<StarCount rating={this.props.project.rating} />
									<ReviewsButton disabled={this.state.disabled} />
								</ProjectHeader>
								<Img />
								<Text />
								{this.state.owner && (
									<EditButton disabled={this.state.disabled}>Edit</EditButton>
								)}
								{this.state.owner && (
									<DeleteButton disabled={this.state.disabled}>
										Delete Project
									</DeleteButton>
								)}
							</React.Fragment>
						)}
					</Project>
				)}

				{this.props.project.posts[0] &&
					this.props.project.posts.map(post => (
						<Post
							key={post.post_id}
							post={post}
							owner={this.state.owner}
							disabled={this.state.disabled}
						/>
					))}

				{this.state.newText && <Post key="new" newText />}
				{this.state.newImage && <Post key="new" newImage />}

				{this.state.owner &&
					!this.state.newProject &&
					!this.state.newText &&
					!this.state.newImage && (
						<ButtonContainer>
							<ProjectButton disabled={this.state.disabled}>
								Add Text Field
							</ProjectButton>
							<ProjectButton disabled={this.state.disabled}>
								Add Picture
							</ProjectButton>
						</ButtonContainer>
					)}

				{/* Go to existing review else start a new one */}
				{!this.state.owner && <ReviewButton>Review Project</ReviewButton>}

				{this.state.cancel && <ConfirmModal />}
				{this.state.deleteProject && (
					<DeleteModal
						project_id={this.props.project.project_id}
						project_name={this.props.project.project_name}
					/>
				)}
				{this.state.deletePost && (
					// This needs to move to Post.js
					<DeleteModal post_id={this.props.post_id} />
				)}
			</ProjectPageContainer>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		user_id: state.userReducer.user_id,
		username: state.userReducer.username,

		project: state.projectReducer.project,
		gettingProject: state.projectReducer.gettingProject,
		updatingProject: state.projectReducer.updatingProject,
		error: state.projectReducer.error

		// redirect?
	};
};

export default connect(
	mapStateToProps,
	{ getProject, updateProject, updatePost }
)(ProjectPage);
