import React, {useEffect} from 'react'
import CommentSectionLogic, {Props} from './CommentSectionLogic'
import './CommentSection.css'

import Comment from './Comment/Comment'
import CommentForm from './CommentForm/CommentForm'

const CommentSection: React.FC<Props> = (props) => {
    const {commented, toggleCommented, comments, getComments} = CommentSectionLogic(props)

    useEffect(() => {
        getComments()
    }, [])

    return (
        <>
            <h3 className='coment-title'>Comments</h3>
            <CommentForm commented={commented} toggleCommented={toggleCommented} content_id={props.content_id}/>
                {/*TODO: ADD COMMENT HOLDER COMPONENT*/}
                {comments && comments.map((comment) => {
                    return <Comment  {...comment}/>
            })}
        </>
    )
}
export default CommentSection