import {useState} from 'react'
import { History } from 'history';
import { fetchHandlerCb } from '../fetchHandler';
import { useHistory } from 'react-router';


const MyFollowsLogic = () => {
    
    const uid = localStorage.getItem('user_id')
    const [follows, setFollows] = useState<any[]>([])
    const [followed, setFollowed] = useState<boolean>(true)

    function getData(){

        fetchHandlerCb(`api/get-user?user_id=${uid}`, "GET", null, setData)
    }

    function setData(json: any){
        let data = JSON.parse(json.following)
        let list = data.users
        let body = {
            list: list
        }
        fetchHandlerCb(`api/get-user-array`, "POST", body, setList)
    }

    function setList(json: any){
        let arr = JSON.parse(json)
        let userList: any[] = []
        arr.forEach((element : any) => {
            let obj = {
                id: element.id,
                name: element.username
            }
            userList.push(obj)
        });

        setFollows(userList)

    }

    function unfollow_user(follow_id: string){
      
        let body = {
          id: uid,
          follow_id: follow_id.toString()
        }
        console.log(body)
        fetchHandlerCb(`api/delete-follow`, "POST", body, refreshFollow)
        return false;
      }
    
      function refreshFollow(){
        getData()
      }
    

    return {getData, follows, unfollow_user}
}

export default MyFollowsLogic