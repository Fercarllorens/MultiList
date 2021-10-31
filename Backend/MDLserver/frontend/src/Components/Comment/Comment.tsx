import React, {useEffect} from 'react'
import CommentLogic from './CommentLogic'
import './Comment.css'

interface Props{
    comment_id: number;
}

const Comment: React.FC<Props> = (props) => {
    const {data, user, getData, editHandler, handleLikes} = CommentLogic(props)

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="comment-container">
            <div className="comment-user">{user && user.username? user.username : ''}</div>
            <div className="comment-text">{data && data.comment? data.comment : ''}</div>
            <button id="like" onClick={handleLikes}>Like{data && data.likes? data.likes.length : ''}</button>
            <button id="dislike" onClick={handleLikes}>Dislike{data && data.dislikes? data.dislikes.length : ''}</button>
        </div>
    )
}
export default Comment