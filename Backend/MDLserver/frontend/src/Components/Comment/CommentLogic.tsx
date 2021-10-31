import React, {useState} from 'react'
import { fetchHandlerCb } from '../fetchHandler'

interface Comment{
    id: number;
    user_id: number;
    content_id: number;
    comment: string;
    likes: any[];
    dislikes: any[];
}

interface User{
    username: string;
}

const CommentLogic = (props:any) => {
    const [ data, setData ] =   useState<null | Comment>(null)
    const [ user, setUser ] =   useState<null | User>(null)
    const [ liked, setLiked ] = useState<0 | 1 | 2 >(0)

    const user_id = localStorage.getItem('user_id')

    function getData(){
        fetchHandlerCb(`api/get-comment?id=${props.comment_id}`, "GET", null, processComment)
    }

    function processComment(json: any){
        if(/*If user_id in likes set liked to 1 if disliked to 2 else 0*/1){}
        setData(json)
    }

    function editHandler(){
        //Not yet implemented
    }

    function handleLikes(e:any){
        if (e.target.id=="like"){
            liked==1
                ? setLiked(0)
                : setLiked(1)
        } else{
            liked==2
                ? setLiked(0)
                : setLiked(2)
        }
        updateComment()
    }

    function updateComment(){
        //fetch request to put comment, need to handle liked State to add or remove user from list
    }

    return { data, user, getData, editHandler, handleLikes }
}
export default CommentLogic