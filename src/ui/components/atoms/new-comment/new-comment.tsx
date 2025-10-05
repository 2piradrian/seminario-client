import CommentButton from "../comments-button/comments-button"; 
import style from "./style.module.css"; 


type Props = { 
    content: string; 
    onChangeContent: (text: string) => void; 
    onAddComment: () => void;
}

export default function NewComment({ content, onChangeContent, onAddComment }: Props) { 
    return ( 
        <div className={style.container}> 
            <input 
                type="text" 
                value={content} 
                onChange={(e) => onChangeContent(e.target.value)} 
                placeholder="Agregar comentario..." 
            /> 
            <CommentButton 
                onClick={onAddComment} 
                text="Comentar" 
            /> 
        </div> 
    ); 
}