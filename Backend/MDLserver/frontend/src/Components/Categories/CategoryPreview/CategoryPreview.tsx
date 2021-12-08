import React, { useEffect } from 'react'
import './CategoryPreview.css'
import CategoryPreviewLogic from './CategoryPreviewLogic'

interface Category{
    id: string
    name: string;
    type: string
}

interface Props{
    category: Category
}

const CategoryPreview: React.FC<Props> = ({category}) => {
    const {addCategory, getUserAndUserCategories, userCategories} = CategoryPreviewLogic(category)

    useEffect(() => {
        getUserAndUserCategories()
    }, [])

    return (
        <div>
            <div className="CategoryName">
                {category.name}
            </div>
            {userCategories?.includes(category.id) ? 
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Green_tick.svg/1200px-Green_tick.svg.png" width="100" height="100"/> :
                <input type="image" onClick={()=>{addCategory(category)}} src="https://static.thenounproject.com/png/2453491-200.png"/>
            }
        </div>
    )
}
export default CategoryPreview