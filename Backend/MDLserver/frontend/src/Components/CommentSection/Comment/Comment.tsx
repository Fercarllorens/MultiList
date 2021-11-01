import React, {useEffect} from 'react'
import CommentLogic, {Props} from './CommentLogic'
import './Comment.css'

const Comment: React.FC<Props> = (props) => {
    const { data, user, getData, processComment, editHandler, liked, handleLikes } = CommentLogic(props)

    useEffect(() => {
        getData();
        processComment();
    }, [])

    return (
        <div className="comment-container">
            <div className="comment-user"><p>User {user && user.username? user.username : ''} Comented</p></div>
            <div className="comment-text"><p>{data && data.comment? data.comment : ''}</p></div>
            <div className="comment-buttons">
                <button id="like" onClick={handleLikes} style={liked==1? {backgroundColor: "red"} : {}}>Like{data && data.likes? JSON.parse(data.likes).length : ''}</button>
                <button id="dis" onClick={handleLikes} style={liked==2? {backgroundColor: "red"} : {}}>Dislike{data && data.dislikes? JSON.parse(data.dislikes).length : ''}</button>
            </div>
        </div>
    )
}
export default Comment