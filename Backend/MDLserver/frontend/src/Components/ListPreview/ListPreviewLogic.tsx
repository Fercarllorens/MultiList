import { useState } from "react";
import { useHistory } from 'react-router'

export interface Props {
    id: number
    name: string
    type: string
    contents: string[]
    user_id: string
}

const ListPreviewLogic = (props: Props) => {
    const history = useHistory()

    const backgrounds: any = {
        "film": "#590811",
        "series": "#002d60",
        "song": "#186b15"
    }

    const show_list = (id: number) => {
        history.push({
            pathname: '/List',
            search: `?id=${id}`
        })

    }

    return { show_list, backgrounds }
}

export default ListPreviewLogic