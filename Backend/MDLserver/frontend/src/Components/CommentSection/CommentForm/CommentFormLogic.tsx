import React from 'react'
import { useForm } from 'react-hook-form';
import { fetchHandler, fetchHandlerCb } from '../../fetchHandler'

interface formData{
    text: string;
    rating: number;
}

export interface Props{
    commented: boolean;
    toggleCommented: () => void;
    content_id: string;
}

const CommentFormLogic = (props: Props) => {
    const { register, handleSubmit } = useForm();
    const uid = localStorage.getItem('user_id')


    function onSubmit(data: formData){
        const body = {
            user_id: uid,
            content_id: props.content_id,
            comment: data.text,
            rating: data.rating,
        }
        fetchHandlerCb('api/post-comment', "POST", body, props.toggleCommented)
    }

    return { register, handleSubmit, onSubmit }
}
export default CommentFormLogic