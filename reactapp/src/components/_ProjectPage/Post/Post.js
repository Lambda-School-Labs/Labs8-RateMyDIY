// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalImage from 'react-modal-image';
import { Button } from 'reactstrap';
// Components
import { ConfirmModal } from '../../../components';

// Actions
import { deletePost } from '../../../actions';

// Styles
import styled from 'styled-components';

const PostContainer = styled.div`
`;

const Img = styled(ModalImage)`
	display: flex;
	max-width: 100%;
	height: auto;
	width: auto;
	margin: 0 auto 12px auto;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const Text = styled.p`
	width: 600px;
	background: #E9DED4;
	padding: 16px 16px 8px 16px;
	margin: 0 0 24px 0;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const EditDeleteButtonContainer = styled.div`
	width: 36%;
	display: flex;
	margin: 8px 0 0 auto;
	justify-content: space-between;
`;

const EditButton = styled(Button)`
	display: flex;
	margin: 0 auto 0 auto;
`;

const DeleteButton = styled(Button)`
	display: flex;
	margin: 0 auto 0 auto;
`;

const StatusMessage = styled.p``;

class Post extends Component {
	state = {};

	// Delete post (with confirmation prompt)
	deleteHandler = event => {
		event.preventDefault();

		this.setState({
			confirm: {
				text: ['Are you sure? This cannot be undone.', 'Cancel', 'Delete Post'],
				cancel: event => {
					event.preventDefault();
					this.setState({ confirm: undefined });
				},
				submit: event => {
					event.preventDefault();

					this.props.deletePost(
						this.props.post.post_id,
						this.props.post.project_id,
						this.props.user_id
					);
					this.props.willDeletePost(this.props.post.post_id);

					this.setState({ confirm: undefined });
				}
			}
		});
	};

	render() {
		return (
			<PostContainer>
				{this.props.post.img_url && (
					<Img
						small={this.props.post.img_url}
						large={this.props.post.img_url}
						alt={this.props.post.img_url}
						hideZoom='true'
					/>
				)}
				{this.props.post.text && <Text>{this.props.post.text}
					{this.props.owner && (
						<EditDeleteButtonContainer>
							<EditButton
								onClick={() => this.props.willUpdatePost(this.props.post.post_id)}
								disabled={this.props.disabled}
							>
								Edit Post
						</EditButton>
							<DeleteButton
								onClick={this.deleteHandler}
								disabled={this.props.disabled}
							>
								Delete Post
						</DeleteButton>
						</EditDeleteButtonContainer>
					)}
				</Text>}

				{this.props.postToDelete && this.props.deletingPost && (
					<StatusMessage small>Deleting post...</StatusMessage>
				)}
				{this.props.postToDelete && this.props.deletingPostError && (
					<StatusMessage small error>
						{this.props.deletingPostError}
					</StatusMessage>
				)}

				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
			</PostContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		deletingPost: state.postReducer.deletingPost,
		deletingPostError: state.postReducer.deletingPostError
	};
};

export default connect(
	mapStateToProps,
	{
		deletePost
	}
)(Post);
