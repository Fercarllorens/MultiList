import React from 'react'
import ModalLogic from './ModalLogic'
import './Modal.css'
import { request } from 'http'

interface item{
    text: string,
    type: string,
    value: string
    api_value: string,
}

interface Props{
    open: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement>;
    uid: string | null;
    endpoint: string;
    method: string;
    values: item[];
}

// Expected values
// [
//     {
//         "text": "Nombre",
//         "type": "text",
//         "value": "UserName",
//         "api_value": "username",
//     },
//     {...},
// ]

const Modal: React.FC<Props> = (props) => {
    const {register, handleSubmit, onSubmit} = ModalLogic(props)
    return props.open? (
        <>
        <div className="Overlay"></div>
        <div className="Modal">
            <form onSubmit={handleSubmit(onSubmit)} method="post">
                {props.values.map(value => {
                    return (<div className="input-group" key={value.value}>
                        <span>{value.text}</span>
                        <input 
                            type={value.type} 
                            id={value.api_value} 
                            value={value.value? value.value : ''} 
                            {...register(value.api_value)}
                        />
                    </div>)
                })}
                <input type="submit" value="Submit"/>
                <button onClick={props.onClose}>
                    Close
                </button>
            </form>
        </div>
        </>
    ) : null
}
export default Modal