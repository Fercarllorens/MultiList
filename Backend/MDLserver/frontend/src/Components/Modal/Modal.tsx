import React from 'react'
import ModalLogic, { Props } from './ModalLogic'
import './Modal.css'
import { request } from 'http'

// Expected values
// [
//     {
//         "text": "Nombre",
//         "type": "text",
//         "value": "UserName",
//         "api_value": "username",
//         "select_opts?": [{value: "string", text: "string"},]
//     },
//     {...},
// ]

const Modal: React.FC<Props> = (props) => {
    const { register, handleSubmit, onSubmit } = ModalLogic(props)
    return props.open ? (
        <>
            <div className="Overlay"></div>
            <div className="Modal">
                <form onSubmit={handleSubmit(onSubmit)} method="post" className="modal-form">
                    <h1>{props.title}</h1>
                    {props.values.map(value => {
                        return (<div className="input-group" key={value.value}>
                            {value.type === 'Select' ?
                                (
                                    <div className="form-select">
                                        <p>{value.text}   </p>
                                        <select
                                            {...register(value.api_value)}
                                        >
                                            {value.select_opts && value.select_opts.map((opt, index) => {
                                                return <option value={opt.value} key={index}>{opt.text}</option>
                                            })}
                                        </select>
                                    </div>
                                )
                                :
                                (<input
                                    type={value.type}
                                    id={value.api_value}
                                    defaultValue={value.value ? value.value : ''}
                                    {...register(value.api_value)}
                                    className="form-text-input"
                                    placeholder={value.text}
                                />)}
                        </div>)
                    })}
                    <div className="form-buttons">
                        <input type="submit" value="Submit" className="form-btn" />
                        <button onClick={props.onClose} className="form-btn">
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </>
    ) : null
}
export default Modal