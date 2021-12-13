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
    const [lists, setLists] = useState<any[]>([])
    const [selectedList, setSelectedList] = useState<any[]>([])
    const [filter, setFilter] = useState<null | string>(null)

    let userId: string | null = localStorage.getItem('user_id')

    function getData() {
        let url = `http://localhost:8000/api/get-user-lists?user_id=${userId}`
        fetch(url)
            .then((res) => { return res ? res.json() : res })
            .then((json) => {
                if (json) {
                    let parsed_json = JSON.parse(json);
                    setLists(parsed_json);
                    setSelectedList(parsed_json);
                }
            })
            .catch((err) => console.error(err))
    }

    function handleFilters(e: any) {
        if (lists == null) return
        let current_filter = e.currentTarget.innerHTML.toLowerCase()
        let new_list: any[] = []

        if (filter == current_filter) {
            setSelectedList(lists)
            setFilter(null)
            return
        }

        setFilter(current_filter)
        lists.forEach(list => {
            if (list.type === current_filter) new_list.push(list)
        })
        setSelectedList(new_list)
    }

    return { selectedList, getData, filter, handleFilters, lists }
}


export default MyListsLogic