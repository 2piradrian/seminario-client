import PostsList from "../posts-list/posts-list";
import EventList from "../event-list/event-list";
import UserProfileDetail from "../user-profile-detail/user-profile-detail";
import PageDetail from "../page-detail/page-detail";
import Modal from "../../molecules/modal/modal";
import TabNavigator from "../../../components/atoms/tab-navigator/tab-navigator";
import { type PageProfile, type Post, type UserProfile, type Vote, type Event, Review, ContentType, PostType } from "../../../../domain";
import style from "./style.module.css";
import ReviewList from "../review-list/review-list";
import CreateButton from "../../molecules/create-button/create-button";
import { Tabs } from "../../../../core";
import NewReview from "../../atoms/new-review/new-review";
import EditReviewCard from "../../molecules/edit-review-modal/edit-review-card";

type Props = {
	userProfile?: UserProfile;
	userPagesProfiles?: PageProfile[];
	pageProfile?: PageProfile;
	activeTab: string;
	onTabClick: (tab: string) => void;
	posts: Post[];
	isMine: boolean;
	isAdminOrMod: boolean;
	onProfileClick: (profileId: string) => void;
	onClickOnPage: (pageId: string) => void;
	onClickOnCreatePost: () => void;
	onClickOnCreateEvent: () => void;
	onClickOnPost: (postId: string) => void;
	onClickOnComments: (postId: string) => void;
	handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
	onClickOnAvatarPost: (post: Post) => void;
	onClickDeletePost?: (postId: string) => void;
	onClickEditPost?: (postId: string) => void;
	events: Event[];
	onClickOnEvent: (eventId: string) => void;
	onClickOnAvatarEvent: (event: Event) => void;
	onClickDeleteEvent?: (eventId: string) => void;
	onClickEditEvent?: (eventId: string) => void;
	onClickCancelEvent?: (eventId: string) => void;
	reviews: Review[];
	onClickOnAvatarReview?: (reviewId: Review) => void;
	onClickDeleteReview?: (reviewId: string) => void;
	reviewRating?: number;
	onReviewRatingChange?: (rating: number) => void;
	onSubmitReview?: (e: React.FormEvent<HTMLFormElement>) => void;
	isDeleteOpen: boolean;
	isCancelOpen: boolean;
	cancelDelete: () => void;
	cancelCancelEvent: () => void;
	proceedCancel: () => void;
	proceedDelete: () => void;
	onClickOnMember?: (profileId: string) => void;
	currentUserId?: string;
	activeMenuId?: string | null;
	onToggleMenu?: (postId: string) => void;
	onCloseMenu?: () => void;
	postTypes: PostType[];
	onClickSharePost?: (postId: string) => void;
	onClickEditReview?: (reviewId: Review) => void;
    editingReview?: Review | null;
    onUpdateReview?: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancelEditReview?: () => void;
    editingRating?: number;
    onEditingRatingChange?: (rating: number) => void;

};

