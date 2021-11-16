import {useState} from 'react'
import { History } from 'history';
import { fetchHandlerCb } from '../fetchHandler';
import { useHistory } from 'react-router';


const UserFinderLogic = () => {
    
    const [content, set_content] = useState<string>("")
    const [userList, setUserList] = useState<any[]>([])


    let history = useHistory()

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
        
        const data = JSON.parse(json)
        let userListData: any = []
        data.forEach((element:any) => {
            let user = {
                username: element.username,
                user_id: element.id
            }
            userListData.push(user)
        });
        setUserList(userListData)
    }

    const show_user = (id: string) => {  
        console.log(id)
        history.push({
            pathname:'/profile',
            search: `?id=${id}`
         })

    }

    return {content, on_change, find, userList, show_user}
}

export default UserFinderLogic