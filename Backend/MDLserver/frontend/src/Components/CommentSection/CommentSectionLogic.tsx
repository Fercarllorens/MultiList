import React, { useState } from 'react'
import { fetchHandler } from '../fetchHandler'

export interface Props{
    content_id: string;
    user_id: string | null;
}

const CommentSectionLogic = (props: Props) => {
    const [ comments, setComments] = useState<null | any[]>(null)
    const [ commented, setCommented ] = useState<boolean>(true)

    function toggleCommented(){
        setCommented(!commented)
    }

    function getComments(){
        fetchHandler(`api/get-content-comments?id=${props.content_id}`, 'GET', null)
            .then((obj:any) => {
                if(obj!==undefined){ 
                    const commentArray = JSON.parse(obj)
                    setComments(commentArray)
                    let isCommented = false
                    commentArray.forEach((item:any) => {
                        if(item.user_id==props.user_id) isCommented = true
                    })
                    setCommented(isCommented)
                }
            })
    }

    return {commented, toggleCommented, comments, getComments}
}
export default CommentSectionLogic