import upVoteImage from "../../../assets/icons/arrow-up.svg"; 
import downVoteImage from "../../../assets/icons/arrow-down.svg";
import style from "./style.module.css";

type Props = {
    upVotes: number;
    downVotes: number;
    onUpVote: () => void;
    onDownVote: () => void;
}

export default function VoteButton( {upVotes, downVotes, onUpVote, onDownVote} : Props) {
    return(
        <div className={style.container}>
            <button onClick={onUpVote} className={style.button}> 
                <img 
                    src={upVoteImage} 
                    alt="upVote" 
                    className={style.icon} 
                />
                <span className={style.count}>{upVotes}</span>
            </button>
            <button onClick={onDownVote} className={style.button}>
                <img 
                    src={downVoteImage} 
                    alt="downVote" 
                    className={style.icon} 
                />
            <span className={style.count}>{downVotes}</span>
            </button>            
        </div>
    )
}