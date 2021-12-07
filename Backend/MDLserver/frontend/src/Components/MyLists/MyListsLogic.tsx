import { useState } from "react";

interface User {
    id: string
    username: string;
    password: string;
    email: string;
    created_at: string;
    spotify_token: string;
    lists: string;
}

const MyListsLogic = () => {
    const [lists, setLists] = useState<null | any[]>(null)
    const [selectedList, setSelectedList] = useState<null | any[]>(null)
    const [filter, setFilter] = useState<null | string>(null)

    let userId: string | null = localStorage.getItem('user_id')
    let url = `http://localhost:8000/api/get-user?user_id=${userId}`

    function getData() {
        fetch(url)
            .then((res) => { return res ? res.json() : res })
            .then((json) => {
                if (json) {
                    getList(json)
                }
            })
            .catch((err) => console.error(err))
    }

    function getList(user: any) {
        if (user == null) return
        // Parse user lists ( JSON ARRAY ) to an actual array
        let listsIds: any[] = JSON.parse(user.lists)
        // For each list id, get the list contents
        let lists_arr: any[] = []
        listsIds.forEach((list_id) => {
            let url = `http://localhost:8000/api/get-list?id=${list_id}`
            fetch(url)
                .then(res => { return res ? res.json() : res })
                .then(json => { lists_arr.push(json) })
                .catch(err => { console.error(err) })
        })
        setLists(lists_arr);
        setSelectedList(lists_arr);
    }

    function handleFilters(e: any) {
        if (lists == null) return
        let current_filter = e.currentTarget.innerHTML.toLowerCase()
        setFilter(current_filter)
        let new_list: any[] = []
        lists.forEach(list => {
            if (list.type === current_filter) new_list.push(list)
        })
        setSelectedList(new_list)
    }

    return { lists, selectedList, getData, filter, handleFilters }
}



export default MyListsLogic