export default function ProfileFeed({
	userProfile,
	userPagesProfiles,
	pageProfile,
	activeTab,
	onTabClick,
	posts,
	isMine,
	isAdminOrMod,
	onProfileClick,
	onClickOnPage,
	onClickOnCreatePost,
	onClickOnCreateEvent,
	onClickOnPost,
	onClickOnComments,
	handleVotePost,
	onClickOnAvatarPost,
	onClickDeletePost,
	events,
	onClickOnEvent,
	onClickOnAvatarEvent,
	onClickDeleteEvent,
	onClickCancelEvent,
	reviews,
	onClickOnAvatarReview,
	onClickDeleteReview,
	reviewRating,
	onReviewRatingChange,
	onSubmitReview,
	isDeleteOpen,
	isCancelOpen,
	cancelDelete,
	cancelCancelEvent,
	proceedDelete,
	proceedCancel,
	onClickOnMember,
	onClickEditPost,
	onClickEditEvent,
	currentUserId,
	activeMenuId,
	onToggleMenu,
	onCloseMenu,
	postTypes,
	onClickSharePost,
	onClickEditReview,
    editingReview,
    onUpdateReview,
    onCancelEditReview,
    editingRating,
    onEditingRatingChange,
}: Props) {

	return (
		<div className={style.container}>

			{userProfile ? (
				<UserProfileDetail profile={userProfile} pagesProfiles={userPagesProfiles} onClickOnPage={onClickOnPage} />
			) : (
				pageProfile && <PageDetail page={pageProfile} onClickOnMember={onClickOnMember} />
			)}

			<div className={style.feedContainer}>
				<TabNavigator
					tabs={Tabs.content}
					activeTab={activeTab}
					onTabClick={onTabClick}
				/>

				{activeTab === ContentType.POSTS && (
					<>
						{isMine && userProfile && (
							<div className={style.postList}>
								<CreateButton
									onClickOnAvatar={() => onProfileClick(userProfile.id)}
									onClickOnCreate={onClickOnCreatePost}
									profile={userProfile.toProfile()}
									text="Crear nueva publicación"
								/>
							</div>
						)}
						<div className={style.postList}>
							<PostsList
								posts={posts}
								isMine={isMine}
								onClickOnPost={onClickOnPost}
								onClickOnComments={onClickOnComments}
								handleVotePost={handleVotePost}
								onClickOnAvatar={onClickOnAvatarPost}
								onClickDelete={onClickDeletePost}
								onClickEdit={onClickEditPost}
								activeMenuId={activeMenuId}
								onToggleMenu={onToggleMenu}
								onCloseMenu={onCloseMenu}
								postTypes={postTypes}
								onClickSharePost={onClickSharePost}
							/>
						</div>

					</>
				)}

				{activeTab === ContentType.EVENTS && (
					<>
						{isMine && userProfile && (
							<div className={style.postList}>
								<CreateButton
									onClickOnAvatar={() => onProfileClick(userProfile.id)}
									onClickOnCreate={onClickOnCreateEvent}
									profile={userProfile.toProfile()}
									text="Crear nuevo evento"
								/>
							</div>
						)}
						<div className={style.postList}>
							<EventList
								events={events}
								isAdminOrMod={isAdminOrMod}
								onClickOnEvent={onClickOnEvent}
								onClickOnAvatar={onClickOnAvatarEvent}
								onClickDelete={onClickDeleteEvent}
								onClickCancel={onClickCancelEvent}
								onClickEdit={onClickEditEvent}
								activeMenuId={activeMenuId}
								onToggleMenu={onToggleMenu}
								onCloseMenu={onCloseMenu}
							/>
						</div>
					</>
				)}
				{activeTab === ContentType.REVIEWS && (
					<>
						<div className={style.postList}>
							{!isMine && userProfile && (
								<NewReview
									onAddReview={onSubmitReview!}
									placeholderText="Escribe una reseña..."
									onRatingChange={onReviewRatingChange}
									rating={reviewRating}
								/>
							)}
							<ReviewList
								reviews={reviews}
								isMine={isMine}
								currentUserId={currentUserId}
								onClickOnAvatar={onClickOnAvatarReview}
								onClickDelete={onClickDeleteReview}
								activeMenuId={activeMenuId}
								onToggleMenu={onToggleMenu}
								onCloseMenu={onCloseMenu}
								onClickEdit={onClickEditReview}
							/>
						</div>
					</>
				)
				}
			</div >

			{isDeleteOpen && (
				<Modal
					title={`¿Estas seguro de eliminar est${activeTab === ContentType.POSTS ? "e post" : activeTab === ContentType.EVENTS ? "e evento" : "a reseña"}?`}
					description="Esta acción no se puede deshacer"
					cancelText="Cancelar"
					deleteText="Eliminar"
					onCancel={cancelDelete}
					onProceed={proceedDelete}
				/>
			)}
			{
				isCancelOpen && activeTab === ContentType.EVENTS && (
					<Modal
						title={`¿Estas seguro de cancelar este evento ?`}
						description="Esta acción no se puede deshacer"
						cancelText="Volver"
						deleteText="Cancelar"
						onCancel={cancelCancelEvent}
						onProceed={proceedCancel}
					/>
				)
			}
			{editingReview && (
                <div className={style.modalOverlay}> {/* Necesitarás definir este estilo */}
                    <div className={style.modalContent}>
                        <EditReviewCard
                            review={editingReview}
                            rating={editingRating || 0}
                            onRatingChange={onEditingRatingChange!}
                            onSubmit={onUpdateReview!}
                            onCancel={onCancelEditReview!}
                        />
                    </div>
                </div>
            )}

		</div >
	)
}
