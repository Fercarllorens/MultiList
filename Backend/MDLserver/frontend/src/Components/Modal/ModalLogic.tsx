import React from 'react'
import { useForm } from "react-hook-form";

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

const ModalLogic = (props: Props) => {
    const { register, handleSubmit } = useForm();
    //TODO: Usable for more things? maybe import the request func instead???
    //TODO: Make fields required
    function onSubmit(data: any){
        let temp_body: any = {}
        props.values.forEach((value: any) => {
            temp_body[value.api_value] = data[value.api_value]
        })
        const body = JSON.stringify(temp_body)
        //TODO: Modify to treat the response
        fetch("localhost:8000/"+props.endpoint, {method: props.method, body: body, headers: {'Content-Type': 'application/json'}})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return {register, handleSubmit, onSubmit}
}
export default ModalLogic