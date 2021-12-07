import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { fetchHandler, fetchHandlerCb } from '../../fetchHandler'

interface Category{
    id: string
    name: string
    type: string
}


const CategoryPreviewLogic = (category:Category) => {

    //const [ filmsCategories, setFilmsCategories] = useState<null | any[]>(null)
    const user_id: any = localStorage.getItem('user_id')


    function addCategory(category:Category){
        console.log(user_id)
        let body = {
            user_id: user_id,
            name: category.name,
            type: category.type
        }
        console.log(body)
        fetchHandler(`api/update-user-categories`, "POST", body)
    }

    return {addCategory}
}

export default CategoryPreviewLogic
