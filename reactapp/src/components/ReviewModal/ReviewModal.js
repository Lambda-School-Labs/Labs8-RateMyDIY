// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { NewReview, EditReview, ConfirmModal } from '../../components';

// Actions
import {
	getReview,
	willUpdateReview,
	deleteReview,
	showReviewModal
} from '../../actions';

// Styles
import styled from 'styled-components';
import StarCount from '../StarCount/StarCount';

const ModalShade = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(200, 200, 200, 0.75);
`;

const ModalBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 50%;
	left: 50%;
	width: 440px;
	height: 590px;
	background: white;
	padding: 20px;
	border: 2px solid #9a9a9a;
	transform: translate(-50%, -50%);
`;

const Img = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 250px;
	height: 250px;
	background: #cceeee;
	margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
`;

const CloseModalButton = styled.button`
	align-self: flex-end;
`;

const ProjectTitle = styled.h2``;

const Reviewer = styled.h3``;

const ReviewText = styled.p`
	width: 100%;
	height: 160px;
	background: #cceeee;
	margin: 16px 0 20px;
	resize: none;
`;

const EditButton = styled.button``;

const DeleteButton = styled.button``;

const LikeContainer = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
`;

const Like = styled.button``;

const Dislike = styled.button``;

const StatusMessage = styled.p``;

class ReviewModal extends Component {
	state = {};

	// Delete project (with confirmation prompt)
	deleteHandler = event => {
		event.preventDefault();

		this.setState({
			confirm: {
				text: [
					'Are you sure? This cannot be undone.',
					'Cancel',
					'Delete Review'
				],
				cancel: event => {
					event.preventDefault();
					this.setState({ confirm: undefined });
				},
				submit: event => {
					event.preventDefault();

					this.props.deleteReview(
						this.props.userInfo.user_id,
						this.props.review.review_id
					);
					this.setState({ confirm: undefined });
				}
			}
		});
	};

	// Like, dislike, or remove like from review
	likeHandler = (event, like) => {};

	componentDidMount() {
		if (this.props.review_id) this.props.getReview(this.props.review_id);
	}

	render() {
		return (
			<ModalShade>
				{/* todo: click outside modal to close it */}
				<ModalBox>
					{this.props.review_id ? (
						this.props.reviewToUpdate ? (
							<EditReview
								user_id={this.props.userInfo.user_id}
								review={this.props.review}
								willUpdateReview={this.props.willUpdateReview}
							/>
						) : (
							<React.Fragment>
								<CloseModalButton
									onClick={() => this.props.showReviewModal(false)}
								>
									x
								</CloseModalButton>
								{this.props.gettingReview ? (
									<StatusMessage>Loading review...</StatusMessage>
								) : this.props.gettingReviewError ? (
									<StatusMessage>{this.props.gettingReviewError}</StatusMessage>
								) : (
									<React.Fragment>
										<ProjectTitle>{`@${this.props.review.maker_name}'s ${
											this.props.review.project_name
										}`}</ProjectTitle>
										<Reviewer>{`Review by: @${
											this.props.review.reviewer_name
										}`}</Reviewer>
										<Img
											src={this.props.review.img_url}
											alt={this.props.review.img_url || 'project image'}
										/>
										<StarCount rating={this.props.review.rating} />
										<ReviewText>{this.props.review.text}</ReviewText>

										{this.props.deletingReviewError && (
											<StatusMessage error>
												{this.props.deletingReviewError}
											</StatusMessage>
										)}

										{this.props.review.reviewer_id ===
										this.props.userInfo.user_id ? (
											<ButtonContainer>
												<EditButton
													onClick={() => this.props.willUpdateReview(true)}
												>
													Edit Review
												</EditButton>
												<DeleteButton onClick={this.deleteHandler}>
													Delete Review
												</DeleteButton>
											</ButtonContainer>
										) : (
											<LikeContainer>
												<Like>*thumbsup*</Like>
												<p>Helpful?</p>
												<Dislike>*thumbsdown*</Dislike>
											</LikeContainer>
										)}
									</React.Fragment>
								)}
							</React.Fragment>
						)
					) : this.props.project_id && this.props.userInfo.user_id ? (
						<NewReview
							user_id={this.props.userInfo.user_id}
							username={this.props.userInfo.username}
							project_id={this.props.project_id}
							project_name={this.props.project_name}
							maker_name={this.props.maker_name}
							img_url={this.props.img_url}
						/>
					) : (
						<StatusMessage>How did you get here? Tell Max.</StatusMessage>
					)}
				</ModalBox>

				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
				{this.props.deletingReview && (
					<ConfirmModal statusMessage={'Deleting review...'} />
				)}
			</ModalShade>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.loggedInReducer.userInfo,

		review: state.reviewReducer.review,

		gettingReview: state.reviewReducer.gettingReview,
		gettingReviewError: state.reviewReducer.gettingReviewError,

		reviewToUpdate: state.reviewReducer.reviewToUpdate,

		reviewToDelete: state.reviewReducer.reviewToDelete,
		deletingReview: state.reviewReducer.deletingReview,
		deletingReviewError: state.reviewReducer.deletingReviewError,

		reviewModal: state.reviewReducer.reviewModal
	};
};

export default connect(
	mapStateToProps,
	{
		getReview,
		willUpdateReview,
		deleteReview,
		showReviewModal
	}
)(ReviewModal);
