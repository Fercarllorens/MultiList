import React from 'react'
import CommentFormLogic, {Props} from './CommentFormLogic'
import './CommentForm.css'


const CommentForm: React.FC<Props> = (props) => {
    const { register, handleSubmit, onSubmit} = CommentFormLogic(props)

    return !props.commented?(
        <form onSubmit={handleSubmit(onSubmit)} className="cmf-container">
            <div className="cmf-rating">
            <label htmlFor="rating">Rating</label>
            <input type="range" id="rating" min="0" max="5" {...register("rating")} />
            </div>
            <input type="textfield" {...register("text")}/>
            <input type="submit" value="Send" />
        </form>
    ) : null
}
export default CommentForm