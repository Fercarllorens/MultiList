import {useState} from 'react'
import { History } from 'history';
import { fetchHandlerCb } from '../fetchHandler';

const UserFinderLogic = () => {
    const [content, set_content] = useState<string>("")

    const on_change = (e: any) => {
        set_content(e.target.value)
    } 

    const find = (e: any, content: string) => {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            fetchHandlerCb(`api/get-users-name?username=${content}`, "GET", null, processUsers)
            e.preventDefault();
            return false;
        }
    }

    const processUsers = (json: any) => {
        //TODO: Split user list and make a list with the items we want to show, later, map in the frontend with the follow button
    }

    return {content, on_change, find}
}

export default UserFinderLogic