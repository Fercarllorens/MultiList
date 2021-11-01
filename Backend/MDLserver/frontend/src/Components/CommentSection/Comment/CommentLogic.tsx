import React, {useState} from 'react'
import { fetchHandlerCb } from '../../fetchHandler'

export interface Props{
    id: number;
    user_id: number;
    content_id: number;
    rating: number;
    comment: string;
    likes: string;
    dislikes: string;
}

interface User{
    username: string;
}

const CommentLogic = (props:Props) => {
    const [ data, setData ] = useState<Props>(props)
    const [ user, setUser ] =   useState<null | User>(null)
    const [ liked, setLiked ] = useState<0 | 1 | 2 >(0) // 0 Not liked nor disliked, 1 liked, 2 disliked

    const user_id: any = localStorage.getItem('user_id')

    function getData(){
        fetchHandlerCb(`api/get-user?user_id=${props.user_id}`, "GET", null, (obj) => setUser(obj))
    }

    function processComment(){
        if(JSON.parse(data.likes).includes(user_id)) {setLiked(1)}
        else if(JSON.parse(data.dislikes).includes(user_id)) {setLiked(2)}  
        else setLiked(0)
    }

    function editHandler(){
        //Not yet implemented
    }

    function handleLikes(e:any){
        let like_state = liked
        if (e.target.id==="like"){
            like_state==1
                ? like_state = 0
                : like_state = 1 
        } else{
            like_state==2
                ? like_state = 0
                : like_state = 2
        }
        updateComment(like_state)
        setLiked(like_state)
    }

    function updateComment(like_state: number){
        // NEED TO MAKE TEMP CUZ OTHERWISE ARRAYS WONT UPDATE
        let tmp_likes = JSON.parse(data.likes)
        if(like_state==1 && !tmp_likes.includes(user_id)) tmp_likes.push(user_id); //Add user to likes if liked
        else if ((like_state==0||like_state==2) && tmp_likes.includes(user_id)) tmp_likes.splice(tmp_likes.indexOf(user_id), 1); //Remove user from likes if disliked or not liked
        const new_likes = JSON.stringify(tmp_likes)

        let tmp_dislikes = JSON.parse(data.dislikes)
        if(like_state==2 && !tmp_dislikes.includes(user_id)) tmp_dislikes.push(user_id); //Add user to dislikes if disliked
        else if ((like_state==0||like_state==1) && tmp_dislikes.includes(user_id)) tmp_dislikes.splice(tmp_dislikes.indexOf(user_id), 1); //Remove user from dislikes if disliked or not liked
        const new_dislikes = JSON.stringify(tmp_dislikes)

        fetchHandlerCb('api/put-comment', "PUT", {
            id: data.id,
            user_id: data.user_id,
            content_id: data.content_id,
            comment: data.comment,
            rating: data.rating,
            likes: new_likes,
            dislikes: new_dislikes
        }, (obj) => {setData(obj)})
    }

    return { data, user, getData, processComment, editHandler, liked, handleLikes }
}
export default CommentLogic