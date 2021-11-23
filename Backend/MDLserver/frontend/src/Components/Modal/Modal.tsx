import React from 'react'
import ModalLogic, {Props} from './ModalLogic'
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
    const {register, handleSubmit, onSubmit} = ModalLogic(props)
    return props.open? (
        <>
        <div className="Overlay"></div>
        <div className="Modal">
            <form onSubmit={handleSubmit(onSubmit)} method="post">
                {props.values.map(value => {
                    return (<div className="input-group" key={value.value}>
                        <span>{value.text}</span>
                        {value.type === 'Select'?
                        (
                            <select 
                                {...register(value.api_value)}
                            >
                                {value.select_opts&& value.select_opts.map((opt, index) => {
                                    return <option value={opt.value} key={index}>{opt.text}</option>
                                })}
                            </select>
                        )
                        :
                        (<input 
                            type={value.type} 
                            id={value.api_value} 
                            defaultValue={value.value? value.value : ''} 
                            {...register(value.api_value)}
                        />)}
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