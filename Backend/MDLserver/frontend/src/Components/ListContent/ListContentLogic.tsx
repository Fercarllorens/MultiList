import { useState } from "react"
import { useLocation } from 'react-router';

interface List {
    id: string;
    name: string;
    type: string;
    contents: string[];
    user_id: string;
}

interface Content {
    name: string
    external_id: string
    total_rating: number
    comments: any
    type: string
}

const ListContentLogic = () => {
    const [list, setList] = useState<null | List>(null)
    const [contents, setContents] = useState<[] | Content[]>([])
    const [currentContents, setCurrentContents] = useState<[] | Content[]>([])

    const { search } = useLocation()
    const query = new URLSearchParams(search)
    const id_query: any = query.get('id')


    function getData() {
        let url = `http://localhost:8000/api/get-list?id=${id_query}`
        fetch(url)
            .then((res) => { return res.json() })
            .then((list_json) => {
                setList(list_json)
                url = `http://localhost:8000/api/get-content-array?list=${list_json.contents}`
                fetch(url)
                    .then((res) => { return res.json() })
                    .then((content_json) => {
                        let parsed_json = JSON.parse(content_json);
                        setContents(parsed_json);
                        setCurrentContents(parsed_json);
                    })
                    .catch((err) => console.error(err))
            })
            .catch((err) => console.error(err))

    }

    function filterData(e: any) {
        let filter = e.currentTarget.value
        let contents_copy = contents.filter((content) => {
            return ~content.name.toLowerCase().indexOf(filter.toLowerCase())
        })
        setCurrentContents(contents_copy);
    }

    return { currentContents, list, getData, filterData }
}




export default ListContentLogic