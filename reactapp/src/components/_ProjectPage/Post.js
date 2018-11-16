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

	// Add editProject, addPost, editPost, deleteProject, deletePost, or cancel to the state. This has various effects on what gets rendered below.
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
			<PostContainer>
				{this.props.newText ? (
					<PostForm>
						<p>You can later add an image to this post</p>
						<TextInput
							name="text"
							type="text"
							placeholder="new text field"
							value={this.state.text}
							onChange={this.changeHandler}
							required
							autoFocus
						/>
						<CancelButton
							name="cancel"
							value="Cancel"
							onClick={this.props.clickHandler()}
						/>
						<SubmitInput type="submit" value="Add New Text Field" />
					</PostForm>
				) : this.props.newImage ? (
					<PostForm>
						<ImgUrlInput
							// allow uploads to aws later
							name="img_url"
							type="text"
							placeholder="new image url"
							value={this.state.img_url}
							onChange={this.changeHandler}
							required
							autoFocus
						/>
						<TextInput
							name="text"
							type="text"
							placeholder="optional text description"
							value={this.state.text}
							onChange={this.changeHandler}
						/>
						<CancelButton
							name="cancel"
							value="Cancel"
							onClick={this.props.clickHandler()}
						/>
						<SubmitInput type="submit" value="Add New Image" />
					</PostForm>
				) : !this.state.editPost ? (
					<PostForm>
						<ImgUrlInput
							// allow uploads to aws later
							name="img_url"
							type="text"
							placeholder="Image URL for finished project"
							value={this.state.img_url}
							onChange={this.changeHandler}
							required
						/>
						<TextInput
							name="text"
							type="text"
							placeholder="Project description"
							value={this.state.text}
							onChange={this.changeHandler}
							required
						/>
						<SubmitInput type="submit" value="Update Post" />
						<CancelButton
							name="cancel"
							value="Cancel"
							onClick={this.props.clickHandler()}
						/>
					</PostForm>
				) : (
					<React.Fragment>
						<ProjectHeader>
							<ProjectName>{this.props.project.project_name}</ProjectName>
							<StarCount rating={this.props.project.rating} />
							<ReviewsButton
								disabled={this.props.editProject || this.props.editPost}
							/>
						</ProjectHeader>
						<Img />
						<Text />
						{this.props.owner && (
							<EditButton disabled={this.props.disabled || this.props.disabled}>
								Edit
							</EditButton>
						)}
						{this.props.owner && (
							<DeleteButton
								disabled={this.props.disabled || this.props.disabled}
							>
								Delete Project
							</DeleteButton>
						)}
					</React.Fragment>
				)}

				{this.state.cancel && <ConfirmModal />}
				{this.state.deletePost && <DeleteModal post_id={this.props.post_id} />}
			</PostContainer>
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
