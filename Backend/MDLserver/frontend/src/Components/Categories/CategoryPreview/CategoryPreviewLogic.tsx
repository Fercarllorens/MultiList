import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { fetchHandler, fetchHandlerCb } from '../../fetchHandler'
import CategoriesLogic from '../../Categories/CategoriesLogic'

interface Category{
    id: string
    name: string
    type: string
}


const CategoryPreviewLogic = (category:Category) => {

    //const [ filmsCategories, setFilmsCategories] = useState<null | any[]>(null)
    const user_id: any = localStorage.getItem('user_id')
    const [ user, setUser ] =   useState<null | any>(null)
    const [ userCategories, setUserCategories ] =   useState<null | any[]>(null)

    const {updateFilteredCategoriesAfterUserAddition} = CategoriesLogic(category)

    function getUserAndUserCategories(){
        fetchHandlerCb(`api/get-user?user_id=${user_id}`, "GET", null, (obj) => {
            setUser(obj);
            setUserCategories(obj.categories);
        })       
    }

    function addCategory(category:Category){
        let body = {
            user_id: user_id,
            name: category.name,
            type: category.type
        }
        fetchHandlerCb(`api/update-user-categories`, "POST", body, () => {getUserAndUserCategories(); updateFilteredCategoriesAfterUserAddition()})
    }

    return {addCategory, getUserAndUserCategories, userCategories}
}

export default CategoryPreviewLogic
