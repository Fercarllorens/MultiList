import React from 'react'
import { useForm } from "react-hook-form";
import { fetchHandler } from '../fetchHandler';

interface item{
    text: string,
    type: string,
    value: string
    api_value: string,
}

interface opt_item{
    value: string;
    api_value: string;
}

export interface Props{
    open: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement>;
    uid: string | null;
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    values: item[];
    opt_values?: opt_item[]
}

const ModalLogic = (props: Props) => {
    const { register, handleSubmit } = useForm();
    //TODO: Usable for more things? maybe import the request func instead???
    //TODO: Make fields required
    function onSubmit(data: any){
        let body: any = {}
        props.values.forEach((value: any) => {
            body[value.api_value] = data[value.api_value]
        })
        props.opt_values && props.opt_values.forEach((value:any) => {
            body[value.api_value] = value.value
        });
        //TODO: Modify to treat the response
        fetchHandler(props.endpoint, props.method, body)
            .catch((err:any) => console.log(err))
    }

    return {register, handleSubmit, onSubmit}
}
export default ModalLogic