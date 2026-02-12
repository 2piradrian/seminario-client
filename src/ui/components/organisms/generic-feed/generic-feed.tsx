import ProfileCard from "../../molecules/profile-card/profile-card";
import type { PostType, User, Vote } from "../../../../domain";
import GenericList from "../generic-list/generic-list";
import CreateButton from "../../molecules/create-button/create-button";
import StaffNotes from "../../molecules/staff-notes/staff-notes";
import Modal from "../../molecules/modal/modal";
import StateFullSelector from "../../atoms/state-full-selector/state-full-selector";
import style from "./style.module.css";

type Props = {
    user: User;
    items: Array<any>;
    postTypes?: PostType[];
    onClickOnAvatarItem: (item:any) => void;
    onClickOnItem: (item: any) => void;
    onClickOnComments?: (item:any) => void;
    handleVotePost?: (item: any, voteType: Vote) => Promise<void>;
    onProfileClick: (profileId: string) => void;
    onClickDelete: (item: any) => void;
    onClickCancel: (item: any) => void;
    onClickOnCreateItem?: () => void;
    createButtonText?: string;
    onClickSharePost?: (item: any) => void;
    onClickEdit?: (item: any) => void;
    isMine?: boolean;
    isItemMine?: (item: any) => boolean;
    isAdminOrMod?: boolean;
    activeMenuId?: string | null;
    onToggleMenu?: (postId: string) => void;
    onCloseMenu?: () => void;
    isDeleteOpen?: boolean;
    cancelDelete?: () => void;
    proceedDelete?: () => void;
    showDeleteReasonSelector?: boolean;
    moderationReasonOptions?: string[];
    selectedDeleteReason?: string;
    onDeleteReasonChange?: (value: string) => void;
};


export default function GenericFeed({
    user,
    items,
    postTypes,
    onClickOnAvatarItem,
    onClickOnItem,
    onClickOnComments,
    handleVotePost,
    onProfileClick,
    onClickCancel,
    onClickDelete,
    onClickEdit,
    onClickOnCreateItem,
    createButtonText,
    onClickSharePost,
    isAdminOrMod,
    isMine,
    isItemMine,
    activeMenuId,
    onCloseMenu,
    onToggleMenu,
    isDeleteOpen,
    cancelDelete,
    proceedDelete,
    showDeleteReasonSelector,
    moderationReasonOptions,
    selectedDeleteReason,
    onDeleteReasonChange
}: Props) {

    return (
        <div className={style.container}>
            <div className={style.profileBlock}>
                <ProfileCard
                    profile={user.profile}
                    onClickOnAvatar={() => onProfileClick(user.id)}
                />
            </div>

            <div className={style.feed}>
                {onClickOnCreateItem && (
                    <div className={style.createPostWrapper}>
                        <CreateButton
                            profile={user.toProfile()}
                            onClickOnAvatar={() => onProfileClick(user.id)}
                            onClickOnCreate={onClickOnCreateItem}
                            text={createButtonText}
                        />
                    </div>
                )}
                <GenericList
                    items={items}
                    postTypes={postTypes}
                    onClickOnItem={onClickOnItem}
                    onClickOnAvatar={onClickOnAvatarItem}
                    onClickOnComments={onClickOnComments}
                    onVote={handleVotePost}
                    onClickDelete={onClickDelete}
                    onClickEdit={onClickEdit}
                    onClickCancel={onClickCancel}
                    onClickSharePost={onClickSharePost}
                    isAdminOrMod={isAdminOrMod}
                    isMine={isMine}
                    isItemMine={isItemMine}
                    activeMenuId={activeMenuId}
                    onCloseMenu={onCloseMenu}
                    onToggleMenu={onToggleMenu}
                />
            </div>

            <div className={style.rightBlock}>
                <StaffNotes />
            </div>

            {isDeleteOpen && (
                <Modal
                    title="¿Estas seguro de eliminar este contenido?"
                    description="Esta acción no se puede deshacer"
                    cancelText="Cancelar"
                    deleteText="Eliminar"
                    onCancel={cancelDelete ?? (() => {})}
                    onProceed={proceedDelete ?? (() => {})}
                >
                    {showDeleteReasonSelector && (
                        <StateFullSelector
                            id="deleteReason"
                            label="Motivo"
                            value={selectedDeleteReason || "Seleccionar"}
                            values={["Seleccionar", ...(moderationReasonOptions ?? [])]}
                            onChange={onDeleteReasonChange ?? (() => {})}
                        />
                    )}
                </Modal>
            )}
        </div>
    );
}
